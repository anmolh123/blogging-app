import React, {useContext} from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import BlogReducer from './src/store/reducers/blog';
import LoginProvider from './src/context/UserLoginContext';

const store = createStore(BlogReducer);

const app = () => {
    return (
        <LoginProvider>
            <Provider store={store}>
                <App/>
            </Provider>
        </LoginProvider>
    );
};

AppRegistry.registerComponent(appName, ()=> app);
