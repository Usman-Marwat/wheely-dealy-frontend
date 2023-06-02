import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	FlatList,
} from 'react-native';
import React from 'react';

const FilterTabs = ({ tabs, selectedTab, onSelectTab }) => {
	return (
		<View>
			<FlatList
				data={tabs}
				horizontal
				style={{ flexGrow: 1, marginHorizontal: 50 }}
				contentContainerStyle={{ padding: 10 }}
				showsHorizontalScrollIndicator={false}
				keyExtractor={(item, index) => `${item}-${index}`}
				renderItem={({ item: tab }) => {
					return (
						<TouchableOpacity onPress={() => onSelectTab(tab)}>
							<View
								style={[
									styles.pill,
									{
										backgroundColor:
											selectedTab === tab ? 'grey' : 'transparent',
									},
								]}
							>
								<Text
									style={[
										styles.pillText,
										{ color: selectedTab === tab ? 'white' : '#000' },
									]}
								>
									{tab}
								</Text>
							</View>
						</TouchableOpacity>
					);
				}}
			/>
		</View>
	);
};

export default FilterTabs;

const styles = StyleSheet.create({
	pill: {
		paddingHorizontal: 10,
		paddingVertical: 10 / 2,
		borderRadius: 12,
	},
	pillText: {
		fontWeight: '700',
	},
});
