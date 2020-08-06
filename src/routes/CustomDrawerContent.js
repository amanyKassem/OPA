import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {chooseLang} from "../actions";
import {DrawerContentScrollView, DrawerItem} from "@react-navigation/drawer";
import styles from "../../assets/styles";
import {Dimensions, I18nManager, Image, Text, TouchableOpacity, View} from "react-native";
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
const height = Dimensions.get('window').height;

export default function CustomDrawerContent(props) {

    const lang  = useSelector(state => state.lang.lang);

    function onChooseLang(language){
        if(language !== lang){
            dispatch(chooseLang(language))
        }
    }
    // const auth = useSelector(state => state.auth);
    // const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);

    const dispatch  = useDispatch();
    //
    // function logoutFunc(){
    //     dispatch(logout(lang , token));
    //     dispatch(tempAuth(token));
    // }

    return (
        <DrawerContentScrollView {...props} style={[styles.bg_gray]}>
            <View style={[styles.paddingHorizontal_15 , styles.Width_100 , styles.paddingVertical_10 , {zIndex:-1}]}>
                <View style={[styles.directionRow , styles.flexCenter]}>
                    <TouchableOpacity onPress={() => onChooseLang('ar')}>
                        <Text style={[styles.textRegular , lang === 'ar' ? styles.text_mstarda : styles.text_White , lang === 'ar' ? styles.textDecoration : null , styles.textSize_14]}>العربية</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => onChooseLang('en')} style={{marginLeft:15}}>
                        <Text style={[styles.textRegular , lang === 'en' ? styles.text_mstarda : styles.text_White , lang === 'en' ? styles.textDecoration : null , styles.textSize_14]}>English</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => props.navigation.closeDrawer()} style={[{position:'absolute' , right:15, top:10}]}>
                    <Image source={require('../../assets/images/close.png')} style={[styles.icon20]} resizeMode={'contain'} />
                </TouchableOpacity>
            </View>

            <View style={[styles.bgFullWidth,styles.bg_White, styles.paddingTop_30, styles.paddingHorizontal_10,
                {borderTopRightRadius:50 , borderTopLeftRadius:50 , height:height-73 }]}>

                <View style={[styles.bg_gray , { width:56 ,  position:'absolute',left:0 , top:0,bottom:0}]}/>

                <TouchableOpacity  onPress={() => props.navigation.navigate('tabs', {screen: 'profile'})}
                                   style={[styles.flexCenter ,{ position:'absolute' ,top:-40 , left:15}]}>
                    <Image source={require('../../assets/images/pic_profile.png')}
                           style={[styles.icon80,styles.Radius_15 ,{ borderWidth:5 , borderColor:'#fff'}]} resizeMode={'cover'} />
                    <TouchableOpacity onPress={() => props.navigation.navigate('editProfile')} style={[styles.marginHorizontal_5 , styles.marginVertical_5,{position:'absolute' , bottom:35 , left:5}]}>
                        <Image source={require('../../assets/images/edit.png')} style={[styles.icon20]} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <Text style={[styles.textRegular , styles.text_babyblue, styles.textSize_15, {marginTop:5}]}>أماني قاسم</Text>
                </TouchableOpacity>

                <DrawerItem
                    style={[styles.marginTop_65 , styles.height_40 , styles.justifyCenter , {marginHorizontal:0 }]}
                    label={
                        ({ focused, color }) => {
                            return (
                                <Text style={[styles.textRegular, styles.text_black , styles.textSize_15, styles.alignStart , {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{ i18n.t('home') }</Text>
                            )
                        }
                    }
                    icon={
                        ({ focused, color }) => {
                            return (
                                <Image source={require('../../assets/images/menu_home.png')} style={[styles.icon20]} resizeMode={'contain'} />
                            )
                        }
                    }
                    onPress={() => props.navigation.navigate('tabs', {
                        screen: 'homeStack'
                    })}
                />

                <DrawerItem
                    style={[styles.height_40 , styles.justifyCenter ,{marginHorizontal:0 , marginTop:10}]}
                    label={
                        ({ focused, color }) => {
                            return (
                                <Text style={[styles.textRegular, styles.text_black , styles.textSize_15, styles.alignStart , {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{ i18n.t('myAds') }</Text>
                            )
                        }
                    }
                    icon={
                        ({ focused, color }) => {
                            return (
                                <Image source={require('../../assets/images/white_ads.png')} style={[styles.icon20]} resizeMode={'contain'} />
                            )
                        }
                    }
                    onPress={() => props.navigation.navigate('myAds')}
                />

                <DrawerItem
                    style={[styles.height_40 , styles.justifyCenter ,{marginHorizontal:0 , marginTop:10}]}
                    label={
                        ({ focused, color }) => {
                            return (
                                <Text style={[styles.textRegular, styles.text_black , styles.textSize_15, styles.alignStart , {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{ i18n.t('favourite') }</Text>
                            )
                        }
                    }
                    icon={
                        ({ focused, color }) => {
                            return (
                                <Image source={require('../../assets/images/menu_fav.png')} style={[styles.icon20]} resizeMode={'contain'} />
                            )
                        }
                    }
                    onPress={() => props.navigation.navigate('favourite')}
                />

                <DrawerItem
                    style={[styles.height_40 , styles.justifyCenter ,{marginHorizontal:0 , marginTop:10}]}
                    label={
                        ({ focused, color }) => {
                            return (
                                <Text style={[styles.textRegular, styles.text_black , styles.textSize_15, styles.alignStart , {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{ i18n.t('addUrAd') }</Text>
                            )
                        }
                    }
                    icon={
                        ({ focused, color }) => {
                            return (
                                <Image source={require('../../assets/images/add_menu.png')} style={[styles.icon20]} resizeMode={'contain'} />
                            )
                        }
                    }
                    onPress={() => props.navigation.navigate('addAdTerms')}
                />

                <DrawerItem
                    style={[styles.height_40 , styles.justifyCenter ,{marginHorizontal:0 , marginTop:10}]}
                    label={
                        ({ focused, color }) => {
                            return (
                                <Text style={[styles.textRegular, styles.text_black , styles.textSize_15, styles.alignStart , {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{ i18n.t('aboutApp') }</Text>
                            )
                        }
                    }
                    icon={
                        ({ focused, color }) => {
                            return (
                                <Image source={require('../../assets/images/information_menu.png')} style={[styles.icon23]} resizeMode={'contain'} />
                            )
                        }
                    }
                    onPress={() => props.navigation.navigate('aboutApp')}
                />

                <DrawerItem
                    style={[styles.height_40 , styles.justifyCenter ,{marginHorizontal:0 , marginTop:10}]}
                    label={
                        ({ focused, color }) => {
                            return (
                                <Text style={[styles.textRegular, styles.text_black , styles.textSize_15, styles.alignStart , {writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{ i18n.t('contactUs') }</Text>
                            )
                        }
                    }
                    icon={
                        ({ focused, color }) => {
                            return (
                                <Image source={require('../../assets/images/Contacts_menu_white.png')} style={[styles.icon23]} resizeMode={'contain'} />
                            )
                        }
                    }
                    onPress={() => props.navigation.navigate('contactUs')}
                />

                <TouchableOpacity style={[styles.babyblueBtn ,{
                    position:'absolute',
                    transform: [{ rotate: '90deg' }],
                    right:-63,
                    width:'50%',
                    bottom:62,
                }]}>
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('logout') }</Text>
                </TouchableOpacity>

            </View>
        </DrawerContentScrollView>
    );
}