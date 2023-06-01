import { useEffect, useState } from 'react';

import dashboard from '../api/dashboard';
import ActivityIndicator from '../components/ActivityIndicator';
import FilterTabs from '../components/FilterTabs';
import Posts from '../components/Posts';
import Profiles from '../components/Profiles';
import Services from '../components/Services';
import Vehicles from '../components/Vehicles';
import useApi from '../hooks/useApi';
import BackButton from '../navigation/BackButton';

const tabs = ['Vehicles', 'Services', 'Posts', 'Profiles', 'Questions'];

const VisitorDashboardScreen = ({ navigation }) => {
	const [selectedTab, setSelectedTab] = useState(tabs[2]);

	const visitorContentApi = useApi(dashboard.getVisitorContent);

	const getExploreData = () => {
		visitorContentApi.request();
	};

	useEffect(() => {
		getExploreData();
	}, []);

	const noDetails = () => alert('For Details please login');

	return (
		<>
			<ActivityIndicator visible={visitorContentApi.loading} />
			<BackButton />

			<FilterTabs
				tabs={tabs}
				selectedTab={selectedTab}
				onSelectTab={(tab) => setSelectedTab(tab)}
			/>

			{selectedTab === 'Vehicles' && (
				<Vehicles
					navigation={navigation}
					vehicles={visitorContentApi.data?.ads}
					onRefresh={getExploreData}
					visitor
				/>
			)}
			{selectedTab === 'Services' && (
				<Services
					navigation={navigation}
					services={visitorContentApi.data?.serviceAds}
					onRefresh={getExploreData}
					visitor
				/>
			)}
			{selectedTab === 'Posts' && (
				<>
					<Posts
						posts={visitorContentApi.data?.posts}
						visitor
						onLike={noDetails}
						onShare={noDetails}
						onComment={noDetails}
						onRefresh={noDetails}
						onDetails={noDetails}
						onSave={noDetails}
					/>
				</>
			)}
			{selectedTab === 'Profiles' && (
				<Profiles
					visitor
					navigation={navigation}
					profiles={visitorContentApi.data?.profiles}
					onRefresh={getExploreData}
				/>
			)}
		</>
	);
};

export default VisitorDashboardScreen;
