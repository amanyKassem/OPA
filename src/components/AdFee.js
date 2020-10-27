import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    TouchableOpacity,
    Dimensions, ActivityIndicator, I18nManager,
} from "react-native";
import {Container, Content} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector, useDispatch} from 'react-redux';
import {getAdFees} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function AdFee({navigation , route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const adFees = useSelector(state => state.adFees.adFees);
    const loader = useSelector(state => state.adFees.loader);

    const featArr = route.params ? route.params.featArr : null;
    const features = route.params ? route.params.features : null;
    const category_id = route.params ? route.params.category_id : null;
    const Latitude = route.params ? route.params.Latitude : null;
    const Longitude = route.params ? route.params.Longitude : null;
    const address = route.params ? route.params.address : null;
    const rent_id = route.params ? route.params.rent_id : null;
    const type_id = route.params ? route.params.type_id : null;
    const hall = route.params ? route.params.hall : null;
    const floor = route.params ? route.params.floor : null;
    const rooms = route.params ? route.params.rooms : null;
    const age = route.params ? route.params.age : null;
    const bathroom = route.params ? route.params.bathroom : null;
    const images = route.params ? route.params.images : null;
    const imagesUrl = route.params ? route.params.imagesUrl : null;
    const title_ar = route.params ? route.params.title_ar : null;
    const title_en = route.params ? route.params.title_en : null;
    const description_ar = route.params ? route.params.description_ar : null;
    const description_en = route.params ? route.params.description_en : null;
    const price = route.params ? route.params.price : null;
    const space = route.params ? route.params.space : null;
    const street_view = route.params ? route.params.street_view : null;
    const meter_price = route.params ? route.params.meter_price : null;
    const checkedArrNames = route.params ? route.params.checkedArrNames : null;
    const pathName = route.params ? route.params.pathName : null;
    const ad_id = route.params ? route.params.ad_id : null;

    const dispatch = useDispatch()

    function fetchData(){
        dispatch(getAdFees(lang,token))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , loader]);

    function renderLoader(){
        if (loader === false){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }



    return (
         <Container style={[styles.bg_gray]}>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('adFee') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_25 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.Width_100 , styles.directionColumnSpace ,{flex:1}]}>


                        {
                            adFees?
                                <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_16 , styles.marginBottom_5, styles.alignStart]}>--{adFees.ad_fees}</Text>
                                :
                                null
                        }


                        {
                            pathName === 'contactUs' ?
                                null :
                                <TouchableOpacity onPress={() => navigation.navigate('payMethods',{
                                    features,
                                    category_id,
                                    Latitude,
                                    Longitude,
                                    address,
                                    rent_id,
                                    type_id,
                                    hall,
                                    floor,
                                    rooms,
                                    age,
                                    bathroom,
                                    images,
                                    imagesUrl,
                                    title_ar,
                                    title_en,
                                    description_ar,
                                    description_en,
                                    price,
                                    space,
                                    street_view,
                                    meter_price,
                                    featArr,
                                    checkedArrNames,
                                    pathName,
                                    ad_id,

                                })} style={[styles.babyblueBtn , styles.Width_100, styles.marginBottom_50 ]}>
                                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('feeCommit') }</Text>
                                </TouchableOpacity>
                        }



                    </View>
                </View>

            </Content>
        </Container>
    );
}

export default AdFee;


