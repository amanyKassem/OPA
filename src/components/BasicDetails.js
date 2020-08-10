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

function BasicDetails({navigation}) {

    const [totalPrice, setTotalPrice] = useState('');
    const [buildDesc, setBuildDesc] = useState('');

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('basicDetails') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_25 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <KeyboardAvoidingView style={[styles.Width_85, styles.flexCenter,{flex:1}]}>
                        <Form style={[styles.Width_100 , styles.directionColumnSpace ,{flex:1}]}>

                            <View style={[styles.Width_100]}>
                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('totalPrice') }</Label>
                                    <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                           onChangeText={(totalPrice) => setTotalPrice(totalPrice)}
                                           value={totalPrice}
                                    />
                                    <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13 , {position:'absolute' , right:10}]}>{ i18n.t('RS') }</Text>
                                </Item>

                                <View style={[styles.marginBottom_35]}>
                                    <Label style={[styles.label ,styles.textRegular ,styles.text_midGray, {backgroundColor:'#fff'}]}>{ i18n.t('buildDesc') }</Label>
                                    <Textarea
                                        style={[styles.input, styles.height_120,styles.paddingVertical_20, styles.text_midGray, {borderColor:COLORS.midGray}]}
                                        onChangeText={(buildDesc) => setBuildDesc(buildDesc)}
                                        value={buildDesc}
                                    />
                                </View>

                            </View>
                            <TouchableOpacity onPress={() => navigation.navigate('adFee')} style={[styles.babyblueBtn , styles.Width_100, styles.marginBottom_50 ]}>
                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('continue') }</Text>
                            </TouchableOpacity>
                        </Form>
                    </KeyboardAvoidingView>

                </View>

            </Content>
        </Container>
    );
}

export default BasicDetails;


