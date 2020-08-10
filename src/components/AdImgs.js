import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ScrollView, Vibration} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector} from "react-redux";
import Header from '../common/Header';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

let base64   = [];

function AdImgs({navigation}) {

    const [photos, setPhotos] = useState([]);

    function renderUploadImgs() {
       let imgBlock = [];
       for (let i = 0; i < 7; i++) {
           if(i === 0){
              imgBlock.push(
                  <TouchableOpacity onPress={() => _pickImage(i)} style={[styles.bg_babyblue , styles.Width_100 , styles.height_120 , styles.flexCenter, styles.marginBottom_15]}>
                      <Image source= {photos[i]?{uri:photos[i]} : require('../../assets/images/upload_white.png')} style={[photos[i]? styles.Width_100 : styles.icon50 , photos[i]? styles.heightFull:null]} resizeMode={photos[i]?'cover':'contain'} />
                      <Text style={[styles.textRegular , styles.text_White , styles.textSize_13]}>{ i18n.t('uploadAdImgs') }</Text>
                  </TouchableOpacity>
              )
           }else{
               imgBlock.push(
                   <TouchableOpacity onPress={() => _pickImage(i)} style={[styles.bg_light_gray,styles.Width_48 , styles.height_100 , styles.flexCenter
                       , styles.borderGray, styles.marginBottom_15, {borderStyle: 'dashed', borderRadius: 1}]}>
                       <Image source= {photos[i]?{uri:photos[i]} : require('../../assets/images/upload_gray.png')} style={[photos[i]? styles.Width_100 : styles.icon50  , photos[i]? styles.heightFull:null]} resizeMode={photos[i]?'cover':'contain'} />
                   </TouchableOpacity>
               )
           }
       }
       return imgBlock
   }


    const askPermissionsAsync = async () => {
        await Permissions.askAsync(Permissions.CAMERA);
        await Permissions.askAsync(Permissions.CAMERA_ROLL);

    };

    const _pickImage = async (i) => {
        askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true
        });

        if (!result.cancelled) {
            let tempPhotos = photos;
            if(photos[i]){
                tempPhotos[i] = result.uri;
                base64[i]=result.base64;
            }else{
                if(i != photos.length){
                    for(let k=0 ; k < i ; k++){
                        tempPhotos.push(null);
                        base64.push(null);
                    }
                }
                tempPhotos.push(result.uri);
                base64.push(result.base64);
            }

            setPhotos([...tempPhotos]);
            console.log('tempPhotos', photos , 'PhotosNew' ,tempPhotos)
        }
    };


    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('uploadAdImgs') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_25 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.rowGroup]}>
                        {renderUploadImgs()}
                    </View>

                    <TouchableOpacity onPress={() => navigation.navigate('detailsAdded')} style={[styles.babyblueBtn , styles.flexCenter , styles.Width_90, styles.marginBottom_50 , styles.marginTop_20]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('continue') }</Text>
                    </TouchableOpacity>
                </View>

            </Content>
        </Container>
    );
}

export default AdImgs;


