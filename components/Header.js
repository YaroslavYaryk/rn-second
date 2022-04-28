import React from "react";
import { View, Text, StyleSheet, Platform } from "react-native";
import Colors from "../constants/color";

const Header = (props) => {
    return (
        <View
            style={{
                ...styles.headerBase,
                ...Platform.select({
                    ios: styles.headerIOS,
                    android: styles.headerAndroid,
                }),
            }}
        >
            <Text
                style={{
                    ...styles.headerTextBase,
                    ...Platform.select({
                        ios: styles.headerTextIOS,
                        android: styles.headerTextAndroid,
                    }),
                }}
            >
                {props.title}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    headerBase: {
        width: "100%",
        height: 90,
        paddingTop: 36,
        alignItems: "center",
        justifyContent: "center",
    },
    headerIOS: {
        backgroundColor: "white",
    },
    headerWeb: {
        backgroundColor: Colors.primary,
    },
    headerAndroid: {
        backgroundColor: Colors.primary,
    },
    headerTextBase: {
        fontSize: 18,
        fontFamily: "open-sans-bold",
    },
    headerTextIOS: {
        color: Colors.primary,
    },
    headerTextAndroid: {
        color: "white",
    },
});

export default Header;
