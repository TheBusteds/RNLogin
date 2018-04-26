import React, { Component } from 'react';
import { TouchableOpacity, Alert, StatusBar, Platform, View, StyleSheet, BackHandler, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { StyleProvider, Container, Content, Text, Form, Item, Label, Input, Button } from 'native-base';
import getTheme from '../theme/components';
import variable from "../theme/variables/platform";
import { resetToFirst } from "../utils/Route";
import Dimensions from 'Dimensions';
import { observer } from 'mobx-react';

const platform = Platform.OS;
const { width, height } = Dimensions.get('window');
const isIphoneX = platform === "ios" && height === 812 && width === 375;

const contentHeight = (platform === 'ios') ? (isIphoneX ? height - 138 : height - 114) : height - 106;

@observer
export default class ChangePassword extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: {
                user: null,
                pass: null
            },
            oldPass: null,
            newPass: null,
            confNewPass: null
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
                        pass: JSON.parse(result).password,
                    }
                })
            }
        });
    }

    chPass() {
        if (this.state.oldPass && this.state.newPass && this.state.confNewPass) {
            if (this.state.newPass == this.state.confNewPass) {
                if (this.state.oldPass == this.state.check.pass) {
                    Alert.alert(
                        'Confirmation',
                        'You need relogin after change password', [{
                            text: 'Cancel',
                            style: 'cancel'
                        }, {
                            text: 'Yes',
                            onPress: () => {
                                AsyncStorage.setItem('user', JSON.stringify({ "user": this.state.check.user, "password": this.state.newPass }));
                                AsyncStorage.removeItem('session')
                                resetToFirst('Login', this.props.navigation)
                            }
                        },], {
                            cancelable: false
                        }
                    )
                    return true;
                } else {
                    Alert.alert(
                        'Error',
                        'Old password is wrong', [{
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
                    'New password not same', [{
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
                                <Label>Old Password</Label>
                                <Input maxLength={6} keyboardType={'numeric'} onChangeText={(text) => this.setState({ oldPass: text ? text : null })} disabled={this.state.formDisabled} getRef={(ref) => this.LIPass = ref} onSubmitEditing={() => this.login()} secureTextEntry />
                            </Item>
                            <Item floatingLabel>
                                <Label>New Password</Label>
                                <Input maxLength={6} keyboardType={'numeric'} onChangeText={(text) => this.setState({ newPass: text ? text : null })} disabled={this.state.formDisabled} getRef={(ref) => this.LIPass = ref} onSubmitEditing={() => this.login()} secureTextEntry />
                            </Item>
                            <Item floatingLabel>
                                <Label>Confirm New Password</Label>
                                <Input maxLength={6} keyboardType={'numeric'} onChangeText={(text) => this.setState({ confNewPass: text ? text : null })} disabled={this.state.formDisabled} getRef={(ref) => this.LIPass = ref} onSubmitEditing={() => this.login()} secureTextEntry />
                            </Item>
                        </Form>
                        <Content padder>
                            <Text style={{ color: 'red' }}>{this.state.error}</Text>
                            <Button style={{ width: width - 20, justifyContent: 'center', marginTop: 20, height: 50 }} large onPress={() => this.chPass()} disabled={this.state.formDisabled}>
                                <Text style={{ bottom: Platform.OS == 'ios' ? 2 : 4 }}>Change Password</Text>
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