import React, { useState , useEffect } from "react";
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ActivityIndicator } from "react-native";
import {Container, Content, Form, Input, Item, Label, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";

function ChangePass({navigation}) {

    const [code, setCode] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [spinner, setSpinner] = useState(false);


    // useEffect(() => {
    //     alert('activation code : ' + activeCode)
    // }, []);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(false)
        });
        setSpinner(false)
        return unsubscribe;
    }, [navigation, spinner]);


    function renderSubmit() {
        if (code == '' || password == '' || confirmPass == '') {
            return (
                <View
                    style={[styles.babyblueBtn , styles.Width_100 , styles.marginTop_5 , {
                        backgroundColor:'#bbb'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => onConfirm()} style={[styles.babyblueBtn , styles.Width_100 , styles.marginTop_5]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>
            </TouchableOpacity>
        );
    }

    function onConfirm() {
        if (code == activeCode) {
            if (confirmPass.length < 6) {
                Toast.show({
                    text: i18n.t('passreq'),
                    type: "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        fontFamily: 'cairo',
                        textAlign: 'center'
                    }
                });
                return false
            } else if (password !== confirmPass) {
                Toast.show({
                    text: i18n.t('passError'),
                    type: "danger",
                    duration: 3000,
                    textStyle: {
                        color: "white",
                        fontFamily: 'cairo',
                        textAlign: 'center'
                    }
                });
                return false
            } else {
                // dispatch(resetPassword(id, password, lang, navigation));
                navigation.navigate('login');
            }
        } else {
            Toast.show({
                text        	: i18n.t('codeNotMatch'),
                type			: "danger",
                duration    	: 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'cairo',
                    textAlign   	: 'center'
                }
            });
        }
    }

    function renderLoader(){
        if (spinner){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    return (
        <Container>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.marginTop_60 , {marginLeft:25}]}>
                    <Image source={require('../../assets/images/back.png')} style={[styles.icon25, styles.transform]} resizeMode={'contain'} />
                </TouchableOpacity>

                <View style={[styles.position_R , styles.bgFullWidth, styles.Width_100 , styles.paddingHorizontal_45]}>

                    <Image source={require('../../assets/images/logo.png')} style={[styles.icon160 , styles.marginBottom_80 , styles.SelfCenter , styles.marginTop_25]} resizeMode={'contain'} />

                    <KeyboardAvoidingView style={[styles.Width_100]}>
                        <Form style={[styles.Width_100 , styles.flexCenter]}>

                            <Item style={[styles.item]}>
                                <Label style={[styles.label, styles.textRegular ,styles.text_White]}>{ i18n.t('code') }</Label>
                                <Input style={[styles.input]}
                                       onChangeText={(code) => setCode(code)}
                                       keyboardType={'number-pad'}
                                />
                            </Item>

                            <Item style={[styles.item]}>
                                <Label style={[styles.label, styles.textRegular ,styles.text_White]}>{ i18n.t('newpass') }</Label>
                                <Input style={[styles.input]}
                                       onChangeText={(password) => setPassword(password)}
                                       secureTextEntry
                                />
                            </Item>

                            <Item style={[styles.item]}>
                                <Label style={[styles.label, styles.textRegular ,styles.text_White]}>{ i18n.t('confirmNewPass') }</Label>
                                <Input style={[styles.input]}
                                       onChangeText={(confirmPass) => setConfirmPass(confirmPass)}
                                       secureTextEntry
                                />
                            </Item>

                            {renderSubmit()}


                        </Form>
                    </KeyboardAvoidingView>

                </View>
            </Content>
        </Container>
    );
}

export default ChangePass;


