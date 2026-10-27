import { AsyncPipe } from '@angular/common';
import { FaceSnapComponent } from '../face-snap/face-snap';
import { Component, inject, OnInit } from '@angular/core';
import { FaceSnap } from '../face-snap.model';
import { FaceSnapsService } from '../face-snaps.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-face-snap-list',
  imports: [AsyncPipe, FaceSnapComponent],
  templateUrl: './face-snap-list.html',
  styleUrl: './face-snap-list.css',
})
export class FaceSnapListComponent implements OnInit {
  faceSnaps$!: Observable<FaceSnap[]>;

  private readonly faceSnapsService = inject(FaceSnapsService);

  ngOnInit(): void {
    this.faceSnaps$ = this.faceSnapsService.getAllFaceSnaps();
  }
}
