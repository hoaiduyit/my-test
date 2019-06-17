import React from 'react';
import { HashRouter as Router, Route } from 'react-router-dom';
import { NavBar, Footer } from './components/elements';
import {
  HomeContainer,
  ArticleDetailContainer,
  PersonalContainer,
  SignUpContainer,
  LoginContainer,
  SettingContainer,
  UpdateArticleContainer,
} from './components/containers';
import './App.css';

class App extends React.PureComponent {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Route path="/" exact component={HomeContainer} />
          <Route path="/profile/:username" component={PersonalContainer} />
          <Route
            path="/article/:articleId"
            component={ArticleDetailContainer}
          />
          <Route path="/register" component={SignUpContainer} />
          <Route path="/login" component={LoginContainer} />
          <Route path="/user-profile" component={SettingContainer} />
          <Route path="/add-article" component={UpdateArticleContainer} />
          <Route
            path="/update-article/:articleId"
            component={UpdateArticleContainer}
          />
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
