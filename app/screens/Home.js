import React, { Component } from 'react';
import { TouchableOpacity, Alert, StatusBar, Platform, View, StyleSheet, BackHandler, AsyncStorage } from 'react-native';
import { NavigationActions } from 'react-navigation'
import { StyleProvider, Container, Content, Text, Button } from 'native-base';
import getTheme from '../theme/components';
import variable from "../theme/variables/platform";
import { navigateTo, resetToFirst } from "../utils/Route";
import Dimensions from 'Dimensions';
import { observer } from 'mobx-react';

const platform = Platform.OS;
const { width, height } = Dimensions.get('window');
const isIphoneX = platform === "ios" && height === 812 && width === 375;

const contentHeight = (platform === 'ios') ? (isIphoneX ? height - 138 : height - 114) : height - 106;

@observer
export default class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }

    logout() {
        AsyncStorage.removeItem('session')
        resetToFirst('Login', this.props.navigation)
    }

    render() {
        const { navigator } = this.state
        return (
            <StyleProvider style={getTheme(variable)}>
                <Container>
                    <StatusBar backgroundColor={'#35aff0'} barStyle="light-content" />
                    <View style={styles.container}>
                        <Content padder>
                            <View style={styles.body}>
                                <Text style={{ color: '#000000' }}>Welcome, You already login now</Text>
                            </View>
                            <Button style={{ width: width - 20, justifyContent: 'center', marginTop: 20, height: 50 }} large onPress={() => this.logout()} disabled={this.state.formDisabled}>
                                <Text style={{ bottom: Platform.OS == 'ios' ? 2 : 4 }}>Logout</Text>
                            </Button>

                            <Button style={{ width: width - 20, justifyContent: 'center', marginTop: 20, height: 50 }} large onPress={() => navigateTo('ChangePassword', this.props.navigation)} disabled={this.state.formDisabled}>
                                <Text style={{ bottom: Platform.OS == 'ios' ? 2 : 4 }}>Change Password</Text>
                            </Button>
                        </Content>
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
    body: {
        backgroundColor: 'transparent',
        alignItems: 'center'
    },
})