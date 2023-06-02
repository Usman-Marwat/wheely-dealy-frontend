import {
	StyleSheet,
	Text,
	View,
	RefreshControl,
	FlatList,
	Alert,
} from 'react-native';
import React from 'react';
import useApi from '../hooks/useApi';
import seller from '../api/seller';
import { useState } from 'react';
import ActivityIndicator from '../components/ActivityIndicator';
import MenuFoldButton from '../navigation/MenuFoldButton';
import FilterTabs from '../components/FilterTabs';
import TableRow from '../components/TableRow';
import { useEffect } from 'react';
import { FontAwesome } from '@expo/vector-icons';
import colors from '../config/colors';

const tabs = ['Vehicles Deals', 'Services Deals'];

const DealsListScreen = () => {
	const [selectedTab, setSelectedTab] = useState(tabs[0]);

	const vehicleDealsApi = useApi(seller.getMyVehicleDeals);
	const serviceDealsApi = useApi(seller.getMyServiceDeals);
	const vehicleActionApi = useApi(seller.approveOrRejectDeal);
	const serviceActionApi = useApi(seller.approveOrRejectServiceDeal);

	const getData = () => {
		vehicleDealsApi.request();
		serviceDealsApi.request();
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

	return (
		<>
			<ActivityIndicator
				visible={
					vehicleDealsApi.loading ||
					serviceDealsApi.loading ||
					vehicleActionApi.loading ||
					serviceActionApi.loading
				}
			/>
			<MenuFoldButton />

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
			{selectedTab === 'Vehicles Deals' && (
				<>
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
						data={vehicleDealsApi.data?.items}
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
										onPending={() => handleVehicleAction(item.alternateKey, 5)}
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
			)}
			{selectedTab === 'Services Deals' && (
				<>
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
						data={serviceDealsApi.data?.items}
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
			)}
		</>
	);
};

export default DealsListScreen;

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
		marginVertical: 10,
		alignItems: 'center',
	},
});
