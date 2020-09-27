import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Linking,ActivityIndicator} from "react-native";
import {Container, Content, Card, Form, Item, Label, Input, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector, useDispatch} from 'react-redux';
import {getContactUs, sendComplaint} from '../actions';
import Communications from 'react-native-communications';
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function SocialMedia({navigation}) {

    const token = useSelector(state => state.auth.user.data.token);
    const lang = useSelector(state => state.lang.lang);
    const contact = useSelector(state => state.contact.contact);
    const loader = useSelector(state => state.contact.loader);

    const dispatch = useDispatch();


    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [complaintText, setComplaintText] = useState('');



    function sendComp(){
        dispatch(sendComplaint(lang , complaintText , username , email , token))
        setComplaintText('')
        setUsername('')
        setEmail('')
    }

    function fetchData(){
        dispatch(getContactUs(lang,token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , loader]);


    function renderLoader(){
        if (loader === false){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.babyblue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    return (
        <Container>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('socialMedia2') }/>

                {
                    contact ?
                        <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                            styles.Width_100, styles.paddingTop_30,
                            {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                            <View style={[styles.Width_80 , styles.flexCenter ]}>

                                <TouchableOpacity onPress={() => Communications.phonecall(contact.phone, true)} style={[styles.item]}>
                                    <Text style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('phone') }</Text>
                                    <View style={[styles.viewInput, {borderColor:COLORS.midGray, justifyContent:'center'}]}>
                                        <Text style={[styles.textRegular ,styles.text_midGray, styles.textSize_14,styles.alignStart]}>{contact.phone}</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity onPress={() => Communications.email([contact.email],null,null,'My Subject','My body text')} style={[styles.item]}>
                                    <Text style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('mail') }</Text>
                                    <View style={[styles.viewInput, {borderColor:COLORS.midGray, justifyContent:'center'}]}>
                                        <Text style={[styles.textRegular ,styles.text_midGray, styles.textSize_14,styles.alignStart]}>{contact.email}</Text>
                                    </View>
                                </TouchableOpacity>

                                <TouchableOpacity style={[styles.item]}>
                                    <Text style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('address') }</Text>
                                    <View style={[styles.viewInput, {borderColor:COLORS.midGray, justifyContent:'center'}]}>
                                        <Text style={[styles.textRegular ,styles.text_midGray, styles.textSize_14,styles.alignStart]}>{contact.address}</Text>
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

                                <TouchableOpacity onPress={() => sendComp()} style={[styles.babyblueBtn, styles.Width_100,styles.flexCenter]}>
                                    <Text style={[styles.textRegular , styles.text_White  , styles.textSize_16]}>{ i18n.t('send') }</Text>
                                </TouchableOpacity>

                                <View style={[styles.directionRow , styles.flexCenter , styles.marginVertical_25]}>
                                    {
                                        contact.socials?
                                            contact.socials.map((soc, i) => {
                                                return (
                                                    <TouchableOpacity key={i} onPress={() => Linking.openURL(soc.url)}>
                                                        <Image source={{uri:soc.icon}} style={[styles.icon40,{marginLeft:15}]} resizeMode={'contain'} />
                                                    </TouchableOpacity>
                                                )
                                            })
                                            :
                                            null
                                    }

                                </View>

                            </View>

                        </View>
                        :
                        null
                }

            </Content>
        </Container>
    );
}

export default SocialMedia;


