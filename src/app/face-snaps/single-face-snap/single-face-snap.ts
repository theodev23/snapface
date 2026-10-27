import { AsyncPipe, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { FaceSnap } from '../face-snap.model';
import { FaceSnapsService } from '../face-snaps.service';
import { ActivatedRoute } from '@angular/router';
import { Observable, tap } from 'rxjs';

@Component({
  selector: 'app-single-face-snap',
  imports: [AsyncPipe, DatePipe, RouterLink],
  templateUrl: './single-face-snap.html',
  styleUrl: './single-face-snap.css',
})
export class SingleFaceSnapComponent implements OnInit {
  faceSnap$!: Observable<FaceSnap>;
  buttonText!: string;

  private readonly faceSnapsService = inject(FaceSnapsService);
  private readonly route = inject(ActivatedRoute);

  ngOnInit(): void {
    this.buttonText = 'Oh Snap!';
    const faceSnapId = this.route.snapshot.params['id'];
    this.faceSnap$ = this.faceSnapsService.getFaceSnapById(faceSnapId);
  }

  onSnap(faceSnapId: number) {
    if (this.buttonText === 'Oh Snap!') {
      this.faceSnap$ = this.faceSnapsService
        .snapFaceSnapById(faceSnapId, 'snap')
        .pipe(tap(() => (this.buttonText = 'Oops, unSnap!')));
    } else {
      this.faceSnap$ = this.faceSnapsService
        .snapFaceSnapById(faceSnapId, 'unsnap')
        .pipe(tap(() => (this.buttonText = 'Oh Snap!')));
    }
  }
}
