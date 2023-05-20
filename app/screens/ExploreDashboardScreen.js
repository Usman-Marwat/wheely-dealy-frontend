import { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';

import dashboard from '../api/dashboard';
import ActivityIndicator from '../components/ActivityIndicator';
import FilterTabs from '../components/FilterTabs';
import Profiles from '../components/Profiles';
import Services from '../components/Services';
import Vehicles from '../components/Vehicles';
import useApi from '../hooks/useApi';
import MenuFoldButton from '../navigation/MenuFoldButton';

const tabs = ['Vehicles', 'Services', 'Posts', 'Profiles'];

const ExploreDashboardScreen = ({ navigation }) => {
	const [selectedTab, setSelectedTab] = useState(tabs[0]);

	const exploreContentApi = useApi(dashboard.getExploreContent);

	useEffect(() => {
		exploreContentApi.request();
	}, []);

	return (
		<>
			<ActivityIndicator visible={exploreContentApi.loading} />
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
			{selectedTab === 'Posts' && <Text>Posts</Text>}
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
