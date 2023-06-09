import { FontAwesome } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import {
	Alert,
	FlatList,
	RefreshControl,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import seller from '../api/seller';
import ActivityIndicator from '../components/ActivityIndicator';
import FilterTabs from '../components/FilterTabs';
import Header from '../components/Header';
import TableRow from '../components/TableRow';
import colors from '../config/colors';
import useApi from '../hooks/useApi';

const tabs = ['All', 'Pending', 'Approved', 'Rejected'];
const statusIds = { Pending: 5, Approved: 1, Rejected: 2 };

const ServiceDealsScreen = () => {
	const [selectedTab, setSelectedTab] = useState(tabs[0]);

	const serviceDealsApi = useApi(seller.getMyServiceDeals);
	const serviceActionApi = useApi(seller.approveOrRejectServiceDeal);

	const getData = () => {
		serviceDealsApi.request();
	};

	const performServiceAction = async (dealId, command, action) => {
		const { data } = await serviceActionApi.request(dealId, command);

		if (data.statusCode !== 200) return alert(`Could not ${action} deal`);
		getData();
	};

	const handleServiceAction = (dealId, command) => {
		const action =
			command === 1 ? 'Approve' : command === 2 ? 'Reject' : 'Pending';
		Alert.alert(`${action} The Deal?`, `Are you sure?`, [
			{
				text: 'Yes',
				onPress: () => performServiceAction(dealId, command, action),
				style: 'destructive',
			},
			{ text: 'No' },
		]);
	};

	useEffect(() => {
		getData();
	}, []);

	const filtered =
		selectedTab !== 'All'
			? serviceDealsApi.data?.items.filter(
					(item) => item.statusId === statusIds[selectedTab]
			  )
			: serviceDealsApi.data?.items;

	return (
		<>
			<ActivityIndicator
				visible={serviceDealsApi.loading || serviceActionApi.loading}
			/>
			<Header heading="Claimed Deals" />
			<View style={styles.filterTabs}>
				<FilterTabs
					tabs={tabs}
					selectedTab={selectedTab}
					onSelectTab={(tab) => setSelectedTab(tab)}
				/>
			</View>

			<View style={styles.headingContainer}>
				<Text style={styles.text}>Ad</Text>
				<Text style={styles.text}>Price</Text>
				<Text style={styles.text}>Action</Text>
			</View>
			<FlatList
				showsVerticalScrollIndicator={false}
				contentContainerStyle={{
					paddingHorizontal: 10,
					paddingVerticle: 10,
				}}
				data={filtered}
				keyExtractor={(item) => item.alternateKey}
				refreshControl={<RefreshControl onRefresh={getData} />}
				renderItem={({ item }) => {
					const status =
						item.statusId === 1
							? 'Approved'
							: item.statusId === 2
							? 'Rejected'
							: 'Pending';
					return (
						<View style={{ marginVertical: 10 }}>
							<TableRow
								column1={item.ad.title}
								column2={item.ad.price}
								onApprove={() => handleServiceAction(item.alternateKey, 1)}
								onReject={() => handleServiceAction(item.alternateKey, 2)}
								onPending={() => handleServiceAction(item.alternateKey, 5)}
							/>
							<View style={styles.statusContainer}>
								<FontAwesome
									name={
										status === 'Approved'
											? 'check-circle'
											: status === 'Rejected'
											? 'remove'
											: 'flag-checkered'
									}
									size={22}
									color={colors.primary}
								/>
								<Text style={{ marginTop: 5 }}>{status} </Text>
							</View>
						</View>
					);
				}}
			/>
		</>
	);
};

export default ServiceDealsScreen;

const styles = StyleSheet.create({
	filterTabs: {
		marginTop: 40,
		flexDirection: 'row',
		justifyContent: 'center',
	},
	headingContainer: {
		flexDirection: 'row',
		justifyContent: 'space-around',
		backgroundColor: colors.primary,
		paddingVertical: 20,
	},
	text: {
		color: 'white',
		fontWeight: '400',
		fontSize: 17,
	},
	statusContainer: {
		marginBottom: 10,
		alignItems: 'center',
	},
});
