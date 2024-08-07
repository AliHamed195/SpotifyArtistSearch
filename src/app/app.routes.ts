import { Routes } from '@angular/router';
import { LoginComponent } from './Pages/login/login.component';
import { ArtistSearchComponent } from './Pages/artist-search/artist-search.component';
import { ArtistAlbumsComponent } from './Pages/artist-albums/artist-albums.component';
import { AuthGuard } from './gard/auth/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: 'search',
    component: ArtistSearchComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'artist/:id/albums',
    component: ArtistAlbumsComponent,
    canActivate: [AuthGuard],
  },
];
