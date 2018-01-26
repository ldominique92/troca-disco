import { Component } from '@angular/core';

import {
  ActionSheet,
  ActionSheetController,
  ActionSheetOptions,
  Config,
  NavController
} from 'ionic-angular';
import { InAppBrowser } from '@ionic-native/in-app-browser';

import { TrocaDiscoData } from '../../providers/troca-disco-data';
import { DiscDetailPage } from '../disc-detail/disc-detail';

// TODO remove
export interface ActionSheetButton {
  text?: string;
  role?: string;
  icon?: string;
  cssClass?: string;
  handler?: () => boolean|void;
};

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  actionSheet: ActionSheet;
  discs: any[] = [];

  constructor(
    public actionSheetCtrl: ActionSheetController,
    public navCtrl: NavController,
    public tdData: TrocaDiscoData,
    public config: Config,
    public inAppBrowser: InAppBrowser
  ) {}

  ionViewDidLoad() {
    this.tdData.getDiscs().subscribe((discs: any[]) => {
      this.discs = discs;
    });
  }

  goToDetail(disc: any) {
    this.navCtrl.push(DiscDetailPage, { discId: disc.id });
  }

  goToDiscDetail(disc: any) {
    this.navCtrl.push(DiscDetailPage, { discId: disc.id });
  }

  goToDiscTwitter(disc: any) {
    this.inAppBrowser.create(
      `https://twitter.com/${disc.twitter}`,
      '_blank'
    );
  }

  openDiscShare(disc: any) {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Share ' + disc.name,
      buttons: [
        {
          text: 'Copy Link',
          handler: () => {
            console.log('Copy link clicked on https://twitter.com/' + disc.twitter);
            if ( (window as any)['cordova'] && (window as any)['cordova'].plugins.clipboard) {
              (window as any)['cordova'].plugins.clipboard.copy(
                'https://twitter.com/' + disc.twitter
              );
            }
          }
        } as ActionSheetButton,
        {
          text: 'Share via ...'
        } as ActionSheetButton,
        {
          text: 'Cancel',
          role: 'cancel'
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }

  openContact(disc: any) {
    let mode = this.config.get('mode');

    let actionSheet = this.actionSheetCtrl.create({
      title: 'Contact ' + disc.name,
      buttons: [
        {
          text: `Email ( ${disc.email} )`,
          icon: mode !== 'ios' ? 'mail' : null,
          handler: () => {
            window.open('mailto:' + disc.email);
          }
        } as ActionSheetButton,
        {
          text: `Call ( ${disc.phone} )`,
          icon: mode !== 'ios' ? 'call' : null,
          handler: () => {
            window.open('tel:' + disc.phone);
          }
        } as ActionSheetButton
      ]
    } as ActionSheetOptions);

    actionSheet.present();
  }
}
