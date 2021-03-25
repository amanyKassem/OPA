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
    FlatList, ActivityIndicator
} from "react-native";
import {Container, Content, Card, Icon, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import Header from '../common/Header';
import Swiper from 'react-native-swiper';
import COLORS from "../consts/colors";
import Communications from 'react-native-communications';
import {useDispatch, useSelector} from "react-redux";
import {getFavourite} from "../actions";
import axios from "axios";
import ImageViewer from 'react-native-image-zoom-viewer';
import  Modal  from "react-native-modal";
import CONST from "../consts";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function ListDetails({navigation , route}) {
    const [tabType, setTabType] = useState('0');

    const ad_id = route.params.ad_id;
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);


    const adDetails = useSelector(state => state.adDetails.adDetails);
    const adDetailsLoader = useSelector(state => state.adDetails.loader);

    const [isFav , setFav ] = useState(false);
    const [screenLoader , setScreenLoader ] = useState(true);

    const [showModalImg, setShowModalImg] = useState(false);
    const [imgUri, setImgUri] = useState(null);
    const [index, setIndex] = useState([]);

    const dispatch = useDispatch();
    function fetchData(){
        axios({
            url         : CONST.url + 'adDetailes',
            method      : 'POST',
            data        : {lang , ad_id},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getAdDetails', payload: response.data});
            if(response.data.success){
                setFav(adDetails.detailes.isFav);
                setScreenLoader(false)
            }

        });
    }

    function onToggleFavorite (id){
        axios({
            url         : CONST.url + 'favAndUnFavAd',
            method      : 'POST',
            headers     : { Authorization: token },
            data        : {lang ,ad_id :id }
        }).then(response => {
            setFav(!isFav);
            Toast.show({
                text        : response.data.message,
                type        : response.data.success ? "success" : "danger",
                duration    : 3000,
                textStyle       : {
                    color           : "white",
                    fontFamily      : 'cairo',
                    textAlign       : 'center'
                }
            });
        });

    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , adDetailsLoader , isFav]);


    function renderLoader(){
        if (screenLoader){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%' , backgroundColor:'#fff'}]}>
                    <ActivityIndicator size="large" color={COLORS.babyblue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }


    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    'OPA App',
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

    function Item({ title ,location , price , image , space , rooms , bathroom , hall , id, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.push('adDetails', {ad_id:id})} style={[styles.notiCard ,styles.marginBottom_10,{ borderLeftColor: index % 2 === 0 ? COLORS.green : COLORS.orange , minHeight:100}]}>
                <Image source={{uri:image}} style={[styles.width_120,styles.heightFull,styles.Radius_20,{left:-3}]} resizeMode={'cover'} />
                <View style={[styles.paddingHorizontal_10,styles.paddingVertical_5, {flex:1}]}>
                    <View style={[styles.directionRowSpace , styles.Width_100]}>
                        <Text style={[styles.textRegular , styles.text_black , styles.textSize_13]}>{ title.substr(0,15) }</Text>
                        <Text style={[styles.textRegular , styles.text_babyblue , styles.textSize_12 ]}>{ price }</Text>
                    </View>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ]}>{ space }</Text>
                    {
                        rooms && hall && bathroom ?
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ]}> { rooms ? rooms + ' -' : null} {hall ? hall + ' -' : null} {bathroom}</Text>
                            :
                            null
                    }
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ,
                        {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' , flex:1}]}>{location}</Text>
                </View>
            </TouchableOpacity>
        );
    }
    function ItemSimilarAds({ title ,location , price , image , space , desc , id, index }) {
        return (
            <TouchableOpacity onPress={() => navigation.push('listDetails', {ad_id:id})} style={[styles.notiCard ,styles.marginBottom_10,{ borderLeftColor: index % 2 === 0 ? COLORS.green : COLORS.orange}]}>
                <Image source={{uri:image}} style={[styles.width_120,styles.heightFull,styles.Radius_20,{left:-3}]} resizeMode={'cover'} />
                <View style={[styles.paddingHorizontal_10,styles.paddingVertical_5, {flex:1}]}>
                    <View style={[styles.directionRowSpace , styles.Width_100]}>
                        <Text style={[styles.textRegular , styles.text_black , styles.textSize_13]}>{ title.substr(0,15) }</Text>
                        <Text style={[styles.textRegular , styles.text_babyblue , styles.textSize_12 ]}>{ price }</Text>
                    </View>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ]}>{ space }</Text>
                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ]}>{ desc.substr(0,30) }..</Text>
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
                                        <Text
                                            style={[styles.textRegular, styles.text_light_gray, styles.textSize_13, {marginRight: 10}]}>{feature.name}</Text>
                                        {
                                            feature.icon ?
                                                <Image source={{uri:feature.icon}}
                                                       style={[styles.icon20, {marginRight: 5}]} resizeMode={'contain'}/>
                                                :
                                                null
                                        }

                                        <Text
                                            style={[styles.textRegular, styles.text_midGray, styles.textSize_13]}>{feature.number}</Text>
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
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13,styles.alignStart]}>{ i18n.t('apartSpec') }</Text>
                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart,{lineHeight:20,writingDirection:I18nManager.isRTL ?'rtl':'ltr'}]}>
                            {adDetails.detailes.description}
                        </Text>
                    </View>
                </View>
            )
        } else if(tabType === '1'){
            return(
                <View style={[{top:-15}]}>
                    <TouchableOpacity onPress={() => navigation.navigate('advertiserDetails' , {user_id:adDetails.detailes.user.id})} style={[styles.directionBasicRow,styles.paddingHorizontal_15 , styles.Width_100]}>
                        <View style={[styles.borderGreen , styles.Radius_50, styles.icon50 ,{overflow:'hidden'}]}>
                            <Image source={{uri:adDetails.detailes.user.avatar}} style={[styles.Width_100 , styles.heightFull]} resizeMode={'cover'} />
                        </View>
                        <View style={[{marginLeft:10}]}>
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13,styles.alignStart]}>{adDetails.detailes.user.name}</Text>
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
                        </View>
                    </TouchableOpacity>
                    <View style={[styles.paddingHorizontal_15 , styles.marginTop_10]}>
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13,styles.alignStart]}>{ i18n.t('myAds') }</Text>

                        <View style={[styles.marginTop_20]}>

                            <FlatList
                                data={adDetails.userAds}
                                showsVerticalScrollIndicator={false}
                                renderItem={({ item , index}) => <Item
                                    title={item.category}
                                    location={item.address}
                                    price={item.price}
                                    space={item.space}
                                    rooms={item.rooms}
                                    bathroom={item.bathroom}
                                    hall={item.hall}
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
                <View style={[{top:-15},styles.paddingHorizontal_15]}>
                        <FlatList
                            data={adDetails.similerAds}
                            showsVerticalScrollIndicator={false}
                            renderItem={({ item , index}) => <ItemSimilarAds
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
            )
        }
    }

    const url      = imgUri;
    let imgArr     = [{url}];

    return (
         <Container style={[styles.bg_gray]}>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={adDetails ? adDetails.detailes.title: ''}/>

                {
                    adDetails ?
                        <View style={[styles.bgFullWidth ,styles.bg_White,
                            styles.Width_100,
                            {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                            <View style={[styles.marginTop_7 , styles.paddingHorizontal_7 ]}>
                                <View style={[styles.directionRow,{position:'absolute',top:0,right:50 , zIndex:1}]}>
                                    <TouchableOpacity onPress = {() => onToggleFavorite(adDetails.detailes.id)} style={[styles.touchBlue]}>
                                        <Icon style={[isFav ? styles.text_red : styles.text_White, styles.textSize_18]} type="AntDesign" name={ 'heart' } />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => onShare()} style={[styles.touchBlue, {marginLeft:5}]}>
                                        <Icon style={[styles.text_White,styles.textSize_18]} type="Feather" name={ 'share-2' } />
                                    </TouchableOpacity>
                                </View>
                                <Swiper key={3} dotStyle={styles.eventdoteStyle} activeDotStyle={[styles.eventactiveDot , {borderColor: COLORS.mstarda,
                                    backgroundColor: COLORS.mstarda}]}
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
                                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15 ]}>{adDetails.detailes.title}</Text>
                                        <Text style={[styles.textRegular , styles.text_babyblue , styles.textSize_15 ]}>{adDetails.detailes.price}</Text>
                                    </View>
                                    <View style={[styles.directionRowSpace]}>
                                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14 ]}>{(adDetails.detailes.address).substr(0,20)}</Text>
                                        <View style={[styles.directionRow]}>
                                            <Image source={require("../../assets/images/seen.png")}  style={[styles.icon15 , {marginRight:5}]} resizeMode={'contain'}/>
                                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14 ]}>{adDetails.detailes.views}</Text>
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

                        :
                        null
                }


            </Content>
             <Modal
                 onBackdropPress                 ={() => {setShowModalImg(!showModalImg);setImgUri('')}}
                 onBackButtonPress               = {() => {setShowModalImg(!showModalImg);setImgUri('')}}
                 isVisible                       = {showModalImg}
                 // style                        = {styles.bgModel}
                 avoidKeyboard                   = {true}
             >
                 <TouchableOpacity onPress={()=> {setShowModalImg(false);setImgUri('')}}
                                   style={[styles.icon35, styles.centerContext, styles.bg_White,styles.Radius_50,
                                       {position:'absolute', zIndex:1 , top:10 , left:10 }]}>
                     <Icon name={'close'} type={'EvilIcons'} style={{ color: COLORS.babyblue, fontSize: 25 }} />
                 </TouchableOpacity>

                 {/*<ImageViewer enableImageZoom={true} onSwipeDown={() => {setShowModalImg(false);setImgUri('')}} enableSwipeDown={true} imageUrls={adDetails ? adDetails.detailes.images2 : []}/>*/}
                 <ImageViewer enableImageZoom={true} onSwipeDown={() => {setShowModalImg(false);}} enableSwipeDown={true} imageUrls={adDetails && adDetails.detailes && adDetails.detailes.images2 ? adDetails.detailes.images2:[]} index={index}/>

             </Modal>
        </Container>
    );
}

export default ListDetails;


