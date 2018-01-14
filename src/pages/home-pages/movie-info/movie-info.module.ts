import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { MovieInfoPage } from './movie-info';
import { ImdbProvider } from '../../../providers/imdb/imdb';
import { IonicImageViewerModule } from 'ionic-img-viewer';

@NgModule({
  declarations: [
    MovieInfoPage,
  ],
  imports: [
    IonicImageViewerModule,
    IonicPageModule.forChild(MovieInfoPage),
  ],
  providers: [
    ImdbProvider
  ]
})
export class MovieInfoPageModule {}
