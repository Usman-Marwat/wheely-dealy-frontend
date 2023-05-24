import { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';

import dashboard from '../api/dashboard';
import ActivityIndicator from '../components/ActivityIndicator';
import FilterTabs from '../components/FilterTabs';
import Posts from '../components/Posts';
import Profiles from '../components/Profiles';
import Services from '../components/Services';
import Vehicles from '../components/Vehicles';
import useApi from '../hooks/useApi';
import MenuFoldButton from '../navigation/MenuFoldButton';
import TouchableIcon from '../components/TouchableIcon';
import useAuth from '../auth/useAuth';
import routes from '../navigation/routes';

const tabs = ['Vehicles', 'Services', 'Posts', 'Profiles'];

const HomeDashboardScreen = ({ navigation }) => {
	const [selectedTab, setSelectedTab] = useState(tabs[0]);
	const { user } = useAuth();

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
					saveAble
				/>
			)}
			{selectedTab === 'Services' && (
				<View>
					<Services
						services={homeContentApi.data?.serviceAds}
						onRefresh={getHomeData}
					/>
				</View>
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

					{user.account_type === 'Seller' && (
						<View style={styles.plusButton}>
							<TouchableIcon
								name="plus"
								size={50}
								iconColor="black"
								onPress={() => navigation.navigate(routes.POST_EDIT)}
							></TouchableIcon>
						</View>
					)}
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
	plusButton: {
		position: 'absolute',
		bottom: 10,
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
	},
});
