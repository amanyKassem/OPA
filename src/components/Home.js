import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Vibration, I18nManager, ActivityIndicator} from "react-native";
import {Container, Content, Icon, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import { Notifications } from 'expo'
import {useSelector, useDispatch} from 'react-redux';
import Header from '../common/Header';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import axios from "axios";
import MapView from 'react-native-maps';
import COLORS from "../consts/colors";
import {getHomeAds} from "../actions";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';
const latitudeDelta = 0.922;
const longitudeDelta = 0.521;

function Home({navigation,route}) {

    const [search, setSearch] = useState('');
    const [popInfo, setPopInfo] = useState(null);
    const [showAd, setShowAd] = useState(false);
    const [loader, setLoader] = useState(true);
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const homeAds = useSelector(state => state.homeAds.homeAds);
    const homeAdsLoader = useSelector(state => state.homeAds.loader);

    const dispatch = useDispatch()
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

        let { status } = await Location.requestPermissionsAsync();
        let userLocation = {};
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        }else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            if (route.params && route.params.latitude){
                userLocation = { latitude: route.params.latitude, longitude:route.params.longitude , latitudeDelta , longitudeDelta};
                dispatch(getHomeAds(lang , route.params.latitude ,route.params.longitude  , null , token))
            } else {
                userLocation = { latitude, longitude , latitudeDelta  , longitudeDelta};
                dispatch(getHomeAds(lang , latitude ,longitude , null , token))
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


    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', e => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , homeAdsLoader]);

    function renderLoader(){
        if (loader) {
            return (
                <View style={[styles.loading, styles.flexCenter, {height: '100%'}]}>
                    <Image source={require('../../assets/images/logo.png')}
                           style={[styles.icon130, styles.marginBottom_20, styles.SelfCenter]} resizeMode={'contain'}/>
                </View>
            );
        }
    }

    useEffect(() => {
        Notifications.addListener(handleNotification);
        setTimeout(function () {
            setLoader(false)
        }, 3000);
    }, []);

    function handleNotification(notification) {
        if (notification && notification.origin !== 'received') {
            navigation.navigate('notification');
        }

        if (notification.remote) {
            Vibration.vibrate();
            const notificationId = Notifications.presentLocalNotificationAsync({
                title: notification.data.title  ? notification.data.title : i18n.t('newNotification'),
                body: notification.data.body ? notification.data.body : i18n.t('_newNotification'),
                ios: { _displayInForeground: true }
            });
        }
    }

    function showAdPop(markerInfo) {
        setShowAd(true)
        setPopInfo(markerInfo)
    }

    const setSearchText = (keyword) => {
        setSearch(keyword);
        if(keyword)
            dispatch(getHomeAds(lang , mapRegion.latitude ,mapRegion.longitude  , keyword , token))
        else
            dispatch(getHomeAds(lang , mapRegion.latitude ,mapRegion.longitude  , null , token))
    }

    async function getCurrentLocation() {
        let { status } = await Location.requestPermissionsAsync();

        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        } else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            let userLocation = { latitude, longitude, latitudeDelta, longitudeDelta };
            setMapRegion(userLocation);
            mapRef.current.animateToRegion(userLocation, 500)
        }
    }


    return (
        <Container style={[styles.bg_gray]}>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('home') }/>

                <View style={[styles.bgFullWidth ,styles.bg_White,
                    styles.Width_100, {borderTopRightRadius:50 , borderTopLeftRadius:50,overflow:'hidden'}]}>

                    <View style={[styles.Width_90,styles.SelfCenter,{position:'absolute' , top:10,zIndex:1}]}>
                        <Input style={[styles.inputSearch , styles.Width_100, styles.bg_White , {flex:0}]}
                               placeholder={i18n.t('search')}
                               placeholderTextColor={COLORS.lightGray}
                               onChangeText={(search) => setSearchText(search)}
                               value={search}
                        />

                        <View style={[styles.directionRow , {position:'absolute' , right:15 , top:13}]}>
                            {/*<TouchableOpacity onPress={() => navigation.push('searchResults' , {keyword:search})}>*/}
                            {/*    <Image source={require("../../assets/images/search.png")} style={[styles.icon20]} resizeMode={'cover'} />*/}
                            {/*</TouchableOpacity>*/}
                            <View>
                                <Image source={require("../../assets/images/search.png")} style={[styles.icon20]} resizeMode={'cover'} />
                            </View>
                            <View style={[styles.height_20 ,styles.marginHorizontal_7 , {width:.5 ,  backgroundColor: COLORS.midGray}]}/>
                            <TouchableOpacity onPress={() => navigation.navigate('advancedSearch')}>
                                <Image source={require("../../assets/images/filter.png")} style={[styles.icon20]} resizeMode={'cover'} />
                            </TouchableOpacity>
                        </View>


                    </View>
                    <TouchableOpacity onPress={() => getCurrentLocation()}
                                      style={[styles.flexCenter,styles.Radius_5, styles.icon40, styles.bg_gray ,
                                          { padding: 10 , position:'absolute' , bottom:isIOS?100 : 75 , left:15 , zIndex:1}]}>
                        <Icon type='Ionicons' name='locate' style={{ color: '#fff', fontSize: 22 }} />
                    </TouchableOpacity>

                    {
                        !initMap && mapRegion.latitude != null? (
                            <MapView
                                ref={mapRef}
                                style={{ width: '100%', height: '100%' , flex:1 }}
                                // onRegionChange={() => mapMarkerRef.current.showCallout()}
                                initialRegion={mapRegion}>
                                <MapView.Marker
                                    coordinate={mapRegion}
                                    // title={city}
                                    // description={'my location'}
                                >
                                    <Image source={require('../../assets/images/marker_blue.png')} resizeMode={'contain'} style={[styles.icon35]}/>

                                </MapView.Marker>


                                {
                                    homeAds ?
                                        homeAds.map((marker,i) => (
                                            <MapView.Marker
                                                // ref={mapMarkerRef}
                                                key={marker.id}
                                                coordinate={marker.coordinates}
                                                // title={marker.title}
                                                onPress={() => showAdPop(marker)}
                                            >
                                                <Image source={require('../../assets/images/pink_marker_red.png')} resizeMode={'contain'} style={[styles.icon35]}/>
                                                <MapView.Callout tooltip={true} style={[styles.flexCenter]} >
                                                    <View style={[styles.Radius_15,styles.flexCenter ,styles.bg_gray ,styles.paddingVertical_5 , styles.paddingHorizontal_5,{minWidth:80}]}>
                                                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_11]}>{marker.price}</Text>
                                                    </View>
                                                    <View style={[styles.talkBubbleTriangle]}/>
                                                </MapView.Callout>
                                            </MapView.Marker>
                                        ))
                                        :
                                        null
                                        }
                            </MapView>
                        ) : (<View />)
                    }

                    {
                        showAd && popInfo?
                            <View style={[styles.paddingHorizontal_10, styles.Width_100 , {position:'absolute' , bottom:70 , zIndex:1}]}>
                                <TouchableOpacity onPress={() => setShowAd(false)} style={[styles.bg_gray,styles.centerContext , styles.Radius_50,styles.alignEnd,styles.icon25]}>
                                    <Image source={require("../../assets/images/close.png")} style={[styles.icon10]} resizeMode={'contain'} />
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('listDetails', {ad_id:popInfo.id})} style={[styles.popCard , styles.bg_White,
                                    { borderLeftColor: COLORS.mstarda, minHeight:100}]}>
                                    <Image source={{uri:popInfo.image}} style={[styles.width_120,styles.heightFull,styles.Radius_20,{left:-3}]} resizeMode={'cover'} />
                                    <View style={[styles.paddingHorizontal_5,styles.paddingVertical_5, {flex:1}]}>
                                        <View style={[styles.directionRowSpace , styles.Width_100]}>
                                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13]}>{popInfo.title.substr(0,15)}</Text>
                                            <Text style={[styles.textRegular , styles.text_babyblue , styles.textSize_12 ]}>{popInfo.price}</Text>
                                        </View>
                                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12 ,styles.alignStart]}>{popInfo.space}</Text>
                                        {
                                            popInfo.rooms && popInfo.hall && popInfo.bathroom ?
                                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ]}> { popInfo.rooms ? popInfo.rooms + ' -' : null} {popInfo.hall ? popInfo.hall + ' -' : null} {popInfo.bathroom}</Text>
                                                :
                                                null
                                        }
                                        <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart ,
                                            {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr' , flex:1}]}>{popInfo.address}</Text>
                                    </View>
                                </TouchableOpacity>
                                <View style={[styles.talkTriangle]}/>

                            </View>
                            :
                            null
                    }



                </View>

            </Content>
        </Container>
    );
}

export default Home;


