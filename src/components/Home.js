import React, {useEffect, useRef, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, Vibration} from "react-native";
import {Container, Content, Icon, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import { Notifications } from 'expo'
import {useSelector} from "react-redux";
import Header from '../common/Header';
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import axios from "axios";
import MapView from 'react-native-maps';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';
const latitudeDelta = 0.922;
const longitudeDelta = 0.521;

function Home({navigation,route}) {

    const [search, setSearch] = useState('');

    let mapRef = useRef(null);
    let mapMarkerRef = useRef(null);
    let markerRefs = []

    const [city, setCity] = useState('');

    const markers =[
        {id:'0',
        title: '1.7 مليون',
        coordinates: {
            latitude: 31.327,
            longitude:31.499,
            latitudeDelta ,
            longitudeDelta
        },},
        {id:'1',
        title: '2 مليون',
        coordinates: {
            latitude: 31.255,
            longitude:31.255,
            latitudeDelta ,
            longitudeDelta
        },},
        {id:'2',
        title: '3 مليون',
        coordinates: {
            latitude: 30.900,
            longitude:31.555,
            latitudeDelta ,
            longitudeDelta
        },}
    ];

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


    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', e => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation]);



    useEffect(() => {
        Notifications.addListener(handleNotification);
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

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('home') }/>

                <View style={[styles.bgFullWidth ,styles.bg_White,
                    styles.Width_100, {borderTopRightRadius:50 , borderTopLeftRadius:50,overflow:'hidden'}]}>

                    <View style={[styles.Width_90,styles.SelfCenter,{position:'absolute' , top:10,zIndex:1}]}>
                        <Input style={[styles.inputSearch , styles.Width_100, styles.bg_White , {flex:0}]}
                               placeholder={i18n.t('search')}
                               placeholderTextColor={COLORS.lightGray}
                               onChangeText={(search) => setSearch(search)}
                               value={search}
                        />

                        <View style={[styles.directionRow , {position:'absolute' , right:15 , top:13}]}>
                            <TouchableOpacity>
                                <Image source={require("../../assets/images/search.png")} style={[styles.icon20]} resizeMode={'cover'} />
                            </TouchableOpacity>
                            <View style={[styles.height_20 ,styles.marginHorizontal_7 , {width:.5 ,  backgroundColor: COLORS.midGray}]}/>
                            <TouchableOpacity onPress={() => navigation.navigate('advancedSearch')}>
                                <Image source={require("../../assets/images/filter.png")} style={[styles.icon20]} resizeMode={'cover'} />
                            </TouchableOpacity>
                        </View>
                    </View>

                    {
                        !initMap && mapRegion.latitude != null? (
                            <MapView
                                ref={mapRef}
                                style={{ width: '100%', height: '100%' , flex:1 }}
                                // onRegionChangeComplete={() => mapMarkerRef.current.showCallout()}
                                initialRegion={mapRegion}>
                                <MapView.Marker
                                    // draggable
                                    coordinate={mapRegion}
                                    // title={city}
                                    // description={'my location'}
                                    // onDragEnd={(e) => _handleMapRegionChange(e.nativeEvent.coordinate)}
                                >
                                    <Image source={require('../../assets/images/marker_blue.png')} resizeMode={'contain'} style={{ width: 35, height: 35 }}/>

                                </MapView.Marker>

                                {markers.map(marker => (
                                    <MapView.Marker
                                        // ref={mapMarkerRef}
                                        key={marker.id}
                                        coordinate={marker.coordinates}
                                        // title={marker.title}
                                    >
                                        <Image source={require('../../assets/images/pink_marker_red.png')} resizeMode={'contain'} style={{ width: 35, height: 35 }}/>
                                        <MapView.Callout tooltip={true} style={[styles.width_100,styles.bg_gray, styles.paddingHorizontal_15]} >
                                            <View style={[{flex:1}]}>
                                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_12]}>{marker.title}</Text>
                                            </View>
                                        </MapView.Callout>
                                    </MapView.Marker>
                                ))}
                            </MapView>
                        ) : (<View />)
                    }


                </View>

            </Content>
        </Container>
    );
}

export default Home;


