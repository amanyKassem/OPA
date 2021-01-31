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
    const price = route.params ? route.params.price : null;
    const space = route.params ? route.params.space : null;
    const meter_price = route.params ? route.params.meter_price : null;
    const street_view = route.params ? route.params.street_view : null;
    const age = route.params ? route.params.age : null;
    const bathroom = route.params ? route.params.bathroom : null;
    const pathName = route.params ? route.params.pathName : null;
    const adDetails = route.params ? route.params.adDetails : null;
    const images = route.params ? route.params.images : null;
    const ad_id = route.params ? route.params.ad_id : null;
    const dispatch = useDispatch();

    useEffect(() => {
       if ( route.params && images ){
            setPhotos(images)
            console.log(photos)
        }
       else{
           console.log('kkkkkk')
       }

    }, [photos]);


    function confirmDelete (imgId , i) {
        photos.splice(i, 1);
        setPhotos([...photos]);

        if(pathName === 'editAd' && imgId){
            // delete image in edit ad
            // msh sh3'ala saaaa7 byrg3 l image elly etms7t tany aked L moshkla fe l id ^_^
            dispatch(DeleteAdImage(lang , imgId , token))
            // base64.splice(i , 1);
        } else{
            // delete image in add ad
            base64.splice(i , 1);
        }
        console.log('base64',base64)
        console.log('photos',photos)
    };


    function renderUploadImgs() {
       let imgBlock = [];
       for (let i = 0; i < 7; i++) {
           if(i === 0){
              imgBlock.push(
                  <TouchableOpacity key={i} onPress={() => _pickImage(photos && photos[i] ? photos[i].id : null,i)} style={[styles.bg_babyblue , styles.Width_100 , styles.height_120 , styles.flexCenter, styles.marginBottom_15]}>
                      {
                          photos[i]?
                              <TouchableOpacity onPress={() => confirmDelete(photos && photos[i] ? photos[i].id : null,i)} style={[styles.bg_mstarda , styles.Radius_50 , {position:'absolute' , right:5 , top:5 , zIndex:1 , padding:5}]}>
                                  <Image source= {require('../../assets/images/delete.png')} style={[styles.icon20]} resizeMode={'contain'} />
                              </TouchableOpacity>
                              :
                              null
                      }
                      <Image source= {photos[i]? ({uri:photos[i].image}) : require('../../assets/images/upload_white.png')} style={[photos[i]? styles.Width_100 : styles.icon50 , photos[i] ? styles.heightFull:null]} resizeMode={photos[i] ?'cover':'contain'} />
                      <Text style={[styles.textRegular , styles.text_White , styles.textSize_13]}>{ i18n.t('uploadAdImgs') }</Text>
                  </TouchableOpacity>
              )
           }else{
               imgBlock.push(
                   <TouchableOpacity key={i} onPress={() => _pickImage(photos && photos[i] ? photos[i].id : null,i)} style={[styles.bg_light_gray,styles.Width_48 , styles.height_100 , styles.flexCenter
                       , styles.borderGray, styles.marginBottom_15, {borderStyle: 'dashed', borderRadius: 1}]}>
                       {
                           photos[i]?
                               <TouchableOpacity onPress={() => confirmDelete(photos && photos[i] ? photos[i].id : null,i)} style={[styles.bg_mstarda , styles.Radius_50 , {position:'absolute' , right:5 , top:5 , zIndex:1 , padding:5}]}>
                                   <Image source= {require('../../assets/images/delete.png')} style={[styles.icon20]} resizeMode={'contain'} />
                               </TouchableOpacity>
                               :
                               null
                       }
                       <Image source= {photos[i]? ({uri:photos[i].image}) : require('../../assets/images/upload_white.png')} style={[photos[i]? styles.Width_100 : styles.icon50 , photos[i] ? styles.heightFull:null]} resizeMode={photos[i] ?'cover':'contain'} />
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

    const _pickImage = async (id ,i) => {
        askPermissionsAsync();

        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 3],
            base64:true
        });

        if (!result.cancelled) {
            let tempPhotos = photos;
            if(photos[i]){
                tempPhotos[i] = { id: i, image: result.uri};
                base64[i]=result.base64;
                if(pathName === 'editAd' && id){
                    // replacement existed image in edit ad
                    // de sh3'alaaa saaa7 lma y3ml t3del 3la l soraaa elly rag3a enma lw 3dl 3la sora lsa mdafa btfdl mwgoda ' emojii byltom'
                    dispatch(DeleteAdImage(lang , id , token))
                }
            }else{
                tempPhotos.push({ id: i, image: result.uri});
                base64.push(result.base64);
            }

            setPhotos([...tempPhotos]);
            console.log('tempPhotos', photos , 'PhotosNew' ,tempPhotos)
            // console.log('base64',base64)
        }
    };

    function setImages(){
        base64 = base64.filter(function (el) {
            return el != null;
        });

        navigation.navigate(featuers.length > 0 ? 'detailsAdded' : 'basicDetails' ,
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
                price,
                space,
                meter_price,
                street_view,
                ad_id,
                images : base64,
                imagesUrl : photos
            })
    }


    return (
         <Container style={[styles.bg_gray]}>
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
                            <TouchableOpacity onPress={() => setImages()} style={[styles.babyblueBtn , styles.flexCenter , styles.Width_90, styles.marginBottom_50 , styles.marginTop_20]}>
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


