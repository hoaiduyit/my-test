import React from "react";
import _ from "lodash";
import { filterByAuthor, getAuthorProfile, favoriteArticles } from "../../services";
import { connectAutoDispatch } from "../hoc";
import { SingleItem, PersonalItem, CustomToggleNav } from "../elements";

@connectAutoDispatch(state => {
  return {
    userInfo: state.userInfo && state.userInfo.user
  }
}, {})
class PersonalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "myArticles",
      username: props.match.params.username,
      authorProfile: {},
      authorArticles: []
    };
    this.changeActiveNav = this.changeActiveNav.bind(this);
  }

  fetchDataFromApi(username) {
    getAuthorProfile(username).then(data => {
      this.setState({
        authorProfile: data.profile
      })
    });
    filterByAuthor(username).then(data => {
      this.setState({
        authorArticles: data.articles
      })
    });
  }

  mounted = false

  componentDidMount() {
    this.mounted = true
    this.fetchDataFromApi(this.state.username);
  }

  changeActiveNav(key) {
    this.setState({
      active: key
    }, () => {
      if (this.state.active === "myArticles") {
        filterByAuthor(this.state.username).then(data => {
          this.setState({
            authorArticles: data.articles
          })
        });
      } else {
        favoriteArticles(this.state.username).then(data => {
          this.setState({
            authorArticles: data.articles
          })
        })
      }
    })
  }

  render() {
    if (!this.mounted) return <div className="loading"></div>
    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <PersonalItem
                authorName={this.state.authorProfile.username}
                authorImage={this.state.authorProfile.image}
                authorDescription={this.state.authorProfile.bio}
                userInfo={this.props.userInfo}
              />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <CustomToggleNav
                  onClick={this.changeActiveNav}
                  active={this.state.active}
                  toggleKey_1="myArticles"
                  toggleKey_2="favoriteArticles"
                  toggleText_1={
                    !_.isEmpty(this.props.userInfo)
                      && this.props.userInfo.username === this.state.authorProfile.username
                      ? "My Articles"
                      : `${this.state.authorProfile.username} Articles`
                  }
                  toggleText_2="Favorited Articles"
                />
              </div>
              {!_.isEmpty(this.state.authorArticles) && this.state.authorArticles.map(item => {
                return (
                  <SingleItem
                    key={item.slug}
                    articleId={item.slug}
                    author={item.author}
                    createAt={item.createdAt}
                    likeCount={item.favoritesCount}
                    title={item.title}
                    description={item.description}
                    tagList={item.tagList}
                  />
                )
              })}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default PersonalPage;