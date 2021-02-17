import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager, ActivityIndicator} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector, useDispatch} from 'react-redux';
import {getTerms} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Terms({navigation , route}) {

    const pathname = route.params ? route.params.pathname : null;
    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const terms = useSelector(state => state.terms.terms)
    const loader = useSelector(state => state.terms.loader)

    const dispatch = useDispatch()

    function fetchData(){
        dispatch(getTerms(lang))
    }

    useEffect(() => {
        fetchData();
        const unsubscribe = navigation.addListener('focus', () => {
            fetchData();
        });

        return unsubscribe;
    }, [navigation , loader]);

    function renderLoader(){
        if (loader === false){
            return(
                <View style={[styles.loading, styles.flexCenter, {height:'100%'}]}>
                    <ActivityIndicator size="large" color={COLORS.blue} style={{ alignSelf: 'center' }} />
                </View>
            );
        }
    }


    return (
         <Container style={[styles.bg_gray]}>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <TouchableOpacity onPress={() => navigation.navigate(route && pathname ==='terms'?'addAdTerms':'register' , {confirmCheck:false})} style={[styles.marginTop_60 , styles.directionRow , {marginLeft:25}]}>
                    <Image source={require('../../assets/images/back.png')} style={[styles.icon25, styles.transform, {marginRight:5}]} resizeMode={'contain'} />
                </TouchableOpacity>

                <View style={[styles.directionRowSpace , styles.paddingHorizontal_25, styles.paddingTop_30]}>
                    <Text style={[styles.textRegular , styles.text_White , styles.textSize_20, {top:20}]}>{ i18n.t('terms') }</Text>
                    <Image source={require('../../assets/images/vector_rules.png')} style={[styles.transform,styles.icon200, {top:20, right:I18nManager.isRTL ?10:50}]} resizeMode={'contain'} />
                </View>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_25 ,styles.bg_White,
                    styles.Width_100,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>
                    <Image source={require('../../assets/images/selected.png')} style={[styles.icon35, {top:-18 , left:20}]} resizeMode={'contain'} />

                    <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16 , styles.marginBottom_5,styles.alignStart]}>-- { i18n.t('terms') }</Text>

                    {
                        terms?
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14,styles.alignStart , {lineHeight:22,writingDirection:I18nManager.isRTL ?'rtl':'ltr'}]}>
                                {terms.terms}
                            </Text>
                            :
                            null
                    }


                    <TouchableOpacity onPress={() => navigation.navigate(route && pathname ==='terms'?'addAdTerms':'register' , {confirmCheck:true})}
                                      style={[styles.babyblueBtn , styles.flexCenter , styles.Width_90, styles.marginBottom_50 , styles.marginTop_35]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_15]}>{ i18n.t('agree') }</Text>
                    </TouchableOpacity>

                </View>
            </Content>
        </Container>
    );
}

export default Terms;


