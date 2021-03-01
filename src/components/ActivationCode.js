import React, { useState , useEffect } from "react";
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ActivityIndicator } from "react-native";
import {Container, Content, Form, Input, Item, Label, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import { useDispatch, useSelector } from 'react-redux'
import {activeAccount} from "../actions";

function ActivationCode({navigation,route}) {

    const { sentCode, userId } = route.params;
    const lang = useSelector(state => state.lang.lang);
    const dispatch = useDispatch();

    const [code, setCode] = useState('');
    const [spinner, setSpinner] = useState(false);


    useEffect(() => {
        alert('activation code : ' + sentCode)
    }, []);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(false)
        });
        setSpinner(false)
        return unsubscribe;
    }, [navigation, spinner]);


    function renderSubmit() {
        if (code == '' ) {
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
        if (code == sentCode) {
            setSpinner(true);
            dispatch(activeAccount(userId, lang, navigation));
        }
        else {
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
            <Content contentContainerStyle={[styles.bgFullWidth]}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.marginTop_60 , {marginLeft:25}]}>
                    <Image source={require('../../assets/images/back_blueblack.png')} style={[styles.icon25, styles.transform]} resizeMode={'contain'} />
                </TouchableOpacity>

                <View style={[styles.position_R , styles.bgFullWidth, styles.Width_100 , styles.paddingHorizontal_45]}>

                    <Image source={require('../../assets/images/logo.png')} style={[styles.icon160 , styles.marginBottom_80 , styles.SelfCenter , styles.marginTop_25]} resizeMode={'contain'} />

                    <KeyboardAvoidingView style={[styles.Width_100]}>
                        <Form style={[styles.Width_100 , styles.flexCenter]}>

                            <Item style={[styles.item]}>
                                <Label style={[styles.label, styles.textRegular ,styles.text_gray]}>{ i18n.t('code') }</Label>
                                <Input style={[styles.input]}
                                       onChangeText={(code) => setCode(code)}
                                       keyboardType={'number-pad'}
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

export default ActivationCode;


