import React from "react";
import _ from "lodash"
import { connectAutoDispatch } from "../hoc"
import { updateArticle } from "../../redux/action/data"
import { CustomInput, ErrorItem, SuccessText } from "../elements"
import { scrollToTop } from "../../utils"

@connectAutoDispatch(state => {
  return {
    errors: state.articles.errors,
    token: state.userInfo && state.userInfo.user && state.userInfo.user.token
  }
}, { updateArticle })
class UpdateArticlePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      description: "",
      body: "",
      tagList: "",
      errors: props.errors,
      isSuccess: false
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.updateArticle = this.updateArticle.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      }
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.errors && this.state.errors !== prevState.errors) {
      if (!_.isEmpty(this.state.errors)) {
        this.setState({
          isSuccess: false
        }, () => {
          scrollToTop(300);
        });
      } else {
        this.setState({
          isSuccess: true
        }, () => {
          scrollToTop(300);
        })
      }
    }
  }

  onChangeText(e, keyChange) {
    this.setState({
      [keyChange]: e.target.value
    })
  }

  updateArticle(e) {
    e.preventDefault();
    const { title, description, body, tagList } = this.state;
    this.props.updateArticle(title, description, body, tagList, this.props.token);
  }

  render() {
    return (
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              {this.state.isSuccess && <SuccessText text="Add new article success..." />}
              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <ErrorItem listError={this.state.errors} errorKey="title" />
                    <CustomInput
                      value={this.state.title}
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      onChange={(e) => this.onChangeText(e, "title")}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <ErrorItem listError={this.state.errors} errorKey="description" />
                    <CustomInput
                      value={this.state.description}
                      className="form-control"
                      placeholder="What's this article about?"
                      onChange={(e) => this.onChangeText(e, "description")}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <ErrorItem listError={this.state.errors} errorKey="body" />
                    <textarea
                      value={this.state.body}
                      className="form-control"
                      rows="8"
                      placeholder="Write your article (in markdown)"
                      onChange={(e) => this.onChangeText(e, "body")}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <CustomInput
                      value={this.state.tagList}
                      className="form-control"
                      placeholder="Enter tags"
                      onChange={(e) => this.onChangeText(e, "tagList")}
                    />
                    <div className="tag-list"></div>
                  </fieldset>
                  <button onClick={this.updateArticle} className="btn btn-lg pull-xs-right btn-primary" type="button">
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>

          </div>
        </div>
      </div>
    )
  }
}

export default UpdateArticlePage