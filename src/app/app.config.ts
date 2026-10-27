import { ApplicationConfig, LOCALE_ID, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { routes } from './app.routes';
import { authInterceptor } from './auth/auth.interceptor';

// Configuration utilisée au démarrage de l'application.
// « export » permet de l'importer dans un autre fichier.
// Le type ApplicationConfig indique à TypeScript la structure attendue par Angular.
export const appConfig: ApplicationConfig = {
  // providers : permet d'enregistrer les dépendances et fonctionnalités fournies à l'application.
  providers: [
    provideHttpClient(withInterceptors([authInterceptor])),
    // Transmet les erreurs globales du navigateur et les rejets de promesses
    // non gérés au gestionnaire d'erreurs d'Angular (ErrorHandler).
    provideBrowserGlobalErrorListeners(),
    // On appelle  provideRouter  en passant le tableau de routes pour enregistrer les routes dans le routeur Angular.
    // Le composant de la route active s'affiche dans <router-outlet>.
    provideRouter(routes),
    // Associe la valeur 'fr-FR' au jeton d'injection LOCALE_ID.
    // Les pipes comme date et number utilisent cette locale par défaut
    // pour formater les valeurs selon les conventions françaises.
    // Cela ne traduit pas automatiquement les textes de l'application.
    { provide: LOCALE_ID, useValue: 'fr-FR' },
  ],
};
