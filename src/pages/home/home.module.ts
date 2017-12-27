import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ImdbProvider } from '../../providers/imdb/imdb';
import { ImagesizePipe } from '../../pipes/imagesize/imagesize';

@NgModule({
  declarations: [
    HomePage,
    ImagesizePipe
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
  ],
  providers: [
    ImdbProvider
  ]
})
export class HomePageModule {}
