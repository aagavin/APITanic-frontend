import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { HomePage } from './home';
import { ImdbProvider } from '../../../providers/imdb/imdb';
import { PipesModule } from "../../../pipes/pipes.module";

@NgModule({
  declarations: [
    HomePage
  ],
  imports: [
    IonicPageModule.forChild(HomePage),
    PipesModule
  ],
  providers: [
    ImdbProvider
  ]
})
export class HomePageModule {}
