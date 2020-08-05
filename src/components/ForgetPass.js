import React, { useState , useEffect } from "react";
import { View, Text, Image, TouchableOpacity, KeyboardAvoidingView, AsyncStorage, ActivityIndicator } from "react-native";
import {Container, Content, Form, Input, Item, Label, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";

function ForgetPass({navigation}) {


    const [phone, setPhone] = useState('');
    const [spinner, setSpinner] = useState(false);


    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(false)
        });
        setSpinner(false)
        return unsubscribe;
    }, [navigation, spinner]);


    function renderSubmit() {
        if (phone == '') {
            return (
                <View
                    style={[styles.mstardaBtn , styles.Width_100 , styles.marginTop_5 , {
                        backgroundColor:'#fff'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_green , styles.textSize_16]}>{ i18n.t('send') }</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => onConfirm()} style={[styles.mstardaBtn , styles.Width_100 , styles.marginTop_5]}>
                <Text style={[styles.textRegular , styles.text_green , styles.textSize_16]}>{ i18n.t('send') }</Text>
            </TouchableOpacity>
        );
    }

    function onConfirm() {
        // setSpinner(true);
        // dispatch(checkPhone(phone, lang, navigation));
        navigation.navigate('changePass');
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
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.marginTop_60 , {marginLeft:25}]}>
                    <Image source={require('../../assets/images/back.png')} style={[styles.icon25, styles.transform]} resizeMode={'contain'} />
                </TouchableOpacity>

                <View style={[styles.position_R , styles.bgFullWidth, styles.Width_100 , styles.paddingHorizontal_45]}>

                    <Image source={require('../../assets/images/logo.png')} style={[styles.icon160 , styles.marginBottom_80 , styles.SelfCenter , styles.marginTop_25]} resizeMode={'contain'} />

                    <KeyboardAvoidingView style={[styles.Width_100]}>
                        <Form style={[styles.Width_100 , styles.flexCenter]}>

                            <Item style={[styles.item]}>
                                <Label style={[styles.label, styles.textRegular ,styles.text_mstarda]}>{ i18n.t('phone') }</Label>
                                <Input style={[styles.input]}
                                       onChangeText={(phone) => setPhone(phone)}
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

export default ForgetPass;


