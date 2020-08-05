import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager ,KeyboardAvoidingView} from "react-native";
import {Container, Content, Card, Item, Label, Input, Form} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import COLORS from "../consts/colors";
import RNPickerSelect from 'react-native-picker-select';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import {useSelector} from "react-redux";
import Header from '../common/Header';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function EditProfile({navigation}) {

    const [username, setUsername] = useState('أماني قاسم');
    const [phone, setPhone] = useState('01023456789');
    const [country, setCountry] = useState('Mansoura');
    const [userImage, setUserImage] = useState(null);
    const [base64, setBase64] = useState('');


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
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_green]}>

                <Header navigation={navigation} title={ i18n.t('editProfile') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.flexCenter,styles.icon110,{top:-50 , overflow:'hidden'}]}>
                        <View style={[styles.imgOverLay,styles.Radius_15]}/>
                        <Image source= {image != null?{uri:image} : require('../../assets/images/pic_profile.png')} style={[styles.Width_100 , styles.heightFull,styles.Radius_15]} resizeMode={'cover'} />
                        <TouchableOpacity onPress={_pickImage} style={[styles.icon25,styles.marginHorizontal_5 , styles.marginVertical_5,{position:'absolute' , top:5 , right:5 , zIndex:1}]}>
                            <Image source={require('../../assets/images/add.png')} style={[styles.Width_100 , styles.heightFull]} resizeMode={'contain'} />
                        </TouchableOpacity>
                    </View>

                    <KeyboardAvoidingView style={[styles.Width_80, styles.flexCenter ,{top:-10 , flex:1}]}>
                        <Form style={[styles.Width_100 , styles.directionColumnSpace ,{flex:1}]}>

                            <View style={[styles.Width_100]}>
                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_mstarda , styles.text_light_gray , {backgroundColor:'#fff'}]}>{ i18n.t('username') }</Label>
                                    <Input style={[styles.input , styles.text_black , {borderColor:COLORS.light_gray}]}
                                           onChangeText={(username) => setUsername(username)}
                                           value={username}
                                    />
                                </Item>

                                <Item style={[styles.item]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_mstarda , styles.text_light_gray , {backgroundColor:'#fff'}]}>{ i18n.t('phone') }</Label>
                                    <Input style={[styles.input , styles.text_black , {borderColor:COLORS.light_gray}]}
                                           onChangeText={(phone) => setPhone(phone)}
                                           keyboardType={'number-pad'}
                                           value={phone}
                                    />
                                </Item>

                                <View style={[styles.inputPicker , styles.flexCenter, styles.marginBottom_20 , styles.Width_100, {borderColor:COLORS.light_gray}]}>
                                    <Label style={[styles.label, styles.textRegular ,styles.text_mstarda, styles.text_light_gray , {left:0, backgroundColor:'#fff'}]}>{ i18n.t('country') }</Label>

                                    <RNPickerSelect
                                        style={{
                                            inputAndroid: {
                                                fontFamily: 'cairo',
                                                color:COLORS.light_gray,
                                                textAlign           : I18nManager.isRTL ? 'right' : 'left',
                                                fontSize            : 14,
                                            },
                                            inputIOS: {
                                                fontFamily: 'cairo',
                                                color:COLORS.light_gray,
                                                alignSelf:'flex-start',
                                                textAlign           : I18nManager.isRTL ? 'right' : 'left',
                                                fontSize            : 14,
                                            },
                                        }}
                                        placeholder={{
                                            label: '' ,
                                        }}
                                        onValueChange={(country) => setCountry(country)}
                                        items={[
                                            { label: 'قاهره', value: 'cairo' },
                                            { label: 'منصورة', value: 'Mansoura' },
                                            { label: 'اسكندرية', value: 'Alex' },
                                        ]}
                                        Icon={() => {
                                            return <Image source={require('../../assets/images/dropdown.png')} style={[styles.icon15 , {top: isIOS ? 7 : 18}]} resizeMode={'contain'} />
                                        }}
                                        value={country}
                                    />
                                </View>
                            </View>


                            <TouchableOpacity onPress={() => navigation.navigate('profile')} style={[styles.mstardaBtn , styles.Width_100, styles.marginBottom_50 , {backgroundColor:COLORS.green}]}>
                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>
                            </TouchableOpacity>

                        </Form>
                    </KeyboardAvoidingView>


                </View>

            </Content>
        </Container>
    );
}

export default EditProfile;


