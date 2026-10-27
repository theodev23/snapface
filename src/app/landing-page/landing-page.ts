import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.html',
  imports: [FormsModule, RouterLink],
  styleUrls: ['./landing-page.css'],
})
export class LandingPageComponent implements OnInit {
  userEmail!: string;

  private readonly router = inject(Router);

  ngOnInit(): void {}

  onContinue(): void {
    this.router.navigateByUrl('facesnaps');
  }

  // NgForm permet d'accepter le formulaire comme argument
  // On récupère ainsi un formulaire sous la forme d'un objet
  // form.value contient toutes les valeurs du formulaire avec des paires clé-valeur.

  onSubmitForm(form: NgForm) {
    console.log(form.value);
  }
}
