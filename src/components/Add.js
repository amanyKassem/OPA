import React , {useEffect, useState} from "react";
import {View, Text, Image, TouchableOpacity, Dimensions, I18nManager} from "react-native";
import {Container, Content, Card, Label, Form, Input, Item} from 'native-base'
import styles from '../../assets/styles'
import i18n from "../../locale/i18n";
import Header from '../common/Header';
import COLORS from "../consts/colors";

function Add({navigation,route}) {
    return (
        <Container style={[styles.bg_gray]}>
            <Content contentContainerStyle={[styles.bgFullWidth , styles.bg_gray]}>

                <Header navigation={navigation} title={ i18n.t('add') }/>

                <View style={[styles.bgFullWidth,styles.paddingHorizontal_20 ,styles.bg_White,
                    styles.Width_100, styles.paddingTop_30,
                    {borderTopRightRadius:50 , borderTopLeftRadius:50}]}>

                    <TouchableOpacity onPress={() => navigation.navigate('addAdTerms')} style={[styles.babyblueBtn , styles.bg_babyblue , styles.Width_80, styles.SelfCenter , styles.marginBottom_15 ]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('addAd') }</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => navigation.navigate('addOrder')} style={[styles.babyblueBtn  , styles.Width_80, styles.SelfCenter ]}>
                        <Text style={[styles.textRegular , styles.text_White , styles.textSize_16]}>{ i18n.t('addOrder') }</Text>
                    </TouchableOpacity>



                </View>

            </Content>
        </Container>
    );
}

export default Add;


