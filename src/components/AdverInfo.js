import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager ,KeyboardAvoidingView} from "react-native";
import {Container, Content, Textarea, Item, Label, Input, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useSelector} from "react-redux";
import Header from '../common/Header';
import RNPickerSelect from "./EditProfile";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function AdverInfo({navigation}) {

    const [facebook, setFacebook] = useState('');
    const [twitter, setTwitter] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [details, setDetails] = useState('');

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('adverInfo') } />

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_35 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <Text style={[styles.textRegular , styles.text_babyblue, styles.textSize_15, styles.marginBottom_20, styles.alignStart]}>{ i18n.t('socialMedia') }</Text>

                    <KeyboardAvoidingView style={[styles.Width_100, styles.flexCenter , {flex:1}]}>
                        <Form style={[styles.Width_100 , styles.directionColumnSpace , {flex:1}]}>

                            <View style={[styles.Width_100]}>
                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('facebook') }</Label>
                                    <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                           onChangeText={(facebook) => setFacebook(facebook)}
                                           value={facebook}
                                    />
                                </Item>
                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('twitter') }</Label>
                                    <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                           onChangeText={(twitter) => setTwitter(twitter)}
                                           value={twitter}
                                    />
                                </Item>

                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('phone') }</Label>
                                    <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                           onChangeText={(phone) => setPhone(phone)}
                                           keyboardType={'number-pad'}
                                           value={phone}
                                    />
                                </Item>

                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('email') }</Label>
                                    <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                           onChangeText={(email) => setEmail(email)}
                                           keyboardType={'email-address'}
                                           value={email}
                                    />
                                </Item>

                               <View style={[styles.marginBottom_35]}>
                                   <Label style={[styles.label ,styles.textRegular ,styles.text_midGray, {backgroundColor:'#fff'}]}>{ i18n.t('moreDet') }</Label>
                                   <Textarea
                                       style={[styles.input, styles.height_120,styles.paddingVertical_20, styles.text_midGray, {borderColor:COLORS.midGray}]}
                                       onChangeText={(details) => setDetails(details)}
                                       value={details}
                                   />
                               </View>

                            </View>


                            <TouchableOpacity onPress={() => navigation.navigate('profile')} style={[styles.babyblueBtn , styles.Width_100, styles.marginBottom_30 ]}>
                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('agree') }</Text>
                            </TouchableOpacity>

                        </Form>
                    </KeyboardAvoidingView>
                </View>

            </Content>
        </Container>
    );
}

export default AdverInfo;


