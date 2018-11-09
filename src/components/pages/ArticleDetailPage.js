import React from "react";
import _ from "lodash"
import { articleDetail, articleComment, addComment } from "../../services"
import { TagList, CustomLink, ErrorItem, SuccessText } from "../elements"
import { connectAutoDispatch } from "../hoc"
import { ArticleMeta, AddComment, ArticleComment } from "../elements/article-detail"

const apiArray = [
  {
    api: articleDetail,
    keyName: "article"
  },
  {
    api: articleComment,
    keyName: "comments"
  }
]

@connectAutoDispatch(state => {
  return {
    isLogin: state.userInfo && state.userInfo.isLogin,
    user: state.userInfo && state.userInfo.user
  }
}, {})
class ArticleDetailPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: props.match.params.articleId,
      article: props.article ? props.article.article : {},
      comments: props.comments ? props.comments.comments : [],
      text: "",
      comment: {},
      errors: {},
      isSuccess: false
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.postComment = this.postComment.bind(this);
  }

  onChangeText(e) {
    this.setState({
      text: e.target.value
    })
  }

  fetchDataFromApi(id, api, keyName) {
    api(id).then(data => {
      this.setState({
        [keyName]: data[keyName]
      })
    })
  }

  componentDidMount() {
    if (!_.isEmpty(apiArray)) {
      for (let i = 0; i < apiArray.length; i++) {
        this.fetchDataFromApi(this.props.match.params.articleId, apiArray[i].api, apiArray[i].keyName);
      }
    }
  }

  postComment(e) {
    e.preventDefault();
    addComment(this.state.id, this.state.text, this.props.user.token).then(data => {
      if (data.errors) {
        this.setState({
          errors: data.errors,
          isSuccess: false
        })
      } else {
        articleComment(this.props.match.params.articleId).then(data => {
          this.setState({
            comments: data.comments && data.comments,
            text: "",
            errors: {},
            isSuccess: true
          })
        })
      }
    })
  }

  render() {
    const { comments, article, errors } = this.state;
    if (!comments && !article) return <div />

    return (
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{article.title}</h1>
            <ArticleMeta
              ownerName={article.author && article.author.username}
              ownerImage={article.author && article.author.image}
              createdDate={article.createdAt}
              likeCount={article.favoritesCount}
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
            />
          </div>
          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              {this.props.isLogin ? (
                <span>
                  {this.state.isSuccess && <SuccessText text="Your comment has been updated" />}
                  <ErrorItem listError={errors} errorKey="body" />
                  <AddComment
                    value={this.state.text}
                    userImage={this.props.user.image}
                    onChange={this.onChangeText}
                    postCommentAction={this.postComment}
                  />
                </span>
              ) : (
                  <p style={{ display: "inherit" }}>
                    <CustomLink url="/login" children="Sign in" /> or <CustomLink url="/register" children="Sign up" /> to add comments on this article.
                  </p>
                )}
              {!_.isEmpty(comments) && comments.map(item => {
                return (
                  <ArticleComment
                    key={item.id}
                    user={this.props.user}
                    name={item.author && item.author.username}
                    image={item.author && item.author.image}
                    createdDate={item.createdAt}
                    comment={item.body}
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

export default ArticleDetailPage;