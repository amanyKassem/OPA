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
import {Container, Content, CheckBox, Form, Item, Label, Input} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function DetailsAdded({navigation , route}) {

    const featuers = route.params.featuers;
    const editFeatuers = route.params.editFeatuers;
    const [checkedArrNames, setCheckedArrNames] = useState(featuers);
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);

    const category_id = route.params ? route.params.category_id : null;
    const Latitude = route.params ? route.params.Latitude : null;
    const Longitude = route.params ? route.params.Longitude : null;
    const address = route.params ? route.params.address : null;
    const rent_id = route.params ? route.params.rent_id : null;
    const type_id = route.params ? route.params.type_id : null;

    const images = route.params ? route.params.images : null;
    const imagesUrl = route.params ? route.params.imagesUrl : null;
    const pathName = route.params ? route.params.pathName : null;
    const adDetails = route.params ? route.params.adDetails : null;
    const ad_id = route.params ? route.params.ad_id : null;


    useEffect(() => {

        editFeatuers ?
            setCheckedArrNames(editFeatuers)
            :
            null

    }, []);



    const modifyFeatures = (feature , inputVal) => {

        let newFeatures = checkedArrNames;
        let newFeature = feature;
        const index = checkedArrNames.indexOf(feature);

        if(feature.type == 'checkbox'){
            newFeature.value = !feature.value;
            newFeatures[index] = newFeature;
            setCheckedArrNames([...newFeatures])

        }else{
            newFeature.value = inputVal;
            newFeatures[index] = newFeature;
            setCheckedArrNames([...newFeatures])
        }

        console.log('newFeature' , newFeature)
        console.log('newFeatures' , newFeatures)
    }


    return (
         <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('detailsAdded') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_25 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.Width_100 , styles.directionColumnSpace ,{flex:1}]}>
                        <View style={[styles.Width_100]}>

                            {
                                featuers ?
                                    checkedArrNames.map((feat, i) => {

                                            return (
                                                feat.type == 'checkbox' ?
                                                    <TouchableOpacity onPress={() => modifyFeatures(feat)} key={i} style={[styles.inputPicker ,styles.marginBottom_20 ,styles.directionRowSpace , styles.Width_100,styles.SelfCenter,
                                                        {borderColor:COLORS.midGray,paddingLeft:10,paddingRight:20}]}>
                                                        <Text style={[styles.textBold , styles.text_midGray , styles.textSize_12]}>{feat.name}</Text>
                                                        <CheckBox
                                                            checked={feat.value == 1 || feat.value == true}
                                                            color={COLORS.midGray}
                                                            // onPress={() => checkArr(feat.id , feat.name)}
                                                            onPress={() => modifyFeatures(feat)}
                                                            style={styles.checkbox}
                                                        />
                                                    </TouchableOpacity>
                                                    :

                                                    <Item key={i} style={[styles.item]}>
                                                        <Label
                                                            style={[styles.label, styles.textRegular, styles.text_midGray, {backgroundColor: '#fff'}]}>{feat.name}</Label>
                                                        <Input
                                                            style={[styles.input, styles.text_midGray, {borderColor: COLORS.midGray}]}
                                                            multiline={isIOS ? false : true}
                                                            numberOfLines={isIOS ? null : 1}
                                                            onChangeText={(featVal) => modifyFeatures(feat, featVal)}
                                                            keyboardType={ feat.type == 'number' ? 'number-pad' : null}
                                                            value={feat.value}
                                                        />
                                                    </Item>
                                            )
                                        }
                                    )
                                    :  []
                            }


                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('basicDetails'  ,{
                            features : checkedArrNames,
                            category_id,
                            Latitude,
                            Longitude,
                            address,
                            rent_id,
                            type_id,
                            images,
                            imagesUrl,
                            pathName,
                            adDetails,
                            ad_id,
                        })} style={[styles.babyblueBtn , styles.Width_85, styles.marginBottom_50 ]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('continue') }</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </Content>
        </Container>
    );
}

export default DetailsAdded;