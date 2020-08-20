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
    const [checkedArr, setCheckedArr] = useState([]);
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);


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


    return (
        <Container>
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


                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('basicDetails')} style={[styles.babyblueBtn , styles.Width_85, styles.marginBottom_50 ]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('continue') }</Text>
                        </TouchableOpacity>

                    </View>
                </View>

            </Content>
        </Container>
    );
}

export default DetailsAdded;


