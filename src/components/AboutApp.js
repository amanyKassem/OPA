import React , {useEffect} from "react";
import {View, Text, Image, I18nManager, Dimensions,ActivityIndicator} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import Header from '../common/Header';
import {useSelector, useDispatch} from 'react-redux';
import {getAbout} from '../actions';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function AboutApp({navigation}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const about = useSelector(state => state.about.about)
    const loader = useSelector(state => state.about.loader)

    const dispatch = useDispatch()

    function fetchData(){
        dispatch(getAbout(lang,token))
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

                <Header navigation={navigation} title={ i18n.t('aboutApp') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <Image source={require('../../assets/images/logo.png')} style={[styles.icon130 , styles.marginBottom_20 , styles.SelfCenter ]} resizeMode={'contain'} />
                    <Text style={[styles.textBold , styles.text_midGray , styles.textSize_15 , styles.marginBottom_10, styles.alignStart]}>-- { i18n.t('aboutApp') }</Text>

                    {
                        about?
                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14, styles.marginBottom_10 , {lineHeight:22,writingDirection:I18nManager.isRTL ?'rtl':'ltr'}]}>
                                {about.about}
                            </Text>
                            :
                            null
                    }

                </View>

            </Content>
        </Container>
    );
}

export default AboutApp;


