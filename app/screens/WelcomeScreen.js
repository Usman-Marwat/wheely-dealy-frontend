import { useRef, useState } from 'react';
import {
	Animated,
	Dimensions,
	Image,
	StatusBar,
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import authApi from '../api/auth';
import AppButton from '../components/AppButton';
import colors from '../config/colors';
import routes from '../navigation/routes';
import { useEffect } from 'react';
import useApi from '../hooks/useApi';

const { width, height } = Dimensions.get('screen');

const bgs = ['#98AFC7', '#72A0C1'];

const DATA = [
	{
		role: 'Seller',
		key: '3571572',
		title: 'Expand the realm of your business',
		description: 'This is some random text for seller description',
		image: 'https://cdn-icons-png.flaticon.com/128/6331/6331739.png',
	},
	{
		role: 'Client',
		key: '3571747',
		title: 'Find the car of your choice here',
		description: 'This is some random text for client description',
		image: 'https://cdn-icons-png.flaticon.com/128/5673/5673231.png',
	},
];

const Indicator = ({ scrollX }) => {
	return (
		<View style={styles.paginationConatiner}>
			{DATA.map((_, i) => {
				const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
				const scale = scrollX.interpolate({
					inputRange,
					outputRange: [0.8, 1.4, 0.8],
					extrapolate: 'clamp',
				});
				const opacity = scrollX.interpolate({
					inputRange,
					outputRange: [0.5, 0.9, 0.5],
					extrapolate: 'clamp',
				});
				return (
					<Animated.View
						key={i}
						style={[
							styles.paginationDot,
							{ transform: [{ scale: scale }], opacity },
						]}
					></Animated.View>
				);
			})}
		</View>
	);
};

const BackDrop = ({ scrollX }) => {
	const backgroundColor = scrollX.interpolate({
		inputRange: bgs.map((_, i) => i * width),
		outputRange: bgs.map((bg) => bg),
	});
	return (
		<Animated.View
			style={[StyleSheet.absoluteFillObject, { backgroundColor }]}
		/>
	);
};

const Square = ({ scrollX }) => {
	const YOLO = Animated.modulo(
		Animated.divide(Animated.modulo(scrollX, width), new Animated.Value(width)),
		1
	);
	const rotate = YOLO.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: ['35deg', '0deg', '35deg'],
	});
	const translateX = YOLO.interpolate({
		inputRange: [0, 0.5, 1],
		outputRange: [0, -height, 0],
	});
	return (
		<Animated.View
			style={[styles.square, { transform: [{ rotate }, { translateX }] }]}
		/>
	);
};

export default function WelcomeScreen({ navigation }) {
	const scrollX = useRef(new Animated.Value(0)).current;
	const [currentIndex, setCurrentIndex] = useState(0);

	const accountTypesApi = useApi(authApi.getAccountTypes);

	useEffect(() => {
		accountTypesApi.request();
	}, []);

	const handleCurentIndex = (index) => {
		if (index < 0) index = 0;
		if (index > 1) index = 1;
		setCurrentIndex(index);
	};

	return (
		<View style={styles.container}>
			<StatusBar hidden />
			<BackDrop scrollX={scrollX} />
			<Square scrollX={scrollX} />
			<Animated.FlatList
				data={DATA}
				keyExtractor={(item) => item.key}
				horizontal
				contentContainerStyle={styles.contentContainerStyle}
				onScroll={Animated.event(
					[{ nativeEvent: { contentOffset: { x: scrollX } } }],
					{ useNativeDriver: false }
				)}
				onMomentumScrollEnd={(event) => {
					const index = Math.floor(
						Math.floor(event.nativeEvent.contentOffset.x) /
							Math.floor(event.nativeEvent.layoutMeasurement.width)
					);
					handleCurentIndex(index);
				}}
				pagingEnabled
				showsHorizontalScrollIndicator={false}
				renderItem={({ item, index }) => {
					return (
						<View style={styles.itemWrapper}>
							<View style={styles.imageContainer}>
								<SharedElement id={`item.${item.key}.image`}>
									<Image source={{ uri: item.image }} style={styles.image} />
								</SharedElement>
							</View>
							<View style={{ flex: 0.3 }}>
								<Text style={styles.title}>{item.role}</Text>
								<Text style={styles.tagline}>{item.title}</Text>
								{/* <View style={styles.description}>
									<Text>{item.description}</Text>
								</View> */}
							</View>
						</View>
					);
				}}
			/>
			<View style={styles.buttonsRow}>
				<AppButton
					color="transparent"
					style={[styles.button, { width: 190 }]}
					title={'Register'}
					subTitle={'as ' + accountTypesApi?.data?.items[currentIndex].type}
					onPress={() =>
						navigation.navigate(routes.REGISTER, {
							item: DATA[currentIndex],
							bg: bgs[currentIndex],
							account: accountTypesApi?.data?.items[currentIndex],
						})
					}
				/>

				<AppButton
					color="transparent"
					style={[styles.button, { width: 150 }]}
					title="Login"
					onPress={() =>
						navigation.navigate(routes.LOGIN, {
							item: DATA[currentIndex],
							bg: bgs[currentIndex],
							account: accountTypesApi?.data?.items[currentIndex],
						})
					}
				/>
			</View>
			<TouchableOpacity
				style={styles.visitor}
				onPress={() => navigation.navigate(routes.VISITOR_DASHBOARD)}
			>
				<Text style={styles.visitorText}>Visitor Dashboard</Text>
			</TouchableOpacity>
			<Indicator scrollX={scrollX} />
		</View>
	);
}

const styles = StyleSheet.create({
	button: {
		marginHorizontal: 10,
		borderWidth: 3.5,
		borderColor: 'white',
		padding: 10,
	},
	buttonsRow: {
		flexDirection: 'row',
		position: 'absolute',
		bottom: 120,
	},
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	contentContainerStyle: {
		paddingBottom: 100,
	},
	description: {
		width: '95%',
		paddingHorizontal: 10,
		paddingVertical: 2,
		borderRadius: 10,
		marginTop: 7,
		backgroundColor: colors.white,
	},
	imageContainer: {
		flex: 0.7,
		justifyContent: 'center',
	},
	image: {
		width: width,
		height: width / 3,
		resizeMode: 'contain',
	},
	itemWrapper: {
		alignItems: 'center',
		padding: 20,
		width,
	},
	paginationConatiner: {
		bottom: 20,
		flexDirection: 'row',
		position: 'absolute',
	},
	paginationDot: {
		height: 10,
		width: 10,
		borderRadius: 5,
		backgroundColor: '#fff',
		margin: 10,
	},
	square: {
		width: height,
		height: height,
		backgroundColor: '#fff',
		borderRadius: 86,
		position: 'absolute',
		top: -height * 0.6,
		left: -height * 0.3,
	},
	tagline: {
		color: '#fff',
		fontWeight: '800',
		fontSize: 20,
		marginBottom: 10,
	},
	title: {
		color: '#fff',
		fontWeight: '800',
		fontSize: 42,
		textTransform: 'uppercase',
		// textDecorationLine: "underline",
		// textDecorationStyle: "dashed",
	},
	visitor: {
		position: 'absolute',
		bottom: 80,
	},
	visitorText: {
		textDecorationLine: 'underline',
		color: 'white',
	},
});
