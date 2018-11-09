import React from "react";
import _ from "lodash"
import { connectAutoDispatch } from "../hoc"
import { updateUserInfo } from "../../redux/action/user"
import { CustomInput, ErrorItem, SuccessText } from "../elements"
import { scrollToTop } from "../../utils"

@connectAutoDispatch(state => {
  return {
    user: state.userInfo && state.userInfo.user,
    errors: state.userInfo && state.userInfo.errors
  }
}, { updateUserInfo })
class SettingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: props.user,
      email: props.user && props.user.email ? props.user.email : "",
      username: props.user && props.user.username ? props.user.username : "",
      password: "",
      bio: props.user && props.user.bio ? props.user.bio : "",
      imageUrl: props.user && props.user.image ? props.user.image : "",
      errors: props.errors,
      token: props.user && props.user.token,
      isSuccess: false
    };
    this.onChangeText = this.onChangeText.bind(this);
    this.updateSetting = this.updateSetting.bind(this);
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.user && nextProps.user !== prevState.user) {
      const { email, username, bio, image, token } = nextProps.user;
      return {
        user: nextProps.user,
        email,
        username,
        imageUrl: image ? image : "",
        bio: bio ? bio : "",
        token
      }
    }
    if (nextProps.errors) {
      return {
        errors: nextProps.errors
      }
    }
    return null
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.errors && this.state.errors !== prevState.errors) {
      if (!_.isEmpty(this.state.errors)) {
        this.setState({
          isSuccess: false
        }, () => {
          scrollToTop(300);
        })
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

  updateSetting(e) {
    e.preventDefault();
    const { email, username, password, bio, imageUrl, token } = this.state;
    this.props.updateUserInfo(email, username, password, bio, imageUrl, token);
  }

  render() {
    if (!this.props.user) return <div />
    return (
      <div className="settings-page">
        <div className="container page">
          <div className="row">

            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Your Settings</h1>
              {this.state.isSuccess && <SuccessText text="Update info success.." />}
              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <CustomInput
                      value={this.state.imageUrl ? this.state.imageUrl : ""}
                      className="form-control"
                      placeholder="URL of profile picture"
                      onChange={(e) => this.onChangeText(e, "imageUrl")}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <ErrorItem
                      listError={this.state.errors}
                      errorKey="username"
                    />
                    <CustomInput
                      value={this.state.username}
                      className="form-control form-control-lg"
                      placeholder="Your Name"
                      onChange={(e) => this.onChangeText(e, "username")}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control form-control-lg"
                      rows="8"
                      placeholder="Short bio about you"
                      value={this.state.bio}
                      onChange={(e) => this.onChangeText(e, "bio")}
                    />
                  </fieldset>
                  <fieldset className="form-group" disabled>
                    <CustomInput
                      className="form-control form-control-lg"
                      placeholder="Email"
                      value={this.state.email}
                      readOnly
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <CustomInput
                      value={this.props.password}
                      type="password"
                      className="form-control form-control-lg"
                      placeholder="Password"
                      onChange={(e) => this.onChangeText(e, "password")}
                    />
                  </fieldset>
                  <button className="btn btn-lg btn-primary pull-xs-right" onClick={this.updateSetting}>
                    Update Settings
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

export default SettingPage