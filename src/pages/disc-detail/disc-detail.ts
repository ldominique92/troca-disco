import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { TrocaDiscoData } from '../../providers/troca-disco-data';

@Component({
  selector: 'page-disc-detail',
  templateUrl: 'disc-detail.html'
})
export class DiscDetailPage {
  disc: any;

  constructor(public dataProvider: TrocaDiscoData, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (data && data.discs) {
        for (const disc of data.discs) {
          if (disc && disc.id === this.navParams.data.discId) {
            this.disc = disc;
            break;
          }
        }
      }
    });

  }

  goToDiscDetail(disc: any) {
    this.navCtrl.push('DiscDetailPage', { discId: disc.id });
  }
}
