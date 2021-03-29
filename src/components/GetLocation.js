import React, { useState , useEffect , useRef} from "react";
import {View, Text, Image, TouchableOpacity , ActivityIndicator , ScrollView} from "react-native";
import {Container, Content, Form, Icon, Input, Item,} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import axios from "axios";
import MapView from 'react-native-maps';
import COLORS from "../consts/colors";
import Header from '../common/Header';
import {useSelector, useDispatch} from 'react-redux';

const latitudeDelta= 0.01;
const longitudeDelta= 0.01;
const isIOS = Platform.OS === 'ios';

function GetLocation({navigation, route}) {

    const { latitude , longitude , address , pathName} = route.params ?? null
    const [initMap, setInitMap]	            = useState(true);
    const lang                              = useSelector(state => state.lang.lang);
    const token                             = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    let mapRef 								= useRef(null);
    const [userLocation, setUserLocation]   = useState([{
        latitude: '',
        longitude: '',
        latitudeDelta,
        longitudeDelta
    }]);
    const [search, setSearch]   			= useState('');
    const [searchResult, setSearchResult]   = useState([]);
    const [selectedLocation, setLocation]   = useState(null);
    const [searchHeight, setSearchHeight]   = useState(70);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestPermissionsAsync();
            let location = {};
            if (status !== 'granted') {
                alert('Permission to access location was denied');
            } else {
                if (route.params && route.params.latitude){
                    location = { latitude, longitude , latitudeDelta , longitudeDelta};
                    setUserLocation(location);
                    setSearch(address)
                }else{
                    const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
                    location = { latitude, longitude , latitudeDelta , longitudeDelta};
                    setUserLocation(location);
                    setSearch('')
                }

                setInitMap(false);
            }

        })();
    }, []);

    async function _handleMapRegionChange(e){

        // searchRef.current.blur()

        let formattedItem = {
            latitude: e.latitude,
            longitude: e.longitude,
            latitudeDelta,
            longitudeDelta
        };

        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity    += e.latitude + ',' + e.longitude;
        getCity    += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';

        try {
            const { data } = await axios.get(getCity);
            formattedItem  = {
                latitude:   e.latitude,
                longitude:  e.longitude,
                latitudeDelta,
                longitudeDelta
            };
            setSearch(data.results[0].formatted_address)
            setUserLocation(formattedItem)

            console.log('formattedItem' , formattedItem , 'userLocation' , userLocation)
        } catch (e) { console.log(e); }

    }

    function setSelectedLocation(item) {
        const { geometry: { location } } = item;

        const formattedItem = {
            latitude	: 	location.lat,
            longitude	: 	location.lng,
            latitudeDelta,
            longitudeDelta
        };

        setSearchResult([]);
        setSearchHeight(60);
        console.log('formattedItem' , formattedItem , 'userLocation' , userLocation)
        setUserLocation(formattedItem);

        mapRef.current.animateToRegion(
            {
                latitude: formattedItem.latitude,
                longitude: formattedItem.longitude,
                latitudeDelta,
                longitudeDelta
            },
            350
        );
    }

    async function onSearch() {
        let endPoint = 'https://maps.googleapis.com/maps/api/place/textsearch/json?query=';
        endPoint    += search;
        endPoint    += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=' + lang;

        try {
            const { data } = await axios.get(endPoint);
            setSearchResult(data.results);
            setSearchHeight(270);

        } catch (e) {
            console.log(e);
        }
    }


    function getLoc(){

        navigation.navigate('MainStack', {
            screen:pathName,
            params: { cityName:search , mapRegion:userLocation},
        })

    }
    return (
         <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>
                <Header navigation={navigation} title={ i18n.t('locateAd') }/>

                <View style={[styles.mapInputContainer]}>
                    <Icon type='Entypo' name='location-pin' style={{ color: COLORS.gray, fontSize: 20 }}/>
                    <Input style={[styles.mapInput , styles.textRegular]} placeholder={i18n.t('search')} value={search} onChangeText={(search) => setSearch(search)} onSubmitEditing={() => onSearch()} />
                </View>

                <View style={[styles.bgFullWidth ,styles.bg_White,
                    styles.Width_100,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50,overflow:'hidden'}]}>
                    {
                        searchResult && searchResult.length > 0 ?
                            <View style={{ alignSelf: 'center', width: '86%', maxHeight: 200, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, position: 'absolute', zIndex: 2, top: 85, minHeight: 60 }}>
                                <TouchableOpacity style={{ position: 'absolute', zIndex: 3, right: -5, top: -1.5 }} onPress={() => setSearchResult([])}>
                                    <Icon type={'AntDesign'} name={'closecircle'} style={{ color: COLORS.blue }} />
                                </TouchableOpacity>
                                <View style={{ alignSelf: 'center', width: '100%', height: 220, borderBottomLeftRadius: 10, borderBottomRightRadius: 10, paddingBottom: 20, backgroundColor: '#fff', borderRadius: 10}}>
                                    <ScrollView style={{ zIndex: 99999999 }}>
                                        {
                                            searchResult.map((item, i) => (

                                                <TouchableOpacity key={i} onPress={() => setSelectedLocation(item)} style={{ flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: '#ddd', marginHorizontal: 10, width: '95%', height: 50, alignItems: 'center', alignSelf: 'center', overflow: 'hidden', zIndex: 9999 }}>
                                                    <Icon type={'Entypo'} name={'location'} style={{ marginHorizontal: 10, color: '#000', fontSize: 16 }}/>
                                                    <Text style={[ styles.text_gray, styles.textRegular , styles.textSize_14]}>{ (item.formatted_address).substr(0, 40) + '...' }</Text>
                                                </TouchableOpacity>
                                            ))
                                        }

                                    </ScrollView>
                                </View>
                            </View>
                            :
                            null
                    }

                    {
                        !initMap && userLocation.latitude != null ?
                            <MapView
                                ref={mapRef}
                                onRegionChangeComplete={(e) =>  _handleMapRegionChange(e)}
                                style={{ width: '100%', height: '100%', zIndex: 0 }}
                                initialRegion={userLocation}
                            >
                            </MapView>
                            :
                            null
                    }

                    <View style={{ left: '50%', marginLeft: -24, marginTop: -48, position: 'absolute', top: '50%', zIndex: 9999999, width: 25, height: 25 }}>
                        <Image style={{width: 35, height: 35}} resizeMode={'contain'} source={require('../../assets/images/redMarker.png')} />
                    </View>
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


