import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions, I18nManager, ActivityIndicator
} from "react-native";
import {Container, Content, CheckBox, Form, Label, Input, Item, Toast} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import Header from '../common/Header';
import RNPickerSelect from 'react-native-picker-select';
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {getFeatures, AddAdOrder} from "../actions";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function NewAddedDetails({navigation , route}) {

    const category_id = route.params.category_id;
    const rent_id = route.params.rent_id;
    const type_id = route.params.type_id;
    const Latitude = route.params.Latitude;
    const Longitude = route.params.Longitude;
    const rooms = route.params.rooms;
    const hall = route.params.hall;
    const bathroom = route.params.bathroom;
    const floor = route.params.floor;
    const age = route.params.age;
    const price = route.params ? route.params.price : null;
    const space = route.params ? route.params.space : null;
    const meter_price = route.params ? route.params.meter_price : null;
    const street_view = route.params ? route.params.street_view : null;


    const [basicDetails, setBasicDetails] = useState('');
    const [checkedArr, setCheckedArr] = useState([]);
    const [isChecked, setIsChecked] = useState(false);
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    // const features = useSelector(state => state.features.features);
    // const featuresLoader = useSelector(state => state.features.loader);
    const features = route.params.featuers;

    const [isSubmitted, setIsSubmitted] = useState(false);

    const dispatch = useDispatch();

    // function fetchData() {
    //     dispatch(getFeatures(lang , token));
    // }

    function checkArr(id){
        if(!checkedArr.includes(id)){
            setCheckedArr([...checkedArr,id])
        }else{
            const index = checkedArr.indexOf(id);
            if (index > -1) {
                checkedArr.splice(index, 1)
                setCheckedArr([...checkedArr]);
            }
        }
    }

    // useEffect(() => {
    //     fetchData();
    //     const unsubscribe = navigation.addListener('focus', () => {
    //         fetchData();
    //     });
    //
    //     return unsubscribe;
    // }, [navigation , featuresLoader]);

    useEffect(() => {
        setIsSubmitted(false)
    }, [isSubmitted]);

    function renderConfirm(){
        if (isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginBottom_50]}>
                    <ActivityIndicator size="large" color={COLORS.babyblue} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={() => onConfirm()} style={[styles.babyblueBtn , styles.Width_100, styles.marginBottom_50 ]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('continue') }</Text>
            </TouchableOpacity>

        );
    }

    function onConfirm(){

        setIsSubmitted(true)
        dispatch(AddAdOrder(lang , category_id , rent_id , type_id , Latitude , Longitude , rooms , hall , bathroom , floor , age ,basicDetails ,isChecked , checkedArr , token , navigation));
    }



    return (
         <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('detailsAdded') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_25 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.Width_85 , styles.flexCenter , styles.directionColumnSpace ,{flex:1}]}>
                        <View style={[styles.Width_100]}>

                            {
                                features ?
                                    features.map((feat, i) => {
                                            return (
                                                <TouchableOpacity onPress={() => checkArr(feat.id)} key={i} style={[styles.inputPicker ,styles.marginBottom_20 ,styles.directionRowSpace , styles.Width_100,styles.SelfCenter,
                                                    {borderColor:COLORS.midGray,paddingLeft:10,paddingRight:20}]}>
                                                    <Text style={[styles.textBold , styles.text_midGray , styles.textSize_12]}>{feat.name}</Text>
                                                    <CheckBox
                                                        checked={checkedArr.indexOf(feat.id) !== -1}
                                                        color={COLORS.midGray}
                                                        onPress={() => checkArr(feat.id)}
                                                        style={styles.checkbox}
                                                    />
                                                </TouchableOpacity>
                                            )
                                        }
                                    )
                                    :  []
                            }


                            <Text style={[styles.textRegular , styles.text_babyblue , styles.textSize_16,styles.marginBottom_25, styles.alignStart]}>{ i18n.t('basicDetails') }</Text>

                            <Item style={[styles.item]}>
                                {/*<Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('details') }</Label>*/}
                                <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                       onChangeText={(basicDetails) => setBasicDetails(basicDetails)}
                                       value={basicDetails}
                                />
                            </Item>

                            <TouchableOpacity onPress={() => setIsChecked(!isChecked)}
                                              style={[styles.marginBottom_30 , styles.marginTop_5  , styles.directionRowCenter, styles.alignStart]}>
                                <CheckBox style={[styles.checkBox, {marginLeft:-10}]} onPress={() => setIsChecked(!isChecked)} checked={isChecked} color={COLORS.babyblue}/>
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textDecoration , styles.textSize_14]}>{ i18n.t('sendNoti') }</Text>
                            </TouchableOpacity>

                        </View>

                        {renderConfirm()}

                    </View>
                </View>

            </Content>
        </Container>
    );
}

export default NewAddedDetails;


