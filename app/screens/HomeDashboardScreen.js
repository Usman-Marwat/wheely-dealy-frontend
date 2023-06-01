import { useEffect, useState } from 'react';
import { Button, StyleSheet, View } from 'react-native';

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
import userAdsApi from '../api/ad';
import Empty from '../components/Empty';
import colors from '../config/colors';

const tabs = ['Vehicles', 'Services', 'Posts', 'Profiles'];

const HomeDashboardScreen = ({ navigation }) => {
	const [selectedTab, setSelectedTab] = useState(tabs[0]);
	const { user } = useAuth();

	const homeContentApi = useApi(dashboard.getHomeContent);
	const postLikeApi = useApi(userAdsApi.likePost);
	const postShareApi = useApi(userAdsApi.sharePost);
	const postCommentApi = useApi(userAdsApi.commentOnPost);
	const singlePostApi = useApi(userAdsApi.getPostById);
	const saveItemApi = useApi(dashboard.saveAnItem);

	const getHomeData = () => {
		homeContentApi.request();
	};
	const handlePostLike = async (postId) => {
		const result = await postLikeApi.request(postId);
		if (result.ok) getHomeData();
	};
	const handlePostShare = async (postId) => {
		const result = await postShareApi.request(postId);
		if (result.ok) getHomeData();
	};
	const handlePostComment = async (postId, text) => {
		const result = await postCommentApi.request(postId, text);
		if (result.ok) getHomeData();
	};
	const handlePostDetails = async (postId, callback) => {
		const { data } = await singlePostApi.request(postId);
		if (data.statusCode === 200) {
			homeContentApi.data = {
				...homeContentApi.data,
				posts: [
					...homeContentApi.data.posts.map((p) =>
						p.alternateKey === postId ? data.obj : p
					),
				],
			};
			callback({
				...homeContentApi.data.posts.find((p) => p.alternateKey === postId),
			});
		}
	};
	const savePost = async (postId) => {
		const { data } = await saveItemApi.request(postId, 'P');
		if (data.statusCode !== 200) alert('Could Not save the post');
		getHomeData();
	};

	useEffect(() => {
		getHomeData();
	}, []);

	return (
		<>
			<ActivityIndicator
				visible={
					homeContentApi.loading ||
					postLikeApi.loading ||
					postShareApi.loading ||
					singlePostApi.loading ||
					saveItemApi.loading
				}
			/>
			<MenuFoldButton />

			<FilterTabs
				tabs={tabs}
				selectedTab={selectedTab}
				onSelectTab={(tab) => setSelectedTab(tab)}
			/>

			{selectedTab === 'Vehicles' && (
				<>
					{!homeContentApi.data?.ads?.length > 0 && (
						<Empty title="No Ads added yet">
							<Button
								title="Reload"
								onPress={() => getHomeData()}
								color={colors.primary}
							/>
						</Empty>
					)}
					<Vehicles
						navigation={navigation}
						vehicles={homeContentApi.data?.ads}
						onRefresh={getHomeData}
						saveAble
					/>
				</>
			)}
			{selectedTab === 'Services' && (
				<>
					{!homeContentApi.data?.serviceAds?.length > 0 && (
						<Empty title="No Service Ads added yet">
							<Button
								title="Reload"
								onPress={() => getHomeData()}
								color={colors.primary}
							/>
						</Empty>
					)}
					<Services
						navigation={navigation}
						services={homeContentApi.data?.serviceAds}
						onRefresh={getHomeData}
						saveAble
					/>
				</>
			)}
			{selectedTab === 'Posts' && (
				<>
					{!homeContentApi.data?.posts?.length > 0 && (
						<Empty title="No Posts added yet">
							<Button
								title="Reload"
								onPress={() => getHomeData()}
								color={colors.primary}
							/>
						</Empty>
					)}
					<Posts
						posts={homeContentApi.data?.posts}
						onLike={(postId) => handlePostLike(postId)}
						onShare={(postId) => handlePostShare(postId)}
						onComment={(postId, text) => handlePostComment(postId, text)}
						onRefresh={getHomeData}
						onDetails={handlePostDetails}
						saveAble
						onSave={savePost}
					/>
				</>
			)}
			{selectedTab === 'Profiles' && (
				<>
					{!homeContentApi.data?.profiles?.length > 0 && (
						<Empty title="No Profiles added yet">
							<Button
								title="Reload"
								onPress={() => getHomeData()}
								color={colors.primary}
							/>
						</Empty>
					)}
					<Profiles
						navigation={navigation}
						profiles={homeContentApi.data?.profiles}
						onRefresh={getHomeData}
					/>
				</>
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
