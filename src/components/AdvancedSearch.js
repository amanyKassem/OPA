import React , {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager} from "react-native";
import {Container, Content, Card, Label, Form, Item, Input} from 'native-base'
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

function AdvancedSearch({navigation,route}) {

    const [cityName, setCityName] = useState('');
    const [buildType, setBuildType] = useState('');
    const [serviceType, setServiceType] = useState('');
    const [areaOfBuild, setAreaOfBuild] = useState('');
    const [budgetFrom, setBudgetFrom] = useState('');
    const [budgetTo, setBudgetTo] = useState('');

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
        navigation.navigate("getLocation",{latitude:mapRegion.latitude , longitude:mapRegion.longitude,pathName:'advancedSearch'})
    };

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('advancedSearch') }/>

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
                            />
                        </View>

                        <Item style={[styles.item]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('areaOfBuild') }</Label>
                            <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                   onChangeText={(areaOfBuild) => setAreaOfBuild(areaOfBuild)}
                                   value={areaOfBuild}
                            />
                        </Item>

                        <Item style={[styles.item]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('budgetFrom') }</Label>
                            <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                   onChangeText={(budgetFrom) => setBudgetFrom(budgetFrom)}
                                   keyboardType={'number-pad'}
                                   value={budgetFrom}
                            />
                        </Item>

                        <Item style={[styles.item]}>
                            <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('budgetTo') }</Label>
                            <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                   onChangeText={(budgetTo) => setBudgetTo(budgetTo)}
                                   keyboardType={'number-pad'}
                                   value={budgetTo}
                            />
                        </Item>


                        <TouchableOpacity onPress={() => navigation.navigate('searchResults')}
                                          style={[styles.babyblueBtn , styles.flexCenter , styles.Width_100, styles.marginBottom_50 , styles.marginTop_20]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('search') }</Text>
                        </TouchableOpacity>

                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default AdvancedSearch;


