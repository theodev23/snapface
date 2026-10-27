import { inject, Injectable } from '@angular/core';
import { FaceSnap } from './face-snap.model';
import { HttpClient } from '@angular/common/http';
import { map, Observable, switchMap } from 'rxjs';

// Indique à Angular qu'il faut enregistrer ce service à la racine de l'application.
// Permet d'avoir une instance de ce service par runtime de l'application.
@Injectable({
  providedIn: 'root',
})
export class FaceSnapsService {
  private readonly http = inject(HttpClient);

  // Ne reçoit aucun argument et retourne un Observable qui émettra un tableau de FaceSnaps.
  // La requête HTTP est un échange avec le serveur ; l'Observable représente son résultat asynchrone.
  getAllFaceSnaps(): Observable<FaceSnap[]> {
    // get() prépare une requête GET pour récupérer les données à cette URL.
    // Il faut s'abonner pour déclencher une nouvelle requête.
    // En cas de succès, l'Observable émet le corps de la réponse, puis se termine.
    // En cas d'échec, il transmet une erreur à l'abonné et l'observable est détruit.
    return this.http.get<FaceSnap[]>('http://localhost:3000/facesnaps');
  }

  getFaceSnapById(faceSnapId: number): Observable<FaceSnap> {
    return this.http.get<FaceSnap>(`http://localhost:3000/facesnaps/${faceSnapId}`);
  }

  // Le type de retour de cette méthode est  Observable<FaceSnap>  parce que la requête PUT finale renvoie le FaceSnap modifié comme confirmation.
  // L'Observable extérieur ici est une requête GET. Il va donc émettre une fois et compléter (ou émettre une erreur si le serveur retourne une erreur). On n'aura donc jamais la situation où l'Observable extérieur émet de nouveau alors qu'une souscription à l'Observable intérieur est en cours. On peut donc, dans ce cas, utiliser l'opérateur haut niveau que l'on veut
  snapFaceSnapById(faceSnapId: number, snapType: 'snap' | 'unsnap'): Observable<FaceSnap> {
    // 1. getFaceSnapById() retourne un observable qui émet le FaceSnap reçu du serveur.
    return this.getFaceSnapById(faceSnapId).pipe(
      // 2. map transmet cette valeur à la fonction, dans le paramètre nommé faceSnap
      map((faceSnap) => ({
        // Copier les propriétés du FaceSnap dans le nouvel objet (copie superficielle).
        ...faceSnap,
        // Remplacer le compteur copié : ajouter 1 pour 'snap', retirer 1 pour 'unsnap'.
        snaps: faceSnap.snaps + (snapType === 'snap' ? 1 : -1),
      })),
      // 3. updatedFaceSnap est l’objet émis par le map précédent : la copie du FaceSnap avec le compteur modifié. C’est un nom de paramètre libre
      // La méthode http.put() retourne elle-même un observable.
      // switchMap s’abonne à cet observable HTTP ce qui déclenche le PUT, puis transmet sa réponse à la suite du flux.
      switchMap((updatedFaceSnap) =>
        this.http.put<FaceSnap>(
          `http://localhost:3000/facesnaps/${faceSnapId}`,
          // Envoyer l'objet complet mis à jour dans le corps de la requête PUT.
          updatedFaceSnap,
        ),
      ),
    );
  }

  addFaceSnap(formValue: {
    title: string;
    description: string;
    imageUrl: string;
    location?: string;
  }): Observable<FaceSnap> {
    return this.getAllFaceSnaps().pipe(
      map((facesnaps) => [...facesnaps].sort((a, b) => a.id - b.id)),
      map((sortedFacesnaps) => sortedFacesnaps[sortedFacesnaps.length - 1]),
      map((previousFacesnap) => ({
        ...formValue,
        snaps: 0,
        createdDate: new Date(),
        id: (previousFacesnap?.id ?? 0) + 1,
      })),
      switchMap((newFacesnap) =>
        this.http.post<FaceSnap>('http://localhost:3000/facesnaps', newFacesnap),
      ),
    );
  }
}
