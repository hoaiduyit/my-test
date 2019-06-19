import React from 'react';
import _ from 'lodash';
import { connectAutoDispatch } from '../hoc/connectAutoDispatch';
import { filterByTag } from '../../redux/action/tag';
import {
  addUsernameToFetch,
  actionOnArticle,
  changePage,
} from '../../redux/action/article';
import { getFollowingAuthorsList } from '../../redux/action/user';
import {
  SingleItem,
  CustomLink,
  CustomToggleNav,
  Pagination,
} from '../elements';
import { removeDuplicateElement, getPageFromUrl } from '../../utils';

@connectAutoDispatch(
  state => {
    return {
      token: state.userInfo && state.userInfo.user.token,
      user: state.userInfo && state.userInfo.user,
      isLogin: state.userInfo && state.userInfo.isLogin,
      articles: state.articles.articles,
      userArticles: state.articles.userArticles
        ? state.articles.userArticles
        : [],
      tags: state.tags.tags,
    };
  },
  {
    filterByTag,
    addUsernameToFetch,
    actionOnArticle,
    getFollowingAuthorsList,
    changePage,
  }
)
class HomePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tagName: '',
      active: !props.isLogin ? 'globalFeed' : 'myFeed',
      currentPage: 1,
    };
    this.changeActiveNav = this.changeActiveNav.bind(this);
    this.handleChangePage = this.handleChangePage.bind(this);
  }

  componentDidMount() {
    if (this.props.location.search) {
      const tagName = this.props.location.search.split('?tag=')[1];
      const pagin = this.props.location.search.split('?limit=10&offset=')[1];

      this.changeTagNameAndFilter(tagName, true);
      this.handleChangePage(getPageFromUrl(pagin));
    }
  }

  componentDidUpdate(prevProps) {
    const {
      token,
      addUsernameToFetch,
      location,
      userArticles,
      getFollowingAuthorsList,
      filterByTag,
    } = this.props;
    const tagName = location.search.split('?tag=')[1];
    const pagin = location.search.split('?limit=10&offset=')[1];

    if (token && token !== prevProps.token) {
      addUsernameToFetch(token);
    }
    if (location !== prevProps.location) {
      if (_.isEmpty(location.search)) {
        this.changeTagNameAndFilter('');
        this.handleChangePage(1);
      } else {
        this.changeTagNameAndFilter(tagName);
        this.handleChangePage(getPageFromUrl(pagin));
        tagName && filterByTag(tagName);
      }
    }
    if (
      userArticles &&
      !_.isEmpty(userArticles) &&
      userArticles !== prevProps.userArticles
    ) {
      getFollowingAuthorsList(removeDuplicateElement(userArticles));
    }
  }

  componentWillUnmount() {
    this.props.filterByTag('');
  }

  changeTagNameAndFilter(tagName, isRollBack) {
    this.setState({
      tagName,
      active: isRollBack ? 'globalFeed' : tagName,
    });
  }

  changeActiveNav(keyChange) {
    const { token, addUsernameToFetch, filterByTag } = this.props;
    this.setState({ active: keyChange });
    switch (keyChange) {
      case 'myFeed':
        addUsernameToFetch(token);
        break;
      case 'globalFeed':
        filterByTag('');
        break;
      default:
        filterByTag(keyChange);
        break;
    }
  }

  handleChangePage(page) {
    if (page) {
      this.setState({ currentPage: page });
      this.props.changePage(10, page * 10 - 10);
    }
  }

  renderArticlesList(articles) {
    const { history, token, actionOnArticle } = this.props;

    if (!_.isEmpty(articles)) {
      return articles.map(item => {
        return (
          <SingleItem
            key={item.slug}
            articleId={item.slug}
            author={item.author}
            createAt={item.createdAt}
            likeCount={item.favoritesCount}
            title={item.title}
            description={item.description}
            favorited={item.favorited}
            token={token}
            actionOnArticle={actionOnArticle}
            history={history}
          />
        );
      });
    }
    return <span>Empty</span>;
  }

  render() {
    const { articles, tags, userArticles, isLogin } = this.props;
    const { active, tagName, currentPage } = this.state;

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
                  isShow={isLogin}
                  active={active}
                  tagName={tagName}
                  toggleKey_1="myFeed"
                  toggleText_1="My Feed"
                  toggleKey_2="globalFeed"
                  toggleText_2="Global Feed"
                />
              </div>
              {active === 'myFeed'
                ? this.renderArticlesList(userArticles)
                : !_.isEmpty(articles) &&
                  this.renderArticlesList(articles.articles)}

              <Pagination
                currentPage={currentPage}
                numberOfItem={articles && articles.articlesCount}
                changePage={this.handleChangePage}
              />
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>
                <div className="tag-list">
                  {!_.isEmpty(tags) &&
                    tags.tags &&
                    tags.tags.map((item, index) => {
                      return (
                        <CustomLink
                          key={`tag_${index}`}
                          url={`?tag=${item}`}
                          className="tag-pill tag-default"
                          children={item}
                        />
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default HomePage;
