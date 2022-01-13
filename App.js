/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  Text,
  View,
} from 'react-native';

import Login from './LoginButton';
import LoginBtn from './LoginIns';


const App= () => {
 return(
   <View>
     <Login />
     <LoginBtn />
   </View>
 )
};


export default App;
