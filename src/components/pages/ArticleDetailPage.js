import React from 'react';
import _ from 'lodash';
import { articleDetail } from '../../services';
import {
  deleteArticle,
  updateComment,
  addUsernameToFetch,
} from '../../redux/action/article';
import { getFollowingAuthorsList } from '../../redux/action/user';
import { refetchAuthorProfileWithAction } from '../../redux/action/author';
import { TagList, CustomLink, ErrorItem } from '../elements';
import { connectAutoDispatch } from '../hoc';
import {
  ArticleMeta,
  AddComment,
  ArticleComment,
} from '../elements/article-detail';
import { removeDuplicateElement } from '../../utils';

@connectAutoDispatch(
  state => {
    return {
      userArticles: state.articles.userArticles
        ? state.articles.userArticles
        : [],
      followingAuthors: state.userInfo && state.userInfo.followingAuthors,
      errors: state.articles.errors || {},
      comments: state.articles.comments,
      isLogin: state.userInfo && state.userInfo.isLogin,
      user: state.userInfo && state.userInfo.user,
      token: state.userInfo && state.userInfo.user.token,
    };
  },
  {
    deleteArticle,
    updateComment,
    getFollowingAuthorsList,
    addUsernameToFetch,
    refetchAuthorProfileWithAction,
  }
)
class ArticleDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.articleId,
      article: props.article ? props.article.article : {},
      comments: props.comments ? props.comments.comments : [],
      text: '',
      comment: {},
      errors: {},
      isLoading: false,
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.postComment = this.postComment.bind(this);
    this.handleDeleteArticle = this.handleDeleteArticle.bind(this);
    this.handleDeleteComment = this.handleDeleteComment.bind(this);
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value,
    });
  }

  fetchDataFromApi(id, api, keyName) {
    api(id).then(data => {
      this.setState({
        [keyName]: data[keyName],
      });
    });
  }

  mounted = false;

  componentDidMount() {
    this.mounted = true;
    this.props.updateComment(this.state.id);
    this.fetchDataFromApi(
      this.props.match.params.articleId,
      articleDetail,
      'article'
    );
  }

  componentDidUpdate(prevProps) {
    if (this.props.comments !== prevProps.comments) {
      this.setState({
        text: '',
        isLoading: false,
      });
    }
    if (this.props.errors !== prevProps.errors) {
      this.setState({
        isLoading: false,
      });
    }
    if (this.props.token && this.props.token !== prevProps.token) {
      this.props.addUsernameToFetch(this.props.token);
    }
    if (this.props.userArticles !== prevProps.userArticles) {
      this.props.getFollowingAuthorsList(
        removeDuplicateElement(this.props.userArticles)
      );
    }
  }

  postComment(e) {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    this.props.updateComment(this.state.id, this.state.text, this.props.token);
  }

  handleDeleteComment(e, commentId) {
    e.preventDefault();
    this.setState({
      isLoading: true,
    });
    this.props.updateComment(
      this.state.id,
      undefined,
      this.props.token,
      commentId
    );
  }

  handleDeleteArticle(e) {
    e.preventDefault();
    this.props.deleteArticle(this.props.token, this.state.id);
    this.setState({
      isLoading: true,
    });
    setTimeout(() => {
      this.setState({
        isLoading: false,
      });
      this.props.history.push('/');
    }, 1000);
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps !== this.props || nextState !== this.state;
  }

  render() {
    const { article } = this.state;
    const { comments, errors, followingAuthors } = this.props;
    if (!this.mounted) return <div className="loading" />;

    return (
      <div className="article-page">
        {this.state.isLoading && <div className="loading" />}
        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>
            <ArticleMeta
              ownerName={article.author && article.author.username}
              ownerImage={article.author && article.author.image}
              createdDate={article.createdAt}
              likeCount={article.favoritesCount}
              userInfo={this.props.user}
              articleId={this.state.id}
              deleteArticle={this.handleDeleteArticle}
              followingAuthors={followingAuthors}
              token={this.props.token}
              refetchAuthorProfileWithAction={
                this.props.refetchAuthorProfileWithAction
              }
              isShow
            />
          </div>
        </div>
        <div className="container page">
          <div className="row article-content">
            <div className="col-md-12">
              <p>{article.body}</p>
              <TagList tagList={article.tagList} />
            </div>
          </div>
          <hr />
          <div className="article-actions">
            <ArticleMeta
              ownerName={article.author && article.author.username}
              ownerImage={article.author && article.author.image}
              createdDate={article.createdAt}
              likeCount={article.favoritesCount}
              userInfo={this.props.user}
              articleId={this.state.id}
              followingAuthors={followingAuthors}
              deleteArticle={this.handleDeleteArticle}
              token={this.props.token}
              refetchAuthorProfileWithAction={
                this.props.refetchAuthorProfileWithAction
              }
            />
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              {this.props.isLogin ? (
                <span>
                  <ErrorItem listError={errors} errorKey="body" />
                  <AddComment
                    value={this.state.text}
                    userImage={this.props.user.image}
                    onChange={this.onChangeText}
                    postCommentAction={this.postComment}
                  />
                </span>
              ) : (
                <p style={{ display: 'inherit' }}>
                  <CustomLink url="/login" children="Sign in" /> or{' '}
                  <CustomLink url="/register" children="Sign up" /> to add
                  comments on this article.
                </p>
              )}
              {!_.isEmpty(comments) &&
                comments.map(item => {
                  return (
                    <ArticleComment
                      commentId={item.id}
                      key={item.id}
                      user={this.props.user}
                      name={item.author && item.author.username}
                      image={item.author && item.author.image}
                      createdDate={item.createdAt}
                      comment={item.body}
                      handleDeleteComment={this.handleDeleteComment}
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

export default ArticleDetailPage;
