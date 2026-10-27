import { RouterLink, RouterLinkActive } from '@angular/router';
import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.html',
  styleUrl: './header.css',
})
export class HeaderComponent implements OnInit {
  private readonly router = inject(Router);

  ngOnInit(): void {}

  onAddNewFaceSnap() {
    this.router.navigateByUrl('/create');
  }
}
