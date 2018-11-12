import React from "react";
import _ from "lodash";
import { connectAutoDispatch } from "../hoc";
import { refetchAuthorProfileWithAction } from "../../redux/action/author";
import { getFollowingAuthorsList, fetchFavoritedArticles } from "../../redux/action/user";
import { actionOnArticle, addUsernameToFetch } from "../../redux/action/article";
import { SingleItem, PersonalItem, CustomToggleNav } from "../elements";
import { removeDuplicateElement } from "../../utils";

@connectAutoDispatch(state => {
  return {
    userArticles: state.articles.userArticles ? state.articles.userArticles : [],
    followingAuthors: state.userInfo && state.userInfo.followingAuthors,
    favoritedArticles: state.userInfo && state.authorInfo.favoritedArticles,
    authorProfile: state.authorInfo && state.authorInfo.authorProfile,
    userInfo: state.userInfo && state.userInfo.user,
    token: state.userInfo && state.userInfo.user.token
  }
}, {
    refetchAuthorProfileWithAction,
    actionOnArticle,
    getFollowingAuthorsList,
    addUsernameToFetch,
    fetchFavoritedArticles
  })
class PersonalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: "myArticles",
      username: props.match.params.username
    };
    this.changeActiveNav = this.changeActiveNav.bind(this);
    this.handleFollowAuthor = this.handleFollowAuthor.bind(this);
  }

  mounted = false

  componentDidUpdate(prevProps, prevState) {
    if (this.props.token && this.props.token !== prevProps.token) {
      this.props.addUsernameToFetch(this.props.token);
      this.props.fetchFavoritedArticles(this.state.username, 'myArticles');
    }
    if (this.state.username !== prevState.username) {
      this.props.refetchAuthorProfileWithAction(this.state.username);
    }
    if (this.props.userArticles !== prevProps.userArticles) {
      this.props.getFollowingAuthorsList(removeDuplicateElement(this.props.userArticles));
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.match && nextProps.match.params.username && nextProps.match.params.username !== prevState.username) {
      return {
        username: nextProps.match.params.username
      }
    }
    return null;
  }

  componentDidMount() {
    this.mounted = true
    if (this.state.username) {
      this.props.refetchAuthorProfileWithAction(this.state.username);
      this.props.fetchFavoritedArticles(this.state.username, "myArticles");
    }
  }

  changeActiveNav(key) {
    this.setState({
      active: key
    }, () => {
      if (this.state.active === "myArticles") {
        this.props.fetchFavoritedArticles(this.state.username, "myArticles");
      } else {
        this.props.fetchFavoritedArticles(this.state.username, "favoriteArticles");
      }
    })
  }

  handleFollowAuthor(e, authorName, isFollowing) {
    e.preventDefault();
    if (isFollowing) {
      this.props.refetchAuthorProfileWithAction(authorName, this.props.token, "unfollow");
    } else {
      this.props.refetchAuthorProfileWithAction(authorName, this.props.token, "follow");
    }
  }

  render() {
    const { authorProfile, followingAuthors, favoritedArticles, userInfo } = this.props;
    if (!this.mounted) return <div className="loading"></div>

    return (
      <div className="profile-page">
        <div className="user-info">
          <div className="container">
            <div className="row">
              <PersonalItem
                authorName={authorProfile.username}
                authorImage={authorProfile.image}
                followingAuthors={followingAuthors}
                authorDescription={authorProfile.bio}
                userInfo={userInfo}
                handleFollowAuthor={this.handleFollowAuthor}
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
                    !_.isEmpty(userInfo)
                      && userInfo.username === authorProfile.username
                      ? "My Articles"
                      : `${authorProfile.username} Articles`
                  }
                  toggleText_2="Favorited Articles"
                />
              </div>
              {favoritedArticles && !_.isEmpty(favoritedArticles) && favoritedArticles.map(item => {
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
                    token={this.props.token}
                    actionOnArticle={this.props.actionOnArticle}
                    fetchFavoritedArticles={this.props.fetchFavoritedArticles}
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