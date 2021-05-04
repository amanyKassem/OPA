import React , {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager, ActivityIndicator} from "react-native";
import {Container, Content, Card, Label, Form, Item, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import Header from '../common/Header';
import COLORS from "../consts/colors";
import axios from "axios";
import RNPickerSelect from 'react-native-picker-select';
import {useSelector , useDispatch} from "react-redux";
import {getCategories , getRents , getTypes , getSingleCategory} from "../actions";
import CONST from "../consts";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';
const latitudeDelta = 0.0922;
const longitudeDelta = 0.0421;

function EditAd({navigation,route}) {

    const adDetails = useSelector(state => state.adDetails.editAdDetails);
    const adDetailsLoader = useSelector(state => state.adDetails.loader);
    const [cityName, setCityName] = useState('');
    const [buildType, setBuildType] = useState( adDetails ? adDetails.detailes.category_id : null);
    const [accType, setAccType] = useState(adDetails ? adDetails.detailes.type_id : null);
    const [serviceType, setServiceType] = useState(adDetails ? adDetails.detailes.rent_id : null);


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
    const singleCategory = useSelector(state => state.singleCategory.singleCategory);
    const singleCategoryLoader = useSelector(state => state.singleCategory.loader);

    const ad_id = route.params.ad_id;

    const dispatch = useDispatch()

    const [screenLoader , setScreenLoader ] = useState(true);

    function fetchDetails(){
        axios({
            url         : CONST.url + 'editData',
            method      : 'POST',
            data        : {lang , ad_id},
            headers     : {Authorization: token}
        }).then(response => {
            dispatch({type: 'getEditAdDetails', payload: response.data});

            if(response.data.success){
                setScreenLoader(false)
                dispatch(getSingleCategory(lang ,response.data.data.detailes.category_id, token))

            }

        });
    }

    const fetchLoc = async () => {
        let userLocation = { latitude:adDetails ? adDetails.detailes.Latitude : null, longitude:adDetails ? adDetails.detailes.Longitude : null , latitudeDelta , longitudeDelta};
        setMapRegion(userLocation);
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


    function fetchData () {
        dispatch(getCategories(lang , token));
        dispatch(getRents(lang , token));
        dispatch(getTypes(lang , token));
    };


    function renderLoader(){
        if (screenLoader){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%' , backgroundColor:'#fff'}]}>
                    <ActivityIndicator size="large" color={COLORS.babyblue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    useEffect(() => {
        fetchDetails();
        fetchData();
        fetchLoc()
        const unsubscribe = navigation.addListener('focus', () => {
            fetchDetails();
        });

        return unsubscribe;
    }, [navigation , adDetailsLoader , adDetails ? adDetails.detailes.Latitude:null]);


    useEffect(  () => {
        setAccType('')
        setServiceType('')
    }, [buildType]);


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
        navigation.navigate("getLocation",{latitude:mapRegion.latitude , longitude:mapRegion.longitude,pathName:'editAd', address:cityName})
    };

    return (
         <Container style={[styles.bg_gray]}>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('editAd') }/>
                {
                    adDetails && singleCategory?
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
                                        onValueChange={(buildType) => { setBuildType(buildType) ;  buildType ? dispatch(getSingleCategory(lang , buildType , token)) : null}}
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
                                        value={buildType ? buildType : adDetails.detailes.category_id}
                                    />
                                </View>
                                {
                                    singleCategory.type_id === 1 ?
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
                                                value={accType? accType : adDetails.detailes.type_id}
                                            />
                                        </View>
                                        :
                                        null
                                }


                                {
                                    singleCategory.rent_id === 1 ?
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
                                                value={serviceType? serviceType : adDetails.detailes.rent_id}
                                            />
                                        </View>
                                        :
                                        null
                                }


                                {
                                    buildType || adDetails.detailes.category_id?
                                        <TouchableOpacity onPress={() => navigation.navigate('adImgs' , {
                                            category_id:buildType == null  ? adDetails.detailes.category_id : buildType,
                                            Latitude:mapRegion.latitude,
                                            Longitude:mapRegion.longitude,
                                            address:cityName == null  ? adDetails.detailes.address : cityName,
                                            rent_id:singleCategory.rent_id === 1 ? serviceType == null  ? adDetails.detailes.rent_id : serviceType : null,
                                            type_id:singleCategory.type_id === 1 ? accType == null  ? adDetails.detailes.type_id : accType : null,

                                            featuers:singleCategory.featuers,
                                            editFeatuers: (buildType == adDetails.detailes.category_id) || buildType == null  ? adDetails.detailes.features : null,
                                            images:adDetails.detailes.images,
                                            pathName:'editAd',
                                            adDetails:adDetails,
                                            ad_id,

                                        })}
                                                          style={[styles.babyblueBtn , styles.flexCenter , styles.Width_100, styles.marginBottom_50 , styles.marginTop_20]}>
                                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('agree') }</Text>
                                        </TouchableOpacity>
                                        :
                                        <View style={[styles.babyblueBtn , styles.flexCenter , styles.Width_100, styles.marginBottom_50 ,
                                            styles.marginTop_20 , {backgroundColor:'#bbb'}]}>
                                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('agree') }</Text>
                                        </View>
                                }


                            </View>

                        </View>
                        :
                        null
                }


            </Content>
        </Container>
    );
}

export default EditAd;


