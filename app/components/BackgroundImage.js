import { Image, StyleSheet } from 'react-native';

const BackgroundImage = ({ uri }) => {
	return (
		<Image
			source={{ uri }}
			style={StyleSheet.absoluteFillObject}
			blurRadius={80}
		/>
	);
};

export default BackgroundImage;

const styles = StyleSheet.create({});
