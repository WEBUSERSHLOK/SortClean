import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonImg, IonButtons, IonMenuButton, IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle} from '@ionic/react';
import './Overview.css';

const Overview: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='toolbar1'>
        <IonButtons slot="start">
                    <IonMenuButton menu="begin"/>
                  </IonButtons>
        
          <IonTitle>Overview</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class='bg-gradient'>
        <IonCard className='overview-card'>
          <IonCardHeader>
            
            <IonCardSubtitle className='h1text' color="dark" style={{ fontSize: '2rem', fontWeight: 'bold'}}>Welcome to SortClean!</IonCardSubtitle>

          <IonImg src="sortcleanlogo.png"/>
            <IonCardTitle className='h2text' color="dark" style={{ fontSize: '2rem', fontWeight: 'bold'}}>App Overview</IonCardTitle>
          </IonCardHeader>
          
          <IonCardContent>  
            <p className='ptext' color="dark" style={{ fontSize: '2rem', fontWeight: 'bold'}}>SortClean is designed to clean the planet Earth. Our world is filled with trash and plastic that isn't being properly dispossed, and this is causing our environment to be hurt. Recycling contamination is when recyclables have been thrown away, but SortClean is here to stop this issue. If you are confused whether your item is trash or recyclable, take a photo in the Camera Page, and your results will show up. Gain points for each recyclable or trash and gain a streak of your hardwork. If you have an issue, please visit the Report an Issue, and make sure to send us a note. Save the planet! </p>
            </IonCardContent>
        </IonCard>
      </IonContent>
    </IonPage>
  );
}
export default Overview;