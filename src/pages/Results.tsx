import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonImg, IonGrid, IonRow, IonCol, IonCard, IonCardSubtitle, IonCardContent, IonButtons, IonMenuButton, IonCardHeader, IonCardTitle, IonButton, IonIcon, IonChip, IonLabel } from '@ionic/react';
import { trashOutline, trashBinOutline, leafOutline } from 'ionicons/icons';
import './Results.css';
import { PhotoContext, PhotoContextType } from '../hooks/PhotoContext';
import { usePhotoGallery } from '../hooks/usePhotoGallery';
import { useContext, useMemo } from 'react';

const ResultsPage: React.FC = () => {
  const { photos, removePhoto } = useContext(PhotoContext);

  // Calculate statistics
  const stats = useMemo(() => {
    return {
      total: photos.length,
      recycling: photos.filter(p => p.type === "Recycling").length,
      trash: photos.filter(p => p.type === "Trash").length,
      neither: photos.filter(p => p.type === "Neither").length
    };
  }, [photos]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='toolbar1'>
          <IonButtons slot="start">
            <IonMenuButton menu="begin"/>
          </IonButtons>
          <IonTitle>Results</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>
        {/* Statistics Section */}
        <div 
          className="stats-container"
          role="region"
          aria-label="Classification Statistics"
        >
          <IonCard className="stats-card">
            <IonCardContent>
              <div 
                className="stats-grid"
                role="list"
                aria-label="Statistics summary"
              >
                <div 
                  className="stat-item"
                  role="listitem"
                  aria-label={`Total Items: ${stats.total}`}
                >
                  <h2 tabIndex={0}>{stats.total}</h2>
                  <p>Total Items</p>
                </div>
                <div 
                  className="stat-item recycling"
                  role="listitem"
                  aria-label={`Recyclable Items: ${stats.recycling}`}
                >
                  <h2 tabIndex={0}>{stats.recycling}</h2>
                  <p>Recyclable</p>
                </div>
                <div 
                  className="stat-item trash"
                  role="listitem"
                  aria-label={`Trash Items: ${stats.trash}`}
                >
                  <h2 tabIndex={0}>{stats.trash}</h2>
                  <p>Trash</p>
                </div>
                <div 
                  className="stat-item neither"
                  role="listitem"
                  aria-label={`Unclassified Items: ${stats.neither}`}
                >
                  <h2 tabIndex={0}>{stats.neither}</h2>
                  <p>Neither</p>
                </div>
              </div>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Photos Grid */}
        <IonGrid role="grid" aria-label="Classified items grid">
          <IonRow role="row">
            {photos.map((photo, index) => (
              <IonCol size="12" sizeSm="6" sizeMd="4" key={index} role="gridcell">
                <IonCard 
                  className={`card-gradient ${photo.type.toLowerCase()}-card`}
                  role="article"
                  aria-label={`Item classified as ${photo.type}`}
                >
                  <IonImg 
                    src={photo.webPath} 
                    alt={`Item classified as ${photo.type}`}
                    role="img"
                  />
                  <IonCardHeader>
                    <IonChip 
                      color={
                        photo.type === "Recycling" ? "success" : 
                        photo.type === "Trash" ? "warning" : 
                        "medium"
                      }
                      role="status"
                      aria-label={`Classification: ${photo.type}`}
                    >
                      <IonIcon 
                        icon={
                          photo.type === "Recycling" ? leafOutline :
                          photo.type === "Trash" ? trashOutline :
                          trashBinOutline
                        } 
                        aria-hidden="true"
                      />
                      <IonLabel>{photo.type}</IonLabel>
                    </IonChip>
                  </IonCardHeader>
                  <IonCardContent>
                    <div className="prediction-details">
                      <h3>Verdict: {photo.type}</h3>
                      {photo.predictions && (
                        <div className="prediction-scores">
                          <h4>Confidence Scores:</h4>
                          {photo.predictions.map((pred, idx) => (
                            <div key={idx} className={`prediction-score ${pred.className.toLowerCase()}`}>
                              <div className="score-label">
                                <strong>{pred.className}:</strong>
                              </div>
                              <div className="score-bar-container">
                                <div 
                                  className="score-bar" 
                                  style={{width: `${pred.probability * 100}%`}}
                                ></div>
                                <span className="score-value">
                                  {(pred.probability * 100).toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </IonCardContent>
                  <IonButton 
                    color="danger" 
                    expand="block" 
                    onClick={() => removePhoto(photo.webPath)}
                  >
                    <IonIcon slot="start" icon={trashOutline} />
                    Remove
                  </IonButton>
              </IonCard>
              </IonCol>
            ))}
          </IonRow>
        </IonGrid>
      </IonContent>
    </IonPage>
  );
};

export default ResultsPage;

