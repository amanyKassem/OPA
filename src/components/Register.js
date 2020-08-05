import React, { useState , useEffect } from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    KeyboardAvoidingView,
    AsyncStorage,
    ActivityIndicator,
    I18nManager
} from "react-native";
import {Container, Content, Form, Input, Item, Label, Toast , CheckBox} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import RNPickerSelect from 'react-native-picker-select';
import {useSelector, useDispatch} from 'react-redux';


const isIOS = Platform.OS === 'ios';

function Register({navigation}) {

    const lang = useSelector(state => state.lang.lang);
    // const auth = useSelector(state => state.auth);

    const dispatch = useDispatch()

    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [spinner, setSpinner] = useState(false);



    function renderSubmit() {
        if (username == '' ||password == '' || phone == ''|| confirmPass == ''|| country == null) {
            return (
                <View
                    style={[styles.mstardaBtn , styles.Width_100 , styles.marginBottom_10 , {
                        backgroundColor:'#fff'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_green , styles.textSize_16]}>{ i18n.t('register') }</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => onLoginPressed()} style={[styles.mstardaBtn , styles.Width_100, styles.marginBottom_10]}>
                <Text style={[styles.textRegular , styles.text_green , styles.textSize_16]}>{ i18n.t('register') }</Text>
            </TouchableOpacity>
        );
    }

    function onLoginPressed() {
        navigation.navigate('activationCode')
    }

    function renderLoader(){
        if (spinner){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.mstarda} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    return (
        <Container>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>
                <View style={[styles.position_R , styles.bgFullWidth, styles.Width_100 , styles.paddingHorizontal_25]}>

                    <Image source={require('../../assets/images/logo.png')} style={[styles.icon160 , styles.marginBottom_80 , styles.SelfCenter , styles.marginTop_60]} resizeMode={'contain'} />

                    <View style={[styles.directionRowSpace]}>
                        <KeyboardAvoidingView style={[styles.Width_85]}>
                            <Form style={[styles.Width_100 , styles.flexCenter]}>

                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_mstarda]}>{ i18n.t('username') }</Label>
                                    <Input style={[styles.input]}
                                           onChangeText={(username) => setUsername(username)}
                                    />
                                </Item>

                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_mstarda]}>{ i18n.t('phone') }</Label>
                                    <Input style={[styles.input]}
                                           onChangeText={(phone) => setPhone(phone)}
                                           keyboardType={'number-pad'}
                                    />
                                </Item>


                                <View style={[styles.inputPicker , styles.flexCenter, styles.marginBottom_20 , styles.Width_100]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_mstarda, {left:0}]}>{ i18n.t('country') }</Label>

                                    <RNPickerSelect
                                        style={{
                                            inputAndroid: {
                                                fontFamily: 'cairo',
                                                color:'#fff',
                                                textAlign           : I18nManager.isRTL ? 'right' : 'left',
                                                fontSize            : 14,
                                            },
                                            inputIOS: {
                                                fontFamily: 'cairo',
                                                color:'#fff',
                                                alignSelf:'flex-start',
                                                textAlign           : I18nManager.isRTL ? 'right' : 'left',
                                                fontSize            : 14,
                                            },
                                        }}
                                        placeholder={{
                                            label: '' ,
                                        }}
                                        onValueChange={(country) => setCountry(country)}
                                        // items={cities ?
                                        //     cities.map((city, i) => {
                                        //             return (
                                        //                 { label: city.name, value: city.id , key: city.id}
                                        //             )
                                        //         }
                                        //     )
                                        //     :  [] }
                                        items={[
                                            { label: 'قاهره', value: 'cairo' },
                                            { label: 'منصورة', value: 'Mansoura' },
                                            { label: 'اسكندرية', value: 'Alex' },
                                        ]}
                                        Icon={() => {
                                            return <Image source={require('../../assets/images/dropdown.png')} style={[styles.icon15 , {top: isIOS ? 7 : 18}]} resizeMode={'contain'} />
                                        }}
                                    />
                                </View>

                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_mstarda]}>{ i18n.t('password') }</Label>
                                    <Input style={[styles.input]}
                                           onChangeText={(password) => setPassword(password)}
                                           secureTextEntry
                                    />
                                </Item>

                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_mstarda]}>{ i18n.t('confirmPass') }</Label>
                                    <Input style={[styles.input]}
                                           onChangeText={(confirmPass) => setConfirmPass(confirmPass)}
                                           secureTextEntry
                                    />
                                </Item>

                                {renderSubmit()}

                                <TouchableOpacity onPress={() => navigation.navigate('terms')}
                                                  style={[styles.Width_100, styles.marginBottom_20 , styles.marginTop_5  , styles.directionRowCenter]}>
                                    <CheckBox style={[styles.checkBox]} onPress={() => setIsChecked(!isChecked)} checked={isChecked} color={COLORS.mstarda}/>
                                    <Text style={[styles.textRegular , styles.text_White , styles.textDecoration , styles.textSize_14]}>{ i18n.t('agreeTo') }</Text>
                                </TouchableOpacity>


                            </Form>
                        </KeyboardAvoidingView>

                        <TouchableOpacity onPress={() => navigation.navigate('login')} style={[styles.mstardaBtn ,{
                            backgroundColor:'#fff',
                            transform: [{ rotate: '90deg' }],
                            right:'14%',
                            width:'70%',
                            top:-30,
                        }]}>
                            <Text style={[styles.textRegular , styles.text_green , styles.textSize_16]}>{ i18n.t('login') }</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </Content>
        </Container>
    );
}

export default Register;


