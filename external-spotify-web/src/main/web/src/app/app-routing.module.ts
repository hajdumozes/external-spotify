import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpotifyUriCallbackComponent } from './spotify-uri-callback/spotify-uri-callback.component';
import { AppComponent } from './app.component';

const routes: Routes = [
  {
    path: '',
    component: AppComponent,
  },
  {
    path: 'spotify-uri-callback',
    component: SpotifyUriCallbackComponent,
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
