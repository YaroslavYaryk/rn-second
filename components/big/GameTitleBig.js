import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import NumberContainer from "../NumberContainer";
import MainButton from "../MainButton";
import { Ionicons } from "@expo/vector-icons";
import Card from "../Card";

const GameTitleBig = (props) => {
    return (
        <View style={styles.screen}>
            <Text>Oponent's Guess </Text>
            <NumberContainer>{props.currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton
                    onPress={() => {
                        props.nextGuessHandle("lower");
                    }}
                >
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton
                    onPress={() => {
                        props.nextGuessHandle("greater");
                    }}
                >
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>

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
    buttonContainer: {
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: Dimensions.get("window").height > 600 ? 10 : 5,
        width: 400,
        maxWidth: "90%",
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
export default GameTitleBig;
