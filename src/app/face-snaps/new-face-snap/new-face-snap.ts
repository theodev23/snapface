import { AsyncPipe, DatePipe } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable, map, tap } from 'rxjs';
import { FaceSnap } from '../face-snap.model';
import { FaceSnapsService } from '../face-snaps.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-face-snap',
  imports: [ReactiveFormsModule, AsyncPipe, DatePipe],
  templateUrl: './new-face-snap.html',
  styleUrl: './new-face-snap.css',
})
export class NewFaceSnap implements OnInit {
  snapForm!: FormGroup;
  faceSnapPreview$!: Observable<FaceSnap>;
  urlRegex!: RegExp;

  private readonly formBuilder = inject(FormBuilder);
  private readonly faceSnapsService = inject(FaceSnapsService);
  private readonly router = inject(Router);

  ngOnInit(): void {
    this.urlRegex =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&/=]*)/;
    // La méthode "group" permet de créer un FormGroup
    this.snapForm = this.formBuilder.group(
      {
        title: [null, [Validators.required]],
        description: [null, [Validators.required]],
        imageUrl: [null, [Validators.required, Validators.pattern(this.urlRegex)]],
        location: [null],
      },
      {
        // Permet de faire en sorte que valueChanges émettent uniquement lorsque l'utilisateur change de champ.
        updateOn: 'blur',
      },
    );
    // La méthode valueChanges est un observable qui émet à chaque changement portant sur notre formulaire.
    this.faceSnapPreview$ = this.snapForm.valueChanges.pipe(
      map((formValue) => ({
        ...formValue,
        createdDate: new Date(),
        snaps: 0,
        id: 0,
      })),
    );
  }

  onSubmitForm(): void {
    this.faceSnapsService
      .addFaceSnap(this.snapForm.value)
      .pipe(tap(() => this.router.navigateByUrl('/facesnaps')))
      .subscribe();
  }
}
