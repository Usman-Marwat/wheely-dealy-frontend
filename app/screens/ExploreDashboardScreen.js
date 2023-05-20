import { useEffect, useState } from 'react';
import {
	FlatList,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { SharedElement } from 'react-navigation-shared-element';

import dashboard from '../api/dashboard';
import FilterTabs from '../components/FilterTabs';
import useApi from '../hooks/useApi';
import MenuFoldButton from '../navigation/MenuFoldButton';
import routes from '../navigation/routes';
import ActivityIndicator from '../components/ActivityIndicator';

const SPACING = 10;
const tabs = ['Vehicles', 'Services', 'Posts', 'Profiles'];

const ITEM_SIZE = 120;
const BG_COLOR = '#C1CEE077';

const ExploreDashboardScreen = ({ navigation }) => {
	const [selectedTab, setSelectedTab] = useState(tabs[0]);

	const exploreContentApi = useApi(dashboard.getExploreContent);

	useEffect(() => {
		exploreContentApi.request();
	}, []);

	return (
		<>
			<ActivityIndicator visible={exploreContentApi.loading} />
			<View style={{ paddingBottom: 10 }}>
				<MenuFoldButton />

				<FilterTabs
					tabs={tabs}
					selectedTab={selectedTab}
					onSelectTab={(tab) => setSelectedTab(tab)}
				/>

				{selectedTab === 'Vehicles' && (
					<FlatList
						showsVerticalScrollIndicator={false}
						contentContainerStyle={{ padding: SPACING }}
						data={exploreContentApi.data?.ads}
						keyExtractor={(item) => item.alternateKey}
						renderItem={({ item }) => {
							return (
								<TouchableOpacity
									onPress={() =>
										navigation.navigate(routes.ADS_LIST_DETAIL, { item })
									}
								>
									<View style={styles.item}>
										<View>
											<SharedElement id={`item.${item.key}.modal`}>
												<Text style={styles.model}>{item.title}</Text>
											</SharedElement>
											<SharedElement id={`item.${item.key}.description`}>
												<Text style={styles.description}>
													{item.description}
												</Text>
											</SharedElement>
											<SharedElement>
												<Text style={styles.price}>$ {item.price}</Text>
											</SharedElement>
										</View>
										<SharedElement
											id={`item.${item.key}.image`}
											style={styles.image}
										>
											<Image
												source={{ uri: item.imageUrls[0].url }}
												style={{ flex: 1, resizeMode: 'contain' }}
											/>
										</SharedElement>
									</View>
								</TouchableOpacity>
							);
						}}
					/>
				)}
			</View>
		</>
	);
};

export default ExploreDashboardScreen;

const styles = StyleSheet.create({
	description: {
		fontSize: 12,
		opacity: 0.7,
		position: 'absolute',
		top: SPACING + 17,
	},
	item: {
		height: ITEM_SIZE * 1.7,
		borderRadius: 12,
		marginBottom: SPACING,
		padding: SPACING,
		backgroundColor: BG_COLOR,
		overflow: 'hidden',
	},
	image: {
		height: ITEM_SIZE * 1.2,
		width: '100%',
		position: 'absolute',
		bottom: 10,
		right: '-30%',
		padding: 10,
	},
	model: {
		fontSize: 18,
		fontWeight: '700',
		position: 'absolute',
	},
	price: {
		fontSize: 12,
		fontWeight: '700',
		opacity: 0.7,
		position: 'absolute',
		top: SPACING + 47,
	},
});
