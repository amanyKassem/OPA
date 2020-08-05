import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions} from "react-native";
import {Container, Content, Card, Item, Label, Input, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useSelector} from "react-redux";
import Header from '../common/Header';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Profile({navigation}) {

    const [advNum, setAdvNum] = useState('0000000');
    const [adsNum, setAdsNum] = useState('50');
    const [phone, setPhone] = useState('01023456789');
    const [country, setCountry] = useState('المنصورة');

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <Header navigation={navigation} title={ i18n.t('profile') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.flexCenter ,{top:-50}]}>
                        <Image source={require('../../assets/images/pic_profile.png')} style={[styles.icon110,styles.Radius_15 ]} resizeMode={'cover'} />
                        <TouchableOpacity onPress={() => navigation.push('editProfile')} style={[styles.marginHorizontal_5 , styles.marginVertical_5,{position:'absolute' , bottom:35 , right:5}]}>
                            <Image source={require('../../assets/images/edit.png')} style={[styles.icon20]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <Text style={[styles.textRegular , styles.text_orange, styles.textSize_16, {marginTop:5}]}>أماني قاسم</Text>
                    </View>


                    <Form style={[styles.Width_80 , styles.flexCenter ,{top:-10}]}>

                        <Item style={[styles.item]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_mstarda , styles.text_light_gray , {backgroundColor:'#fff'}]}>{ i18n.t('advNum') }</Label>
                            <Input style={[styles.input , styles.text_black , {borderColor:COLORS.light_gray}]}
                                   onChangeText={(advNum) => setAdvNum(advNum)}
                                   keyboardType={'number-pad'}
                                   value={advNum}
                                   disabled={true}
                            />
                        </Item>

                        <Item style={[styles.item]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_mstarda , styles.text_light_gray , {backgroundColor:'#fff'}]}>{ i18n.t('adsNum') }</Label>
                            <Input style={[styles.input , styles.text_black , {borderColor:COLORS.light_gray}]}
                                   onChangeText={(adsNum) => setAdsNum(adsNum)}
                                   keyboardType={'number-pad'}
                                   value={adsNum}
                                   disabled={true}
                            />
                        </Item>

                        <Item style={[styles.item]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_mstarda , styles.text_light_gray , {backgroundColor:'#fff'}]}>{ i18n.t('phone') }</Label>
                            <Input style={[styles.input , styles.text_black , {borderColor:COLORS.light_gray}]}
                                   onChangeText={(phone) => setPhone(phone)}
                                   keyboardType={'number-pad'}
                                   value={phone}
                                   disabled={true}
                            />
                        </Item>

                        <Item style={[styles.item]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_mstarda , styles.text_light_gray , {backgroundColor:'#fff'}]}>{ i18n.t('country') }</Label>
                            <Input style={[styles.input , styles.text_black , {borderColor:COLORS.light_gray}]}
                                   onChangeText={(country) => setCountry(country)}
                                   value={country}
                                   disabled={true}
                            />
                        </Item>

                    </Form>

                    <TouchableOpacity onPress={() => navigation.push('editPass')} style={[styles.flexCenter , styles.marginBottom_10 , styles.marginTop_20]}>
                        <Text style={[styles.textRegular , styles.text_green , styles.textDecoration , styles.textSize_17]}>{ i18n.t('changePass') }</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.push('officeDoc')}  style={[styles.flexCenter]}>
                        <Text style={[styles.textRegular , styles.text_light_gray  , styles.textSize_16]}>{ i18n.t('officeDoc') } { i18n.t('?') }</Text>
                    </TouchableOpacity>

                </View>

            </Content>
        </Container>
    );
}

export default Profile;


