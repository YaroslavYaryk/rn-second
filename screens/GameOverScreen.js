import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    Button,
    Image,
    Dimensions,
    ScrollView,
} from "react-native";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import Colors from "../constants/color";
import MainButton from "../components/MainButton";

const GameOverScreen = (props) => {
    const [screenVidth, setScreenVidth] = useState(
        Dimensions.get("window").width * 0.7
    );
    const [screenHeight, setScreenHeight] = useState(
        Dimensions.get("window").height
    );

    useEffect(() => {
        const updateScreenSize = () => {
            setScreenVidth(Dimensions.get("window").width * 0.7);
            setScreenHeight(Dimensions.get("window").height);
        };

        Dimensions.addEventListener("change", updateScreenSize);

        return () => {
            Dimensions.removeEventListener("change", updateScreenSize);
        };
    });

    return (
        <ScrollView>
            <View style={styles.screen}>
                <TitleText style={{ marginTop: screenHeight / 40 }}>
                    The Game is Over!
                </TitleText>
                <View
                    style={[
                        styles.imageContainer,
                        {
                            width: screenVidth,
                            height: screenVidth,
                            borderRadius: screenVidth / 2,
                            marginBottom: screenHeight / 40,
                            marginTop: screenHeight / 40,
                        },
                    ]}
                >
                    <Image
                        source={require("../assets/success.png")} //local
                        // source={{ uri: "https://static.euronews.com/articles/stories/05/26/61/88/1100x619_cmsv2_7fce538a-0a0e-5133-bf70-24ec472d5618-5266188.jpg" }}
                        style={styles.image}
                    />
                </View>
                <View style={styles.resultContainer}>
                    <BodyText
                        style={{
                            textAlign: "center",
                            fontSize: screenVidth < 400 ? 16 : 20,
                        }}
                    >
                        Your phone user
                        <TitleText style={styles.highlight}>
                            {" "}
                            {props.rounds}{" "}
                        </TitleText>
                        rounds tp guess number
                        <TitleText style={styles.highlight}>
                            {" "}
                            {props.userNumber}
                        </TitleText>
                    </BodyText>
                </View>
                <MainButton onPress={props.restartGame}>NEW GAME</MainButton>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        paddingVertical: 10,
    },
    imageContainer: {
        borderWidth: 3,
        overflow: "hidden",
    },
    image: {
        width: "100%",
        height: "100%",
    },
    highlight: {
        color: Colors.primary,
    },
    resultContainer: {
        width: "80%",
        marginVertical: 10,
    },
});

export default GameOverScreen;
