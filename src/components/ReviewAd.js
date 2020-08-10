import React , {useEffect,useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Linking,
    I18nManager,
    FlatList
} from "react-native";
import {Container, Content, Card} from 'native-base'
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

function ReviewAd({navigation}) {

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('reviewAd') }/>

                <View style={[styles.bgFullWidth ,styles.bg_White,
                    styles.Width_100,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.marginTop_7 , styles.paddingHorizontal_7 ]}>
                        <Swiper key={3} dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                                containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                            <Image source={require("../../assets/images/homeImg.png")}  style={styles.swiperImg} resizeMode={'cover'}/>
                            <Image source={require("../../assets/images/homeImg.png")}  style={styles.swiperImg} resizeMode={'cover'}/>
                            <Image source={require("../../assets/images/homeImg.png")}  style={styles.swiperImg} resizeMode={'cover'}/>
                        </Swiper>

                        <Card style={[styles.Width_80, styles.SelfCenter , styles.Radius_10,{top:-40,padding:10}]}>
                            <View style={[styles.directionRowSpace]}>
                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15 ]}>شقة ايجار</Text>
                                <Text style={[styles.textRegular , styles.text_green , styles.textSize_15 ]}>17 الف ريال</Text>
                            </View>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14 ]}>شارع البطحاء  - الرياض</Text>
                        </Card>

                    </View>

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
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13]}>{ i18n.t('apartSpec') }</Text>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12,{lineHeight:20}]}>
                                نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص
                                نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص
                            </Text>
                        </View>
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('confirmPost')} style={[styles.babyblueBtn , styles.flexCenter , styles.Width_80, styles.marginBottom_30 ]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('postAd') }</Text>
                    </TouchableOpacity>

                </View>

            </Content>
        </Container>
    );
}

export default ReviewAd;


