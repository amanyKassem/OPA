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
import {Container, Content, CheckBox, Form} from 'native-base'
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
    const [checkedArr, setCheckedArr] = useState([]);
    const [checkedArrNames, setCheckedArrNames] = useState([]);
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);

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
    const pathName = route.params ? route.params.pathName : null;
    const adDetails = route.params ? route.params.adDetails : null;
    const ad_id = route.params ? route.params.ad_id : null;


    useEffect(() => {

        editFeatuers ?
            editFeatuers.map((feat, i) => {
                checkedArr.push(feat.id)
                checkedArrNames.push(feat.name)
                setCheckedArr([...checkedArr])
                setCheckedArrNames([...checkedArrNames])
            })
            :
            null

    }, []);

    function checkArr(id , name){
        if(!checkedArr.includes(id)){
            setCheckedArr([...checkedArr,id])
            setCheckedArrNames([...checkedArrNames,name])
        }else{
            const index = checkedArr.indexOf(id);
            if (index > -1) {
                checkedArr.splice(index, 1)
                checkedArrNames.splice(index, 1)
                setCheckedArr([...checkedArr]);
                setCheckedArrNames([...checkedArrNames])
            }
        }
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
                                    featuers.map((feat, i) => {
                                            return (
                                                <TouchableOpacity onPress={() => checkArr(feat.id, feat.name)} key={i} style={[styles.inputPicker ,styles.marginBottom_20 ,styles.directionRowSpace , styles.Width_100,styles.SelfCenter,
                                                    {borderColor:COLORS.midGray,paddingLeft:10,paddingRight:20}]}>
                                                    <Text style={[styles.textBold , styles.text_midGray , styles.textSize_12]}>{feat.name}</Text>
                                                    <CheckBox
                                                        checked={checkedArr.indexOf(feat.id) !== -1}
                                                        color={COLORS.midGray}
                                                        onPress={() => checkArr(feat.id , feat.name)}
                                                        style={styles.checkbox}
                                                    />
                                                </TouchableOpacity>
                                            )
                                        }
                                    )
                                    :  []
                            }


                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('basicDetails'  ,{
                            features : checkedArr,
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
                            pathName,
                            adDetails,
                            ad_id,
                            featArr: featuers,
                            checkedArrNames
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