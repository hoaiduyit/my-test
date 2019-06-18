import React from 'react';
import _ from 'lodash';
import { connectAutoDispatch } from '../hoc';
import { refetchAuthorProfileWithAction, fetchAuthorProfile } from '../../redux/action/author';
import {
  getFollowingAuthorsList,
  fetchFavoritedArticles,
} from '../../redux/action/user';
import {
  actionOnArticle,
  addUsernameToFetch,
} from '../../redux/action/article';
import { SingleItem, PersonalItem, CustomToggleNav } from '../elements';
import { removeDuplicateElement } from '../../utils';

@connectAutoDispatch(
  state => {
    return {
      userArticles: state.articles.userArticles
        ? state.articles.userArticles
        : [],
      followingAuthors: state.userInfo && state.userInfo.followingAuthors,
      favoritedArticles: state.userInfo && state.authorInfo.favoritedArticles,
      authorProfile: state.authorInfo && state.authorInfo.authorProfile,
      userInfo: state.userInfo && state.userInfo.user,
      token: state.userInfo && state.userInfo.user.token,
    };
  },
  {
    refetchAuthorProfileWithAction,
    actionOnArticle,
    getFollowingAuthorsList,
    addUsernameToFetch,
    fetchFavoritedArticles,
    fetchAuthorProfile,
  }
)
class PersonalPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      active: 'myArticles',
      username: props.match.params.username,
      loading: true,
      profileEmpty: true,
    };
    this.changeActiveNav = this.changeActiveNav.bind(this);
    this.handleFollowAuthor = this.handleFollowAuthor.bind(this);
  }

  componentDidUpdate(prevProps, prevState) {
    const {
      token,
      addUsernameToFetch,
      fetchFavoritedArticles,
      refetchAuthorProfileWithAction,
      userArticles,
      getFollowingAuthorsList,
    } = this.props;
    const { username } = this.state;

    if (token && token !== prevProps.token) {
      addUsernameToFetch(token);
      fetchFavoritedArticles(username, 'myArticles');
    }
    if (username !== prevState.username) {
      refetchAuthorProfileWithAction(username);
    }
    if (userArticles !== prevProps.userArticles) {
      getFollowingAuthorsList(
        removeDuplicateElement(userArticles)
      );
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const { match, authorProfile } = nextProps;
    if (
      match &&
      match.params.username &&
      match.params.username !== prevState.username
    ) {
      return {
        username: match.params.username,
      };
    }
    if (!authorProfile) {
      return {
        loading: false,
      }
    }
    if (!_.isEmpty(authorProfile)) {
      return {
        loading: false,
        profileEmpty: false,
      }
    }
    return null;
  }

  componentDidMount() {
    const { username } = this.state;
    const { refetchAuthorProfileWithAction, fetchFavoritedArticles } = this.props;
    if (username) {
      refetchAuthorProfileWithAction(username);
      fetchFavoritedArticles(username, 'myArticles');
    }
  }

  componentWillUnmount() {
    this.props.fetchAuthorProfile({});
  }

  changeActiveNav(key) {
    const { fetchFavoritedArticles } = this.props;
    this.setState(
      {
        active: key,
      },
      () => {
        const { active, username } = this.state;
        if (active === 'myArticles') {
          fetchFavoritedArticles(username, 'myArticles');
        } else {
          fetchFavoritedArticles(
            username,
            'favoriteArticles'
          );
        }
      }
    );
  }

  handleFollowAuthor(e, authorName, isFollowing) {
    e.preventDefault();
    const { refetchAuthorProfileWithAction, token } = this.props;
    if (isFollowing) {
      refetchAuthorProfileWithAction(
        authorName,
        token,
        'unfollow'
      );
    } else {
      refetchAuthorProfileWithAction(
        authorName,
        token,
        'follow'
      );
    }
  }

  render() {
    const {
      authorProfile,
      followingAuthors,
      favoritedArticles,
      userInfo,
      token,
      actionOnArticle,
      fetchFavoritedArticles,
    } = this.props;
    const { loading, profileEmpty, active } = this.state;
    if (loading && profileEmpty) return <div className="loading" />;

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
                  active={active}
                  toggleKey_1="myArticles"
                  toggleKey_2="favoriteArticles"
                  toggleText_1={
                    !_.isEmpty(userInfo) &&
                      userInfo.username === authorProfile.username
                      ? 'My Articles'
                      : `${authorProfile.username} Articles`
                  }
                  toggleText_2="Favorited Articles"
                />
              </div>
              {favoritedArticles &&
                !_.isEmpty(favoritedArticles) &&
                favoritedArticles.map(item => {
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
                      token={token}
                      actionOnArticle={actionOnArticle}
                      fetchFavoritedArticles={fetchFavoritedArticles}
                    />
                  );
                })}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default PersonalPage;
