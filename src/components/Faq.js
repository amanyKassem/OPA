import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator, I18nManager} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector, useDispatch} from 'react-redux';
import {getFaq} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function Faq({navigation}) {

    const lang = useSelector(state => state.lang.lang);
    const token = useSelector(state => state.auth.user ? state.auth.user.data.token : null);
    const faq = useSelector(state => state.faq.faq)
    const loader = useSelector(state => state.faq.loader)

    const dispatch = useDispatch()

    function fetchData(){
        dispatch(getFaq(lang,token))
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

                <Header navigation={navigation} title={ i18n.t('faq') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    {
                        faq?
                            faq.map((f, i) => {
                                return (
                                    <View key={i}>
                                        <Text
                                            style={[styles.textRegular, styles.text_gray, styles.textSize_16, styles.marginBottom_5, styles.alignStart , styles.writingDir]}>-- {f.question}</Text>
                                        <Text
                                            style={[styles.textRegular, styles.text_light_gray, styles.textSize_14, styles.marginBottom_10, styles.alignStart , styles.writingDir, {lineHeight: 22}]}>
                                            {f.answer}
                                        </Text>
                                    </View>
                                )
                            })
                            :
                            null
                    }

                </View>

            </Content>
        </Container>
    );
}

export default Faq;


