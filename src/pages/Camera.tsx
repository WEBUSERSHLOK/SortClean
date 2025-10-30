import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton , IonButtons, IonMenuButton} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import {Camera, CameraResultType, CameraSource} from '@capacitor/camera';
import './Camera.css';
import { useContext, useState, useEffect } from 'react';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { PhotoContext, PhotoContextType } from '../hooks/PhotoContext';
import { add } from 'ionicons/icons';

const CameraPage: React.FC = () => {  
  const { takePhoto, modelLoaded, imageClassifier} = usePhotoGallery();
  const {addPhoto} = useContext<PhotoContextType>(PhotoContext);
  const [latestPhoto, setLatestPhoto] = useState<string | null>(null);
  const [predictions, setPredictions] = useState<{ className: string; probability: number; }[] | null>(null);


  const handleTakePhotoAndClassify = async () => {
   
    const photo = await takePhoto();
    if (!photo?.webPath) return;
    setLatestPhoto(photo.webPath);

    const img = new Image();
    img.src = photo.webPath;
    
    await new Promise<void>((solve, reject) => { 
      img.onload = () => solve();
      img.onerror = (err) => reject();
    });



        const results = await imageClassifier(img);
        if (results && results.length > 0) {
          setPredictions(results);
          
          // Use the top prediction for classification
          const topPrediction = results[0];
          // Map model labels to PhotoContext's expected type values
          let mappedType: "Recycling" | "Trash" | "Neither";
          switch (topPrediction.className.toLowerCase()) {
            case 'recyclable':
              mappedType = 'Recycling';
              break;
            case 'trash':
              mappedType = 'Trash';
              break;
            case 'neither':
              mappedType = 'Neither';
              break;
            default:
              mappedType = 'Neither';
          }
          
          addPhoto({
            webPath: photo.webPath!,
            type: mappedType,
            predictions: results
          });
        }
      }
    ;
  const handleTakePhoto = async () => {
    await takePhoto();
  };


  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='toolbar1'>
        <IonButtons slot="start">
            <IonMenuButton menu="begin"/>
        </IonButtons>
       
          <IonTitle>Camera</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
       
        <IonButton 
          expand="block" 
          size="large" 
          color="primary" 
          onClick={handleTakePhotoAndClassify}
          aria-label="Take photo and classify item"
        >
          Take Photo
        </IonButton>
        {latestPhoto && (
          <div 
            style={{ textAlign: 'center', marginTop: '20px' }}
            role="region" 
            aria-label="Classification results"
          >
            <div className="camera-preview">
              <img 
                src={latestPhoto} 
                alt="Photo of item to classify" 
                role="img"
              />
            </div>
            {predictions && predictions.length > 0 && (
              <div 
                className="predictions-debug"
                role="region" 
                aria-label="Prediction scores"
              >
                <h2 id="prediction-heading">Classification Results</h2>
                <div className="predictions-list" aria-labelledby="prediction-heading">
                  {predictions.slice(0, 3).map((pred, idx) => (
                    <div 
                      key={idx} 
                      className={`prediction-item ${idx === 0 ? 'top-prediction' : ''}`}
                      role="listitem"
                      aria-label={`${pred.className}: ${(pred.probability * 100).toFixed(1)}%`}
                    >
                      <strong>{pred.className}</strong>
                      <span className="probability">
                        {(pred.probability * 100).toFixed(1)}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </IonContent>
    </IonPage>
  );
};

export default CameraPage;


  