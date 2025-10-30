import {IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonGrid, IonRow, IonCol, IonIcon, IonText, IonButtons, IonMenuButton, IonProgressBar} from '@ionic/react';
import { starOutline, trophyOutline, ribbonOutline } from 'ionicons/icons';
import './Achievements.css';
import { useContext } from 'react';
import { PhotoContext, PhotoContextType } from '../hooks/PhotoContext';

const Achievements: React.FC = () => {
const { photos } = useContext(PhotoContext) as PhotoContextType;
const totalPhotos = photos.length;
const recyclingPhotos = photos.filter(photo => photo.type === 'Recycling').length;
const trashPhotos = photos.filter(photo => photo.type === 'Trash').length;

  const achievements = [
    { title: 'First Ever!', goal: 1, icon: starOutline, current: totalPhotos },
    { title: 'Rookie Numbers!', goal: 10, icon: trophyOutline, current: totalPhotos },
    { title: 'Planet Saver!', goal: 40, icon : ribbonOutline, current: totalPhotos },
    { title: 'Recycling Champion!', goal: 15, icon: trophyOutline, current: recyclingPhotos },
    { title: 'Trash Terminator!', goal: 15, icon: ribbonOutline, current: trashPhotos },
    { title: 'Eco Warrior!', goal: 50, icon: starOutline, current: recyclingPhotos },
    { title: 'Pro Saver!', goal: 100, icon: trophyOutline, current: totalPhotos},
    { title: 'Recycle King/Queen!', goal: 75, icon: ribbonOutline, current: recyclingPhotos},
    { title: 'Trash Master!', goal: 75, icon: starOutline, current: trashPhotos},
    { title: 'Ultimate Eco Hero!', goal: 200, icon: trophyOutline, current: totalPhotos},
    { title: 'Garbage Disposal!', goal: 100, icon: ribbonOutline, current: trashPhotos},
    { title: 'Sustainability Star!', goal: 150, icon: starOutline, current: recyclingPhotos},
    { title: 'Nobel Trash Winner!', goal: 300, icon: trophyOutline, current: totalPhotos},
    { title: 'Earth Defender!', goal: 500, icon: ribbonOutline, current: totalPhotos},

  ];
  
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='toolbar1'>
        <IonButtons slot="start">
            <IonMenuButton menu="begin"/>
        </IonButtons>
        <IonTitle>Achievements</IonTitle>
        </IonToolbar>
        </IonHeader>

        <IonContent fullscreen class='bg-gradient'>
          <h1 style={{paddingTop: 5}} className='h1text'><strong>Achievements!</strong></h1>
        <IonGrid className="ion-text-center">
            {achievements.map((achievement, index) => {
                const isProgress = Math.min(achievement.current / achievement.goal, 1);
                const isCompleted = isProgress >= 1;

                return (
                    <IonRow key={index}>
                    <IonCol size="12">
                    <div className={`achievement-card ${isCompleted ? 'completed' : ''}`}>
                    <IonCard color={isCompleted ? 'success' : ''}>
                        <IonCardHeader>
                        <IonCardTitle>
                            {achievement.title} {isCompleted ? '🏆' : ''}
                        </IonCardTitle>
                        </IonCardHeader>
                        <IonCardContent>
                        <IonText>
                            {Math.min(achievement.current, achievement.goal)} / {achievement.goal} completed
                        </IonText>
                        <IonProgressBar value={isProgress} color={isCompleted ? 'success' : 'medium'} style={{marginTop: '8px'}}/>
                        </IonCardContent>
                    </IonCard>
                        </div>
                    </IonCol>
                    </IonRow>
            );
            })}
        </IonGrid>
      </IonContent>
    </IonPage>
  );
}

export default Achievements;


  