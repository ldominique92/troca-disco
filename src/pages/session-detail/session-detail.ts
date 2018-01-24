import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';

import { TrocaDiscoData } from '../../providers/troca-disco-data';

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
  session: any;

  constructor(
    public dataProvider: TrocaDiscoData,
    public navParams: NavParams
  ) {}

  ionViewWillEnter() {
    this.dataProvider.load().subscribe((data: any) => {
      if (
        data &&
        data.discover &&
        data.discover[0] &&
        data.discover[0].groups
      ) {
        for (const group of data.discover[0].groups) {
          if (group && group.sessions) {
            for (const session of group.sessions) {
              if (session && session.id === this.navParams.data.sessionId) {
                this.session = session;
                break;
              }
            }
          }
        }
      }
    });
  }
}
