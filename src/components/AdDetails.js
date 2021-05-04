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
    FlatList,
    ActivityIndicator
} from "react-native";
import {Container, Content, Card, Icon} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import Header from '../common/Header';
import Swiper from 'react-native-swiper';
import COLORS from "../consts/colors";
import Communications from 'react-native-communications';
import  Modal  from "react-native-modal";
import {useDispatch, useSelector} from "react-redux";
import {DeleteAd} from '../actions';
import axios from "axios";
import CONST from "../consts";
import ImageViewer from 'react-native-image-zoom-viewer';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function AdDetails({navigation , route}) {
    const [tabType, setTabType] = useState('0');
    const [showModal, setShowModal] = useState(false);
    const ad_id = route.params.ad_id;
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);

    const adDetails = useSelector(state => state.adDetails.adDetails);
    const adDetailsLoader = useSelector(state => state.adDetails.loader);
    const [screenLoader , setScreenLoader ] = useState(true);
    const [showModalImg, setShowModalImg] = useState(false);
    const [index, setIndex] = useState([]);

    const dispatch = useDispatch();
    function fetchData(){
        axios({
            url         : CONST.url + 'adDetailes',
            method      : 'POST',
            data        : {lang , ad_id},
            headers		: token ? { Authorization: token } : null
        }).then(response => {
            dispatch({type: 'getAdDetails', payload: response.data});
            setScreenLoader(false)
        });
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , adDetailsLoader]);


    function renderLoader(){
        if (screenLoader){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%' , backgroundColor:'#fff'}]}>
                    <ActivityIndicator size="large" color={COLORS.babyblue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }


    function toggleModal () {
        setShowModal(!showModal);
    };

    function confirmDelete (id) {
        setShowModal(!showModal);
        dispatch(DeleteAd(lang , id , token , navigation))
    };


    function Item({ title ,location , price , image , space , desc , id, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.push('adDetails', {ad_id:id})} style={[styles.notiCard ,styles.marginBottom_10,{ borderLeftColor: index % 2 === 0 ? COLORS.green : COLORS.orange}]}>
                <Image source={{uri:image}} style={[styles.width_120,styles.heightFull,styles.Radius_20,{left:-3}]} resizeMode={'cover'} />
                <View style={[styles.paddingHorizontal_10,styles.paddingVertical_5, {flex:1}]}>
                    <View style={[styles.directionRowSpace , styles.Width_100]}>
                        <Text style={[styles.textRegular , styles.text_black , styles.textSize_13]}>{ title.substr(0,15) }</Text>
                        <Text style={[styles.textRegular , styles.text_babyblue , styles.textSize_12 ]}>{ price }</Text>
                    </View>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12,styles.alignStart ]}>{ space }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12,styles.alignStart ]}>{ desc.substr(0,30) }..</Text>
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


                    <View style={[styles.rowGroup, styles.paddingHorizontal_15, styles.marginTop_5,
                        styles.Width_100, {padding: 5}]}>
                        {
                            adDetails.features.map((feature, i) => {
                                return (

                                    <View key={i} style={[styles.directionRow , styles.marginBottom_10 , {width:'26%'}]}>

                                        {
                                            feature.icon ?
                                                <Image source={{uri:feature.icon}}
                                                       style={[styles.icon20, {marginRight: 5}]} resizeMode={'contain'}/>
                                                :
                                                null
                                        }

                                        <Text
                                            style={[styles.textRegular, styles.text_light_gray, styles.textSize_13, {marginRight: 10}]}>{feature.name}</Text>


                                        {
                                            feature.type == 'checkbox' ?

                                                feature.value == 1 ?
                                                    <Icon type={'AntDesign'} name={'check'} style={{ fontSize: 18, color: COLORS.gray}} />
                                                    :
                                                    <Icon type={'AntDesign'} name={'close'} style={{ fontSize: 18, color: COLORS.red}} />
                                                :
                                                <Text
                                                    style={[styles.textRegular, styles.text_midGray, styles.textSize_13]}>{feature.value}</Text>
                                        }


                                    </View>
                                )
                            })
                        }
                    </View>


                    <View style={[styles.directionRow, styles.marginTop_10, styles.paddingHorizontal_15]}>
                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, {marginRight:10} ]}>{ i18n.t('adNumber') }</Text>
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13]}>{adDetails.detailes.id}</Text>
                    </View>
                    <View style={[styles.marginTop_10, styles.paddingHorizontal_15]}>
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13, styles.alignStart]}>{ i18n.t('desc') }</Text>
                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart,
                            {lineHeight:20,writingDirection:I18nManager.isRTL ?'rtl':'ltr'}]}>
                            {adDetails.detailes.description}
                        </Text>
                    </View>
                </View>
            )
        } else if(tabType === '1'){
            return(
                <View style={[{top:-15}]}>
                    <View style={[styles.directionBasicRow,styles.paddingHorizontal_15 , styles.Width_100]}>
                        <View style={[styles.borderGreen , styles.Radius_50, styles.icon50 ,{overflow:'hidden'}]}>
                            <Image source={{uri:adDetails.detailes.user.avatar}} style={[styles.Width_100 , styles.heightFull]} resizeMode={'cover'} />
                        </View>
                        <View style={[{marginLeft:10}]}>
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13, styles.alignStart]}>{adDetails.detailes.user.name}</Text>
                            <TouchableOpacity onPress={() => Communications.phonecall(adDetails.detailes.user.phone, true)}>
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, styles.alignStart]}>{adDetails.detailes.user.phone}</Text>
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
                            <TouchableOpacity onPress={() => Communications.phonecall(adDetails.detailes.user.contact_phone, true)} style={[styles.directionRow , styles.marginTop_5]}>
                                <Image source={require('../../assets/images/phone_gray.png')} style={[styles.icon15, {marginRight:5}]} resizeMode={'contain'} />
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13]}>{adDetails.detailes.user.contact_phone}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Communications.email([adDetails.detailes.user.contact_email],null,null,'My Subject','My body text')} style={[styles.directionRow , styles.marginTop_5]}>
                                <Image source={require('../../assets/images/mail_gray.png')} style={[styles.icon15, {marginRight:5}]} resizeMode={'contain'} />
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13]}>{adDetails.detailes.user.contact_email}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => Linking.openURL(adDetails.detailes.user.twitter)} style={[styles.directionRow , styles.marginTop_5]}>
                                <Image source={require('../../assets/images/twitter_gray.png')} style={[styles.icon15, {marginRight:5}]} resizeMode={'contain'} />
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13]}>{adDetails.detailes.user.twitter}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[styles.line , styles.marginVertical_20]}/>
                    <View style={[styles.paddingHorizontal_15]}>
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13, styles.alignStart]}>{ i18n.t('LocAndServices') }</Text>

                        <View style={[styles.marginTop_20]}>

                            <FlatList
                                data={adDetails.closestAds}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item , index}) => <Item
                                    title={item.title}
                                    location={item.address}
                                    price={item.price}
                                    space={item.space}
                                    desc={item.description}
                                    image={item.image}
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
                                {adDetails.detailes.views}
                            </Text>
                        </View>
                        <Image source={require('../../assets/images/statistic.png')} style={[styles.transform,styles.icon100, {marginLeft:10}]} resizeMode={'contain'} />
                    </View>
                    {/*<Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13]}>{ i18n.t('peopleAd') }</Text>*/}
                    {/*<View style={[styles.marginTop_15]}>*/}
                        {/*<FlatList*/}
                            {/*data={conversations}*/}
                            {/*showsVerticalScrollIndicator={false}*/}
                            {/*renderItem={({ item , index}) => <ItemComment*/}
                                {/*title={item.title}*/}
                                {/*body={item.body}*/}
                                {/*time={item.time}*/}
                                {/*id={item.id}*/}
                                {/*count={item.count}*/}
                                {/*index={index}*/}
                            {/*/>}*/}
                            {/*keyExtractor={item => item.id}*/}
                        {/*/>*/}
                    
                    {/*</View>*/}
                </View>
            )
        }
    }


    return (
         <Container style={[styles.bg_gray]}>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} toggleModal={() => toggleModal()} ad_id={adDetails? adDetails.detailes.id : null} title={ i18n.t('adDetails') }/>

                {
                    adDetails ?
                        <View style={[styles.bgFullWidth ,styles.bg_White,
                            styles.Width_100,
                            {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                            <View style={[styles.marginTop_7 , styles.paddingHorizontal_7 ]}>
                                <Swiper key={3} dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                                        containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                                    {
                                        adDetails.detailes.images2 && adDetails.detailes.images2.length > 0 ?
                                            adDetails.detailes.images2.map((img, i) => {
                                                return (
                                                    <TouchableOpacity key={i} onPress={() => {setShowModalImg(!showModalImg); setIndex(i)}}
                                                                      style={[styles.swiperImg]}>
                                                        <Image source={{uri: img.url}} style={[styles.swiperImg]} resizeMode={'cover'}/>
                                                    </TouchableOpacity>

                                                )
                                            })
                                            :
                                            <Image source={require('../../assets/images/image_placeholder.png')}
                                                   style={[styles.swiperImg]} resizeMode={'cover'}/>
                                    }

                                </Swiper>

                                <Card style={[styles.Width_80, styles.SelfCenter , styles.Radius_10,{top:-40,padding:10}]}>
                                    <View style={[styles.directionRowSpace]}>
                                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15 , styles.writingDir , {flex:1}]}>{adDetails.detailes.title}</Text>
                                        {/*<Text style={[styles.textRegular , styles.text_green , styles.textSize_15 ]}>{adDetails.detailes.price}</Text>*/}
                                    </View>
                                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14, styles.alignStart ]}>{adDetails.detailes.address}</Text>
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

                                    <TouchableOpacity onPress={() => confirmDelete(adDetails.detailes.id)}
                                                      style={[styles.babyblueBtn , styles.flexCenter , styles.Width_90, styles.marginBottom_10 , styles.marginTop_25]}>
                                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_14]}>{ i18n.t('agree') }</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={toggleModal}
                                                      style={[styles.babyblueBtn , styles.flexCenter , styles.Width_90, styles.marginBottom_10 , {backgroundColor:'transparent'}]}>
                                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14]}>{ i18n.t('cancel') }</Text>
                                    </TouchableOpacity>
                                </View>

                            </Modal>

                            <Modal
                                onBackdropPress                 ={() => {setShowModalImg(!showModalImg);}}
                                onBackButtonPress               = {() => {setShowModalImg(!showModalImg);}}
                                isVisible                       = {showModalImg}
                                // style                        = {styles.bgModel}
                                avoidKeyboard                   = {true}
                            >
                                <TouchableOpacity onPress={()=> {setShowModalImg(false);}}
                                                  style={[styles.icon35, styles.centerContext, styles.bg_White,styles.Radius_50,
                                                      {position:'absolute', zIndex:1 , top:10 , left:10 }]}>
                                    <Icon name={'close'} type={'EvilIcons'} style={{ color: COLORS.babyblue, fontSize: 25 }} />
                                </TouchableOpacity>

                                {/*<ImageViewer enableImageZoom={true} onSwipeDown={() => {setShowModalImg(false);}} enableSwipeDown={true} imageUrls={adDetails ? adDetails.detailes.images2 : []}/>*/}
                                <ImageViewer enableImageZoom={true} onSwipeDown={() => {setShowModalImg(false);}} enableSwipeDown={true} imageUrls={adDetails && adDetails.detailes && adDetails.detailes.images2 ? adDetails.detailes.images2:[]} index={index}/>

                            </Modal>


                        </View>
                        :
                        null
                }

            </Content>
        </Container>
    );
}

export default AdDetails;


