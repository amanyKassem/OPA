import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator ,KeyboardAvoidingView} from "react-native";
import {Container, Content, Card, Item, Label, Input, Form, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {changePass} from '../actions';
import Header from '../common/Header';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function EditPass({navigation}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);

    const [isSubmitted, setIsSubmitted] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newpass, setNewpass] = useState('');
    const [confirmNewPass, setConfirmNewPass] = useState('');

    const dispatch = useDispatch();

    useEffect(() => {
        setIsSubmitted(false)
    }, [isSubmitted]);

    function renderConfirm(){
        if (currentPassword == '' || newpass == '' || confirmNewPass == ''){
            return (
                <View style={[styles.babyblueBtn , styles.Width_100, styles.marginBottom_50, {
                    backgroundColor:'#bbb'
                } ]}>
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>
                </View>
            );
        }
        if (isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginBottom_50]}>
                    <ActivityIndicator size="large" color={COLORS.babyblue} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={() => onConfirm()} style={[styles.babyblueBtn , styles.Width_100, styles.marginBottom_50 ]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>
            </TouchableOpacity>

        );
    }

    function onConfirm(){

        if (confirmNewPass.length < 6){
            Toast.show({
                text        : i18n.t('passreq'),
                type        : "danger",
                duration    : 3000,
                textStyle   : {
                    color       : "white",
                    fontFamily  : 'cairo',
                    textAlign   : 'center'
                }
            });
            return false
        }else if(newpass !== confirmNewPass){
            Toast.show({
                text        : i18n.t('passError'),
                type        : "danger",
                duration    : 3000,
                textStyle   : {
                    color       : "white",
                    fontFamily  : 'cairo',
                    textAlign   : 'center'
                }
            });
            return false
        } else {
            setIsSubmitted(true)
            dispatch(changePass(lang , currentPassword , confirmNewPass , token , navigation));
        }
    }


    return (
         <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('changePass') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>


                    <KeyboardAvoidingView style={[styles.Width_80, styles.flexCenter ,{flex:1}]}>
                        <Form style={[styles.Width_100 , styles.directionColumnSpace ,{flex:1}]}>

                            <View style={[styles.Width_100]}>
                                <View style={[styles.Width_100]}>
                                    <Item style={[styles.item]}>
                                        <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('currentPassword') }</Label>
                                        <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                               onChangeText={(currentPassword) => setCurrentPassword(currentPassword)}
                                               secureTextEntry
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.Width_100]}>
                                    <Item style={[styles.item]}>
                                        <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('newpass') }</Label>
                                        <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                               onChangeText={(newpass) => setNewpass(newpass)}
                                               secureTextEntry
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.Width_100]}>
                                    <Item style={[styles.item]}>
                                        <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('confirmNewPass') }</Label>
                                        <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                               onChangeText={(confirmNewPass) => setConfirmNewPass(confirmNewPass)}
                                               secureTextEntry
                                        />
                                    </Item>
                                </View>

                            </View>


                            {renderConfirm()}

                        </Form>
                    </KeyboardAvoidingView>


                </View>

            </Content>
        </Container>
    );
}

export default EditPass;


