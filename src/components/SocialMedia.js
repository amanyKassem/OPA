import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Linking} from "react-native";
import {Container, Content, Card, Form, Item, Label, Input, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Communications from 'react-native-communications';
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function SocialMedia({navigation}) {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [complaintText, setComplaintText] = useState('');

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('socialMedia2') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.Width_80 , styles.flexCenter ]}>

                        <TouchableOpacity onPress={() => Communications.phonecall('01023456789', true)} style={[styles.item]}>
                            <Text style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('phone') }</Text>
                            <View style={[styles.viewInput, {borderColor:COLORS.midGray, justifyContent:'center'}]}>
                                <Text style={[styles.textRegular ,styles.text_midGray, styles.textSize_14,styles.alignStart]}>01023456789</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => Communications.email(['amany@gmail.com'],null,null,'My Subject','My body text')} style={[styles.item]}>
                            <Text style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('mail') }</Text>
                            <View style={[styles.viewInput, {borderColor:COLORS.midGray, justifyContent:'center'}]}>
                                <Text style={[styles.textRegular ,styles.text_midGray, styles.textSize_14,styles.alignStart]}>amany@gmail.com</Text>
                            </View>
                        </TouchableOpacity>

                        <TouchableOpacity style={[styles.item]}>
                            <Text style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('address') }</Text>
                            <View style={[styles.viewInput, {borderColor:COLORS.midGray, justifyContent:'center'}]}>
                                <Text style={[styles.textRegular ,styles.text_midGray, styles.textSize_14,styles.alignStart]}>السعوديه - الرياض</Text>
                            </View>
                        </TouchableOpacity>

                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_16 , styles.marginBottom_20 , styles.alignStart]}>-- { i18n.t('complaint') }</Text>

                        <Form style={[styles.Width_100]}>

                            <Item style={[styles.item , styles.marginBottom_15]}>
                                <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                       placeholder={i18n.t('username')}
                                       placeholderTextColor={COLORS.lightGray}
                                       onChangeText={(username) => setUsername(username)}
                                       value={username}
                                />
                            </Item>

                            <Item style={[styles.item , styles.marginBottom_15]}>
                                <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                       placeholder={i18n.t('mail')}
                                       placeholderTextColor={COLORS.lightGray}
                                       onChangeText={(email) => setEmail(email)}
                                       keyboardType={'email-address'}
                                       value={email}
                                />
                            </Item>

                            <View style={[styles.marginBottom_15]}>
                                <Textarea
                                    style={[styles.input, styles.height_100,styles.paddingVertical_5, styles.text_midGray, {borderColor:COLORS.midGray}]}
                                    onChangeText={(complaintText) => setComplaintText(complaintText)}
                                    value={complaintText}
                                    placeholder={i18n.t('complaintText')}
                                    placeholderTextColor={COLORS.lightGray}
                                />
                            </View>


                        </Form>

                        <TouchableOpacity style={[styles.babyblueBtn, styles.Width_100,styles.flexCenter]}>
                            <Text style={[styles.textRegular , styles.text_White  , styles.textSize_16]}>{ i18n.t('send') }</Text>
                        </TouchableOpacity>

                        <View style={[styles.directionRow , styles.flexCenter , styles.marginVertical_25]}>
                            <TouchableOpacity onPress={() => Linking.openURL('https://facebook.com')}>
                                <Image source={require('../../assets/images/facebook.png')} style={[styles.icon40]} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com')}>
                                <Image source={require('../../assets/images/twitter.png')} style={[styles.icon40,{marginLeft:15}]} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL('https://instagram.com')}>
                                <Image source={require('../../assets/images/insta.png')} style={[styles.icon40,{marginLeft:15}]} resizeMode={'contain'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL('https://api.whatsapp.com/send?phone='+'0123654878')}>
                                <Image source={require('../../assets/images/whatsup.png')} style={[styles.icon40,{marginLeft:15}]} resizeMode={'contain'} />
                            </TouchableOpacity>
                        </View>

                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default SocialMedia;


