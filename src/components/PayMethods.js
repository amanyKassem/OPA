import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
} from "react-native";
import {Container, Content,Radio} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function PayMethods({navigation , route}) {

    const [payMethod, setPayMethod] = useState('0');
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

    return (
         <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('payMethods') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_35 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.Width_100 , styles.directionColumnSpace ,{flex:1}]}>

                        <View style={[styles.rowGroup]}>
                            <TouchableOpacity onPress={() => setPayMethod('0')} style={[styles.marginBottom_25]}>
                                <View style={[styles.bg_light_gray , {padding:20}]}>
                                    <Image source={require("../../assets/images/mastercard.png")} style={[isIOS ? styles.width_80 : styles.width_70,styles.height_40]} resizeMode={'cover'} />
                                </View>
                                <View style={[styles.directionRowReverse , styles.marginTop_10]}>
                                    <Radio
                                        color={COLORS.babyblue}
                                        selectedColor={COLORS.babyblue}
                                        selected={payMethod === '0'}
                                        onPress={() => setPayMethod('0')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_16 , {marginRight:10}]}>Master card</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setPayMethod('1')} style={[styles.marginBottom_25]}>
                                <View style={[styles.bg_light_gray , {padding:20}]}>
                                    <Image source={require("../../assets/images/visa.png")} style={[isIOS ? styles.width_80 : styles.width_70,styles.height_40]} resizeMode={'cover'} />
                                </View>
                                <View style={[styles.directionRowReverse , styles.marginTop_10]}>
                                    <Radio
                                        color={COLORS.babyblue}
                                        selectedColor={COLORS.babyblue}
                                        selected={payMethod === '1'}
                                        onPress={() => setPayMethod('1')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_16 , {marginRight:10}]}>Visa card</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setPayMethod('2')} style={[styles.marginBottom_25]}>
                                <View style={[styles.bg_light_gray , {padding:20}]}>
                                    <Image source={require("../../assets/images/Mada_Logo.png")} style={[isIOS ? styles.width_80 : styles.width_70,styles.height_40]} resizeMode={'cover'} />
                                </View>
                                <View style={[styles.directionRowReverse , styles.marginTop_10]}>
                                    <Radio
                                        color={COLORS.babyblue}
                                        selectedColor={COLORS.babyblue}
                                        selected={payMethod === '2'}
                                        onPress={() => setPayMethod('2')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_16 , {marginRight:10}]}>Mada</Text>
                                </View>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => setPayMethod('3')} style={[styles.marginBottom_25]}>
                                <View style={[styles.bg_light_gray , {padding:20}]}>
                                    <Image source={require("../../assets/images/paypal.png")} style={[isIOS ? styles.width_80 : styles.width_70,styles.height_40]} resizeMode={'cover'} />
                                </View>
                                <View style={[styles.directionRowReverse , styles.marginTop_10]}>
                                    <Radio
                                        color={COLORS.babyblue}
                                        selectedColor={COLORS.babyblue}
                                        selected={payMethod === '3'}
                                        onPress={() => setPayMethod('3')}
                                    />
                                    <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_16 , {marginRight:10}]}>Paypal</Text>
                                </View>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('reviewAd' ,{
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
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('continue') }</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </Content>
        </Container>
    );
}

export default PayMethods;


