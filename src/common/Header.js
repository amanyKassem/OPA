import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions} from "react-native";
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Header({navigation , title , toggleModal}) {

    return (
        <View style={[styles.marginTop_35 , styles.marginHorizontal_15 , styles.directionRowSpace , styles.marginBottom_20]}>

            <View style={[styles.directionRow]}>
                {
                    title === i18n.t('home') || title === i18n.t('searchByList') || title === i18n.t('conversations') || title === i18n.t('contracting') ?
                        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{marginRight:15}}>
                            <Image source={require('../../assets/images/menu.png')} style={[styles.icon25 , styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight:15}}>
                            <Image source={require('../../assets/images/back.png')} style={[styles.icon20 , styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                }

                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{title}</Text>
            </View>

            {
                title === i18n.t('home') || title === i18n.t('searchByList') || title === i18n.t('conversations') || title === i18n.t('contracting') ?
                    <View style={[styles.directionRow]}>
                        <TouchableOpacity onPress={() => navigation.navigate('notifications')} style={{marginRight:10}}>
                            <Image source={require('../../assets/images/notification.png')} style={[styles.icon20]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate('tabs', {
                            screen: 'profile'
                        })}
                                          style={[styles.borderMstarda , styles.Radius_50, styles.icon40 ,{overflow:'hidden'}]}>
                            <Image source={require('../../assets/images/pic_profile.png')} style={[styles.Width_100 , styles.heightFull]} resizeMode={'cover'} />
                        </TouchableOpacity>
                    </View>
                    :
                    title === i18n.t('addOrder') ?
                        <TouchableOpacity onPress={() => navigation.navigate('orders')} style={{marginRight:20}}>
                            <Image source={require('../../assets/images/notification.png')} style={[styles.icon20]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        :
                        title === i18n.t('adDetails') ?
                            <View style={[styles.directionRow]}>
                                <TouchableOpacity onPress={toggleModal} style={{marginRight:10}}>
                                    <Image source={require('../../assets/images/delete.png')} style={[styles.icon20]} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('editAd')} >
                                    <Image source={require('../../assets/images/edit.png')} style={[styles.icon20]} resizeMode={'contain'} />
                                </TouchableOpacity>
                            </View>
                            :

                            title === i18n.t('orders') ?
                                <TouchableOpacity onPress={() => navigation.navigate('addOrder')} style={{right:-15}}>
                                    <Image source={require('../../assets/images/plus_circle.png')} style={[styles.icon35]} resizeMode={'contain'} />
                                </TouchableOpacity>
                                :
                                null
            }

        </View>
    );
}

export default Header;


