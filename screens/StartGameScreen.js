import React, { useState, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Button,
    Keyboard,
    Alert,
    Dimensions,
    ScrollView,
    KeyboardAvoidingView,
} from "react-native";
import Colors from "../constants/color";
import Input from "../components/Input";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import BodyText from "../components/BodyText";
import TitleText from "../components/TitleText";
import MainButton from "../components/MainButton";

const StartGameScreen = (props) => {
    const [enteredNumber, setEnteredNumber] = useState("");
    const [confirmed, setConfirmed] = useState(false);
    const [selectedNumber, setSelectedNumber] = useState();
    const [buttonVidth, setButtonVidth] = useState(
        Dimensions.get("window").width / 4
    );

    useEffect(() => {
        const updateScreenSize = () => {
            setButtonVidth(Dimensions.get("window").width / 4);
        };

        Dimensions.addEventListener("change", updateScreenSize);

        return () => {
            Dimensions.removeEventListener("change", updateScreenSize);
        };
    });

    const numberInputHandler = (number) => {
        setEnteredNumber(number.replace(/[^0-9]/g, ""));
    };

    const ressetButtonHandle = () => {
        setEnteredNumber("");
        setConfirmed(false);
    };

    const confirmButtonHandle = () => {
        const chosenNumber = parseInt(enteredNumber);
        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert("Invalid Number", "Number should be between 1 and 99", [
                {
                    text: "Okay",
                    style: "destructive",
                    onPress: ressetButtonHandle,
                },
            ]);
            return;
        }

        setConfirmed(true);
        setSelectedNumber(chosenNumber);
        setEnteredNumber("");
        Keyboard.dismiss();
    };

    let confirmedOutput;

    if (confirmed) {
        confirmedOutput = (
            <Card style={styles.summaryContainer}>
                <Text>You Selected:</Text>
                <NumberContainer>{selectedNumber}</NumberContainer>
                <MainButton
                    onPress={() => {
                        props.onStartGame(selectedNumber);
                    }}
                >
                    START GAME
                </MainButton>
            </Card>
        );
    }

    return (
        <ScrollView>
            <KeyboardAvoidingView
                behavior="position"
                keyboardVerticalOffset={30}
            >
                <TouchableWithoutFeedback
                    onPress={() => {
                        Keyboard.dismiss();
                    }}
                >
                    <View style={styles.screen}>
                        <TitleText style={styles.title}>
                            Start a New Game!
                        </TitleText>
                        <View style={styles.inputContainer}>
                            <BodyText>Select a Number</BodyText>
                            <Input
                                style={styles.input}
                                blurOnSubmit
                                autoCorrect={false}
                                keyboardType="number-pad"
                                maxLength={2}
                                onChangeText={numberInputHandler}
                                value={enteredNumber}
                            />
                            <View style={styles.buttonContainer}>
                                <View style={{ width: buttonVidth }}>
                                    <Button
                                        title="Reset"
                                        onPress={ressetButtonHandle}
                                        color={Colors.accent}
                                    />
                                </View>
                                <View style={{ width: buttonVidth }}>
                                    <Button
                                        title="Confirm"
                                        onPress={confirmButtonHandle}
                                        color={Colors.primary}
                                    />
                                </View>
                            </View>
                        </View>
                        {confirmedOutput}
                    </View>
                </TouchableWithoutFeedback>
            </KeyboardAvoidingView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },
    title: {
        fontFamily: "open-sans-bold",
        fontSize: 20,
        marginVertical: 10,
    },
    inputContainer: {
        width: "80%",
        backgroundColor: "red",
        minWidth: 300,
        maxWidth: "90%",

        alignItems: "center",
        shadowColor: "black",
        shadowOffset: { width: 0, hight: 2 },
        shadowRadius: 6,
        shadowOpacity: 0.6,
        elevation: 5,
        backgroundColor: "white",
        borderRadius: 10,
    },
    buttonContainer: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-around",
        padding: 15,
    },
    input: {
        borderColor: "red",
        width: 50,
        textAlign: "center",
        height: 30,
        borderBottomColor: "grey",
        borderBottomWidth: 1,
        marginVertical: 5,
    },
    summaryContainer: {
        marginTop: 20,
        alignItems: "center",
    },
});

export default StartGameScreen;
