import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, I18nManager} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useDispatch, useSelector} from "react-redux";
import {getContractingCategories , getCityContracting} from "../actions";
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Contracting({navigation}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);

    const contractingCat = useSelector(state => state.contractingCat.contractingCat);
    const contractingCatLoader = useSelector(state => state.contractingCat.loader);

    const cityContracting = useSelector(state => state.cityContracting.cityContracting);
    const cityContractingLoader = useSelector(state => state.cityContracting.loader);


    const dispatch = useDispatch();

    function fetchData(){
        dispatch(getContractingCategories(lang , 2, token));
        dispatch(getCityContracting(lang , 3, token));
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , contractingCatLoader , cityContractingLoader]);

    function renderLoader(){
        if (contractingCatLoader === false || cityContractingLoader === false){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.babyblue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }


    return (
         <Container style={[styles.bg_gray]}>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('contracting') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <View style={[styles.directionRowSpace]}>
                        <Text style={[styles.textBold , styles.text_black , styles.textSize_14 ]}>{ i18n.t('contServ') }</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('allContracting')}>
                            <Text style={[styles.textBold , styles.text_babyblue , styles.textSize_14 , styles.textDecoration ]}>{ i18n.t('all') }</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.directionRowSpace , styles.marginTop_15, styles.Width_100]}>
                        {
                            contractingCat ?
                            contractingCat.map((contrCat, i) => {
                                return (
                                    <TouchableOpacity key={i} onPress={() => navigation.navigate('realEstateComp',{category_id:contrCat.id , type:contrCat.type , title:contrCat.title})} style={[styles.Width_48, styles.height_130]}>
                                        <View style={[styles.imgOverLay]}/>
                                        <View style={[styles.flexCenter , styles.heightFull,{position:'absolute' , top :0,zIndex:1}]}>
                                            <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.textCenter ]}>{contrCat.title}</Text>
                                            {/*<Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.textCenter ]}>اكثر من 100 شركه</Text>*/}
                                        </View>
                                        <Image source={{uri:contrCat.icon}} style={[styles.Width_100, styles.heightFull]} resizeMode={'cover'} />
                                    </TouchableOpacity>
                                )
                            })
                            :
                            null
                        }

                    </View>

                    <View style={[styles.directionRowSpace , styles.marginTop_15]}>
                        <Text style={[styles.textBold , styles.text_black , styles.textSize_14 ]}>{ i18n.t('newCities') }</Text>
                        <TouchableOpacity onPress={() => navigation.navigate('allContracting')}>
                            <Text style={[styles.textBold , styles.text_babyblue , styles.textSize_14 , styles.textDecoration ]}>{ i18n.t('all') }</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={[styles.rowGroup , styles.marginBottom_80]}>
                        {cityContracting ?
                            cityContracting.map((city, i) => {
                                if(i < 1) {
                                    return (
                                        <TouchableOpacity key={i} onPress={() => navigation.navigate('realEstateComp',{category_id:city.id , type:city.type, title:city.title})}style={[styles.Width_100, styles.height_150 , styles.marginBottom_25]}>
                                            <View style={[styles.imgOverLay]}/>
                                            <View style={[styles.alignStart , styles.paddingHorizontal_15,{position:'absolute' , bottom :10 ,left:0,zIndex:1}]}>
                                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.alignStart]}>{city.date}</Text>
                                                <Text style={[styles.textBold , styles.text_White , styles.textSize_12, styles.alignStart,
                                                    {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{city.title}</Text>
                                            </View>
                                            <Image source={{uri : city.icon}} style={[styles.Width_100, styles.heightFull]} resizeMode={'cover'} />
                                        </TouchableOpacity>
                                    )
                                }else{
                                    return (
                                        <TouchableOpacity key={i} onPress={() => navigation.navigate('realEstateComp',{category_id:city.id , type:city.type, title:city.title})} style={[styles.Width_48, styles.height_250]}>
                                            <View style={[styles.imgOverLay]}/>
                                            <View style={[styles.alignStart, styles.paddingHorizontal_15,{position:'absolute' , bottom :10 ,left:0,zIndex:1}]}>
                                                <Text style={[styles.textRegular , styles.text_White , styles.textSize_12, styles.alignStart]}>{city.date}</Text>
                                                <Text style={[styles.textBold , styles.text_White , styles.textSize_12, styles.alignStart,
                                                    {flexWrap:'wrap', writingDirection: I18nManager.isRTL ? 'rtl' : 'ltr'}]}>{city.title}</Text>
                                            </View>
                                            <Image source={{uri : city.icon}} style={[styles.Width_100, styles.heightFull]} resizeMode={'cover'} />
                                        </TouchableOpacity>
                                    )
                                }
                            })
                            :
                            null
                        }
                    </View>

                </View>

            </Content>
        </Container>
    );
}

export default Contracting;


