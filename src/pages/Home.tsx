import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonList, IonMenuButton, IonLabel, IonMenu, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonIcon, IonText, IonItem, IonButtons, IonButton} from '@ionic/react';
import ExploreContainer from '../components/ExploreContainer';
import './Home.css';
import {flame, star, camera} from 'ionicons/icons';
import {useContext, useEffect, useState} from 'react';
import { PhotoContext } from '../hooks/PhotoContext';

const HomePage: React.FC = () => {

  const {photos} = useContext(PhotoContext);

  const [streaks, setStreaks] = useState<number>(0);
  
  useEffect(() => {
    const currentDay = new Date().toDateString();
    const lastPhoto = localStorage.getItem('lastPhotoDate');
    let currentStreak = 0;

    if (lastPhoto === currentDay) {
      setStreaks(currentStreak + 1);
    } else {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);

      if (lastPhoto === yesterday.toDateString()) {
        const newStreaks = currentStreak + 1;
        setStreaks(newStreaks);
        localStorage.setItem('lastPhotoDate', newStreaks.toString());
    } else {
        setStreaks(1);
        localStorage.setItem('lastPhotoDate', '1');
    } 
    localStorage.setItem('lastPhotoDate', currentDay);
    }
  }, []);

  const totalPhotos = photos.length;
  const points = photos.reduce(
    (sum, p) => sum + (p.type === 'Recycling' ? 2 : 1),
    0
  );
  
  return (
    <IonPage id='main-content'>




     
      <IonHeader>
        <IonToolbar className='toolbar1'>
          <IonButtons slot="start">
            <IonMenuButton menu="begin"/>
          </IonButtons>
          <IonTitle>SortClean</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>

        <div className="home-container">
          <section className="welcome-section" role="region" aria-label="Welcome message">
            <h2>Welcome to SortClean</h2>
            <p>Help the environment by properly sorting your waste</p>
          </section>

          <section className="stats-overview" role="region" aria-label="Your statistics">
            <div className="stats-grid">
              <IonCard 
                className="stat-card streak-card" 
                color="warning"
                role="article"
                aria-label={`Current streak: ${streaks} ${streaks === 1 ? 'day' : 'days'}`}
              >
                <IonCardHeader>
                  <div className="card-header-content">
                    <IonIcon icon={flame} size="large" aria-hidden="true" />
                    <IonCardTitle role="heading" aria-level={2}>Current Streak</IonCardTitle>
                  </div>
                </IonCardHeader>
                <IonCardContent>
                  <div className="stat-value" tabIndex={0}>
                    <IonText className="number">{streaks}</IonText>
                    <IonText className="label">{streaks === 1 ? 'day' : 'days'}</IonText>
                  </div>
                </IonCardContent>
              </IonCard>

              <IonCard 
                className="stat-card photos-card" 
                color="success"
                role="article"
                aria-label={`Total photos: ${totalPhotos}`}
              >
                <IonCardHeader>
                  <div className="card-header-content">
                    <IonIcon icon={star} size="large" aria-hidden="true" />
                    <IonCardTitle role="heading" aria-level={2}>Items Sorted</IonCardTitle>
                  </div>
                </IonCardHeader>
                <IonCardContent>
                  <div className="stat-value" tabIndex={0}>
                    <IonText className="number">{totalPhotos}</IonText>
                    <IonText className="label">items</IonText>
                  </div>
                </IonCardContent>
              </IonCard>

              <IonCard 
                className="stat-card points-card" 
                color="primary"
                role="article"
                aria-label={`Total points: ${points}`}
              >
                <IonCardHeader>
                  <div className="card-header-content">
                    <IonIcon icon={camera} size="large" aria-hidden="true" />
                    <IonCardTitle role="heading" aria-level={2}>Total Points</IonCardTitle>
                  </div>
                </IonCardHeader>
                <IonCardContent>
                  <div className="stat-value" tabIndex={0}>
                    <IonText className="number">{points}</IonText>
                    <IonText className="label">points</IonText>
                  </div>
                </IonCardContent>
              </IonCard>
            </div>
          </section>

          <section className="quick-actions" role="region" aria-label="Quick actions">
            <h3>Quick Actions</h3>
            <IonButton 
              expand="block" 
              routerLink="/camera" 
              className="action-button"
              aria-label="Take a new photo"
            >
              <IonIcon slot="start" icon={camera} aria-hidden="true" />
              Take a Photo
            </IonButton>
          </section>
        </div>
        
      </IonContent>
    </IonPage>
  );
};

export default HomePage;
