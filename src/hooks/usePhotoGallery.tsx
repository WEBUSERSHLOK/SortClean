import {useContext} from 'react';
import { PhotoContext } from './PhotoContext';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import * as tmImage from '@teachablemachine/image';

let model: tmImage.CustomMobileNet | null = null;
let modelLoaded = false;

export const usePhotoGallery = () => {
    const {photos, addPhoto, removePhoto} = useContext(PhotoContext);

    const loadModelOnce = async () => {
        if (!modelLoaded) {
            // Load the model from the app's `public` folder. The files are at
            // public/tm-my-image-model/{model.json,metadata.json}
            model = await tmImage.load(
                '/tm-my-image-model/model.json',
                '/tm-my-image-model/metadata.json'
            );
            modelLoaded = true;
        }
        return model;
    };

    const takePhoto = async () => {
        const photo = await Camera.getPhoto({
            resultType: CameraResultType.Uri,
            source: CameraSource.Camera,
            quality: 100,
        });
        return photo;
    };

    const imageClassifier = async (imageElement: HTMLImageElement) => {
        await loadModelOnce();
        if (model) {
            // Create a canvas to resize the image
            const canvas = document.createElement('canvas');
            canvas.width = 224;  // TM MobileNet expected size
            canvas.height = 224;
            const ctx = canvas.getContext('2d');
            if (!ctx) return null;
            
            // Draw and resize image
            ctx.drawImage(imageElement, 0, 0, 224, 224);
            
            // Get predictions from resized image
            const predictions = await model.predict(canvas);
            // Sort by probability
            return predictions.sort((a, b) => b.probability - a.probability);
        }
        return null;
    };

    return {
        takePhoto,
        imageClassifier,
        addPhoto,
        removePhoto,
        modelLoaded,
        photos,
    };
}