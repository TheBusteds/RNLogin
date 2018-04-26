import React, { Component } from 'react';
import { StackNavigator, TabNavigator } from 'react-navigation';

import ChangePassword from '../screens/ChangePassword';
import Home from '../screens/Home';
import Login from '../screens/Login';
import SplashScreen from '../screens/SplashScreen';

var appcode = null;

export const Main = StackNavigator({
    Home: {
        screen: Home,
        navigationOptions: ({ navigation }) => ({
            header: false,
        }),
    },
    ChangePassword: {
        screen: ChangePassword,
        navigationOptions: ({ navigation }) => ({
            header: false,
        }),
    },
}, {
        mode: 'modal',
    });

export const Root = StackNavigator({
    SplashScreen: {
        screen: SplashScreen,
        navigationOptions: ({ navigation }) => ({
            header: false,
        }),
    },
    Login: {
        screen: Login,
        navigationOptions: ({ navigation }) => ({
            header: false,
        }),
    },
    Main: {
        screen: Main
    },
}, {
        mode: 'modal',
    });