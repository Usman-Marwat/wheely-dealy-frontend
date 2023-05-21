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

export default {
	getTypes,
	getServiceTypes,
	postAd,
	postServiceAd,
};
