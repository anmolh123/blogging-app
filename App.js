import React from 'react';
import LogInScreen from './src/screens/LogInScreen';
import SignUpScreen from './src/screens/SignUpScreen';
import { Router, Scene } from 'react-native-router-flux';
import CreateBlogScreen from './src/screens/CreateBlogScreen';
import HomeBlogScreen from './src/screens/HomeScreen';
import BlogDetailScreen from './src/screens/BlogDetailScreen';
import LogOut from './src/screens/LogOut';

const App = props => {

  return (
    <Router>
      <Scene key='root'>
        <Scene
            key="login"
            component={LogInScreen}
            hideNavBar
            initial
          />
          <Scene
            key="signup"
            component={SignUpScreen}
            hideNavBar
          />
          <Scene
            key="createBlog"
            component={CreateBlogScreen}
            hideNavBar
          />
          <Scene
            key="homeBlog"
            component={HomeBlogScreen}
            hideNavBar
          />
          <Scene
            key="BlogDetailScreen"
            component={BlogDetailScreen}
            hideNavBar
          />
          <Scene
            key="logOut"
            component={LogOut}
            hideNavBar
          />
      </Scene>
    </Router>
  );
};

export default App;
