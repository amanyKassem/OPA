import React , {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager} from "react-native";
import {Container, Content, Card, Label, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';
import COLORS from "../consts/colors";
import * as Permissions from 'expo-permissions';
import * as Location from 'expo-location';
import axios from "axios";
import RNPickerSelect from 'react-native-picker-select';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';
const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

function EditAd({navigation,route}) {

    const [cityName, setCityName] = useState('');
    const [buildType, setBuildType] = useState('home');
    const [accType, setAccType] = useState('families');
    const [lounges, setLounges] = useState('2');
    const [washrooms, setWashrooms] = useState('3');
    const [rooms, setRooms] = useState('3');
    const [floor, setFloor] = useState('2');
    const [buildAge, setBuildAge] = useState('3');
    const [serviceType, setServiceType] = useState('owner');
    const [mapRegion, setMapRegion] = useState({
        latitude: 31.2587 ,
        longitude:32.2988,
        latitudeDelta,
        longitudeDelta
    });


    const fetchData = async () => {
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
    }, [navigation , route.params?.cityName]);


    function navToLocation () {
        navigation.navigate("getLocation",{latitude:mapRegion.latitude , longitude:mapRegion.longitude,pathName:'editAd'})
    };

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('editAd') }/>

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
                                    label: '' ,
                                }}
                                onValueChange={(buildType) => setBuildType(buildType)}
                                items={[
                                    { label: 'شقة', value: 'home' },
                                    { label: 'سوبر ماركت', value: 'super market' },
                                ]}
                                Icon={() => {
                                    return <Image source={require('../../assets/images/dropdown_arrow.png')} style={[styles.icon15 , {top: isIOS ? 7 : 18, right:-9}]} resizeMode={'contain'} />
                                }}
                                value={buildType}
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
                                    label: '' ,
                                }}
                                onValueChange={(AccType) => setAccType(AccType)}
                                items={[
                                    { label: 'عائلات', value: 'families' },
                                    { label: 'اصدقاء', value: 'friends' },
                                ]}
                                Icon={() => {
                                    return <Image source={require('../../assets/images/dropdown_arrow.png')} style={[styles.icon15 , {top: isIOS ? 7 : 18, right:-9}]} resizeMode={'contain'} />
                                }}
                                value={accType}
                            />
                        </View>
                        <View style={[styles.inputPicker , styles.flexCenter, styles.marginBottom_20 , styles.Width_100, {borderColor:COLORS.midGray}]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {left:0, backgroundColor:'#fff'}]}>{ i18n.t('lounges') }</Label>

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
                                    label: '' ,
                                }}
                                onValueChange={(lounges) => setLounges(lounges)}
                                items={[
                                    { label: '2', value: '2' },
                                    { label: '3', value: '3' },
                                ]}
                                Icon={() => {
                                    return <Image source={require('../../assets/images/dropdown_arrow.png')} style={[styles.icon15 , {top: isIOS ? 7 : 18, right:-9}]} resizeMode={'contain'} />
                                }}
                                value={lounges}
                            />
                        </View>
                        <View style={[styles.inputPicker , styles.flexCenter, styles.marginBottom_20 , styles.Width_100, {borderColor:COLORS.midGray}]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {left:0, backgroundColor:'#fff'}]}>{ i18n.t('washrooms') }</Label>

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
                                    label: '' ,
                                }}
                                onValueChange={(washrooms) => setWashrooms(washrooms)}
                                items={[
                                    { label: '2', value: '2' },
                                    { label: '3', value: '3' },
                                ]}
                                Icon={() => {
                                    return <Image source={require('../../assets/images/dropdown_arrow.png')} style={[styles.icon15 , {top: isIOS ? 7 : 18, right:-9}]} resizeMode={'contain'} />
                                }}
                                value={washrooms}
                            />
                        </View>
                        <View style={[styles.inputPicker , styles.flexCenter, styles.marginBottom_20 , styles.Width_100, {borderColor:COLORS.midGray}]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {left:0, backgroundColor:'#fff'}]}>{ i18n.t('rooms') }</Label>

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
                                    label: '' ,
                                }}
                                onValueChange={(rooms) => setRooms(rooms)}
                                items={[
                                    { label: '2', value: '2' },
                                    { label: '3', value: '3' },
                                ]}
                                Icon={() => {
                                    return <Image source={require('../../assets/images/dropdown_arrow.png')} style={[styles.icon15 , {top: isIOS ? 7 : 18, right:-9}]} resizeMode={'contain'} />
                                }}
                                value={rooms}
                            />
                        </View>
                        <View style={[styles.inputPicker , styles.flexCenter, styles.marginBottom_20 , styles.Width_100, {borderColor:COLORS.midGray}]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {left:0, backgroundColor:'#fff'}]}>{ i18n.t('floor') }</Label>

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
                                    label: '' ,
                                }}
                                onValueChange={(floor) => setFloor(floor)}
                                items={[
                                    { label: '2', value: '2' },
                                    { label: '3', value: '3' },
                                ]}
                                Icon={() => {
                                    return <Image source={require('../../assets/images/dropdown_arrow.png')} style={[styles.icon15 , {top: isIOS ? 7 : 18, right:-9}]} resizeMode={'contain'} />
                                }}
                                value={floor}
                            />
                        </View>
                        <View style={[styles.inputPicker , styles.flexCenter, styles.marginBottom_20 , styles.Width_100, {borderColor:COLORS.midGray}]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {left:0, backgroundColor:'#fff'}]}>{ i18n.t('buildAge') }</Label>

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
                                    label: '' ,
                                }}
                                onValueChange={(buildAge) => setBuildAge(buildAge)}
                                items={[
                                    { label: '2', value: '2' },
                                    { label: '3', value: '3' },
                                ]}
                                Icon={() => {
                                    return <Image source={require('../../assets/images/dropdown_arrow.png')} style={[styles.icon15 , {top: isIOS ? 7 : 18, right:-9}]} resizeMode={'contain'} />
                                }}
                                value={buildAge}
                            />
                        </View>
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
                                    label: '' ,
                                }}
                                onValueChange={(serviceType) => setServiceType(serviceType)}
                                items={[
                                    { label: 'ايجار', value: 'rent' },
                                    { label: 'ملك', value: 'owner' },
                                ]}
                                Icon={() => {
                                    return <Image source={require('../../assets/images/dropdown_arrow.png')} style={[styles.icon15 , {top: isIOS ? 7 : 18, right:-9}]} resizeMode={'contain'} />
                                }}
                                value={serviceType}
                            />
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('adImgs')}
                                          style={[styles.babyblueBtn , styles.flexCenter , styles.Width_100, styles.marginBottom_50 , styles.marginTop_20]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('agree') }</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default EditAd;


