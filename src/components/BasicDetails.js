import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Vibration,
    KeyboardAvoidingView
} from "react-native";
import {Container, Content, CheckBox, Form, Item, Label, Input, Textarea} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function BasicDetails({navigation , route}) {

    const adDetails = route.params ? route.params.adDetails : null;
    const [title_ar, setTitle_ar] = useState(adDetails ? adDetails.detailes.title_ar : '');
    const [buildDesc, setBuildDesc] = useState(adDetails ? adDetails.detailes.description_ar : '');

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
    const price = route.params ? route.params.price : null;
    const space = route.params ? route.params.space : null;
    const meter_price = route.params ? route.params.meter_price : null;
    const street_view = route.params ? route.params.street_view : null;
    const age = route.params ? route.params.age : null;
    const bathroom = route.params ? route.params.bathroom : null;
    const images = route.params ? route.params.images : null;
    const imagesUrl = route.params ? route.params.imagesUrl : null;
    const checkedArrNames = route.params ? route.params.checkedArrNames : null;
    const pathName = route.params ? route.params.pathName : null;
    const ad_id = route.params ? route.params.ad_id : null;

    return (
         <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('basicDetails') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_25 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <KeyboardAvoidingView style={[styles.Width_85, styles.flexCenter,{flex:1}]}>
                        <Form style={[styles.Width_100 , styles.directionColumnSpace ,{flex:1}]}>

                            <View style={[styles.Width_100]}>


                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('title') }</Label>
                                    <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                           onChangeText={(title_ar) => setTitle_ar(title_ar)}
                                           value={title_ar}
                                    />
                                </Item>

                                <View style={[styles.marginBottom_25]}>
                                    <Label style={[styles.label ,styles.textRegular ,styles.text_midGray, {backgroundColor:'#fff'}]}>{ i18n.t('buildDesc') }</Label>
                                    <Textarea
                                        style={[styles.input, styles.height_120,styles.paddingVertical_20, styles.text_midGray, {borderColor:COLORS.midGray}]}
                                        onChangeText={(buildDesc) => setBuildDesc(buildDesc)}
                                        value={buildDesc}
                                    />
                                </View>

                            </View>
                            {
                                title_ar != ''  && buildDesc != ''?
                                    <TouchableOpacity onPress={() => navigation.navigate('adFee'
                                        ,{
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
                                            description_ar:buildDesc,
                                            price,
                                            space,
                                            meter_price,
                                            street_view,
                                            featArr,
                                            checkedArrNames,
                                            pathName,
                                            ad_id,

                                        })} style={[styles.babyblueBtn , styles.Width_100, styles.marginBottom_50 ]}>
                                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('continue') }</Text>
                                    </TouchableOpacity>
                                    :
                                    <TouchableOpacity style={[styles.babyblueBtn , styles.Width_100, styles.marginBottom_50 , {backgroundColor:'#bbb'} ]}>
                                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('continue') }</Text>
                                    </TouchableOpacity>
                            }

                        </Form>
                    </KeyboardAvoidingView>

                </View>

            </Content>
        </Container>
    );
}

export default BasicDetails;


