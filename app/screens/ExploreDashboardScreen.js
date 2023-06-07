import { useEffect, useState } from 'react';
import { Button } from 'react-native';

import dashboard from '../api/dashboard';
import ActivityIndicator from '../components/ActivityIndicator';
import FilterTabs from '../components/FilterTabs';
import Posts from '../components/Posts';
import Profiles from '../components/Profiles';
import Services from '../components/Services';
import Vehicles from '../components/Vehicles';
import useApi from '../hooks/useApi';
import MenuFoldButton from '../navigation/MenuFoldButton';
import userAdsApi from '../api/ad';
import Empty from '../components/Empty';
import colors from '../config/colors';
import Header from '../components/Header';

const tabs = ['Vehicles', 'Services', 'Posts', 'Profiles'];

const ExploreDashboardScreen = ({ navigation }) => {
	const [selectedTab, setSelectedTab] = useState(tabs[0]);

	const exploreContentApi = useApi(dashboard.getExploreContent);
	const postLikeApi = useApi(userAdsApi.likePost);
	const postShareApi = useApi(userAdsApi.sharePost);
	const postCommentApi = useApi(userAdsApi.commentOnPost);
	const singlePostApi = useApi(userAdsApi.getPostById);
	const saveItemApi = useApi(dashboard.saveAnItem);

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
	const handlePostShare = async (postId) => {
		const result = await postShareApi.request(postId);
		if (result.ok) getExploreData();
	};
	const handlePostComment = async (postId, text) => {
		const result = await postCommentApi.request(postId, text);
		if (result.ok) getExploreData();
	};
	const handlePostDetails = async (postId, callback) => {
		const { data } = await singlePostApi.request(postId);
		if (data.statusCode === 200) {
			exploreContentApi.data = {
				...exploreContentApi.data,
				posts: [
					...exploreContentApi.data.posts.map((p) =>
						p.alternateKey === postId ? data.obj : p
					),
				],
			};
			callback({
				...exploreContentApi.data.posts.find((p) => p.alternateKey === postId),
			});
		}
	};
	const savePost = async (postId) => {
		const { data } = await saveItemApi.request(postId, 'P');
		if (data.statusCode !== 200) alert('Could Not save the post');
		getExploreData();
	};

	return (
		<>
			<ActivityIndicator
				visible={
					exploreContentApi.loading ||
					postLikeApi.loading ||
					postShareApi.loading ||
					singlePostApi.loading ||
					saveItemApi.loading
				}
			/>
			<Header heading="Explore Dashboard" />

			<FilterTabs
				tabs={tabs}
				selectedTab={selectedTab}
				onSelectTab={(tab) => setSelectedTab(tab)}
			/>

			{selectedTab === 'Vehicles' && (
				<>
					{!exploreContentApi.data?.ads?.length > 0 && (
						<Empty title="No Ads added yet">
							<Button
								title="Reload"
								onPress={() => getExploreData()}
								color={colors.primary}
							/>
						</Empty>
					)}
					<Vehicles
						navigation={navigation}
						vehicles={exploreContentApi.data?.ads}
						onRefresh={getExploreData}
						saveAble
					/>
				</>
			)}
			{selectedTab === 'Services' && (
				<>
					{!exploreContentApi.data?.serviceAds?.length > 0 && (
						<Empty title="No Service Ads added yet">
							<Button
								title="Reload"
								onPress={() => getExploreData()}
								color={colors.primary}
							/>
						</Empty>
					)}
					<Services
						navigation={navigation}
						services={exploreContentApi.data?.serviceAds}
						onRefresh={getExploreData}
						saveAble
					/>
				</>
			)}
			{selectedTab === 'Posts' && (
				<>
					{!exploreContentApi.data?.posts?.length > 0 && (
						<Empty title="No Posts added yet">
							<Button
								title="Reload"
								onPress={() => getExploreData()}
								color={colors.primary}
							/>
						</Empty>
					)}
					<Posts
						posts={exploreContentApi.data?.posts}
						onLike={(postId) => handlePostLike(postId)}
						onShare={(postId) => handlePostShare(postId)}
						onComment={(postId, text) => handlePostComment(postId, text)}
						onRefresh={getExploreData}
						onDetails={handlePostDetails}
						saveAble
						onSave={savePost}
					/>
				</>
			)}
			{selectedTab === 'Profiles' && (
				<>
					{!exploreContentApi.data?.profiles?.length > 0 && (
						<Empty title="No Profiles yet">
							<Button
								title="Reload"
								onPress={() => getExploreData()}
								color={colors.primary}
							/>
						</Empty>
					)}
					<Profiles
						navigation={navigation}
						profiles={exploreContentApi.data?.profiles}
						onRefresh={getExploreData}
					/>
				</>
			)}
		</>
	);
};

export default ExploreDashboardScreen;
