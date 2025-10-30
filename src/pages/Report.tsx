import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButtons, IonMenuButton, IonAlert, IonList, IonItem, IonLabel, IonTextarea, IonInput, IonButton} from '@ionic/react';
import './Report.css';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const ReportPage: React.FC = () => {
  const [name, setName] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [message, setMessage] = useState<string>();
    const [showAlert, setShowAlert] = useState<boolean>(false);
    const history = useHistory();

    const sendMessage = () => {
        if (!name || !email || !message) {
            setShowAlert(true);
        } else {
            console.log("Message sent:", { name, email, message });
            history.push('/home');
        };
    };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar class='toolbar1'>
        <IonButtons slot="start">
                    <IonMenuButton menu="begin"/>
                </IonButtons>
       
          <IonTitle class='title'>Report an Issue</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen class='bg-gradient'>
        <IonAlert
            isOpen={showAlert}
            onDidDismiss={() => setShowAlert(false)}
            header={'Error'}
            message={'Please fill in all fields.'}
            buttons={['OK']}
          />
          <h1 style={{paddingTop: 95}} className='h1text'><strong>Welcome to the Report an Issue Page!</strong></h1>
          <IonList class="contact-form">
                    <IonItem>
                        <IonLabel position="stacked"><strong>Name</strong></IonLabel>
                        <IonInput className="inputs" value={name} placeholder="Enter your name" onIonChange={(e) => setName(e.detail.value!)} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked"><strong>Email</strong></IonLabel>
                        <IonInput value={email} placeholder="Enter your email" onIonChange={(e) => setEmail(e.detail.value!)} />
                    </IonItem>
                    <IonItem>
                        <IonLabel position="stacked"><strong>Message</strong></IonLabel>
                        <IonTextarea value={message} placeholder="Enter your message" onIonChange={(e) => setMessage(e.detail.value!)} />
                    </IonItem>
                    <IonButton onClick={sendMessage} className="send-button" color={"success"} expand="full">
                        <strong>Send Message</strong>
                    </IonButton>
                </IonList>
      </IonContent>
    </IonPage>
  );
};

export default ReportPage;