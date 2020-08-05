import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions} from "react-native";
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Header({navigation , title , _pickImage}) {

    return (
        <View style={[styles.marginTop_35 , styles.marginHorizontal_15 , styles.directionRowSpace , styles.marginBottom_20]}>

            <View style={[styles.directionRow]}>
                {
                    title === i18n.t('home') || title === i18n.t('areas') || title === i18n.t('conversations') || title === i18n.t('myLocation') ?
                        <TouchableOpacity onPress={() => navigation.openDrawer()} style={{marginRight:10}}>
                            <Image source={require('../../assets/images/menu.png')} style={[styles.icon25 , styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                        :
                        <TouchableOpacity onPress={() => navigation.goBack()} style={{marginRight:10}}>
                            <Image source={require('../../assets/images/back.png')} style={[styles.icon20 , styles.transform]} resizeMode={'contain'} />
                        </TouchableOpacity>
                }

                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{title}</Text>
            </View>

            {
                title === i18n.t('home') || title === i18n.t('areas') || title === i18n.t('conversations') || title === i18n.t('myLocation') ?
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
                    title === i18n.t('officeDoc') ?
                        <TouchableOpacity onPress={_pickImage} style={[styles.icon33, {right:-15}]}>
                            <Image source={require('../../assets/images/add_pic.png')} style={[styles.Width_100 , styles.heightFull]} resizeMode={'contain'} />
                        </TouchableOpacity>                        :
                        null
            }

        </View>
    );
}

export default Header;


