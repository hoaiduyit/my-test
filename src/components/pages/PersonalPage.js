import React from "react";
import _ from "lodash";
import { filterByAuthor, getAuthorProfile, favoriteArticles } from "../../services";
import { SingleItem, PersonalItem } from "../elements";

export default class PersonalPage extends React.Component {
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

  componentDidMount() {
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
    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <PersonalItem
                authorName={this.state.authorProfile.username}
                authorImage={this.state.authorProfile.image}
                authorDescription={this.state.authorProfile.bio}
              />
            </div>
          </div>
        </div>

        <div className="container">
          <div className="row">

            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <span style={{ cursor: "pointer" }} onClick={() => this.changeActiveNav("myArticles")} className={`nav-link ${this.state.active === "myArticles" ? "active" : ""}`} >My Articles</span>
                  </li>
                  <li className="nav-item">
                    <span style={{ cursor: "pointer" }} onClick={() => this.changeActiveNav("favoriteArticles")} className={`nav-link ${this.state.active === "favoriteArticles" ? "active" : ""}`} >Favorited Articles</span>
                  </li>
                </ul>
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