import React, { Component } from 'react';
import {
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import Login from './src/pages/login/Login';

export default class App extends Component {
    render(){
        return(
          <View style={{flex:1}} >
            <Login/>
          </View>
        )
    }
};