import React , {useEffect,useState} from "react";
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    Dimensions,
    ScrollView,
    Linking,
    I18nManager,
    FlatList, ActivityIndicator
} from "react-native";
import {Container, Content, Card, Icon} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import Header from '../common/Header';
import Swiper from 'react-native-swiper';
import {StoreAd ,EditAd} from "../actions";
import COLORS from "../consts/colors";
import ImageViewer from 'react-native-image-zoom-viewer';
import Modal from "react-native-modal";
import * as FileSystem from "expo-file-system";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function ReviewAd({navigation , route}) {

    const [isSubmitted, setIsSubmitted] = useState(false);
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);

    const featArr = route.params ? route.params.featArr : null;
    const checkedArrNames = route.params ? route.params.checkedArrNames : null;
    const features = route.params ? route.params.features : null;
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
    const images = route.params ? route.params.images : null;
    const imagesUrl = route.params ? route.params.imagesUrl : [];
    const title_ar = route.params ? route.params.title_ar : null;
    const description_ar = route.params ? route.params.description_ar : null;
    const price = route.params ? route.params.price : null;
    const space = route.params ? route.params.space : null;
    const street_view = route.params ? route.params.street_view : null;
    const meter_price = route.params ? route.params.meter_price : null;
    const pathName = route.params ? route.params.pathName : null;
    const ad_id = route.params ? route.params.ad_id : null;
    const [photos, setPhotos] = useState([]);
    const [index, setIndex] = useState([]);

    const [showModalImg, setShowModalImg] = useState(false);

    const dispatch = useDispatch();

    // useEffect(() => {
    //     setIsSubmitted(false)
    // }, [isSubmitted]);

    useEffect(() => {
        if ( route.params && imagesUrl ){
            let photosUrl=[];
            for (let i=0; i < imagesUrl.length; i++){
                let imageURL = imagesUrl[i].image;
                photosUrl.push({'url':imageURL});
            }
            setPhotos(photosUrl)
            console.log('photos' , photos)
        }
        else{
            console.log('kkkkkk')
        }

    }, []);


    // const imagesU = [{
    //    url : "file:/data/user/0/host.exp.exponent/cache/ExperienceData/%2540amany_kassem%252FAaamal/ImagePicker/a5f54fd7-cc0c-4baa-876e-e040ccafdebb.png"
    // }]


    function renderSubmit() {

        if (isSubmitted){
            return(
                <View style={[{ justifyContent: 'center', alignItems: 'center' } , styles.marginBottom_30]}>
                    <ActivityIndicator size="large" color={COLORS.babyblue} style={{ alignSelf: 'center' }} />
                </View>
            )
        }

        return (
            <TouchableOpacity onPress={() => onPuplish()} style={[styles.babyblueBtn , styles.flexCenter , styles.Width_80, styles.marginBottom_30 ]}>
                <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('postAd') }</Text>
            </TouchableOpacity>
        );
    }


    function onPuplish(){
        setIsSubmitted(true);

        if(pathName === 'editAd'){
            dispatch(EditAd(lang , ad_id , category_id , null , Latitude , Longitude , address , features,
                title_ar  , description_ar  , price ,space , rent_id,
                type_id , hall , floor , rooms ,
                age , street_view , bathroom , meter_price , 1, images, token , navigation));
        } else {
            dispatch(StoreAd(lang , category_id , null , Latitude , Longitude , address , features,
                title_ar , description_ar , price ,space , rent_id,
                type_id , hall , floor , rooms ,
                age , street_view , bathroom , meter_price , 1, images, token , navigation));
        }


    }


    return (
         <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('reviewAd') }/>

                <View style={[styles.bgFullWidth ,styles.bg_White,
                    styles.Width_100,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.marginTop_7 , styles.paddingHorizontal_7 ]}>
                        <Swiper key={3} dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                                containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                            {
                                photos && photos.length > 0 ?
                                    photos.map((img, i) => {
                                        return (
                                        <TouchableOpacity key={i} onPress={() => {setShowModalImg(!showModalImg); setIndex(i)}}
                                                          style={[styles.swiperImg]}>
                                            <Image source={{uri: img.url}} style={[styles.swiperImg]} resizeMode={'cover'}/>
                                        </TouchableOpacity>
                                        )
                                    })
                                    :
                                    <Image source={require('../../assets/images/image_placeholder.png')}
                                           style={[styles.swiperImg]} resizeMode={'cover'}/>
                            }

                        </Swiper>

                        <Card style={[styles.Width_80, styles.SelfCenter , styles.Radius_10,{top:-40,padding:10}]}>
                            <View style={[styles.directionRowSpace]}>
                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15 , styles.writingDir , {flex:1}]}>{title_ar}</Text>
                                <Text style={[styles.textRegular , styles.text_green , styles.textSize_15 ]}>{price} { i18n.t('RS') }</Text>
                            </View>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14, styles.alignStart ]}>{address}</Text>
                        </Card>

                    </View>

                    <View style={[{top:-30}]}>
                        <View style={[styles.directionRow , styles.paddingHorizontal_20 ,styles.marginTop_5,
                            styles.Width_100,{padding:5 , flexWrap:'wrap'}]}>

                            {
                                rooms && rooms.length > 0 ?
                                    <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_13, {marginRight: 20}]}>{ i18n.t('rooms') } : {rooms}</Text>
                                    :
                                    null
                            }

                            {
                                hall && hall.length > 0 ?
                                    <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_13, {marginRight: 20}]}>{ i18n.t('lounges') } : {hall}</Text>
                                    :
                                    null
                            }

                            {
                                floor && floor.length > 0 ?
                                    <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_13, {marginRight: 20}]}>{ i18n.t('floor') } : {floor}</Text>
                                    :
                                    null
                            }

                            {
                                age && age.length > 0 ?
                                    <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_13, {marginRight: 20}]}>{ i18n.t('buildAge') } : {age}</Text>
                                    :
                                    null
                            }

                            {
                                bathroom && bathroom.length > 0 ?
                                    <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_13, {marginRight: 20}]}>{ i18n.t('bathroom') } : {bathroom}</Text>
                                    :
                                    null
                            }

                            {
                                space && space.length > 0 ?
                                    <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_13, {marginRight: 20}]}>{ i18n.t('space') } : {space}</Text>
                                    :
                                    null
                            }


                            {
                                street_view && street_view.length > 0 ?
                                    <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_13, {marginRight: 20}]}>{ i18n.t('street_view') } : {street_view}</Text>
                                    :
                                    null
                            }


                            {
                                meter_price && meter_price.length > 0 ?
                                    <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_13, {marginRight: 20}]}>{ i18n.t('meter_price') } : {meter_price}</Text>
                                    :
                                    null
                            }

                            {
                                checkedArrNames ?
                                    checkedArrNames.map((feature, i) => {
                                        return (

                                            <View key={i} style={[styles.rowGroup , styles.marginBottom_10]}>
                                                <Text style={[styles.textRegular, styles.text_light_gray, styles.textSize_13, {marginRight: 20}]}>{feature}</Text>
                                            </View>
                                        )
                                    })
                                    :
                                    null
                            }

                        </View>
                        {/*<View style={[styles.directionRow, styles.marginTop_10, styles.paddingHorizontal_15]}>*/}
                            {/*<Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_13, {marginRight:10} ]}>{ i18n.t('adNumber') }</Text>*/}
                            {/*<Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13]}>1235</Text>*/}
                        {/*</View>*/}
                        <View style={[styles.marginTop_10, styles.paddingHorizontal_20]}>
                            {/*<Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13, styles.alignStart]}>{ i18n.t('apartSpec') }</Text>*/}
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart
                                ,{lineHeight:20,writingDirection:I18nManager.isRTL ?'rtl':'ltr'}]}>
                                {description_ar}
                            </Text>
                        </View>
                    </View>

                    {renderSubmit()}

                </View>

            </Content>

             <Modal
                 onBackdropPress                 ={() => {setShowModalImg(!showModalImg)}}
                 onBackButtonPress               = {() => {setShowModalImg(!showModalImg)}}
                 isVisible                       = {showModalImg}
                 // style                        = {styles.bgModel}
                 avoidKeyboard                   = {true}
             >
                 <TouchableOpacity onPress={()=> {setShowModalImg(false);}}
                                   style={[styles.icon35, styles.centerContext, styles.bg_White,styles.Radius_50,
                                       {position:'absolute', zIndex:1 , top:10 , left:10 }]}>
                     <Icon name={'close'} type={'EvilIcons'} style={{ color: COLORS.babyblue, fontSize: 25 }} />
                 </TouchableOpacity>

                 <ImageViewer enableImageZoom={true} onSwipeDown={() => {setShowModalImg(false);}} enableSwipeDown={true} imageUrls={photos} index={index}/>

             </Modal>
        </Container>
    );
}

export default ReviewAd;


