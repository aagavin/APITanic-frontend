import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { RecommendationsPage } from './recommendations';
import { ImdbProvider } from '../../providers/imdb/imdb';
import { PipesModule } from '../../pipes/pipes.module';


@NgModule({
  declarations: [
    RecommendationsPage,
  ],
  imports: [
    IonicPageModule.forChild(RecommendationsPage),
    PipesModule
  ],
  providers: [ImdbProvider]
})
export class RecommendationsPageModule { }
