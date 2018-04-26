import React, { Component } from 'react';
import { TouchableOpacity, Alert, StatusBar, Platform, View, StyleSheet, BackHandler, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { StyleProvider, Container, Content, Text, Form, Item, Label, Input, Button } from 'native-base';
import getTheme from '../theme/components';
import variable from "../theme/variables/platform";
import { resetTo } from "../utils/Route";
import Dimensions from 'Dimensions';

const platform = Platform.OS;
const { width, height } = Dimensions.get('window');
const isIphoneX = platform === "ios" && height === 812 && width === 375;

const contentHeight = (platform === 'ios') ? (isIphoneX ? height - 138 : height - 114) : height - 106;

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: {
                user: 'ahmad@subarja.com',
                password: '123456',
            },
            user: null,
            password: null
        }
    }

    componentDidMount() {
        this.checkUser()
    }

    checkUser() {
        AsyncStorage.getItem('user', (err, result) => {
            if (result) {
                this.setState({
                    check: {
                        user: JSON.parse(result).user,
                        password: JSON.parse(result).password,
                    }
                })
            }
        });
    }

    login() {
        if (this.state.user && this.state.password) {
            if (this.state.user == this.state.check.user && this.state.password == this.state.check.password) {
                AsyncStorage.setItem('session', JSON.stringify({ "user": this.state.user }));
                resetTo('Main', this.props.navigation)
            } else {
                Alert.alert(
                    'Error',
                    'Login data is wrong', [{
                        text: 'Close',
                        style: 'cancel'
                    }], {
                        cancelable: false
                    }
                )
                return true;
            }
        } else {
            Alert.alert(
                'Error',
                'Please complete form', [{
                    text: 'Close',
                    style: 'cancel'
                }], {
                    cancelable: false
                }
            )
            return true;
        }
    }

    render() {
        const { navigator } = this.state
        return (
            <StyleProvider style={getTheme(variable)}>
                <Container>
                    <StatusBar backgroundColor={'#35aff0'} barStyle="light-content" />
                    <Content>
                        <Form style={{ left: -5, width: width - 10 }}>
                            <Item floatingLabel>
                                <Label>User or Email address</Label>
                                <Input keyboardType={'email-address'} onChangeText={(text) => this.setState({ user: text ? text : null })} disabled={this.state.formDisabled} getRef={(ref) => this.LIUser = ref} returnKeyType={"next"} onSubmitEditing={() => this.LIPass._root.focus()} />
                            </Item>
                            <Item floatingLabel>
                                <Label>Password</Label>
                                <Input maxLength={6} keyboardType={'numeric'} onChangeText={(text) => this.setState({ password: text ? text : null })} disabled={this.state.formDisabled} getRef={(ref) => this.LIPass = ref} onSubmitEditing={() => this.login()} secureTextEntry />
                            </Item>
                        </Form>
                        <Content padder>
                            <Text style={{ color: 'red' }}>{this.state.error}</Text>
                            <Button style={{ width: width - 20, justifyContent: 'center', marginTop: 20, height: 50 }} large onPress={() => this.login()} disabled={this.state.formDisabled}>
                                <Text style={{ bottom: Platform.OS == 'ios' ? 2 : 4 }}>Login</Text>
                            </Button>
                        </Content>
                    </Content>
                </Container>
            </StyleProvider>
        );
    }

}

const styles = StyleSheet.create({
})