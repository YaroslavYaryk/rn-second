import { StyleSheet, Text, View, SafeAreaView } from "react-native";
import Header from "./components/Header";
import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import GameOverScreen from "./screens/GameOverScreen";
import React, { useState } from "react";
import AppLoading from "expo-app-loading";

import * as Font from "expo-font";

const fontsFetch = () => {
    return Font.loadAsync({
        "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
        "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
    });
};

export default function App() {
    const [userNumber, setUserNuber] = useState();
    const [guessRounds, setGuessRounds] = useState(0);
    const [dataLoaded, setDataLoaded] = useState(false);

    if (!dataLoaded) {
        return (
            <AppLoading
                startAsync={fontsFetch}
                onFinish={() => {
                    setDataLoaded(true);
                }}
                onError={console.log("error")}
            />
        );
    }

    const startGameHandler = (selectedNumber) => {
        setUserNuber(selectedNumber);
        setGuessRounds(0);
    };

    const gameOverHandler = (numOfRounds) => {
        setGuessRounds(numOfRounds.length);
    };

    const restartGameHandle = () => {
        setGuessRounds(0);
        setUserNuber(0);
    };

    let content = <StartGameScreen onStartGame={startGameHandler} />;
    if (userNumber && guessRounds <= 0) {
        content = (
            <GameScreen userChoice={userNumber} onGameOver={gameOverHandler} />
        );
    } else if (guessRounds > 0) {
        content = (
            <GameOverScreen
                rounds={guessRounds}
                userNumber={userNumber}
                restartGame={restartGameHandle}
            />
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <Header title="Guess a Number" />

            {content}
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // backgroundColor: '#fff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
});
