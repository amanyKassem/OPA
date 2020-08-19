import React , {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager} from "react-native";
import {Container, Content, Card, Label, Form, Input, Item} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import Header from '../common/Header';
import COLORS from "../consts/colors";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import axios from "axios";
import RNPickerSelect from 'react-native-picker-select';
import {getCategories , getRents , getTypes} from "../actions";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';
const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

function AddOrder({navigation,route}) {

    const [cityName, setCityName] = useState('');
    const [buildType, setBuildType] = useState('');
    const [accType, setAccType] = useState('');
    const [lounges, setLounges] = useState('');
    const [washrooms, setWashrooms] = useState('');
    const [rooms, setRooms] = useState('');
    const [floor, setFloor] = useState('');
    const [buildAge, setBuildAge] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [mapRegion, setMapRegion] = useState({
        latitude: 31.2587 ,
        longitude:32.2988,
        latitudeDelta,
        longitudeDelta
    });

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const categories = useSelector(state => state.categories.categories);
    const categoriesLoader = useSelector(state => state.categories.loader);
    const rents = useSelector(state => state.rents.rents);
    const rentsLoader = useSelector(state => state.rents.loader);
    const types = useSelector(state => state.types.types);
    const typesLoader = useSelector(state => state.types.loader);


    const dispatch = useDispatch()


    const fetchData = async () => {
        dispatch(getCategories(lang , token));
        dispatch(getRents(lang , token));
        dispatch(getTypes(lang , token));
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        let userLocation = {};
        if (status !== 'granted') {
            alert('صلاحيات تحديد موقعك الحالي ملغاه');
        }else {
            const { coords: { latitude, longitude } } = await Location.getCurrentPositionAsync({});
            userLocation = { latitude, longitude , latitudeDelta , longitudeDelta};
            setMapRegion(userLocation);
        }
        let getCity = 'https://maps.googleapis.com/maps/api/geocode/json?latlng=';
        getCity    += userLocation.latitude + ',' + userLocation.longitude;
        getCity    += '&key=AIzaSyCJTSwkdcdRpIXp2yG7DfSRKFWxKhQdYhQ&language=ar&sensor=true';
        try {
            const { data } = await axios.get(getCity);
            setCityName(data.results[0].formatted_address.substr(0,30))
        } catch (e) {
            console.log(e);
        }
    };

    useEffect(  () => {
        fetchData();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            if (route.params?.cityName) {
                setCityName(route.params.cityName.substr(0,30))
                setMapRegion(route.params.mapRegion)
            }
        });

        return unsubscribe;
    }, [navigation , route.params?.cityName, categoriesLoader , rentsLoader, typesLoader]);


    function navToLocation () {
        navigation.navigate("getLocation",{latitude:mapRegion.latitude , longitude:mapRegion.longitude,pathName:'addOrder'})
    };

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('addOrder') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.Width_85 , styles.flexCenter]}>

                        <TouchableOpacity onPress={() => navToLocation()} style={[styles.inputPicker , styles.directionRowSpace, styles.marginBottom_20 , styles.Width_100, {borderColor:COLORS.midGray , paddingLeft:15 ,paddingRight:8}]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {left:0, backgroundColor:'#fff'}]}>{ i18n.t('buildingLoc') }</Label>
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_14]}>{cityName}</Text>
                            <Image source={require('../../assets/images/placeholder_gray.png')} style={[styles.icon15]} resizeMode={'contain'} />
                        </TouchableOpacity>

                        <View style={[styles.inputPicker , styles.flexCenter, styles.marginBottom_20 , styles.Width_100, {borderColor:COLORS.midGray}]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {left:0, backgroundColor:'#fff'}]}>{ i18n.t('buildType') }</Label>

                            <RNPickerSelect
                                style={{
                                    inputAndroid: {
                                        fontFamily: 'cairo',
                                        color:COLORS.midGray,
                                        textAlign           : I18nManager.isRTL ? 'right' : 'left',
                                        fontSize            : 14,
                                    },
                                    inputIOS: {
                                        fontFamily: 'cairo',
                                        color:COLORS.midGray,
                                        alignSelf:'flex-start',
                                        textAlign           : I18nManager.isRTL ? 'right' : 'left',
                                        fontSize            : 14,
                                    },
                                }}
                                placeholder={{
                                    label: i18n.t('buildType') ,
                                }}
                                onValueChange={(buildType) => setBuildType(buildType)}
                                items={categories ?
                                    categories.map((cat, i) => {
                                            return (
                                                { label: cat.name, value: cat.id , key: cat.id}
                                            )
                                        }
                                    )
                                    :  [] }
                                Icon={() => {
                                    return <Image source={require('../../assets/images/dropdown_arrow.png')} style={[styles.icon15 , {top: isIOS ? 7 : 18, right:-9}]} resizeMode={'contain'} />
                                }}
                            />
                        </View>
                        <View style={[styles.inputPicker , styles.flexCenter, styles.marginBottom_20 , styles.Width_100, {borderColor:COLORS.midGray}]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {left:0, backgroundColor:'#fff'}]}>{ i18n.t('accType') }</Label>

                            <RNPickerSelect
                                style={{
                                    inputAndroid: {
                                        fontFamily: 'cairo',
                                        color:COLORS.midGray,
                                        textAlign           : I18nManager.isRTL ? 'right' : 'left',
                                        fontSize            : 14,
                                    },
                                    inputIOS: {
                                        fontFamily: 'cairo',
                                        color:COLORS.midGray,
                                        alignSelf:'flex-start',
                                        textAlign           : I18nManager.isRTL ? 'right' : 'left',
                                        fontSize            : 14,
                                    },
                                }}
                                placeholder={{
                                    label: i18n.t('accType') ,
                                }}
                                onValueChange={(AccType) => setAccType(AccType)}

                                items={types ?
                                    types.map((type, i) => {
                                            return (
                                                { label: type.name, value: type.id , key: type.id}
                                            )
                                        }
                                    )
                                    :  [] }
                                Icon={() => {
                                    return <Image source={require('../../assets/images/dropdown_arrow.png')} style={[styles.icon15 , {top: isIOS ? 7 : 18, right:-9}]} resizeMode={'contain'} />
                                }}
                            />
                        </View>

                        <Item style={[styles.item]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('lounges') }</Label>
                            <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                   onChangeText={(lounges) => setLounges(lounges)}
                                   keyboardType={'number-pad'}
                                   value={lounges}
                            />
                        </Item>

                        <Item style={[styles.item]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('washrooms') }</Label>
                            <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                   onChangeText={(washrooms) => setWashrooms(washrooms)}
                                   keyboardType={'number-pad'}
                                   value={washrooms}
                            />
                        </Item>

                        <Item style={[styles.item]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('rooms') }</Label>
                            <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                   onChangeText={(rooms) => setRooms(rooms)}
                                   keyboardType={'number-pad'}
                                   value={rooms}
                            />
                        </Item>

                        <Item style={[styles.item]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('floor') }</Label>
                            <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                   onChangeText={(floor) => setFloor(floor)}
                                   keyboardType={'number-pad'}
                                   value={floor}
                            />
                        </Item>

                        <Item style={[styles.item]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('buildAge') }</Label>
                            <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                   onChangeText={(buildAge) => setBuildAge(buildAge)}
                                   keyboardType={'number-pad'}
                                   value={buildAge}
                            />
                        </Item>

                        <View style={[styles.inputPicker , styles.flexCenter, styles.marginBottom_20 , styles.Width_100, {borderColor:COLORS.midGray}]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {left:0, backgroundColor:'#fff'}]}>{ i18n.t('serviceType') }</Label>

                            <RNPickerSelect
                                style={{
                                    inputAndroid: {
                                        fontFamily: 'cairo',
                                        color:COLORS.midGray,
                                        textAlign           : I18nManager.isRTL ? 'right' : 'left',
                                        fontSize            : 14,
                                    },
                                    inputIOS: {
                                        fontFamily: 'cairo',
                                        color:COLORS.midGray,
                                        alignSelf:'flex-start',
                                        textAlign           : I18nManager.isRTL ? 'right' : 'left',
                                        fontSize            : 14,
                                    },
                                }}
                                placeholder={{
                                    label: i18n.t('serviceType') ,
                                }}
                                onValueChange={(serviceType) => setServiceType(serviceType)}
                                items={rents ?
                                    rents.map((rent, i) => {
                                            return (
                                                { label: rent.name, value: rent.id , key: rent.id}
                                            )
                                        }
                                    )
                                    :  [] }
                                Icon={() => {
                                    return <Image source={require('../../assets/images/dropdown_arrow.png')} style={[styles.icon15 , {top: isIOS ? 7 : 18, right:-9}]} resizeMode={'contain'} />
                                }}
                            />
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('newAddedDetails' , {
                            category_id:buildType,
                            rent_id:serviceType,
                            type_id:accType,
                            Latitude:mapRegion.latitude,
                            Longitude:mapRegion.longitude,
                            rooms:rooms,
                            hall:lounges,
                            bathroom:washrooms,
                            floor:floor,
                            age:buildAge,
                        })}
                                          style={[styles.babyblueBtn , styles.flexCenter , styles.Width_100, styles.marginBottom_50 , styles.marginTop_20]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('agree') }</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default AddOrder;


