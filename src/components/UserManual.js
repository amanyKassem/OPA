import React , {useEffect} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, ActivityIndicator} from "react-native";
import {Container, Content, Card} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import {useSelector, useDispatch} from 'react-redux';
import {getUses} from '../actions';
import Header from '../common/Header';
import COLORS from "../consts/colors";

const height = Dimensions.get('window').height;
const isIOS = Platform.OS === 'ios';

function UserManual({navigation}) {

    const lang = useSelector(state => state.lang.lang);
    const uses = useSelector(state => state.uses.uses);
    const loader = useSelector(state => state.uses.loader);

    const dispatch = useDispatch()

    function fetchData(){
        dispatch(getUses(lang))
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
        <Container>
            {renderLoader()}
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('userManual') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    {
                        uses?
                            uses.map((u, i) => {
                                console.log(u)
                                return (
                                    <View key={i}>
                                        <Text style={[styles.textRegular , styles.text_gray , styles.textSize_16 , styles.marginBottom_5, styles.alignStart]}>-- {u.title}</Text>
                                        <View style={[styles.directionBasicRow,styles.marginTop_10, styles.Width_100 , styles.marginBottom_10,{flexDirection: i % 2 ===0 ? 'row' : 'row-reverse'}]}>
                                            <Text style={[styles.textRegular , styles.text_light_gray , styles.textSize_14, styles.alignStart, {lineHeight:22 , flex:1}]}>
                                                {u.description}
                                            </Text>
                                            <Image source={{uri:u.image}} style={[styles.width_100 , styles.height_160,{marginLeft: i % 2 ===0 ? 10 : 0 , marginRight: i % 2 ===0 ? 0 : 10}]} resizeMode={'cover'} />
                                        </View>
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

export default UserManual;


