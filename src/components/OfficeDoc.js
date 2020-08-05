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

function OfficeDoc({navigation}) {

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

                <Header navigation={navigation} title={ i18n.t('officeDoc') } _pickImage={_pickImage}/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionColumnSpace,styles.Width_80 , styles.SelfCenter , {flex:1}]}>

                        <Text style={[styles.textRegular , styles.text_gray , styles.textCenter , styles.textSize_16]}>{ i18n.t('attachLicense') }</Text>

                        <View style={[styles.flexCenter,styles.Width_100 , styles.height_320]}>
                            <Image source= {image != null?{uri:image} : null} style={[styles.Width_100 , styles.heightFull]} resizeMode={'cover'} />
                        </View>

                        <TouchableOpacity onPress={() => navigation.navigate('profile')} style={[styles.mstardaBtn , styles.Width_100, styles.marginBottom_50 , {backgroundColor:COLORS.green}]}>
                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('confirm') }</Text>
                        </TouchableOpacity>
                    </View>


                </View>

            </Content>
        </Container>
    );
}

export default OfficeDoc;


