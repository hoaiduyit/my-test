import React from "react";
import _ from "lodash"
import { connectAutoDispatch } from "../hoc/connectAutoDispatch"
import { filterByTag } from "../../redux/action/tag"
import { addUsernameToFetch } from "../../redux/action/article"
import { SingleItem, CustomLink, CustomToggleNav } from "../elements"

@connectAutoDispatch(state => {
  return {
    user: state.userInfo && state.userInfo.user,
    isLogin: state.userInfo && state.userInfo.isLogin,
    articles: state.articles.articles,
    userArticles: state.articles.userArticles ? state.articles.userArticles : [],
    tags: state.tags.tags
  };
}, { filterByTag, addUsernameToFetch })
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: props.isLogin,
      tagName: "",
      active: !props.isLogin ? "globalFeed" : "myFeed"
    };
    this.changeActiveNav = this.changeActiveNav.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEmpty(this.props.user) && this.props.user !== prevProps.user) {
      this.props.addUsernameToFetch(this.props.user.username)
    }
    if (this.props.location !== prevProps.location) {
      if (_.isEmpty(this.props.location.search)) {
        this.changeTagNameAndFilter("");
      } else {
        this.changeTagNameAndFilter(this.props.location.search.split("?tag=")[1])
      }
    }
  }

  changeTagNameAndFilter(tagName) {
    this.setState({
      tagName: tagName
    }, () => this.props.filterByTag(tagName))
  }

  componentDidMount() {
    if (this.props.location.search) {
      this.changeTagNameAndFilter(this.props.location.search.split("?tag=")[1])
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
        this.props.addUsernameToFetch(this.props.user.username)
      }
    })
  }

  render() {
    const { articles, tags, userArticles } = this.props;
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
                  <SingleItem
                    key={item.slug}
                    articleId={item.slug}
                    author={item.author}
                    createAt={item.createdAt}
                    likeCount={item.favoritesCount}
                    title={item.title}
                    description={item.description}
                  />
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
                  />
                )
              })}

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