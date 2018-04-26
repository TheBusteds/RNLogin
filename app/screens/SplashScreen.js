import React, { Component } from 'react';
import { TouchableOpacity, Alert, StatusBar, Platform, View, StyleSheet, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { StyleProvider, Container, Text, Spinner } from 'native-base';
import getTheme from '../theme/components';
import variable from "../theme/variables/platform";
import { resetTo } from "../utils/Route";
import User from "../stores/User";
import Dimensions from 'Dimensions';
import { observer } from 'mobx-react';

const platform = Platform.OS;
const { width, height } = Dimensions.get('window');
const isIphoneX = platform === "ios" && height === 812 && width === 375;

const contentHeight = (platform === 'ios') ? (isIphoneX ? height - 138 : height - 114) : height - 106;

@observer
export default class SplashScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    componentDidMount() {
        this.checkUser()
        this.checkSession()
    }

    checkUser() {
        AsyncStorage.getItem('user', (err, result) => {
            if (!result) {
                AsyncStorage.setItem('user', JSON.stringify({ "user": User.user, "password": User.password }));
            }
        });
    }

    checkSession() {
        AsyncStorage.getItem('session', (err, result) => {
            if (result) {
                resetTo('Main', this.props.navigation)
            } else {
                resetTo('Login', this.props.navigation)
            }
        });
    }

    backAndroid() {
        Alert.alert(
            'Exit App',
            'Are you sure to exit the application?', [{
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel'
            }, {
                text: 'OK',
                onPress: () => RNExitApp.exitApp()
            },], {
                cancelable: false
            }
        )
        return true;
    }

    render() {
        const { navigator } = this.state
        return (
            <StyleProvider style={getTheme(variable)}>
                <Container>
                    <StatusBar backgroundColor={'#35aff0'} barStyle="light-content" />
                    <View style={styles.container}>
                        <View style={styles.spinner}>
                            <Spinner color="#35aff0" />
                            <Text style={{ color: '#000000' }}>Loading...</Text>
                        </View>
                    </View>
                </Container>
            </StyleProvider>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    spinner: {
        backgroundColor: 'transparent',
    },
})