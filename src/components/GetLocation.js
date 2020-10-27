import React, { useState , useEffect , useRef} from "react";
import {View, Text, Image, TouchableOpacity , Switch} from "react-native";
import {Container, Content, Form, Input,} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import axios from "axios";
import MapView from 'react-native-maps';
import COLORS from "../consts/colors";
import Header from '../common/Header';

const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;
const isIOS = Platform.OS === 'ios';

function GetLocation({navigation, route}) {

    const pathName = route.params.pathName;
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
            // console.log("city  " , data.results[0].formatted_address)
            // console.log("city  " , city)
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(  () => {
        fetchData();
    }, []);

    useEffect(  () => {
    }, [city , mapRegion ]);



    const _handleMapRegionChange  = async (mapCoordinate) =>  {

        setMapRegion({ latitude: mapCoordinate.latitude, longitude: mapCoordinate.longitude, latitudeDelta, longitudeDelta});

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity += mapCoordinate.latitude + ',' + mapCoordinate.longitude;
        getCity += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';

        console.log('locations data', getCity);

        try {
            const { data } = await axios.get(getCity);
            setCity(data.results[0].formatted_address)
            console.log("city2  " , data.results[0].formatted_address)
            console.log("city2 " , city)

        } catch (e) {
            console.log(e);
        }
    };
    function getLoc(){
        console.log("mapRegion button" ,mapRegion);
        console.log("city3 " , city);
        if(pathName === 'addOrder'){
            navigation.navigate('tabs', {
                screen: 'addOrder',
                params: { cityName:city , mapRegion},
            })
        }else {
            navigation.navigate('MainStack', {
                screen:pathName,
                params: { cityName:city , mapRegion},
            })
        }

    }
    return (
         <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>
                <Header navigation={navigation} title={ i18n.t('locateAd') }/>
                <View style={[styles.bgFullWidth ,styles.bg_White,
                    styles.Width_100,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50,overflow:'hidden'}]}>
                    {
                        !initMap && mapRegion.latitude != null? (
                            <MapView
                                ref={mapRef}
                                style={{ width: '100%', height: '100%' , flex:1 }}
                                initialRegion={mapRegion}>
                                <MapView.Marker
                                    draggable
                                    coordinate={mapRegion}
                                    onDragEnd={(e) => _handleMapRegionChange(e.nativeEvent.coordinate)}
                                >
                                    <Image source={require('../../assets/images/pink_marker_red.png')} resizeMode={'contain'} style={{ width: 35, height: 35 }}/>
                                </MapView.Marker>
                            </MapView>
                        ) : (<View />)
                    }
                </View>
                <View style={[{position:'absolute'  , bottom:20 },styles.flexCenter , styles.paddingHorizontal_25 , styles.Width_100]}>

                    <TouchableOpacity onPress={() => getLoc()} style={[styles.babyblueBtn , styles.Width_90]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_16 ]}>
                            { i18n.t('continue')}
                        </Text>
                    </TouchableOpacity>
                </View>
            </Content>

        </Container>
    );
}

export default GetLocation;


