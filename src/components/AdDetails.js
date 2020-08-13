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

function AdDetails({navigation}) {
    const [tabType, setTabType] = useState('0');
    const [showModal, setShowModal] = useState(false);


    function toggleModal () {
        setShowModal(!showModal);
    };

    function confirmDelete () {
        setShowModal(!showModal);
    };

    const ads = [
        {id:'0' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
        {id:'1' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
        {id:'2' , title:'اوامر الشبكة' , location:'السعودية - الرياض -  شارع التخصصي' , space:"100 م" , desc:"4 غرف - صالة - 2 حمام", price:'10 ر.س', img:'require("../../assets/images/homeImg.png")'},
     ];

    function Item({ title ,location , price , img , space , desc , id, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.push('adDetails')} style={[styles.notiCard ,styles.marginBottom_10,{ borderLeftColor: index % 2 === 0 ? COLORS.green : COLORS.orange}]}>
                <Image source={require("../../assets/images/homeImg.png")} style={[styles.width_120,styles.heightFull,styles.Radius_20,{left:-3}]} resizeMode={'cover'} />
                <View style={[styles.paddingHorizontal_10,styles.paddingVertical_5, {flex:1}]}>
                    <View style={[styles.directionRowSpace , styles.Width_100]}>
                        <Text style={[styles.textRegular , styles.text_black , styles.textSize_13]}>{ title }</Text>
                        <Text style={[styles.textRegular , styles.text_babyblue , styles.textSize_12 ]}>{ price }</Text>
                    </View>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12,styles.alignStart ]}>{ space }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12,styles.alignStart ]}>{ desc }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ,
                        {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' , flex:1}]}>{location}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    const conversations = [
        {id:'0' , title:'اوامر الشبكة' , body:'تم العثور علي طلب مطابق' , time:'03:00' , count:'2'},
        {id:'1' , title:'اوامر الشبكة' , body:'we found app we found app  we found app we found app we found app ' , time:'03:00' , count:'2'},
        {id:'2' , title:'اوامر الشبكة' , body:'تم العثور علي طلب مطابق' , time:'03:00' , count:'2'},
        {id:'3' , title:'اوامر الشبكة' , body:'تم العثور علي طلب مطابق' , time:'03:00' , count:'2'},
    ];

    function ItemComment({ title ,body , time , count , id, index }) {
        return (
            <View style={[styles.marginBottom_10]}>
                <View style={[styles.directionRow]}>
                    <View style={[styles.borderMstarda, styles.icon50, styles.Radius_50 ,{borderColor: index % 2 === 0 ? COLORS.green : COLORS.orange}]}>
                        <Image source={require('../../assets/images/pic_profile.png')} style={[styles.Width_100 , styles.heightFull, styles.Radius_50]} resizeMode={'cover'} />
                        <View style={[styles.bg_mstarda ,styles.width_20 , styles.height_10, styles.Radius_5,styles.centerContext
                            ,{position:'absolute' , top:0 , zIndex:1}]}>
                            <Text style={[styles.textRegular , styles.text_green , styles.textSize_10, {lineHeight:isIOS ?14 : 18}]}>{ count }</Text>
                        </View>
                    </View>
                    <View style={[styles.directionColumnC, {flex:1, marginLeft:10}]}>
                        <View style={[styles.directionRowSpace]}>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, styles.alignStart]}>{title}</Text>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12 , styles.width_40 ]}>{ time }</Text>
                        </View>
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_12,styles.alignStart,
                            {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' , flex:1}]}>{ body }</Text>
                    </View>
                </View>
                <View style={[styles.line, styles.marginTop_10]}/>
            </View>
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
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13, styles.alignStart]}>{ i18n.t('apartSpec') }</Text>
                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart,
                            {lineHeight:20,writingDirection:I18nManager.isRTL ?'rtl':'ltr'}]}>
                            نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص
                            نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص
                        </Text>
                    </View>
                </View>
            )
        } else if(tabType === '1'){
            return(
                <View style={[{top:-15}]}>
                    <View style={[styles.directionBasicRow,styles.paddingHorizontal_15 , styles.Width_100]}>
                        <View style={[styles.borderGreen , styles.Radius_50, styles.icon50 ,{overflow:'hidden'}]}>
                            <Image source={require('../../assets/images/pic_profile.png')} style={[styles.Width_100 , styles.heightFull]} resizeMode={'cover'} />
                        </View>
                        <View style={[{marginLeft:10}]}>
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13, styles.alignStart]}>{ i18n.t('advertiserName') }</Text>
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
                            <TouchableOpacity onPress={() => Communications.phonecall('012365648569', true)} style={[styles.directionRow , styles.marginTop_5]}>
                                <Image source={require('../../assets/images/phone_gray.png')} style={[styles.icon15, {marginRight:5}]} resizeMode={'contain'} />
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13]}>012365648569</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Communications.email(['amany@gmail.com'],null,null,'My Subject','My body text')} style={[styles.directionRow , styles.marginTop_5]}>
                                <Image source={require('../../assets/images/mail_gray.png')} style={[styles.icon15, {marginRight:5}]} resizeMode={'contain'} />
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13]}>amany@gmail.com</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL('https://twitter.com')} style={[styles.directionRow , styles.marginTop_5]}>
                                <Image source={require('../../assets/images/twitter_gray.png')} style={[styles.icon15, {marginRight:5}]} resizeMode={'contain'} />
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13]}>twitter\aait</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.line , styles.marginVertical_20]}/>
                    <View style={[styles.paddingHorizontal_15]}>
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13, styles.alignStart]}>{ i18n.t('LocAndServices') }</Text>

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
                <View style={[{top:-30}, styles.marginTop_15,styles.paddingHorizontal_15]}>
                    <View style={[styles.directionRow,styles.marginBottom_15]}>
                        <View style={{flex:1}}>
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13, styles.alignStart]}>{ i18n.t('rateShow') }</Text>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart,{lineHeight:20, writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' }]}>
                                نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص
                                 نص نص نص نص نص نص نص نص نص نص نص نص نص
                            </Text>
                        </View>
                        <Image source={require('../../assets/images/statistic.png')} style={[styles.transform,styles.icon100, {marginLeft:10}]} resizeMode={'contain'} />
                    </View>
                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13]}>{ i18n.t('peopleAd') }</Text>
                    <View style={[styles.marginTop_15]}>
                        <FlatList
                            data={conversations}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item , index}) => <ItemComment
                                title={item.title}
                                body={item.body}
                                time={item.time}
                                id={item.id}
                                count={item.count}
                                index={index}
                            />}
                            keyExtractor={item => item.id}
                        />

                    </View>
                </View>
            )
        }
    }

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} toggleModal={() => toggleModal()} title={ i18n.t('adDetails') }/>

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
                           <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14, styles.alignStart ]}>شارع البطحاء  - الرياض</Text>
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
                                <Image source={tabType === '2'? require('../../assets/images/white_graph.png'): require('../../assets/images/graph_gray.png')} style={[styles.icon20, {marginRight:3}]} resizeMode={'contain'} />
                                {
                                    tabType === '2'?
                                        <Text style={[styles.textRegular, styles.text_White, styles.textSize_13]}>{ i18n.t('advertisingStats') }</Text>
                                    :
                                    null
                                }
                            </TouchableOpacity>
                        </ScrollView>
                    </Card>

                    {
                        renderTabData()
                    }


                    <Modal
                        onBackdropPress                 ={toggleModal}
                        onBackButtonPress               = {toggleModal}
                        isVisible                       = {showModal}
                        style                           = {styles.bgModel}
                        avoidKeyboard                    = {true}
                    >

                        <View style={[styles.bg_White, styles.overHidden, styles.Width_100, styles.paddingVertical_25 , styles.paddingHorizontal_25, styles.flexCenter]}>

                            <Image source={require('../../assets/images/delete_vector.png')} style={[styles.icon60,styles.marginBottom_5,styles.marginTop_5]} resizeMode={'contain'} />
                            <Text style={[styles.textBold, styles.text_black, styles.textSize_13]}>{ i18n.t('deleteAd') }</Text>
                            <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_14]}>{ i18n.t('deleteAdConfirm') }</Text>

                            <TouchableOpacity onPress={() => confirmDelete()}
                                              style={[styles.babyblueBtn , styles.flexCenter , styles.Width_90, styles.marginBottom_10 , styles.marginTop_25]}>
                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_14]}>{ i18n.t('agree') }</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={toggleModal}
                                              style={[styles.babyblueBtn , styles.flexCenter , styles.Width_90, styles.marginBottom_10 , {backgroundColor:'transparent'}]}>
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14]}>{ i18n.t('cancel') }</Text>
                            </TouchableOpacity>
                        </View>

                    </Modal>

                </View>

            </Content>
        </Container>
    );
}

export default AdDetails;


