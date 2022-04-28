import React from 'react';
import { StyleSheet, TextInput } from 'react-native'
import Colors from "../constants/color"


const Input = props => {
	return (
		<TextInput
			style={{ ...styles.input, ...props.style }}
			{...props}
		/>

	);
}



const styles = StyleSheet.create({
	input: {
		height: 30,
		borderBottomColor: "grey",
		borderBottomWidth: 1,
		marginVertical: 5,

	}
})

export default Input;