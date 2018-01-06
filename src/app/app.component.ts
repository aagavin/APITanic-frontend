import { UserProvider } from '../providers/user/user';
import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  public isLoggedIn;

  rootPage: string = 'HomePage';

  pages: Array<{ title: string, component: any, icon: string}>;
  signPages: Array<{ title: string, component: any, icon: string}>;
  loggedInPages: Array<{ title: string, component: any, icon: string}>;
  signInPage = { title: 'Sign In', component: 'SigninPage', icon: 'log-in'};
  signOutPage = { title: 'Sign Out', component: '', icon: 'log-in'};
  favouritePage = {title: 'Favourite', component: 'FavouritesPage', icon: 'bookmark'};

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen,
    private _userProvider: UserProvider
  ) {
    this.initializeApp();

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Home', component: 'HomePage', icon: 'home'},
      { title: 'Search', component: 'SearchPage', icon: 'search'},
    ];

    this.loggedInPages = [
      {title: 'Favourites', component: 'FavouritesPage', icon: 'bookmark' }
    ];
    this.signPages = [this.signInPage]


    this._userProvider.$isLoggedIn.subscribe(isLoggedIn => {
      
      this.isLoggedIn = isLoggedIn;

      if (isLoggedIn) {
        this.signPages[0] = this.signOutPage;
      } else {
        this.signPages[0] = this.signInPage;
      }
    });

  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario

    if (page.title === 'Sign Out') {
      this._userProvider.signOut();
    }
    else{
      this.nav.setRoot(page.component);
    }
  }
}
