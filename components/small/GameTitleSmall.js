import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import NumberContainer from "../NumberContainer";
import MainButton from "../MainButton";
import { Ionicons } from "@expo/vector-icons";

const GameTitleSmall = (props) => {
    return (
        <View style={styles.screen}>
            <Text>Oponent's Guess </Text>
            <View style={styles.controls}>
                <MainButton
                    onPress={() => {
                        props.nextGuessHandle("lower");
                    }}
                >
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <NumberContainer>{props.currentGuess}</NumberContainer>

                <MainButton
                    onPress={() => {
                        props.nextGuessHandle("greater");
                    }}
                >
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </View>
            <View style={styles.listContainer} s>
                {/* <ScrollView contentContainerStyle={styles.list}>
                    {currentGuessesList.map((guess, index) =>
                        renderListItem(guess, currentGuessesList.length - index)
                    )}
                </ScrollView> */}

                <FlatList
                    keyExtractor={(item) => item}
                    data={props.currentGuessesList}
                    renderItem={props.renderListItem.bind(
                        this,
                        props.currentGuessesList.length
                    )}
                    contentContainerStyle={styles.list}
                />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: "center",
    },

    listContainer: {
        flex: 1,
        width: Dimensions.get("window").width > 350 ? "60%" : "80%",
    },
    list: {
        flexGrow: 1,
        // alignItems: "center",
        justifyContent: "flex-end",
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
    },
});
export default GameTitleSmall;
