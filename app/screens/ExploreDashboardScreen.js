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
import userAds from '../api/ad';

const tabs = ['Vehicles', 'Services', 'Posts', 'Profiles'];

const ExploreDashboardScreen = ({ navigation }) => {
	const [selectedTab, setSelectedTab] = useState(tabs[0]);

	const exploreContentApi = useApi(dashboard.getExploreContent);
	const postLikeApi = useApi(userAds.likePost);

	const getExploreData = () => {
		exploreContentApi.request();
	};

	useEffect(() => {
		getExploreData();
	}, []);

	const handlePostLike = async (postId) => {
		const result = await postLikeApi.request(postId);
		if (result.ok) getExploreData();
	};

	return (
		<>
			<ActivityIndicator
				visible={exploreContentApi.loading || postLikeApi.loading}
			/>
			<MenuFoldButton />

			<FilterTabs
				tabs={tabs}
				selectedTab={selectedTab}
				onSelectTab={(tab) => setSelectedTab(tab)}
			/>

			{selectedTab === 'Vehicles' && (
				<Vehicles
					navigation={navigation}
					vehicles={exploreContentApi.data?.ads}
				/>
			)}
			{selectedTab === 'Services' && (
				<Services services={exploreContentApi.data?.serviceAds} />
			)}
			{selectedTab === 'Posts' && (
				<Posts
					posts={exploreContentApi.data?.posts}
					onLike={(postId) => handlePostLike(postId)}
				/>
			)}
			{selectedTab === 'Profiles' && (
				<Profiles
					navigation={navigation}
					profiles={exploreContentApi.data?.profiles}
				/>
			)}
		</>
	);
};

export default ExploreDashboardScreen;

const styles = StyleSheet.create({});
