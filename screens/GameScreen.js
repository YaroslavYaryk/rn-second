import React, { useState, useRef, useEffect } from "react";
import {
    View,
    Text,
    StyleSheet,
    TouchableWithoutFeedback,
    Button,
    Alert,
    Dimensions,
    FlatList,
} from "react-native";
import Colors from "../constants/color";
import NumberContainer from "../components/NumberContainer";
import Card from "../components/Card";
import MainButton from "../components/MainButton";
import { Ionicons } from "@expo/vector-icons";
import BodyText from "../components/BodyText";
import GameTitleSmall from "../components/small/GameTitleSmall";
import GameTitleBig from "../components/big/GameTitleBig";

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.ceil(max);
    const randomNumber = Math.floor(Math.random() * (max - min)) + min;
    if (randomNumber === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return randomNumber;
    }
};

const GameScreen = (props) => {
    const initialGenerate = generateRandomBetween(1, 100, props.userChoice);

    const [currentGuess, setCurrentGuess] = useState(
        initialGenerate.toString()
    );
    const [currentGuessesList, setCurrentGuessesList] = useState([
        initialGenerate,
    ]);
    const currentLow = useRef(1);
    const currentHight = useRef(99);

    const [screenVidth, setScreenVidth] = useState(
        Dimensions.get("window").width
    );
    const [screenHeight, setScreenHeight] = useState(
        Dimensions.get("window").height
    );

    useEffect(() => {
        const updateScreenSize = () => {
            setScreenVidth(Dimensions.get("window").width);
            setScreenHeight(Dimensions.get("window").height);
        };

        Dimensions.addEventListener("change", updateScreenSize);

        return () => {
            Dimensions.removeEventListener("change", updateScreenSize);
        };
    });

    const nextGuessHandle = (direction) => {
        if (
            (direction === "lower" && currentGuess < props.userChoice) ||
            (direction === "greater" && currentGuess > props.userChoice)
        ) {
            Alert.alert("Don't lie!", "You know that this is wrong...", [
                { text: "Okay", style: "cancel" },
            ]);
            return;
        }
        if (direction === "lower") {
            currentHight.current = currentGuess;
        } else {
            currentLow.current = (parseInt(currentGuess) + 1).toString();
        }

        const nextNumber = generateRandomBetween(
            currentLow.current,
            currentHight.current,
            currentGuess
        );
        setCurrentGuess(nextNumber);
        setCurrentGuessesList((pastGuesses) => [
            nextNumber.toString(),
            ...pastGuesses,
        ]);
    };

    const renderListItem = (listLength, itemData) => (
        <View style={styles.listItem}>
            <BodyText>#{listLength - itemData.index}</BodyText>
            <BodyText>{itemData.item}</BodyText>
        </View>
    );

    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(currentGuessesList);
        }
    }, [currentGuess, userChoice, onGameOver]);

    if (screenHeight < 500) {
        return (
            <GameTitleSmall
                nextGuessHandle={nextGuessHandle}
                currentGuessesList={currentGuessesList}
                currentGuess={currentGuess}
                renderListItem={renderListItem}
            />
        );
    }

    return (
        <GameTitleBig
            nextGuessHandle={nextGuessHandle}
            currentGuessesList={currentGuessesList}
            currentGuess={currentGuess}
            renderListItem={renderListItem}
        />
    );
};

const styles = StyleSheet.create({
    listItem: {
        borderColor: "#ccc",
        borderWidth: 1,
        padding: Dimensions.get("window").height > 600 ? 15 : 10,
        marginVertical: 10,
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
    },
});

export default GameScreen;
