import React from 'react';
import { signIn } from '../../services';
import { CustomInput, ErrorItem, CustomLink } from '../elements';
import constants from '../../utils/constants';

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      errors: {},
      isLoading: false,
    };
    this.changeText = this.changeText.bind(this);
    this.login = this.login.bind(this);
    this.onEnter = this.onEnter.bind(this);
  }

  login() {
    const { email, password } = this.state;
    this.setState({
      isLoading: true,
    });
    signIn(email, password).then(data => {
      if (data.errors) {
        this.setState({
          errors: data.errors,
          isLoading: false,
        });
      } else if (data.user) {
        this.setState(
          {
            errors: {},
          },
          () => {
            localStorage.setItem(
              constants.USER_TOKEN,
              JSON.stringify(data.user.token)
            );
            this.props.history.push('/');
          }
        );
      }
    });
  }

  onEnter(e) {
    e.preventDefault();
    if (e.keyCode === 13) {
      this.login();
    }
  }

  changeText(e, keyChange) {
    this.setState({
      [keyChange]: e.target.value,
    });
  }

  render() {
    const { errors } = this.state;
    return (
      <div className="auth-page">
        {this.state.isLoading && <div className="loading" />}
        <div className="container page">
          <div className="row">
            <div className="col-md-6 offset-md-3 col-xs-12">
              <h1 className="text-xs-center">Sign in</h1>
              <p className="text-xs-center">
                <CustomLink url="/register" children="Need an account?" />
              </p>
              <form>
                <fieldset className="form-group">
                  <ErrorItem listError={errors} errorKey="email" />
                  <CustomInput
                    className="form-control form-control-lg"
                    value={this.state.email}
                    placeholder="Email"
                    onChange={e => this.changeText(e, 'email')}
                    onKeyUp={this.onEnter}
                  />
                </fieldset>
                <fieldset className="form-group">
                  <ErrorItem listError={errors} errorKey="password" />
                  <CustomInput
                    className="form-control form-control-lg"
                    type="password"
                    value={this.state.password}
                    placeholder="Password"
                    onChange={e => this.changeText(e, 'password')}
                    onKeyUp={this.onEnter}
                  />
                </fieldset>
              </form>
              <button
                className="btn btn-lg btn-primary pull-xs-right"
                onClick={this.login}
              >
                Sign in
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
