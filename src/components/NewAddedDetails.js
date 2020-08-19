import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions, I18nManager
} from "react-native";
import {Container, Content, CheckBox, Form, Label} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import Header from '../common/Header';
import RNPickerSelect from 'react-native-picker-select';
import COLORS from "../consts/colors";
import {useDispatch, useSelector} from "react-redux";
import {getFeatures} from "../actions";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function NewAddedDetails({navigation}) {

    const [selectedID, setSelectedID] = useState(false);
    const [checkedArr, setCheckedArr] = useState([]);
    // const checkedArr = [];
    const [isChecked, setIsChecked] = useState(false);
    const [minimum, setMinimum] = useState('');
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const features = useSelector(state => state.features.features);
    const featuresLoader = useSelector(state => state.features.loader);

    const dispatch = useDispatch();

    function fetchData() {
        dispatch(getFeatures(lang , token));
    }

    function checkArr(id){
        if(!checkedArr.includes(id)){
            setCheckedArr([...checkedArr,id])
        }else{
            const index = checkedArr.indexOf(id);
            if (index > -1) {
                setCheckedArr(checkedArr.splice(index, 1));
            }
        }
        console.log(checkedArr)
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , featuresLoader]);

    return (
        <Container>
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
                                                <View key={i} style={[styles.inputPicker ,styles.marginBottom_20 ,styles.directionRowSpace , styles.Width_100,styles.SelfCenter,
                                                    {borderColor:COLORS.midGray,paddingLeft:10,paddingRight:20}]}>
                                                    <Text style={[styles.textBold , styles.text_midGray , styles.textSize_12]}>{feat.name}</Text>
                                                    <CheckBox
                                                        checked={checkedArr.indexOf(feat.id) !== -1}
                                                        color={COLORS.midGray}
                                                        onPress={() => checkArr(feat.id)}
                                                        style={styles.checkbox}
                                                    />
                                                </View>
                                            )
                                        }
                                    )
                                    :  []
                            }


                            <Text style={[styles.textRegular , styles.text_babyblue , styles.textSize_16,styles.marginBottom_25, styles.alignStart]}>{ i18n.t('basicDetails') }</Text>
                            <View style={[styles.inputPicker , styles.flexCenter, styles.marginBottom_20 , styles.Width_100, {borderColor:COLORS.midGray}]}>
                                <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {left:0, backgroundColor:'#fff'}]}>{ i18n.t('minimum') }</Label>

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
                                    onValueChange={(minimum) => setMinimum(minimum)}
                                    items={[
                                        { label: '1', value: '1' },
                                        { label: '2', value: '2' },
                                        { label: '3', value: '3' },
                                    ]}
                                    Icon={() => {
                                        return <Image source={require('../../assets/images/dropdown_arrow.png')} style={[styles.icon15 , {top: isIOS ? 7 : 18 , right:-8}]} resizeMode={'contain'} />
                                    }}
                                    value={minimum}
                                />
                            </View>
                            <TouchableOpacity onPress={() => setIsChecked(!isChecked)}
                                              style={[styles.marginBottom_30 , styles.marginTop_5  , styles.directionRowCenter, styles.alignStart]}>
                                <CheckBox style={[styles.checkBox, {marginLeft:-10}]} onPress={() => setIsChecked(!isChecked)} checked={isChecked} color={COLORS.babyblue}/>
                                <Text style={[styles.textRegular , styles.text_light_gray , styles.textDecoration , styles.textSize_14]}>{ i18n.t('sendNoti') }</Text>
                            </TouchableOpacity>

                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('contracting')} style={[styles.babyblueBtn , styles.Width_100, styles.marginBottom_50 ]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('continue') }</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </Content>
        </Container>
    );
}

export default NewAddedDetails;

