import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonItem,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
  setupIonicReact,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonMenu,
  IonList,
  IonMenuButton
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { trashSharp, cameraSharp, documentTextSharp } from 'ionicons/icons';
import Home from './pages/Home';
import Camera from './pages/Camera';
import Results from './pages/Results';
import Overview from './pages/Overview';
import Achievements from './pages/Achievements';
import ReportanIssue from './pages/Report';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* import '@ionic/react/css/palettes/dark.always.css'; */
/* import '@ionic/react/css/palettes/dark.class.css'; */
import '@ionic/react/css/palettes/dark.system.css';

/* Theme variables */
import './theme/variables.css';
import { PhotoProvider } from './hooks/PhotoContext';

setupIonicReact();

const App: React.FC = () => (
  <IonApp>
    <PhotoProvider>
    <IonReactRouter>
      <IonMenu side="start" menuId="begin" contentId="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem routerLink="/overview">
              <IonLabel>Overview</IonLabel>
            </IonItem>
            <IonItem routerLink="/achievements">
              <IonLabel>Achievements</IonLabel>
            </IonItem>
            <IonItem routerLink="/ReportanIssue">
              <IonLabel>Report an Issue</IonLabel>
            </IonItem>
          </IonList>
        </IonContent>
      </IonMenu>


      <IonTabs>
        <IonRouterOutlet>
          <Route exact path="/home">
            <Home />
          </Route>
          <Route exact path="/camera">
            <Camera />
          </Route>
          <Route path="/results">
            <Results />
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
          <Route exact path="/overview">
            <Overview />
          </Route>  
          <Route exact path="/achievements">
            <Achievements />
          </Route>
          <Route exact path="/ReportanIssue">
            <ReportanIssue />
          </Route>
        </IonRouterOutlet>
        <IonTabBar slot="bottom">
          <IonTabButton tab="home" href="/home">
            <IonIcon aria-hidden="true" icon={trashSharp} />
            <IonLabel>Home</IonLabel>
          </IonTabButton>
          <IonTabButton tab="camera" href="/camera">
            <IonIcon aria-hidden="true" icon={cameraSharp} />
            <IonLabel>Camera</IonLabel>
          </IonTabButton>
          <IonTabButton tab="results" href="/results">
            <IonIcon aria-hidden="true" icon={documentTextSharp} />
            <IonLabel>Results</IonLabel>
          </IonTabButton>
        </IonTabBar>
      </IonTabs>
    </IonReactRouter>
    </PhotoProvider>
  </IonApp>
);

export default App;
