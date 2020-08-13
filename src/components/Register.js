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


const isIOS = Platform.OS === 'ios';

function Register({navigation}) {

    const lang = useSelector(state => state.lang.lang);
    // const auth = useSelector(state => state.auth);

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



    function renderSubmit() {
        if (username == '' ||password == '' || phone == ''|| confirmPass == ''|| country == null) {
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
                onPress={() => onLoginPressed()} style={[styles.babyblueBtn , styles.Width_100, styles.marginBottom_10]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('register') }</Text>
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
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <TouchableOpacity onPress={() => navigation.goBack()} style={[styles.marginTop_60 , styles.directionRow , {marginLeft:25}]}>
                    <Image source={require('../../assets/images/back.png')} style={[styles.icon25, styles.transform, {marginRight:5}]} resizeMode={'contain'} />
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
                                    <Label style={[styles.label, styles.textRegular ,styles.text_White]}>{ i18n.t('username') }</Label>
                                    <Input style={[styles.input]}
                                           onChangeText={(username) => setUsername(username)}
                                    />
                                </Item>

                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_White]}>{ i18n.t('phone') }</Label>
                                    <Input style={[styles.input]}
                                           onChangeText={(phone) => setPhone(phone)}
                                           keyboardType={'number-pad'}
                                    />
                                </Item>


                                <View style={[styles.inputPicker , styles.flexCenter, styles.marginBottom_20 , styles.Width_100]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_White, {left:0}]}>{ i18n.t('country') }</Label>

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
                                            label: i18n.t('country') ,
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
                                    <Label style={[styles.label, styles.textRegular ,styles.text_White]}>{ i18n.t('password') }</Label>
                                    <Input style={[styles.input]}
                                           onChangeText={(password) => setPassword(password)}
                                           secureTextEntry
                                    />
                                </Item>

                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_White]}>{ i18n.t('confirmPass') }</Label>
                                    <Input style={[styles.input]}
                                           onChangeText={(confirmPass) => setConfirmPass(confirmPass)}
                                           secureTextEntry
                                    />
                                </Item>

                                {renderSubmit()}

                                <TouchableOpacity onPress={() => navigation.navigate('terms')}
                                                  style={[styles.marginBottom_20 , styles.marginTop_5  , styles.directionRowCenter, styles.alignStart,{left:-8}]}>
                                    <CheckBox style={[styles.checkBox]} onPress={() => setIsChecked(!isChecked)} checked={isChecked} color={COLORS.babyblue}/>
                                    <Text style={[styles.textRegular , styles.text_White , styles.textDecoration , styles.textSize_14]}>{ i18n.t('agreeTo') }</Text>
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


