import { useEffect, useState } from 'react';

import dashboard from '../api/dashboard';
import ActivityIndicator from '../components/ActivityIndicator';
import FilterTabs from '../components/FilterTabs';
import Posts from '../components/Posts';
import Services from '../components/Services';
import Vehicles from '../components/Vehicles';
import useApi from '../hooks/useApi';
import MenuFoldButton from '../navigation/MenuFoldButton';
import userAdsApi from '../api/ad';

const tabs = ['Vehicles', 'Services', 'Posts'];

const SaveDashboardScreen = ({ navigation }) => {
	const [selectedTab, setSelectedTab] = useState(tabs[0]);

	const saveContentApi = useApi(dashboard.getSavedContent);
	const postLikeApi = useApi(userAdsApi.likePost);
	const postShareApi = useApi(userAdsApi.sharePost);
	const postCommentApi = useApi(userAdsApi.commentOnPost);
	const singlePostApi = useApi(userAdsApi.getPostById);

	const getSavedItems = () => {
		saveContentApi.request();
	};

	useEffect(() => {
		getSavedItems();
	}, []);

	const handlePostLike = async (postId) => {
		const result = await postLikeApi.request(postId);
		if (result.ok) getSavedItems();
	};
	const handlePostShare = async (postId) => {
		const result = await postShareApi.request(postId);
		if (result.ok) getSavedItems();
	};
	const handlePostComment = async (postId, text) => {
		const result = await postCommentApi.request(postId, text);
		if (result.ok) getSavedItems();
	};
	const handlePostDetails = async (postId, callback) => {
		const { data } = await singlePostApi.request(postId);
		if (data.statusCode === 200) {
			saveContentApi.data = {
				...saveContentApi.data,
				posts: [
					...saveContentApi.data.posts.map((p) =>
						p.alternateKey === postId ? data.obj : p
					),
				],
			};
			callback({
				...saveContentApi.data.posts.find((p) => p.alternateKey === postId),
			});
		}
	};

	return (
		<>
			<ActivityIndicator
				visible={
					saveContentApi.loading ||
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
					vehicles={saveContentApi.data?.ads}
					onRefresh={getSavedItems}
				/>
			)}
			{selectedTab === 'Services' && (
				<Services
					navigation={navigation}
					services={saveContentApi.data?.serviceAds}
					onRefresh={getSavedItems}
				/>
			)}
			{selectedTab === 'Posts' && (
				<>
					<Posts
						posts={saveContentApi.data?.posts}
						onLike={(postId) => handlePostLike(postId)}
						onShare={(postId) => handlePostShare(postId)}
						onComment={(postId, text) => handlePostComment(postId, text)}
						onRefresh={getSavedItems}
						onDetails={handlePostDetails}
					/>
				</>
			)}
		</>
	);
};

export default SaveDashboardScreen;