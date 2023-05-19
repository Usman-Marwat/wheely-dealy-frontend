import client from './httpClient';

const endpoint = '/Seller';

const getTypes = () => client.get(`${endpoint}/gettypes`);

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

export default {
	getTypes,
	postAd,
};
