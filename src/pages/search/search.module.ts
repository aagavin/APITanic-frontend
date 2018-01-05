import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchPage } from './search';
import { ImdbProvider } from '../../providers/imdb/imdb';
import { PipesModule } from "../../pipes/pipes.module";

@NgModule({
  declarations: [
    SearchPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchPage),
    PipesModule
  ],
  providers: [
    ImdbProvider
  ]
})
export class SearchPageModule {}
