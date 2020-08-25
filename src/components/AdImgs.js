import React, {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ScrollView, Vibration} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {DeleteAdImage} from '../actions';
import Header from '../common/Header';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

let base64   = [];

function AdImgs({navigation , route}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);

    const [photos, setPhotos] = useState([]);
    const featuers = route.params ? route.params.featuers : null;
    const editFeatuers = route.params ? route.params.editFeatuers : null;
    const category_id = route.params ? route.params.category_id : null;
    const Latitude = route.params ? route.params.Latitude : null;
    const Longitude = route.params ? route.params.Longitude : null;
    const address = route.params ? route.params.address : null;
    const rent_id = route.params ? route.params.rent_id : null;
    const type_id = route.params ? route.params.type_id : null;
    const hall = route.params ? route.params.hall : null;
    const floor = route.params ? route.params.floor : null;
    const rooms = route.params ? route.params.rooms : null;
    const age = route.params ? route.params.age : null;
    const bathroom = route.params ? route.params.bathroom : null;
    const pathName = route.params ? route.params.pathName : null;
    const adDetails = route.params ? route.params.adDetails : null;
    const images = route.params ? route.params.images : null;
    const ad_id = route.params ? route.params.ad_id : null;
    const dispatch = useDispatch();

    useEffect(() => {

        route.params && images ?
            images.map((img, i) => {
                photos.push(img.image)
                setPhotos([...photos])
                console.log(photos)
            })
            :
            null

    }, [images]);


    function confirmDelete (id , i) {
        photos.splice(i, 1);
        setPhotos([...photos]);
        if(pathName === 'editAd' && id){
            dispatch(DeleteAdImage(lang , id , token))
        }
        base64.splice(i, 1);
    };


    function renderUploadImgs() {
       let imgBlock = [];
       for (let i = 0; i < 7; i++) {
           if(i === 0){
              imgBlock.push(
                  <TouchableOpacity key={i} onPress={() => _pickImage(i)} style={[styles.bg_babyblue , styles.Width_100 , styles.height_120 , styles.flexCenter, styles.marginBottom_15]}>
                      {
                          photos[i]?
                              <TouchableOpacity onPress={() => confirmDelete(images && images[i] ? images[i].id : null,i)} style={[styles.bg_mstarda , styles.Radius_50 , {position:'absolute' , right:5 , top:5 , zIndex:1 , padding:5}]}>
                                  <Image source= {require('../../assets/images/delete.png')} style={[styles.icon20]} resizeMode={'contain'} />
                              </TouchableOpacity>
                              :
                              null
                      }
                      <Image source= {photos[i]? ({uri:photos[i]}) : require('../../assets/images/upload_white.png')} style={[photos[i]? styles.Width_100 : styles.icon50 , photos[i] ? styles.heightFull:null]} resizeMode={photos[i] ?'cover':'contain'} />
                      <Text style={[styles.textRegular , styles.text_White , styles.textSize_13]}>{ i18n.t('uploadAdImgs') }</Text>
                  </TouchableOpacity>
              )
           }else{
               imgBlock.push(
                   <TouchableOpacity key={i} onPress={() => _pickImage(i)} style={[styles.bg_light_gray,styles.Width_48 , styles.height_100 , styles.flexCenter
                       , styles.borderGray, styles.marginBottom_15, {borderStyle: 'dashed', borderRadius: 1}]}>
                       {
                           photos[i]?
                               <TouchableOpacity onPress={() => confirmDelete(images && images[i] ? images[i].id : null,i)} style={[styles.bg_mstarda , styles.Radius_50 , {position:'absolute' , right:5 , top:5 , zIndex:1 , padding:5}]}>
                                   <Image source= {require('../../assets/images/delete.png')} style={[styles.icon20]} resizeMode={'contain'} />
                               </TouchableOpacity>
                               :
                               null
                       }
                       <Image source= {photos[i]? ({uri:photos[i]}) : require('../../assets/images/upload_white.png')} style={[photos[i]? styles.Width_100 : styles.icon50 , photos[i] ? styles.heightFull:null]} resizeMode={photos[i] ?'cover':'contain'} />
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
                // if(i != photos.length){
                //     for(let k=0 ; k < i ; k++){
                //         tempPhotos.push(null);
                //         base64.push(null);
                //     }
                // }
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

                    {
                        photos.length > 0 ?
                            <TouchableOpacity onPress={() => navigation.navigate(featuers.length > 0 ? 'detailsAdded' : 'basicDetails' ,
                                {
                                    featuers,
                                    editFeatuers,
                                    category_id,
                                    Latitude,
                                    Longitude,
                                    address,
                                    rent_id,
                                    type_id,
                                    hall,
                                    floor,
                                    rooms,
                                    age,
                                    bathroom,
                                    pathName,
                                    adDetails,
                                    ad_id,
                                    images : base64,
                                    imagesUrl : photos
                                })} style={[styles.babyblueBtn , styles.flexCenter , styles.Width_90, styles.marginBottom_50 , styles.marginTop_20]}>
                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('continue') }</Text>
                            </TouchableOpacity>
                            :
                            <View style={[styles.babyblueBtn , styles.flexCenter , styles.Width_90, styles.marginBottom_50 ,
                                styles.marginTop_20, {backgroundColor:'#bbb'}]}>
                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('continue') }</Text>
                            </View>
                    }


                </View>

            </Content>
        </Container>
    );
}

export default AdImgs;


