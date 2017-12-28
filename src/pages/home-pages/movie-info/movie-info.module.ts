import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieInfoPage } from './movie-info';
import { ImdbProvider } from '../../../providers/imdb/imdb';

@NgModule({
  declarations: [
    MovieInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(MovieInfoPage),
  ],
  providers: [
    ImdbProvider
  ]
})
export class MovieInfoPageModule {}
