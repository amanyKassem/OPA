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
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {getCountries , register} from "../actions";


const isIOS = Platform.OS === 'ios';

function Register({navigation , route}) {

    const confirmCheck = route.params ? route.params.confirmCheck : false;

    const lang = useSelector(state => state.lang.lang);
    const auth = useSelector(state => state.auth);
    const countries = useSelector(state => state.countries.countries);
    const countriesLoader = useSelector(state => state.countries.loader);


    const dispatch = useDispatch()

    const [userImage, setUserImage] = useState(null);
    const [base64, setBase64] = useState('');
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [country, setCountry] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPass, setConfirmPass] = useState('');
    const [isChecked, setIsChecked] = useState(false);
    const [spinner, setSpinner] = useState(false);


    useEffect(() => {
        confirmCheck ?setIsChecked(confirmCheck) : null;
        dispatch(getCountries(lang))
    }, [countriesLoader , confirmCheck]);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            setSpinner(false)
        });
        setSpinner(false)
        return unsubscribe;
    }, [navigation, spinner]);

    const validate = () => {
        let isError         = false;
        let msg             = '';

        if (username.length <= 0) {
            isError     = true;
            msg         = i18n.t('name');
        } else if (phone.length <= 0 || phone.length !== 10) {
            isError     = true;
            msg         = i18n.t('phoneValidation');
        } else if (phone.length <= 0) {
            isError     = true;
            msg         = i18n.t('namereq');
        } else if (password.length < 6){
            isError     = true;
            msg         = i18n.t('passreq');
        } else if (password !== confirmPass){
            isError     = true;
            msg         = i18n.translate('notmatch');
        }

        if (msg !== '') {
            Toast.show({
                text        : msg,
                type        : "danger",
                duration    : 3000,
                textStyle   	: {
                    color       	: "white",
                    fontFamily  	: 'cairo',
                    textAlign   	: 'center'
                }
            });
        }

        return isError;
    };


    function renderSubmit() {
        if (username == '' || password == '' || phone == '' || confirmPass == '' || country == null || !isChecked) {
            return (
                <View
                    style={[styles.babyblueBtn , styles.Width_100 , styles.marginBottom_10 , {
                        backgroundColor:'#bbb'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('register') }</Text>
                </View>
            );
        }

        return (
            <TouchableOpacity
                onPress={() => onRegisterPressed()} style={[styles.babyblueBtn , styles.Width_100, styles.marginBottom_10]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('register') }</Text>
            </TouchableOpacity>
        );
    }

    function onRegisterPressed() {
        const err = validate();

        if (!err){
            setSpinner(true);
            const data = { username, phone, country, password,base64, lang };
            dispatch(register(data, navigation));
        }
    }

    function renderLoader(){
        if (spinner){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.babyblue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }

    const askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    const _pickImage = async () => {

        askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true
        });

        if (!result.cancelled) {
            setUserImage(result.uri);
            setBase64(result.base64);
        }
    };


    let image = userImage;

    return (
         <Container>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth]}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.marginTop_60 , styles.directionRow , {marginLeft:25}]}>
                    <Image source={require('../../assets/images/back_blueblack.png')} style={[styles.icon25, styles.transform, {marginRight:5}]} resizeMode={'contain'} />
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('createAcc') }</Text>
                </TouchableOpacity>

                <View style={[styles.position_R , styles.bgFullWidth, styles.Width_100 , styles.paddingHorizontal_25]}>

                    <TouchableOpacity onPress={_pickImage} >
                        <Image source= {image != null?{uri:image} : require('../../assets/images/upload_fram_white.png')} style={[styles.icon160 , styles.marginBottom_60 , styles.SelfCenter , styles.marginTop_40]} resizeMode={image != null? 'cover':'contain'} />
                    </TouchableOpacity>

                    <View style={[styles.directionRowSpace]}>
                        <KeyboardAvoidingView style={[styles.Width_100]}>
                            <Form style={[styles.Width_100 , styles.flexCenter]}>

                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_gray]}>{ i18n.t('username') }</Label>
                                    <Input style={[styles.input]}
                                           onChangeText={(username) => setUsername(username)}
                                    />
                                </Item>

                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_gray]}>{ i18n.t('phone') }</Label>
                                    <Input style={[styles.input]}
                                           onChangeText={(phone) => setPhone(phone)}
                                           keyboardType={'number-pad'}
                                    />
                                </Item>


                                <View style={[styles.inputPicker , styles.flexCenter, styles.marginBottom_20 , styles.Width_100]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_gray, {left:0}]}>{ i18n.t('country') }</Label>

                                    <RNPickerSelect
                                        style={{
                                            inputAndroid: {
                                                fontFamily: 'cairo',
                                                color:'#323232',
                                                textAlign           : I18nManager.isRTL ? 'right' : 'left',
                                                fontSize            : 14,
                                            },
                                            inputIOS: {
                                                fontFamily: 'cairo',
                                                color:'#323232',
                                                alignSelf:'flex-start',
                                                textAlign           : I18nManager.isRTL ? 'right' : 'left',
                                                fontSize            : 14,
                                            },
                                        }}
                                        placeholder={{
                                            label: i18n.t('country') ,
                                        }}
                                        onValueChange={(country) => setCountry(country)}
                                        items={countries ?
                                            countries.map((country, i) => {
                                                    return (
                                                        { label: country.name, value: country.id , key: country.id}
                                                    )
                                                }
                                            )
                                            :  [] }

                                        Icon={() => {
                                            return <Image source={require('../../assets/images/dropdown.png')} style={[styles.icon15 , {top: isIOS ? 7 : 18}]} resizeMode={'contain'} />
                                        }}
                                    />
                                </View>

                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_gray]}>{ i18n.t('password') }</Label>
                                    <Input style={[styles.input]}
                                           onChangeText={(password) => setPassword(password)}
                                           secureTextEntry
                                    />
                                </Item>

                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_gray]}>{ i18n.t('confirmPass') }</Label>
                                    <Input style={[styles.input]}
                                           onChangeText={(confirmPass) => setConfirmPass(confirmPass)}
                                           secureTextEntry
                                    />
                                </Item>

                                {renderSubmit()}

                                <TouchableOpacity onPress={() => navigation.navigate('terms')}
                                                  style={[styles.marginBottom_20 , styles.marginTop_5  , styles.directionRowCenter, styles.alignStart,{left:-8}]}>
                                    <CheckBox style={[styles.checkBox]} onPress={() => setIsChecked(!isChecked)} checked={isChecked} color={COLORS.babyblue}/>
                                    <Text style={[styles.textRegular , styles.text_gray , styles.textDecoration , styles.textSize_14]}>{ i18n.t('agreeTo') }</Text>
                                </TouchableOpacity>


                            </Form>
                        </KeyboardAvoidingView>
                    </View>

                </View>
            </Content>
        </Container>
    );
}

export default Register;


