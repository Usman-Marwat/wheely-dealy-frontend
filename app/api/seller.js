import client from './httpClient';

const endpoint = '/Seller';

const getTypes = () => client.get(`${endpoint}/gettypes`);

const getServiceTypes = () => client.get(`${endpoint}/getServiceTypes`);

const postAd = (carAd, onUploadProgress) => {
	const data = new FormData();
	data.append('title', carAd.title);
	data.append('contactNo', carAd.contactNo);
	data.append('price', Number(carAd.price));
	data.append('model', Number(carAd.model));
	data.append('engineCapacity', Number(carAd.engineCapacity));
	data.append('assemblyTypeGId', carAd.assemblyType.alternateKey);
	data.append('fuelTypeGId', carAd.fuelType.alternateKey);
	data.append('transmissionTypeGId', carAd.transmissionType.alternateKey);
	data.append('bodyTypeGId', carAd.bodyType.alternateKey);
	data.append('exteriorColorGId', carAd.exteriorColor.alternateKey);
	data.append('vehicleTypeGId', carAd.vehicleType.alternateKey);
	data.append('registrationCityGId', carAd.registrationCity.alternateKey);
	data.append('description', carAd.description); //
	data.append('mileage', Number(carAd.mileage)); //
	data.append('latitude', carAd.latitude.toString()); //
	data.append('longitude', carAd.longitude.toString()); //
	data.append('otp', Number(carAd.otp));
	data.append('userGId', carAd.userGId);

	carAd.images.forEach((image, index) =>
		data.append('images', {
			name: 'image' + index,
			type: 'image/jpeg',
			uri: image,
		})
	);

	return client.post(`${endpoint}/postad`, data, {
		onUploadProgress: (progress) =>
			onUploadProgress(progress.loaded / progress.total),
	});
};

const updateAd = (carAd) => {
	const data = new FormData();
	data.append('Title', carAd.title);
	data.append('ContactNo', carAd.contactNo);
	data.append('Price', Number(carAd.price));
	data.append('Model', Number(carAd.model));
	data.append('EngineCapacity', Number(carAd.engineCapacity));
	data.append('AssemblyTypeGId', carAd.assemblyType.alternateKey);
	data.append('FuelTypeGId', carAd.fuelType.alternateKey);
	data.append('TransmissionTypeGId', carAd.transmissionType.alternateKey);
	data.append('BodyTypeGId', carAd.bodyType.alternateKey);
	data.append('ExteriorColorGId', carAd.exteriorColor.alternateKey);
	data.append('VehicleTypeGId', carAd.vehicleType.alternateKey);
	data.append('RegistrationCityGId', carAd.registrationCity.alternateKey);
	data.append('Description', carAd.description); //
	data.append('Mileage', Number(carAd.mileage)); //
	data.append('Latitude', carAd.latitude.toString()); //
	data.append('Longitude', carAd.longitude.toString()); //
	data.append('UserGId', carAd.userGId);
	data.append('AdId', carAd.alternateKey);
	data.append('OTP', Number('12345'));
	data.append('Images', []);

	return client.put(`${endpoint}/modifyad`, data);
};
const postServiceAd = (ad, onUploadProgress) => {
	const data = new FormData();
	data.append('title', ad.title);
	data.append('contactNo', ad.contactNo);
	data.append('price', Number(ad.price));
	data.append('description', ad.description);
	data.append('serviceTypeGId', ad.serviceType.alternateKey);
	data.append('latitude', ad.latitude.toString());
	data.append('longitude', ad.longitude.toString());
	data.append('otp', Number(ad.otp));
	data.append('userGId', ad.userGId);

	ad.images.forEach((image, index) =>
		data.append('images', {
			name: 'image' + index,
			type: 'image/jpeg',
			uri: image,
		})
	);

	return client.post(`${endpoint}/postservicead`, data, {
		onUploadProgress: (progress) =>
			onUploadProgress(progress.loaded / progress.total),
	});
};

const updateServiceAd = (ad) => {
	const data = new FormData();
	data.append('title', ad.title);
	data.append('contactNo', ad.contactNo);
	data.append('price', Number(ad.price));
	data.append('description', ad.description);
	data.append('serviceTypeGId', ad.serviceType.alternateKey);
	data.append('latitude', ad.latitude.toString());
	data.append('longitude', ad.longitude.toString());
	data.append('userGId', ad.userGId);
	data.append('AdId', ad.alternateKey);
	data.append('images', ['']);

	return client.put(`${endpoint}/modifyservicead`, data);
};

const getMyVehicleDeals = () => client.get(`${endpoint}/get-my-vehicle-deals`);

const approveOrRejectDeal = (dealId, command) =>
	client.post(`${endpoint}/approve-reject-deal`, { dealId, command });

const getMyServiceDeals = () => client.get(`${endpoint}/get-my-service-deals`);

const approveOrRejectServiceDeal = (dealId, command) =>
	client.post(`${endpoint}/approve-reject-service-deal`, { dealId, command });

/*
1 Approved
2 Rejected
5 Pending Approval
*/

export default {
	getTypes,
	getServiceTypes,
	postAd,
	postServiceAd,
	updateAd,
	updateServiceAd,
	getMyVehicleDeals,
	approveOrRejectDeal,
	getMyServiceDeals,
	approveOrRejectServiceDeal,
};
