import React, { useState, useEffect } from 'react';
import {
	Button,
	Image,
	View,
	StyleSheet,
	ActivityIndicator,
	SafeAreaView,
	Text,
	FlatList,
} from 'react-native';
// import { AsyncStorage } from 'react-native'; 
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import Ionicons from '@expo/vector-icons/Ionicons';

const imgDir = FileSystem.documentDirectory + 'images/';

let base64Image = [{heading: "", image: ""}]

const DocumentAttachment =  ({imageText}) => {
	const [uploading, setUploading] = useState(false);
	const [images, setImages] = useState<any[]>([]);
	const [base64format, setBase64Format] = useState(base64Image);

	// Load images on startup
	useEffect(() => {
		// loadImages();
	}, []);

    const ensureDirExists = async () => {
        const dirInfo = await FileSystem.getInfoAsync(imgDir);
        if (!dirInfo.exists) {
            await FileSystem.makeDirectoryAsync(imgDir, { intermediates: true });
        }
    };

    // Save image to file system
const saveImage = async (result) => {
	let uri = result.assets[0].uri
    // console.log(result.assets[0].base64);
	await ensureDirExists();
	const filename = new Date().getTime() + '.jpeg';
	const dest = imgDir + filename;
	await FileSystem.copyAsync({ from: uri , to: dest });
	setImages([...images, dest]);
	base64Image = [{heading: imageText, image: result.assets[0].base64}]
	setBase64Format(base64Image)
	console.log(base64Image,"test");
	try {  
		if(imageText == 'Van Front Image')   
		console.log("Inside .......")
		await AsyncStorage.setItem('frontImage',result.assets[0].base64 );
		if(imageText == 'Van Back Image')   
		await AsyncStorage.setItem('backImage',result.assets[0].base64 );
		if(imageText == 'Van Right Image')   
		await AsyncStorage.setItem('rightImage',result.assets[0].base64 );
		if(imageText == 'Van Left Image')   
		await AsyncStorage.setItem('leftImage',result.assets[0].base64 );
		}
		catch (error) {
		console.log(error)
		}
};

// Upload image to server
const uploadImage = async (uri: string) => {
	setUploading(true);

	await FileSystem.uploadAsync('', uri, {
		httpMethod: 'POST',
		uploadType: FileSystem.FileSystemUploadType.MULTIPART,
		fieldName: 'file'
	});

	setUploading(false);
};

// Delete image from file system
const deleteImage = async (uri: string) => {
	await FileSystem.deleteAsync(uri);
	setImages(images.filter((i) => i !== uri));
};

	// Load images from file system
	const loadImages = async () => {
		await ensureDirExists();
		const files = await FileSystem.readDirectoryAsync(imgDir);
		if (files.length > 0) {
			setImages(files.map((f) => imgDir + f));
		}
	};

	// Select image from library or camera
	const selectImage = async (useLibrary: boolean) => {
		let result;
		const options: ImagePicker.ImagePickerOptions = {
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			base64: true,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 0.75
		};

		if (useLibrary) {
			result = await ImagePicker.launchImageLibraryAsync(options);
		} else {
			await ImagePicker.requestCameraPermissionsAsync();
			result = await ImagePicker.launchCameraAsync(options);
		}
		// Save image if not cancelled
		if (!result.canceled) {
			saveImage(result);
		}
	};

// Render image list item
const renderItem = ({ item }: { item: any }) => {
	const filename = item.split('/').pop();
	return (
		<View style={{ flexDirection: 'row', margin: 1, alignItems: 'center', gap: 5 }}>
			<Image style={{ width: 80, height: 80 }} source={{ uri: item }} />
			<Text style={{ flex: 1 }}>{filename}</Text>
			{/* <Ionicons.Button name="cloud-upload" onPress={() => uploadImage(item)} /> */}
			<Ionicons.Button name="trash" onPress={() => deleteImage(item)} />
		</View>
	);
};

return (
    <>
	{/* // <SafeAreaView style={{ flex: 1, gap: 20 }}> */}
		<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20 }}>
		<Text style={{ textAlign: 'center', fontSize: 20, fontWeight: '500' }}>{imageText}
			</Text>
		</View>
     {!images.length ? (
		<View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginVertical: 20 }}>
		<Button title="Photo Library" onPress={() => selectImage(true)} />
		<Button title="Capture Image" onPress={() => selectImage(false)} />
		</View>
	 ): null}

		<FlatList data={images} renderItem={renderItem} />

		{uploading && (
			<View
				style={[
					StyleSheet.absoluteFill,
					{
						backgroundColor: 'rgba(0,0,0,0.4)',
						alignItems: 'center',
						justifyContent: 'center'
					}
				]}
			>
				<ActivityIndicator color="#fff" animating size="large" />
			</View>
		)}
	{/* </SafeAreaView> */}
    </>
);
            }

export default DocumentAttachment ;