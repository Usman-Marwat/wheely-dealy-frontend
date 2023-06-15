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

const VehicleDealsScreen = () => {
	const [selectedTab, setSelectedTab] = useState(tabs[0]);

	const vehicleDealsApi = useApi(seller.getMyVehicleDeals);
	const vehicleActionApi = useApi(seller.approveOrRejectDeal);

	const getData = () => {
		vehicleDealsApi.request();
	};

	const performVehicleAction = async (dealId, command, action) => {
		const { data } = await vehicleActionApi.request(dealId, command);

		if (data.statusCode !== 200) return alert(`Could not ${action} deal`);
		getData();
	};
	const handleVehicleAction = async (dealId, command) => {
		const action =
			command === 1 ? 'Approve' : command === 2 ? 'Reject' : 'Pending';
		Alert.alert(`${action} The Deal?`, `Are you sure?`, [
			{
				text: 'Yes',
				onPress: () => performVehicleAction(dealId, command, action),
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
			? vehicleDealsApi.data?.items.filter(
					(item) => item.statusId === statusIds[selectedTab]
			  )
			: vehicleDealsApi.data?.items;

	return (
		<>
			<ActivityIndicator
				visible={vehicleDealsApi.loading || vehicleActionApi.loading}
			/>
			<Header heading="Claimed Deals" />
			<View
				style={{
					marginTop: 40,
					flexDirection: 'row',
					justifyContent: 'center',
				}}
			>
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
								onApprove={() => handleVehicleAction(item.alternateKey, 1)}
								onReject={() => handleVehicleAction(item.alternateKey, 2)}
								pending={status === 'Pending'}
							/>
							<View style={styles.statusContainer}>
								<FontAwesome
									name={
										status === 'Approved'
											? 'check-circle'
											: status === 'Rejected'
											? 'check-circle-o'
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

export default VehicleDealsScreen;

const styles = StyleSheet.create({
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
