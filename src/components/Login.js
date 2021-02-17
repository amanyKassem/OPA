import React, { useState , useEffect } from "react";
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ActivityIndicator , Platform } from "react-native";
import {Container, Content, Form, Input, Item, Label, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useSelector, useDispatch} from 'react-redux';
import {userLogin} from '../actions';
import * as Permissions from 'expo-permissions';
import {Notifications} from 'expo'


const isIOS = Platform.OS === 'ios';

function Login({navigation}) {

    const lang = useSelector(state => state.lang.lang);
    const auth = useSelector(state => state.auth);

    const dispatch = useDispatch()

    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [deviceId, setDeviceId] = useState('');
    const [userId, setUserId] = useState(null);
    const [spinner, setSpinner] = useState(false);

    const getDeviceId = async () => {
        const {status: existingStatus} = await Permissions.getAsync(
            Permissions.NOTIFICATIONS
        );

        let finalStatus = existingStatus;

        if (existingStatus !== 'granted') {
            const {status} = await Permissions.askAsync(Permissions.NOTIFICATIONS);
            finalStatus = status;
        }

        if (finalStatus !== 'granted') {
            return;
        }

        const deviceId = await Notifications.getExpoPushTokenAsync();

        setDeviceId(deviceId);
        setUserId(null);

        AsyncStorage.setItem('deviceID', deviceId);
    };


    useEffect(() => {
        setTimeout(() => getDeviceId(), 1000)

    }, []);

    useEffect(() => {
        setTimeout(() => setSpinner(false), 500);
    }, [auth]);


    function validate() {
        let isError = false;
        let msg = '';

        if (phone.length <= 0) {
            isError = true;
            msg = i18n.t('namereq');
        } else if (password.length < 6) {
            isError = true;
            msg = i18n.t('passreq');
        }
        if (msg !== '') {
            Toast.show({
                text: msg,
                type: "danger",
                duration: 3000,
                textStyle: {
                    color: "white",
                    fontFamily: 'cairo',
                    textAlign: 'center',
                }
            });
        }
        return isError;
    };

    function renderSubmit() {
        if (password == '' || phone == '') {
            return (
                <View
                    style={[styles.babyblueBtn , styles.Width_100 , styles.marginTop_25 , styles.marginBottom_10 , {
                        backgroundColor:'#bbb'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('login') }</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => onLoginPressed()} style={[styles.babyblueBtn , styles.Width_100 , styles.marginTop_25 , styles.marginBottom_10]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('login') }</Text>
            </TouchableOpacity>
        );
    }

    function onLoginPressed() {
        const err = validate();

        if (!err){
            setSpinner(true);
            dispatch(userLogin(phone, password, deviceId , lang , navigation));
        }
    }

    function renderLoader(){
        if (spinner){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.babyblue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    return (
        <Container style={[styles.bg_gray]}>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>
                <View style={[styles.position_R , styles.bgFullWidth, styles.Width_100 , styles.paddingHorizontal_25]}>

                    <Image source={require('../../assets/images/logo.png')} style={[styles.icon160 , styles.marginBottom_80 , styles.SelfCenter , styles.marginTop_60]} resizeMode={'contain'} />

                   <View style={[styles.directionRowSpace]}>
                       <KeyboardAvoidingView style={[styles.Width_100]}>
                           <Form style={[styles.Width_100 , styles.flexCenter]}>

                               <Item style={[styles.item]}>
                                   <Label style={[styles.label, styles.textRegular ,styles.text_White]}>{ i18n.t('phone') }</Label>
                                   <Input style={[styles.input]}
                                          onChangeText={(phone) => setPhone(phone)}
                                          keyboardType={'number-pad'}
                                   />
                               </Item>

                               <Item style={[styles.item]}>
                                   <Label style={[styles.label, styles.textRegular ,styles.text_White]}>{ i18n.t('password') }</Label>
                                   <Input style={[styles.input]}
                                          onChangeText={(password) => setPassword(password)}
                                          secureTextEntry
                                   />
                               </Item>

                               <TouchableOpacity onPress={() => navigation.push('forgetPass')} style={[styles.alignStart]}>
                                   <Text style={[styles.textRegular , styles.text_White , styles.textSize_14]}>{ i18n.t('forgetPassword') }</Text>
                               </TouchableOpacity>

                               {renderSubmit()}

                               <TouchableOpacity onPress={() => navigation.push('register')} style={[styles.directionRowCenter, styles.marginTop_20]}>
                                   <Text style={[styles.textRegular , styles.text_White , styles.textSize_14, {marginRight:5}]}>{ i18n.t('haveNoAcc') }</Text>
                                   <Text style={[styles.textRegular , styles.text_babyblue , styles.textSize_14]}>{ i18n.t('createAcc') }</Text>
                               </TouchableOpacity>


                           </Form>
                       </KeyboardAvoidingView>
                   </View>

               </View>
            </Content>
        </Container>
    );
}

export default Login;


