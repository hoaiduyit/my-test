import React from "react";
import _ from "lodash"
import { connectAutoDispatch } from "../hoc/connectAutoDispatch"
import { filterByTag } from "../../redux/action/tag"
import { addUsernameToFetch, actionOnArticle, changePage } from "../../redux/action/article"
import { getFollowingAuthorsList } from "../../redux/action/user"
import { SingleItem, CustomLink, CustomToggleNav, Pagination } from "../elements"
import { removeDuplicateElement, getPageFromUrl } from "../../utils"

@connectAutoDispatch(state => {
  return {
    token: state.userInfo && state.userInfo.user.token,
    user: state.userInfo && state.userInfo.user,
    isLogin: state.userInfo && state.userInfo.isLogin,
    articles: state.articles.articles,
    userArticles: state.articles.userArticles ? state.articles.userArticles : [],
    tags: state.tags.tags
  };
}, { filterByTag, addUsernameToFetch, actionOnArticle, getFollowingAuthorsList, changePage })
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: props.isLogin,
      tagName: "",
      active: !props.isLogin ? "globalFeed" : "myFeed",
      userArticles: props.userArticles,
      currentPage: 1
    };
    this.changeActiveNav = this.changeActiveNav.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.token && this.props.token !== prevProps.token) {
      this.props.addUsernameToFetch(this.props.token)
    }
    if (this.props.location !== prevProps.location) {
      if (_.isEmpty(this.props.location.search)) {
        this.changeTagNameAndFilter("");
        this.handleChangePage(1);

      } else {
        this.changeTagNameAndFilter(this.props.location.search.split("?tag=")[1]);
        this.handleChangePage(getPageFromUrl(this.props.location.search.split("?limit=10&offset=")[1]))
      }
    }
    if (
      this.state.userArticles
      && !_.isEmpty(this.state.userArticles)
      && this.state.userArticles !== prevState.userArticles
    ) {
      this.props.getFollowingAuthorsList(removeDuplicateElement(this.state.userArticles));
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps && nextProps.userArticles !== prevState.userArticles) {
      return {
        userArticles: nextProps.userArticles
      }
    }
    return null;
  }

  changeTagNameAndFilter(tagName) {
    this.setState({
      tagName: tagName
    }, () => this.props.filterByTag(tagName))
  }

  componentDidMount() {
    if (this.props.location.search) {
      this.changeTagNameAndFilter(this.props.location.search.split("?tag=")[1]);
      this.handleChangePage(getPageFromUrl(this.props.location.search.split("?limit=10&offset=")[1]));
    }
  }

  shouldComponentUpdate(nextProps, nextState) {
    return this.props !== nextProps || this.state !== nextState
  }

  changeActiveNav(keyChange) {
    this.setState({
      active: keyChange
    }, () => {
      if (this.state.active === "myFeed") {
        this.props.addUsernameToFetch(this.props.token)
      }
    })
  }

  handleChangePage(page) {
    this.setState({
      currentPage: page
    }, () => {
      setTimeout(() => {
        this.props.changePage(10, page * 10 - 10)
      }, 100);
    })
  }

  render() {
    const { articles, tags } = this.props;
    const { userArticles } = this.state;

    return (
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>
        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <CustomToggleNav
                  onClick={this.changeActiveNav}
                  isShow={this.props.isLogin}
                  active={this.state.active}
                  tagName={this.state.tagName}
                  toggleKey_1="myFeed"
                  toggleText_1="My Feed"
                  toggleKey_2="globalFeed"
                  toggleText_2="Global Feed"
                />
              </div>
              {this.state.active === "myFeed" && !_.isEmpty(userArticles) && userArticles.map(item => {
                return (
                  <span>
                    <SingleItem
                      key={item.slug}
                      articleId={item.slug}
                      author={item.author}
                      createAt={item.createdAt}
                      likeCount={item.favoritesCount}
                      title={item.title}
                      description={item.description}
                      favorited={item.favorited}
                      token={this.props.token}
                      actionOnArticle={this.props.actionOnArticle}
                    />
                  </span>
                )
              })}
              {this.state.active === "globalFeed" && !_.isEmpty(articles) && articles.articles && articles.articles.map(item => {
                return (
                  <SingleItem
                    key={item.slug}
                    articleId={item.slug}
                    author={item.author}
                    createAt={item.createdAt}
                    likeCount={item.favoritesCount}
                    title={item.title}
                    description={item.description}
                    token={this.props.token}
                    actionOnArticle={this.props.actionOnArticle}
                  />
                )
              })}

              <Pagination
                currentPage={this.state.currentPage}
                numberOfItem={articles && articles.articlesCount}
                changePage={this.handleChangePage}
              />
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <div className="tag-list">
                  {!_.isEmpty(tags) && tags.tags && tags.tags.map((item, index) => {
                    return (
                      <span key={`tag_${index}`}>
                        <CustomLink
                          url={`?tag=${item}`}
                          className="tag-pill tag-default"
                          children={item}
                        />
                      </span>
                    )
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    )
  }
}

export default HomePage;