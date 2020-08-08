import { LocalTagsComponent } from './local-tags/local-tags.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SpotifyUriCallbackComponent } from './spotify-uri-callback/spotify-uri-callback.component';

const routes: Routes = [
  {
    path: 'spotify-uri-callback',
    component: SpotifyUriCallbackComponent,
    pathMatch: 'full',
  },
  {
    path: 'local-tags',
    component: LocalTagsComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
