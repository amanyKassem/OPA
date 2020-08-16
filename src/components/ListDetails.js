import React , {useEffect,useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Share,
    I18nManager,
    FlatList
} from "react-native";
import {Container, Content, Card, Icon} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';
import Swiper from 'react-native-swiper';
import COLORS from "../consts/colors";
import StarRating from "react-native-star-rating";
import Communications from 'react-native-communications';
import  Modal  from "react-native-modal";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function ListDetails({navigation}) {
    const [tabType, setTabType] = useState('0');

    const [isFav, setIsFav] = useState(false);

    function onToggleFavorite(id) {
        setIsFav(!isFav)
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'Msara App',
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

    const ads = [
        {id:'0' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
        {id:'1' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
        {id:'2' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
    ];

    function Item({ title ,location , price , img , space , desc , id, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.push('listDetails')} style={[styles.notiCard ,styles.marginBottom_10,{ borderLeftColor: index % 2 === 0 ? COLORS.green : COLORS.orange}]}>
                <Image source={require("../../assets/images/homeImg.png")} style={[styles.width_120,styles.heightFull,styles.Radius_20,{left:-3}]} resizeMode={'cover'} />
                <View style={[styles.paddingHorizontal_10,styles.paddingVertical_5, {flex:1}]}>
                    <View style={[styles.directionRowSpace , styles.Width_100]}>
                        <Text style={[styles.textRegular , styles.text_black , styles.textSize_13]}>{ title }</Text>
                        <Text style={[styles.textRegular , styles.text_babyblue , styles.textSize_12 ]}>{ price }</Text>
                    </View>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ]}>{ space }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ]}>{ desc }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ,
                        {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' , flex:1}]}>{location}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    const similarAds = [
        {id:'0' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
        {id:'1' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
        {id:'2' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
    ];

    function ItemSimilarAds({ title ,location , price , img , space , desc , id, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.push('listDetails')} style={[styles.notiCard ,styles.marginBottom_10,{ borderLeftColor: index % 2 === 0 ? COLORS.green : COLORS.orange}]}>
                <Image source={require("../../assets/images/homeImg.png")} style={[styles.width_120,styles.heightFull,styles.Radius_20,{left:-3}]} resizeMode={'cover'} />
                <View style={[styles.paddingHorizontal_10,styles.paddingVertical_5, {flex:1}]}>
                    <View style={[styles.directionRowSpace , styles.Width_100]}>
                        <Text style={[styles.textRegular , styles.text_black , styles.textSize_13]}>{ title }</Text>
                        <Text style={[styles.textRegular , styles.text_babyblue , styles.textSize_12 ]}>{ price }</Text>
                    </View>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ]}>{ space }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ]}>{ desc }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ,
                        {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' , flex:1}]}>{location}</Text>
                </View>
            </TouchableOpacity>
        );
    }



    function changeTab(type){
        setTabType(type);
    }

    function renderTabData(){
        if(tabType === '0'){
            return(
                <View style={[{top:-30}]}>
                    <View style={[styles.directionRowSpace , styles.paddingHorizontal_15 ,styles.marginTop_5,
                        styles.Width_100,{backgroundColor:'#f1f1f1', padding:5}]}>
                        <View style={[styles.directionRow, {flex:1}]}>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, {marginRight:10} ]}>{ i18n.t('category') }</Text>
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13 ]}>عوائل</Text>
                        </View>
                        <View style={[styles.directionRow, {flex:1}]}>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, {marginRight:10} ]}>{ i18n.t('floor') }</Text>
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13 ]}>علوي</Text>
                        </View>
                        <View style={[styles.directionRow, {flex:1}]}>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, {marginRight:10} ]}>{ i18n.t('age') }</Text>
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13 ]}>5 سنين</Text>
                        </View>
                    </View>
                    <View style={[styles.directionRowSpace , styles.paddingHorizontal_15 ,styles.marginTop_5,
                        styles.Width_100,{padding:5}]}>
                        <View style={[styles.directionRow, {flex:1}]}>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, {marginRight:10} ]}>{ i18n.t('rooms') }</Text>
                            <Image source={require('../../assets/images/bed.png')} style={[styles.icon20, {marginRight:5}]} resizeMode={'contain'} />
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13 ]}>2</Text>
                        </View>
                        <View style={[styles.directionRow, {flex:1}]}>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, {marginRight:10} ]}>{ i18n.t('lounge') }</Text>
                            <Image source={require('../../assets/images/chair.png')} style={[styles.icon20, {marginRight:5}]} resizeMode={'contain'} />
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13 ]}>1</Text>
                        </View>
                        <View style={[styles.directionRow, {flex:1}]}>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, {marginRight:10} ]}>{ i18n.t('bathroom') }</Text>
                            <Image source={require('../../assets/images/bathtub.png')} style={[styles.icon20, {marginRight:5}]} resizeMode={'contain'} />
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13 ]}>1</Text>
                        </View>
                    </View>
                    <View style={[styles.directionRowSpace , styles.paddingHorizontal_15 ,styles.marginTop_5,
                        styles.Width_100,{backgroundColor:'#f1f1f1', padding:5}]}>
                        <View style={[styles.directionRow, {flex:1}]}>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, {marginRight:10} ]}>{ i18n.t('conditioner') }</Text>
                            <Image source={require('../../assets/images/air_conditioner.png')} style={[styles.icon20, {marginRight:5}]} resizeMode={'contain'} />
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13 ]}>2</Text>
                        </View>
                        <View style={[styles.directionRow, {flex:1}]}>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, {marginRight:10} ]}>{ i18n.t('kitchen') }</Text>
                            <Image source={require('../../assets/images/chef.png')} style={[styles.icon20, {marginRight:5}]} resizeMode={'contain'} />
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13 ]}>1</Text>
                        </View>
                        <View style={[styles.directionRow, {flex:1}]}>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, {marginRight:10} ]}>{ i18n.t('elevator') }</Text>
                            <Image source={require('../../assets/images/elevator_ray.png')} style={[styles.icon20, {marginRight:5}]} resizeMode={'contain'} />
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13 ]}>1</Text>
                        </View>
                    </View>
                    <View style={[styles.directionRow, styles.marginTop_10, styles.paddingHorizontal_15]}>
                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, {marginRight:10} ]}>{ i18n.t('adNumber') }</Text>
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13]}>1235</Text>
                    </View>
                    <View style={[styles.marginTop_10, styles.paddingHorizontal_15]}>
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13,styles.alignStart]}>{ i18n.t('apartSpec') }</Text>
                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart,{lineHeight:20,writingDirection:I18nManager.isRTL ?'rtl':'ltr'}]}>
                            نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص
                            نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص
                        </Text>
                    </View>
                </View>
            )
        } else if(tabType === '1'){
            return(
                <View style={[{top:-15}]}>
                    <TouchableOpacity onPress={() => navigation.navigate('advertiserDetails')} style={[styles.directionBasicRow,styles.paddingHorizontal_15 , styles.Width_100]}>
                        <View style={[styles.borderGreen , styles.Radius_50, styles.icon50 ,{overflow:'hidden'}]}>
                            <Image source={require('../../assets/images/pic_profile.png')} style={[styles.Width_100 , styles.heightFull]} resizeMode={'cover'} />
                        </View>
                        <View style={[{marginLeft:10}]}>
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13,styles.alignStart]}>{ i18n.t('advertiserName') }</Text>
                            <TouchableOpacity onPress={() => Communications.phonecall('012365648569', true)}>
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, styles.alignStart]}>012365648569</Text>
                            </TouchableOpacity>
                            {/*<View style={[styles.width_80, styles.marginTop_5]}>*/}
                                {/*<StarRating*/}
                                    {/*disabled={true}*/}
                                    {/*maxStars={5}*/}
                                    {/*rating={3}*/}
                                    {/*fullStarColor={COLORS.mstarda}*/}
                                    {/*starSize={14}*/}
                                    {/*starStyle={styles.starStyle}*/}
                                {/*/>*/}
                            {/*</View>*/}
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.paddingHorizontal_15 , styles.marginTop_10]}>
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13,styles.alignStart]}>{ i18n.t('myAds') }</Text>

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
            )
        } else {
            return(
                <View style={[{top:-15},styles.paddingHorizontal_15]}>
                        <FlatList
                            data={similarAds}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item , index}) => <ItemSimilarAds
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
            )
        }
    }

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ 'اسم المبني' }/>

                <View style={[styles.bgFullWidth ,styles.bg_White,
                    styles.Width_100,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.marginTop_7 , styles.paddingHorizontal_7 ]}>
                        <Swiper key={3} dotStyle={styles.eventdoteStyle} activeDotStyle={[styles.eventactiveDot , {borderColor: COLORS.mstarda,
                            backgroundColor: COLORS.mstarda}]}
                                containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                            <View>
                                <Image source={require("../../assets/images/homeImg.png")}  style={styles.swiperImg} resizeMode={'cover'}/>
                                <View style={[styles.directionRow,{position:'absolute',top:-10,right:40}]}>
                                    <TouchableOpacity onPress = {() => onToggleFavorite()} style={[styles.touchBlue]}>
                                        <Icon style={[isFav ? styles.text_red : styles.text_White, styles.textSize_18]} type="AntDesign" name={ 'heart' } />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onShare()} style={[styles.touchBlue, {marginLeft:5}]}>
                                        <Icon style={[styles.text_White,styles.textSize_18]} type="Feather" name={ 'share-2' } />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Image source={require("../../assets/images/homeImg.png")}  style={styles.swiperImg} resizeMode={'cover'}/>
                                <View style={[styles.directionRow,{position:'absolute',top:-10,right:40}]}>
                                    <TouchableOpacity onPress = {() => onToggleFavorite()} style={[styles.touchBlue]}>
                                        <Icon style={[isFav ? styles.text_red : styles.text_White, styles.textSize_18]} type="AntDesign" name={ 'heart' } />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onShare()} style={[styles.touchBlue, {marginLeft:5}]}>
                                        <Icon style={[styles.text_White,styles.textSize_18]} type="Feather" name={ 'share-2' } />
                                    </TouchableOpacity>
                                </View>
                            </View>
                            <View>
                                <Image source={require("../../assets/images/homeImg.png")}  style={styles.swiperImg} resizeMode={'cover'}/>
                                <View style={[styles.directionRow,{position:'absolute',top:-10,right:40}]}>
                                    <TouchableOpacity onPress = {() => onToggleFavorite()} style={[styles.touchBlue]}>
                                        <Icon style={[isFav ? styles.text_red : styles.text_White, styles.textSize_18]} type="AntDesign" name={ 'heart' } />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress = {() => onShare()} style={[styles.touchBlue, {marginLeft:5}]}>
                                        <Icon style={[styles.text_White,styles.textSize_18]} type="Feather" name={ 'share-2' } />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </Swiper>

                        <Card style={[styles.Width_80, styles.SelfCenter , styles.Radius_10,{top:-40,padding:10}]}>
                            <View style={[styles.directionRowSpace]}>
                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15 ]}>شقة ايجار</Text>
                                <Text style={[styles.textRegular , styles.text_babyblue , styles.textSize_15 ]}>17 الف ريال</Text>
                            </View>
                            <View style={[styles.directionRowSpace]}>
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14 ]}>شارع البطحاء  - الرياض</Text>
                                <View style={[styles.directionRow]}>
                                    <Image source={require("../../assets/images/seen.png")}  style={[styles.icon15 , {marginRight:5}]} resizeMode={'contain'}/>
                                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14 ]}>555</Text>
                                </View>
                            </View>
                        </Card>

                    </View>

                    <Card style={[styles.Width_97,styles.flexCenter , styles.Radius_10,{padding:5,top:-30}]}>
                        <ScrollView style={{}} contentContainerStyle={[styles.directionRowSpace , styles.Width_100 ]} horizontal={true} showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity style={[styles.Radius_10, styles.directionRow, styles.flexCenter , {flex:1,padding:5,backgroundColor :tabType ==='0' ? COLORS.babyblue : 'transparent'}]} onPress={() => changeTab('0')}>
                                <Image source={tabType === '0'? require('../../assets/images/white_info.png') : require('../../assets/images/gray_info.png')} style={[styles.icon20, {marginRight:3}]} resizeMode={'contain'} />
                                {
                                    tabType === '0'?
                                        <Text style={[styles.textRegular, styles.text_White, styles.textSize_13]}>{ i18n.t('buildData') }</Text>
                                        :
                                        null
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.Radius_10, styles.directionRow, styles.flexCenter , {flex:1,padding:5,backgroundColor :tabType ==='1' ? COLORS.babyblue : 'transparent'}]} onPress={() => changeTab('1')} >
                                <Image source={tabType === '1'? require('../../assets/images/user_white.png'): require('../../assets/images/user_gray.png')} style={[styles.icon20, {marginRight:3}]} resizeMode={'contain'} />
                                {
                                    tabType === '1'?
                                        <Text style={[styles.textRegular, styles.text_White, styles.textSize_13]}>{ i18n.t('advertiserData') }</Text>
                                        :
                                        null
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.Radius_10, styles.directionRow, styles.flexCenter , {flex:1,padding:5,backgroundColor :tabType ==='2' ? COLORS.babyblue : 'transparent'}]} onPress={() => changeTab('2')}>
                                <Image source={tabType === '2'? require('../../assets/images/menu_ads.png'): require('../../assets/images/gray_ads.png')} style={[styles.icon20, {marginRight:3}]} resizeMode={'contain'} />
                                {
                                    tabType === '2'?
                                        <Text style={[styles.textRegular, styles.text_White, styles.textSize_11]}>{ i18n.t('similarAds') }</Text>
                                        :
                                        null
                                }
                            </TouchableOpacity>
                        </ScrollView>
                    </Card>

                    {
                        renderTabData()
                    }


                </View>

            </Content>
        </Container>
    );
}

export default ListDetails;


