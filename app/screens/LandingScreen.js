import React, { useEffect } from 'react';
import { View, Text, Image, StyleSheet, Animated, Easing } from 'react-native';

const LandingScreen = ({}) => {
	const rotateAnim = new Animated.Value(0);
	const spin = rotateAnim.interpolate({
		inputRange: [0, 1],
		outputRange: ['0deg', '360deg'],
	});

	useEffect(() => {
		Animated.loop(
			Animated.timing(rotateAnim, {
				toValue: 1,
				duration: 3000,
				easing: Easing.linear,
				useNativeDriver: true,
			})
		).start();
	}, [rotateAnim]);

	return (
		<View style={styles.container}>
			<Animated.Image
				source={require('../assets/Landing.jpg')}
				// source={{
				// 	uri: 'https://img.freepik.com/free-vector/gradient-car-decal-sticker-collection_23-2150107844.jpg?w=1380&t=st=1686128684~exp=1686129284~hmac=055fbc951056424140f31cc7b4112dfdfd87f6a5774d86eb057cd250bba4cb0f',
				// }}
				style={[styles.logo, { transform: [{ rotate: spin }] }]}
			/>
			<Text style={styles.appName}>Welcome To Wheely Deely</Text>
		</View>
	);
};

export default LandingScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#fff',
	},
	logo: {
		width: 300,
		height: 300,
		borderRadius: 150,
		marginBottom: 30,
	},
	appName: {
		fontSize: 28,
		fontWeight: 'bold',
		color: '#333',
	},
});
