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
import {useSelector} from "react-redux";
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function DetailsAdded({navigation}) {

    const [isSelected, setSelection] = useState(false);

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('detailsAdded') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_25 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.Width_100 , styles.directionColumnSpace ,{flex:1}]}>
                        <View style={[styles.Width_100]}>
                            <View style={[styles.inputPicker ,styles.marginBottom_20 ,styles.directionRowSpace , styles.Width_85,styles.SelfCenter,
                                {borderColor:COLORS.midGray,paddingLeft:10,paddingRight:20}]}>
                                <Text style={[styles.textBold , styles.text_midGray , styles.textSize_12]}>مؤقتة</Text>
                                <CheckBox
                                    checked={isSelected}
                                    color={COLORS.midGray}
                                    onPress={() => setSelection(!isSelected)}
                                    style={styles.checkbox}
                                />
                            </View>

                            <View style={[styles.inputPicker ,styles.marginBottom_20 ,styles.directionRowSpace , styles.Width_85,styles.SelfCenter,
                                {borderColor:COLORS.midGray,paddingLeft:10,paddingRight:20}]}>
                                <Text style={[styles.textBold , styles.text_midGray , styles.textSize_12]}>مطبخ</Text>
                                <CheckBox
                                    checked={isSelected}
                                    color={COLORS.midGray}
                                    onPress={() => setSelection(!isSelected)}
                                    style={styles.checkbox}
                                />
                            </View>

                            <View style={[styles.inputPicker ,styles.marginBottom_20 ,styles.directionRowSpace , styles.Width_85,styles.SelfCenter,
                                {borderColor:COLORS.midGray,paddingLeft:10,paddingRight:20}]}>
                                <Text style={[styles.textBold , styles.text_midGray , styles.textSize_12]}>ملحق</Text>
                                <CheckBox
                                    checked={isSelected}
                                    color={COLORS.midGray}
                                    onPress={() => setSelection(!isSelected)}
                                    style={styles.checkbox}
                                />
                            </View>

                            <View style={[styles.inputPicker ,styles.marginBottom_20 ,styles.directionRowSpace , styles.Width_85,styles.SelfCenter,
                                {borderColor:COLORS.midGray,paddingLeft:10,paddingRight:20}]}>
                                <Text style={[styles.textBold , styles.text_midGray , styles.textSize_12]}>مدخل سياره</Text>
                                <CheckBox
                                    checked={isSelected}
                                    color={COLORS.midGray}
                                    onPress={() => setSelection(!isSelected)}
                                    style={styles.checkbox}
                                />
                            </View>

                            <View style={[styles.inputPicker ,styles.marginBottom_20 ,styles.directionRowSpace , styles.Width_85,styles.SelfCenter,
                                {borderColor:COLORS.midGray,paddingLeft:10,paddingRight:20}]}>
                                <Text style={[styles.textBold , styles.text_midGray , styles.textSize_12]}>مصعد</Text>
                                <CheckBox
                                    checked={isSelected}
                                    color={COLORS.midGray}
                                    onPress={() => setSelection(!isSelected)}
                                    style={styles.checkbox}
                                />
                            </View>

                            <View style={[styles.inputPicker ,styles.marginBottom_20 ,styles.directionRowSpace , styles.Width_85,styles.SelfCenter,
                                {borderColor:COLORS.midGray,paddingLeft:10,paddingRight:20}]}>
                                <Text style={[styles.textBold , styles.text_midGray , styles.textSize_12]}>مكيف</Text>
                                <CheckBox
                                    checked={isSelected}
                                    color={COLORS.midGray}
                                    onPress={() => setSelection(!isSelected)}
                                    style={styles.checkbox}
                                />
                            </View>

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


