import * as React from 'react';
import { Image } from 'react-native';
import { Dimensions, Text, View } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import randomCarImages from '../config/randomCarImages';

function Index({ images }) {
	const width = Dimensions.get('window').width - 70;
	return (
		<View style={{ flex: 1 }}>
			<Carousel
				loop
				width={width}
				height={width / 2}
				data={images}
				scrollAnimationDuration={1000}
				renderItem={({ item }) => {
					return (
						<View
							style={{
								flex: 1,
							}}
						>
							<Image
								source={{ uri: item }}
								style={{ width: '100%', height: '100%' }}
							/>
						</View>
					);
				}}
			/>
		</View>
	);
}

export default Index;
