import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FavouritesPage } from './favourites';

import { ImdbProvider } from '../../providers/imdb/imdb';
import { PipesModule } from "../../pipes/pipes.module";


@NgModule({
  declarations: [
    FavouritesPage,
  ],
  imports: [
    IonicPageModule.forChild(FavouritesPage),
    PipesModule
  ],
  providers: [ImdbProvider]
})
export class FavouritesPageModule {}
