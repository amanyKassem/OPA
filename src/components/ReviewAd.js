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
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import Header from '../common/Header';
import Swiper from 'react-native-swiper';
import {StoreAd ,EditAd} from "../actions";
import COLORS from "../consts/colors";

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
    const title_en = route.params ? route.params.title_en : null;
    const description_ar = route.params ? route.params.description_ar : null;
    const description_en = route.params ? route.params.description_en : null;
    const price = route.params ? route.params.price : null;
    const space = route.params ? route.params.space : null;
    const street_view = route.params ? route.params.street_view : null;
    const meter_price = route.params ? route.params.meter_price : null;
    const pathName = route.params ? route.params.pathName : null;
    const ad_id = route.params ? route.params.ad_id : null;

    const dispatch = useDispatch();

    // useEffect(() => {
    //     setIsSubmitted(false)
    // }, [isSubmitted]);



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
                title_ar , title_en , description_ar , description_en , price ,space , rent_id,
                type_id , hall , floor , rooms ,
                age , street_view , bathroom , meter_price , 1, images, token , navigation));
        } else {
            dispatch(StoreAd(lang , category_id , null , Latitude , Longitude , address , features,
                title_ar , title_en , description_ar , description_en , price ,space , rent_id,
                type_id , hall , floor , rooms ,
                age , street_view , bathroom , meter_price , 1, images, token , navigation));
        }


    }

    return (
        <Container>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('reviewAd') }/>

                <View style={[styles.bgFullWidth ,styles.bg_White,
                    styles.Width_100,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.marginTop_7 , styles.paddingHorizontal_7 ]}>
                        <Swiper key={3} dotStyle={styles.eventdoteStyle} activeDotStyle={styles.eventactiveDot}
                                containerStyle={styles.eventswiper} showsButtons={false} autoplay={true}>
                            {
                                imagesUrl?
                                    imagesUrl.map((img, i) => {
                                        return (
                                            <Image key={i} source={{uri:img.image}}
                                                   style={styles.swiperImg} resizeMode={'cover'}/>
                                        )
                                    })
                                    :
                                    null
                            }

                        </Swiper>

                        <Card style={[styles.Width_80, styles.SelfCenter , styles.Radius_10,{top:-40,padding:10}]}>
                            <View style={[styles.directionRowSpace]}>
                                <Text style={[styles.textRegular , styles.text_gray , styles.textSize_15 ]}>{title_ar}</Text>
                                <Text style={[styles.textRegular , styles.text_green , styles.textSize_15 ]}>{price}</Text>
                            </View>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14, styles.alignStart ]}>{address}</Text>
                        </Card>

                    </View>

                    <View style={[{top:-30}]}>
                        <View style={[styles.directionRowSpace , styles.paddingHorizontal_15 ,styles.marginTop_5,
                            styles.Width_100,{padding:5}]}>

                            {
                                checkedArrNames ?
                                    checkedArrNames.map((feature, i) => {
                                        return (

                                            <View key={i} style={[styles.directionRow , styles.marginBottom_10 , {width:'26%'}]}>
                                                <Text
                                                    style={[styles.textRegular, styles.text_light_gray, styles.textSize_13, {marginRight: 10}]}>{feature}</Text>

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
                        <View style={[styles.marginTop_10, styles.paddingHorizontal_15]}>
                            <Text style={[styles.textRegular , styles.text_midGray , styles.textSize_13, styles.alignStart]}>{ i18n.t('apartSpec') }</Text>
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_12, styles.alignStart
                                ,{lineHeight:20,writingDirection:I18nManager.isRTL ?'rtl':'ltr'}]}>
                                {description_ar}
                            </Text>
                        </View>
                    </View>

                    {renderSubmit()}

                </View>

            </Content>
        </Container>
    );
}

export default ReviewAd;


