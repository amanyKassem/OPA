import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Linking, FlatList, I18nManager} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';
import Communications from "react-native-communications";
import StarRating from "react-native-star-rating";
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function AdvertiserDetails({navigation}) {

    const ads = [
        {id:'0' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
        {id:'1' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
        {id:'2' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
        {id:'3' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
    ];

    function Item({ title ,location , price , img , space , desc , id, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.push('listDetails')} style={[styles.notiCard ,styles.marginBottom_10,{ borderLeftColor: index % 2 === 0 ? COLORS.green : COLORS.orange}]}>
                <Image source={require("../../assets/images/homeImg.png")} style={[styles.width_120,styles.heightFull,styles.Radius_20,{left:-3}]} resizeMode={'cover'} />
                <View style={[styles.paddingHorizontal_5,styles.paddingVertical_5, {flex:1}]}>
                    <View style={[styles.directionRowSpace , styles.Width_100]}>
                        <Text style={[styles.textRegular , styles.text_black , styles.textSize_13]}>{ title }</Text>
                        <Text style={[styles.textRegular , styles.text_babyblue , styles.textSize_12 ]}>{ price }</Text>
                    </View>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12 ]}>{ space }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12 ]}>{ desc }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ,
                        {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' , flex:1}]}>{location}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('advertiserDetails') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_10,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionBasicRow,styles.Width_100]}>
                        <View style={[styles.borderGreen , styles.Radius_50, styles.icon50 ,{overflow:'hidden'}]}>
                            <Image source={require('../../assets/images/pic_profile.png')} style={[styles.Width_100 , styles.heightFull]} resizeMode={'cover'} />
                        </View>
                        <View style={[{marginLeft:10}]}>
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14]}>{ i18n.t('advertiserName') }</Text>
                            <TouchableOpacity onPress={() => Communications.phonecall('012365648569', true)}>
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14, styles.alignStart]}>012365648569</Text>
                            </TouchableOpacity>
                            <View style={[styles.width_80, styles.marginTop_5]}>
                                <StarRating
                                    disabled={true}
                                    maxStars={5}
                                    rating={3}
                                    fullStarColor={COLORS.mstarda}
                                    starSize={14}
                                    starStyle={styles.starStyle}
                                />
                            </View>
                            <TouchableOpacity onPress={() => Communications.phonecall('012365648569', true)} style={[styles.directionRow , styles.marginTop_5]}>
                                <Image source={require('../../assets/images/phone_gray.png')} style={[styles.icon15, {marginRight:5}]} resizeMode={'contain'} />
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14]}>012365648569</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Communications.email(['amany@gmail.com'],null,null,'My Subject','My body text')} style={[styles.directionRow , styles.marginTop_5]}>
                                <Image source={require('../../assets/images/mail_gray.png')} style={[styles.icon15, {marginRight:5}]} resizeMode={'contain'} />
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14]}>amany@gmail.com</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com')} style={[styles.directionRow , styles.marginTop_5]}>
                                <Image source={require('../../assets/images/twitter_gray.png')} style={[styles.icon15, {marginRight:5}]} resizeMode={'contain'} />
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14]}>twitter\aait</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.line , styles.marginVertical_20]}/>
                    <View>
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14]}>{ i18n.t('adsOwner') }</Text>

                        <View style={[styles.marginTop_20]}>

                            <FlatList
                                data={ads}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item , index}) => <Item
                                    title={item.title}
                                    location={item.location}
                                    price={item.price}
                                    space={item.space}
                                    desc={item.desc}
                                    id={item.id}
                                    index={index}
                                />}
                                keyExtractor={item => item.id}
                            />

                        </View>
                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default AdvertiserDetails;


