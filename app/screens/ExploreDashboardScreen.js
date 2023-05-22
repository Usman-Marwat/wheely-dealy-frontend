import { useEffect, useState } from 'react';

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

const tabs = ['Vehicles', 'Services', 'Posts', 'Profiles'];

const ExploreDashboardScreen = ({ navigation }) => {
	const [selectedTab, setSelectedTab] = useState(tabs[0]);

	const exploreContentApi = useApi(dashboard.getExploreContent);
	const postLikeApi = useApi(userAdsApi.likePost);
	const postShareApi = useApi(userAdsApi.sharePost);
	const postCommentApi = useApi(userAdsApi.commentOnPost);
	const singlePostApi = useApi(userAdsApi.getPostById);

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

	return (
		<>
			<ActivityIndicator
				visible={
					exploreContentApi.loading ||
					postLikeApi.loading ||
					postShareApi.loading ||
					singlePostApi.loading
				}
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
					onRefresh={getExploreData}
				/>
			)}
			{selectedTab === 'Services' && (
				<Services
					services={exploreContentApi.data?.serviceAds}
					onRefresh={getExploreData}
				/>
			)}
			{selectedTab === 'Posts' && (
				<>
					<Posts
						posts={exploreContentApi.data?.posts}
						onLike={(postId) => handlePostLike(postId)}
						onShare={(postId) => handlePostShare(postId)}
						onComment={(postId, text) => handlePostComment(postId, text)}
						onRefresh={getExploreData}
						onDetails={handlePostDetails}
					/>
				</>
			)}
			{selectedTab === 'Profiles' && (
				<Profiles
					navigation={navigation}
					profiles={exploreContentApi.data?.profiles}
					onRefresh={getExploreData}
				/>
			)}
		</>
	);
};

export default ExploreDashboardScreen;
