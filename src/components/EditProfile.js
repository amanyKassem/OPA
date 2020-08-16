import React, {useEffect, useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    I18nManager,
    KeyboardAvoidingView,
    ActivityIndicator
} from "react-native";
import {Container, Content, Card, Item, Label, Input, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {useDispatch, useSelector} from "react-redux";
import {updateProfile , getCountries} from '../actions';
import Header from '../common/Header';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function EditProfile({navigation}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const user = useSelector(state => state.auth.user.data);
    const countries = useSelector(state => state.countries.countries);
    const countriesLoader = useSelector(state => state.countries.loader);
    const [isSubmitted, setIsSubmitted] = useState(false);

    const [username, setUsername] = useState(user.name);
    const [phone, setPhone] = useState(user.phone);
    const [country, setCountry] = useState(user.country_id);
    const [userImage, setUserImage] = useState(null);
    const [base64, setBase64] = useState('');


    const dispatch = useDispatch();

    useEffect(() => {
        setIsSubmitted(false)
    }, [isSubmitted]);


    useEffect(() => {
        dispatch(getCountries(lang))
    }, [countriesLoader]);

    function renderSubmit() {
        if (username == '' || phone == '' || country == null) {
            return (
                <View
                    style={[styles.babyblueBtn , styles.Width_100 , styles.marginBottom_50 , {
                        backgroundColor:'#bbb'
                    }]}
                >
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>
                </View>
            );
        }

        if (isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginBottom_50]}>
                    <ActivityIndicator size="large" color={COLORS.babyblue} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={() => onEdit()} style={[styles.babyblueBtn , styles.Width_100, styles.marginBottom_50 ]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>
            </TouchableOpacity>
        );
    }

    function onEdit(){
        setIsSubmitted(true)
        dispatch(updateProfile(lang , username , phone , country , base64 , token , navigation));
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
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('editProfile') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.flexCenter,styles.icon110,{top:-40 , overflow:'hidden'}]}>
                        <View style={[styles.imgOverLay,styles.Radius_15]}/>
                        <Image source= {image != null?{uri:image} : {uri:user.avatar}} style={[styles.Width_100 , styles.heightFull,styles.Radius_15]} resizeMode={'cover'} />
                        <TouchableOpacity onPress={_pickImage} style={[styles.icon25,styles.marginHorizontal_5 , styles.marginVertical_5,{position:'absolute' , top:0 , right:0 , zIndex:1}]}>
                            <Image source={require('../../assets/images/add_menu.png')} style={[styles.icon20]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>

                    <KeyboardAvoidingView style={[styles.Width_80, styles.flexCenter ,{top:-10 , flex:1}]}>
                        <Form style={[styles.Width_100 , styles.directionColumnSpace ,{flex:1}]}>

                            <View style={[styles.Width_100]}>
                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('username') }</Label>
                                    <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                           onChangeText={(username) => setUsername(username)}
                                           value={username}
                                    />
                                </Item>

                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {backgroundColor:'#fff'}]}>{ i18n.t('phone') }</Label>
                                    <Input style={[styles.input , styles.text_midGray , {borderColor:COLORS.midGray}]}
                                           onChangeText={(phone) => setPhone(phone)}
                                           keyboardType={'number-pad'}
                                           value={phone}
                                    />
                                </Item>

                                <View style={[styles.inputPicker , styles.flexCenter, styles.marginBottom_20 , styles.Width_100, {borderColor:COLORS.midGray}]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_midGray , {left:0, backgroundColor:'#fff'}]}>{ i18n.t('country') }</Label>

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
                                            return <Image source={require('../../assets/images/dropdown_arrow.png')} style={[styles.icon15 , {top: isIOS ? 7 : 18}]} resizeMode={'contain'} />
                                        }}
                                        value={country}
                                    />
                                </View>
                            </View>


                            {renderSubmit()}

                        </Form>
                    </KeyboardAvoidingView>


                </View>

            </Content>
        </Container>
    );
}

export default EditProfile;


