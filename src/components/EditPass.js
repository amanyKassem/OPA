import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager ,KeyboardAvoidingView} from "react-native";
import {Container, Content, Card, Item, Label, Input, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useSelector} from "react-redux";
import Header from '../common/Header';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function EditPass({navigation}) {

    const [currentPassword, setCurrentPassword] = useState('');
    const [newpass, setNewpass] = useState('');
    const [confirmNewPass, setConfirmNewPass] = useState('');

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <Header navigation={navigation} title={ i18n.t('changePass') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>


                    <KeyboardAvoidingView style={[styles.Width_80, styles.flexCenter ,{flex:1}]}>
                        <Form style={[styles.Width_100 , styles.directionColumnSpace ,{flex:1}]}>

                            <View style={[styles.Width_100]}>
                                <View style={[styles.Width_100]}>
                                    <Item style={[styles.item]}>
                                        <Label style={[styles.label, styles.textRegular ,styles.text_mstarda , styles.text_light_gray , {backgroundColor:'#fff'}]}>{ i18n.t('currentPassword') }</Label>
                                        <Input style={[styles.input , styles.text_black , {borderColor:COLORS.light_gray}]}
                                               onChangeText={(currentPassword) => setCurrentPassword(currentPassword)}
                                               secureTextEntry
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.Width_100]}>
                                    <Item style={[styles.item]}>
                                        <Label style={[styles.label, styles.textRegular ,styles.text_mstarda , styles.text_light_gray , {backgroundColor:'#fff'}]}>{ i18n.t('newpass') }</Label>
                                        <Input style={[styles.input , styles.text_black , {borderColor:COLORS.light_gray}]}
                                               onChangeText={(newpass) => setNewpass(newpass)}
                                               secureTextEntry
                                        />
                                    </Item>
                                </View>

                                <View style={[styles.Width_100]}>
                                    <Item style={[styles.item]}>
                                        <Label style={[styles.label, styles.textRegular ,styles.text_mstarda , styles.text_light_gray , {backgroundColor:'#fff'}]}>{ i18n.t('confirmNewPass') }</Label>
                                        <Input style={[styles.input , styles.text_black , {borderColor:COLORS.light_gray}]}
                                               onChangeText={(confirmNewPass) => setConfirmNewPass(confirmNewPass)}
                                               secureTextEntry
                                        />
                                    </Item>
                                </View>

                            </View>


                            <TouchableOpacity onPress={() => navigation.navigate('profile')} style={[styles.mstardaBtn , styles.Width_100, styles.marginBottom_50 , {backgroundColor:COLORS.green}]}>
                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>
                            </TouchableOpacity>

                        </Form>
                    </KeyboardAvoidingView>


                </View>

            </Content>
        </Container>
    );
}

export default EditPass;


