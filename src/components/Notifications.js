import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager ,FlatList} from "react-native";
import {Container, Content, Card, Item, Label, Input, Form, Icon} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import {useSelector} from "react-redux";
import Header from '../common/Header';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Notifications({navigation}) {

    const notifications = [
        {id:'0' , title:'اوامر الشبكة' , body:'تم العثور علي طلب مطابق' , time:'03:00'},
        {id:'1' , title:'اوامر الشبكة' , body:'تم العثور علي طلب مطابق تم العثور علي طلب مطابق تم العثور علي طلب مطابق' , time:'03:00'},
        {id:'2' , title:'اوامر الشبكة' , body:'تم العثور علي طلب مطابق' , time:'03:00'},
        {id:'3' , title:'اوامر الشبكة' , body:'تم العثور علي طلب مطابق' , time:'03:00'},
        {id:'4' , title:'اوامر الشبكة' , body:'تم العثور علي طلب مطابق' , time:'03:00'},
        {id:'5' , title:'اوامر الشبكة' , body:'تم العثور علي طلب مطابق' , time:'03:00'},
    ];

    function Item({ title ,body , time , id, index }) {
        return (
            <TouchableOpacity style={[styles.notiCard ,styles.marginBottom_10,{ borderLeftColor: index % 2 === 0 ? COLORS.green : COLORS.orange}]}>
                <View style={[styles.paddingHorizontal_15 , styles.directionColumnC, {flex:1}]}>
                    <TouchableOpacity style={[styles.paddingVertical_5 , styles.paddingHorizontal_5, styles.Radius_50
                        , {backgroundColor: index % 2 === 0 ? COLORS.green : COLORS.orange
                            , position:'absolute' , right:7 , top:7}]}>
                        <Image source={require('../../assets/images/delete.png')} style={[styles.icon20]} resizeMode={'contain'} />
                    </TouchableOpacity>
                    <Text style={[styles.textBold , styles.text_gray , styles.textSize_14,styles.marginBottom_5]}>{ title }</Text>
                    <View style={[styles.directionRowSpace]}>
                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, styles.alignStart ,
                            {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' , flex:1}]}>{body}</Text>
                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13 , styles.width_40 ]}>{ time }</Text>
                    </View>
                </View>
            </TouchableOpacity>
        );
    }

    return (
        <Container>
            <Content scrollEnabled={false} contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <Header navigation={navigation} title={ i18n.t('notifications') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_20,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[{height:height - 115}]}>

                        <FlatList
                            data={notifications}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item , index}) => <Item
                                title={item.title}
                                body={item.body}
                                time={item.time}
                                id={item.id}
                                index={index}
                            />}
                            keyExtractor={item => item.id}
                        />

                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default Notifications;


