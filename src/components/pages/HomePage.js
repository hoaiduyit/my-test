import React from "react";
import _ from "lodash"
import { connectAutoDispatch } from "../hoc/connectAutoDispatch"
import { filterByTag } from "../../redux/action/data"
import { SingleItem, CustomLink } from "../elements"

@connectAutoDispatch(state => {
  return {
    user: state.userInfo && state.userInfo.user,
    isLogin: state.userInfo && state.userInfo.isLogin,
    articles: state.articles.articles,
    tags: state.tags.tags
  };
}, { filterByTag })
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: props.isLogin,
      tagName: "",
      active: !props.isLogin ? "globalFeed" : "myFeed"
    };
    this.selectFilter = this.selectFilter.bind(this);
    this.changeActiveNav = this.changeActiveNav.bind(this);
  }

  selectFilter(tagName) {
    this.props.filterByTag(tagName)
  }

  changeActiveNav(keyChange) {
    this.setState({
      active: keyChange
    })
  }

  render() {
    const { articles, tags } = this.props;

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
                <ul className="nav nav-pills outline-active">
                  {this.props.isLogin && (
                    <li style={{ cursor: "pointer" }} className="nav-item">
                      <span onClick={() => this.changeActiveNav("myFeed")} className={`nav-link ${this.state.active === "myFeed" ? "active" : ""}`}>Your Feed</span>
                    </li>
                  )}
                  <li style={{ cursor: "pointer" }} className="nav-item">
                    <span onClick={() => this.changeActiveNav("globalFeed")} className={`nav-link ${this.state.active === "globalFeed" || !this.props.isLogin ? "active" : ""}`}>{this.state.tagName !== "" ? this.state.tagName : `Global Feed`}</span>
                  </li>
                </ul>
              </div>

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
                    return <span key={`tag_${index}`} onClick={e => this.selectFilter(item)}><CustomLink url="/" className="tag-pill tag-default" children={item} /></span>
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