import React from "react";
import {View, Text, Image, TouchableOpacity, I18nManager} from "react-native";
import {Icon,} from 'native-base'
import styles from '../../assets/styles'
import COLORS from "../consts/colors";
import {useSelector} from "react-redux";

function Build({navigation , data , onToggleFavorite , isFav}) {

    // const user          = useSelector(state => state.auth.user ? state.auth.user.data :  {name: null});
    return (
        <TouchableOpacity onPress={() => navigation.navigate('adDetails')} style={[styles.notiCard ,styles.marginBottom_10,{ borderLeftColor: data.index % 2 === 0 ? COLORS.mstarda : COLORS.orange}]}>
            <Image source={{uri:data.image}} style={[styles.width_120,styles.heightFull,styles.Radius_20,{left:-3}]} resizeMode={'cover'} />
            <View style={[styles.paddingHorizontal_5,styles.paddingVertical_5, {flex:1}]}>
                <View style={[styles.directionRowSpace , styles.Width_100]}>
                    <Text style={[styles.textRegular , styles.text_black , styles.textSize_13]}>{ (data.title).substr(0,15) }</Text>
                    <View style={[styles.directionRow]}>
                        <Text style={[styles.textRegular , styles.text_babyblue , styles.textSize_12, {marginRight:40} ]}>{ data.price }</Text>
                        <TouchableOpacity onPress = {() => onToggleFavorite()} style={[styles.touchFav]}>
                            <Icon style={[isFav ? styles.text_red : styles.text_White, styles.textSize_18]} type="AntDesign" name={ 'heart' } />
                        </TouchableOpacity>
                    </View>
                </View>
                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ]}>{ data.space }</Text>
                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ]}>{ data.desc }</Text>
                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ,
                    {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' , flex:1}]}>{data.location}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default Build;


