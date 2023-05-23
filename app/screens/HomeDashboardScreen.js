import { useEffect, useState } from 'react';
import { StyleSheet } from 'react-native';

import dashboard from '../api/dashboard';
import ActivityIndicator from '../components/ActivityIndicator';
import FilterTabs from '../components/FilterTabs';
import Posts from '../components/Posts';
import Profiles from '../components/Profiles';
import Services from '../components/Services';
import Vehicles from '../components/Vehicles';
import useApi from '../hooks/useApi';
import MenuFoldButton from '../navigation/MenuFoldButton';

const SPACING = 10;
const tabs = ['Vehicles', 'Services', 'Posts', 'Profiles'];

const ITEM_SIZE = 120;
const BG_COLOR = '#C1CEE077';

const HomeDashboardScreen = ({ navigation }) => {
	const [selectedTab, setSelectedTab] = useState(tabs[0]);

	const homeContentApi = useApi(dashboard.getHomeContent);

	const getHomeData = () => {
		homeContentApi.request();
	};

	useEffect(() => {
		getHomeData();
	}, []);

	return (
		<>
			<ActivityIndicator visible={homeContentApi.loading} />
			<MenuFoldButton />

			<FilterTabs
				tabs={tabs}
				selectedTab={selectedTab}
				onSelectTab={(tab) => setSelectedTab(tab)}
			/>

			{selectedTab === 'Vehicles' && (
				<Vehicles
					navigation={navigation}
					vehicles={homeContentApi.data?.ads}
					onRefresh={getHomeData}
				/>
			)}
			{selectedTab === 'Services' && (
				<Services
					services={homeContentApi.data?.serviceAds}
					onRefresh={getHomeData}
				/>
			)}
			{selectedTab === 'Posts' && (
				<>
					<Posts
						posts={homeContentApi.data?.posts}
						// onLike={(postId) => handlePostLike(postId)}
						// onShare={(postId) => handlePostShare(postId)}
						// onComment={(postId, text) => handlePostComment(postId, text)}
						onRefresh={getHomeData}
						// onDetails={handlePostDetails}
					/>
				</>
			)}
			{selectedTab === 'Profiles' && (
				<Profiles
					navigation={navigation}
					profiles={homeContentApi.data?.profiles}
					onRefresh={getHomeData}
				/>
			)}
		</>
	);
};

export default HomeDashboardScreen;

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
