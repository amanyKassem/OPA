import React, {useEffect, useRef, useState} from "react";
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
import {Container, Content, Card, Icon} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';
import Swiper from 'react-native-swiper';
import COLORS from "../consts/colors";
import Communications from 'react-native-communications';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import axios from "axios";
import MapView from 'react-native-maps';
import ImageViewer from 'react-native-image-zoom-viewer';
import  Modal  from "react-native-modal";
import { Video } from 'expo-av';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';
const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

function RealEstateDet({navigation,route}) {

    const [showModal, setShowModal] = useState(false);
    const [mute, setMute] = useState(true);
    const [shouldPlay, setShouldPlay] = useState(false);
    const [imgUri, setImgUri] = useState(null);

    function handlePlayAndPause(){
        setShouldPlay(!shouldPlay)
    }

    function handleVolume() {
        setMute(!mute)
    }


    const [tabType, setTabType] = useState('0');

    let mapRef = useRef(null);
    const [city, setCity] = useState('');
    const [mapRegion, setMapRegion] = useState({
        latitude: 31.2587 ,
        longitude:32.2988,
        latitudeDelta ,
        longitudeDelta
    });

    const [initMap, setInitMap] = useState(true);

    const fetchData = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        let userLocation = {};
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        }else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            if (route.params && route.params.latitude){
                userLocation = { latitude: route.params.latitude, longitude:route.params.longitude , latitudeDelta , longitudeDelta};
            } else {
                userLocation = { latitude, longitude , latitudeDelta , longitudeDelta};
            }
            setInitMap(false);
            setMapRegion(userLocation);
            isIOS ? mapRef.current.animateToRegion(userLocation, 1000) : false;
        }
        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity    += userLocation.latitude + ',' + userLocation.longitude;
        getCity    += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';
        console.log("getCity  " , getCity)
        // ReactotronConfig.log(getCity);
        try {
            const { data } = await axios.get(getCity);
            setCity(data.results[0].formatted_address)
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(  () => {
        fetchData();
    }, []);

    useEffect(  () => {
    }, [city , mapRegion ]);

    function _linkGoogleMap(lat, lng){
        const scheme = Platform.select({ ios: 'maps:0,0?q=', android: 'geo:0,0?q=' });
        const latLng = `${lat},${lng}`;
        const label = 'Custom Label';

        let url = Platform.select({
            ios : `${scheme}${label}@${latLng}`,
            android: `${scheme}${latLng}(${label}`
        });

        Linking.openURL(url);
    }


    const images = [
        {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcRjHe_dRMl9Rb8CJiOfsrKo8Oure5s_rxRsPw&usqp=CAU'},
        {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcR-_f0-hBUvZr6R35AnqOkGmk9mO_fG6eXh7A&usqp=CAU'},
        {url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQ6wQn_6OzmPnVrNwcYP_mqGy5hFEMyhnWATw&usqp=CAU'},
        {url: 'http://d23dyxeqlo5psv.cloudfront.net/big_buck_bunny.mp4'},
    ]

    function Item({url, index }) {
        let myUrl  = url;
        const splitArr = myUrl.split('.');
        const ext  = splitArr[splitArr.length - 1].toLowerCase();

        if (ext === 'mp4' || ext === 'avi' || ext === 'm4v' || ext === 'mpg') {
            return (
                <TouchableOpacity onPress={() => {setShowModal(!showModal);setImgUri(myUrl)}}
                                  style={[styles.height_130, styles.marginBottom_10, styles.marginHorizontal_5, {flex: 1}]}>
                    <Video
                        source={{ uri: myUrl }}
                        rate={1.0}
                        volume={1.0}
                        isMuted={mute}
                        resizeMode="cover"
                        shouldPlay={shouldPlay}
                        isLooping
                        style={{ width: '100%', height: '100%' }}
                    />
                    <View style={styles.controlBar}>
                        <Icon type={'AntDesign'} name={'play'} style={{ fontSize: 30, color: COLORS.babyblue}} />
                    </View>
                </TouchableOpacity>
            );
        }else {
            return (
                <TouchableOpacity onPress={() => {setShowModal(!showModal);setImgUri(myUrl)}}
                                  style={[styles.height_130, styles.marginBottom_10, styles.marginHorizontal_5, {flex: 1}]}>
                    <Image source={{uri: myUrl}} style={[styles.Width_100, styles.heightFull]} resizeMode={'cover'}/>
                </TouchableOpacity>
            );
        }
    }



    function changeTab(type){
        setTabType(type);
    }

    function renderTabData(){
        if(tabType === '0'){
            return(
                <View style={[{top:-30}]}>
                    <View style={[styles.marginTop_10, styles.paddingHorizontal_15]}>
                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14]}>{ i18n.t('companySpec') }</Text>
                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12,styles.marginBottom_10,{lineHeight:20}]}>
                            نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص
                            نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص نص
                        </Text>

                        <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14,styles.marginBottom_10]}>{ i18n.t('companyLoca') }</Text>
                        {
                            !initMap && mapRegion.latitude != null? (
                                <TouchableOpacity onPress={()=> _linkGoogleMap( mapRegion.latitude , mapRegion.longitude)}>
                                    <MapView
                                        ref={mapRef}
                                        style={{ width: '100%', height: 200 , flex:1 }}
                                        initialRegion={mapRegion}>
                                        <MapView.Marker
                                            // draggable
                                            coordinate={mapRegion}
                                            // onDragEnd={(e) => _handleMapRegionChange(e.nativeEvent.coordinate)}
                                        >
                                            <Image source={require('../../assets/images/pink_marker_red.png')} resizeMode={'contain'} style={{ width: 35, height: 35 }}/>
                                        </MapView.Marker>
                                    </MapView>
                                </TouchableOpacity>
                            ) : (<View />)
                        }
                    </View>
                </View>
            )
        } else if(tabType === '1'){
            return(
                <View style={[{top:-15}, styles.paddingHorizontal_15]}>
                    <Text style={[styles.textRegular, styles.text_midGray, styles.textSize_14]}>{ i18n.t('socialMedia2') }</Text>
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

                    <Text style={[styles.textRegular, styles.text_midGray, styles.textSize_14,styles.marginTop_5]}>{ i18n.t('website') }</Text>
                    <TouchableOpacity onPress={() => Linking.openURL('https://www.moawlat.com')} style={[styles.directionRow , styles.marginTop_5]}>
                        <Image source={require('../../assets/images/global_gray.png')} style={[styles.icon15, {marginRight:5}]} resizeMode={'contain'} />
                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13]}>www.moawlat.com</Text>
                    </TouchableOpacity>
                </View>
            )
        } else {
            return(
                <View style={[{top:-15},styles.paddingHorizontal_15]}>
                    <FlatList
                        data={images}
                        horizontal={false}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item , index}) => <Item
                            url={item.url}
                            index={index}
                        />}
                        keyExtractor={item => item.id}
                    />
                </View>
            )
        }
    }

    const url      = imgUri;
    let isVideo    = false;
    let imgArr     = [{url}];

    if (url){
        const splitArr = url.split('.');
        const ext      = splitArr[splitArr.length - 1].toLowerCase();
        isVideo        = ext === 'mp4' || ext === 'avi' || ext === 'm4v' || ext === 'mpg' ? true : false;
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
                            <Image source={require("../../assets/images/homeImg.png")}  style={styles.swiperImg} resizeMode={'cover'}/>
                            <Image source={require("../../assets/images/homeImg.png")}  style={styles.swiperImg} resizeMode={'cover'}/>
                            <Image source={require("../../assets/images/homeImg.png")}  style={styles.swiperImg} resizeMode={'cover'}/>
                        </Swiper>

                        <Card style={[styles.Width_80, styles.SelfCenter , styles.Radius_10,{top:-40,padding:10}]}>
                            <Text style={[styles.textRegular , styles.text_gray , styles.textSize_14 ]}>اسم شركة المقاولات</Text>
                            <View style={[styles.directionRow]}>
                                <Image source={require("../../assets/images/global_gray.png")} style={[styles.icon15 , {marginRight:5}]} resizeMode={'contain'} />
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.textCenter ]}>www.moawlat.com</Text>
                            </View>
                        </Card>

                    </View>

                    <Card style={[styles.Width_97,styles.flexCenter , styles.Radius_10,{padding:5,top:-30}]}>
                        <ScrollView style={{}} contentContainerStyle={[styles.directionRowSpace , styles.Width_100 ]} horizontal={true} showsHorizontalScrollIndicator={false}>
                            <TouchableOpacity style={[styles.Radius_10, styles.directionRow, styles.flexCenter , {flex:1,padding:5,backgroundColor :tabType ==='0' ? COLORS.babyblue : 'transparent'}]} onPress={() => changeTab('0')}>
                                <Image source={tabType === '0'? require('../../assets/images/white_info.png') : require('../../assets/images/gray_info.png')} style={[styles.icon20, {marginRight:3}]} resizeMode={'contain'} />
                                {
                                    tabType === '0'?
                                        <Text style={[styles.textRegular, styles.text_White, styles.textSize_13]}>{ i18n.t('companyData') }</Text>
                                        :
                                        null
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.Radius_10, styles.directionRow, styles.flexCenter , {flex:1,padding:5,backgroundColor :tabType ==='1' ? COLORS.babyblue : 'transparent'}]} onPress={() => changeTab('1')} >
                                <Image source={tabType === '1'? require('../../assets/images/user_white.png'): require('../../assets/images/user_gray.png')} style={[styles.icon20, {marginRight:3}]} resizeMode={'contain'} />
                                {
                                    tabType === '1'?
                                        <Text style={[styles.textRegular, styles.text_White, styles.textSize_13]}>{ i18n.t('socialMedia2') }</Text>
                                        :
                                        null
                                }
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.Radius_10, styles.directionRow, styles.flexCenter , {flex:1,padding:5,backgroundColor :tabType ==='2' ? COLORS.babyblue : 'transparent'}]} onPress={() => changeTab('2')}>
                                <Image source={tabType === '2'? require('../../assets/images/menu_ads.png'): require('../../assets/images/gray_ads.png')} style={[styles.icon20, {marginRight:3}]} resizeMode={'contain'} />
                                {
                                    tabType === '2'?
                                        <Text style={[styles.textRegular, styles.text_White, styles.textSize_11]}>{ i18n.t('preJob') }</Text>
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
                        onBackdropPress                 ={() => {setShowModal(!showModal);setImgUri(null);setMute(true);setShouldPlay(false)}}
                        onBackButtonPress               = {() => {setShowModal(!showModal);setImgUri(null);setMute(true);setShouldPlay(false)}}
                        isVisible                       = {showModal}
                        // style                        = {styles.bgModel}
                        avoidKeyboard                   = {true}
                    >
                        <TouchableOpacity onPress={()=> {setShowModal(false);setImgUri(null);setMute(true);setShouldPlay(false)}}
                            style={[styles.icon35, styles.centerContext, styles.bg_White,styles.Radius_50,
                                {position:'absolute', zIndex:1 , top:10 , left:10 }]}>
                            <Icon name={'close'} type={'EvilIcons'} style={{ color: COLORS.babyblue, fontSize: 25 }} />
                        </TouchableOpacity>


                        {
                            isVideo ? (
                                    <View style={styles.slide} >
                                        <Video
                                            source={{ uri: url }}
                                            rate={1.0}
                                            volume={1.0}
                                            isMuted={mute}
                                            resizeMode="contain"
                                            shouldPlay={shouldPlay}
                                            isLooping
                                            style={{ width: '100%', height: '100%' }}
                                        />
                                        <View style={[styles.directionRowCenter , {position: 'absolute', bottom: 30, left: 0, right: 0}]}>

                                            <TouchableOpacity onPress={handleVolume} style={[styles.icon35, styles.centerContext, styles.bg_White,styles.Radius_50,styles.icon40]}>
                                                <Icon type={'FontAwesome'} name={mute ? "volume-off" : "volume-up"}
                                                      style={[styles.textSize_24,styles.text_babyblue]} />
                                            </TouchableOpacity>

                                            <TouchableOpacity onPress={handlePlayAndPause} style={[styles.icon35, styles.centerContext, styles.bg_White,
                                                styles.Radius_50,styles.icon40 , {marginLeft:20}]}>
                                                <Icon type={'FontAwesome'} name={shouldPlay ? "pause" : "play"}
                                                      style={[styles.textSize_20,styles.text_babyblue]} />
                                            </TouchableOpacity>

                                        </View>
                                    </View>
                                ) :
                                (
                                    <ImageViewer enableImageZoom={true} onSwipeDown={() => {setShowModal(false);setImgUri(null);setMute(true);setShouldPlay(false)}} enableSwipeDown={true} imageUrls={imgArr}/>
                                )

                        }

                    </Modal>

                </View>

            </Content>
        </Container>
    );
}

export default RealEstateDet;


