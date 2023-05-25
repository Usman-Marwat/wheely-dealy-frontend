import { Modal, StyleSheet, Text, View } from 'react-native';
import React from 'react';

import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import AppButton from './AppButton';

const MapLocationPicker = ({
	visible,
	onPress,
	onAddlocation,
	region,
	buttonTitle = 'select',
}) => {
	return (
		<Modal visible={visible} animationType="slide">
			<View style={{ flex: 1 }}>
				<MapView style={styles.map} region={region} provider={PROVIDER_GOOGLE}>
					<Marker
						draggable
						coordinate={{
							latitude: region.latitude,
							longitude: region.longitude,
						}}
						onDragEnd={(e) => onAddlocation(e.nativeEvent.coordinate)}
					>
						<Callout>
							<Text>Select an approximate location of site</Text>
						</Callout>
					</Marker>
				</MapView>
			</View>
			<AppButton onPress={onPress} title={buttonTitle} style={styles.button} />
		</Modal>
	);
};

export default MapLocationPicker;

const styles = StyleSheet.create({
	button: {
		position: 'absolute',
		alignSelf: 'center',
		justifyContent: 'flex-end',
		bottom: 30,
		width: '80%',
	},
	map: {
		width: '100%',
		height: '100%',
	},
});
