import { Component, inject, Input } from '@angular/core';
import { FaceSnap } from '../face-snap.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-face-snap',
  imports: [],
  templateUrl: './face-snap.html',
  styleUrl: './face-snap.css',
})
export class FaceSnapComponent {
  // Permet au composant FaceSnapComponent de recevoir un objet depuis son composant parent
  // @Input() crée comme un attribut HTML auquel on peut lier une valeur
  // @Input indique qu'un parent peut transmettre une valeur à cette propriété.
  // faceSnap : le nom de la propriété qui reçoit la valeur.
  @Input() faceSnap!: FaceSnap;

  private readonly router = inject(Router);

  onViewFaceSnap() {
    this.router.navigateByUrl(`facesnaps/${this.faceSnap.id}`);
  }
}
