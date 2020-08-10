import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Vibration,
    I18nManager,
    FlatList
} from "react-native";
import {Container, Content, Card, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function SearchByList({navigation}) {

    const [search, setSearch] = useState('');

    const ads = [
        {id:'0' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
        {id:'1' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
        {id:'2' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
        {id:'3' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
        {id:'4' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
        {id:'5' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
    ];

    function Item({ title ,location , price , img , space , desc , id, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.navigate('adDetails')} style={[styles.notiCard ,styles.marginBottom_10,{ borderLeftColor: index % 2 === 0 ? COLORS.green : COLORS.orange}]}>
                <Image source={require("../../assets/images/homeImg.png")} style={[styles.width_120,styles.heightFull,styles.Radius_20,{left:-3}]} resizeMode={'cover'} />
                <View style={[styles.paddingHorizontal_5,styles.paddingVertical_5, {flex:1}]}>
                    <View style={[styles.directionRowSpace , styles.Width_100]}>
                        <Text style={[styles.textRegular , styles.text_green , styles.textSize_13]}>{ title }</Text>
                        <Text style={[styles.textRegular , styles.text_orange , styles.textSize_12 ]}>{ price }</Text>
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
            <Content scrollEnabled={false} contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('searchByList') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                   <View>
                       <Input style={[styles.inputSearch , styles.Width_100, styles.bg_White , {flex:0}]}
                              placeholder={i18n.t('search')}
                              placeholderTextColor={COLORS.lightGray}
                              onChangeText={(search) => setSearch(search)}
                              value={search}
                       />
                   </View>

                    <View style={[{height:height - 250} , styles.marginTop_10]}>

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

            </Content>
        </Container>
    );
}

export default SearchByList;


