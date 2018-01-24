import { Component } from '@angular/core';

import { NavParams } from 'ionic-angular';

import { AboutPage } from '../about/about';
import { DiscoverPage } from '../discover/discover';
import { SpeakerListPage } from '../speaker-list/speaker-list';

@Component({
  templateUrl: 'tabs-page.html'
})
export class TabsPage {
  // set the root pages for each tab
  tab1Root: any = DiscoverPage;
  tab2Root: any = SpeakerListPage;
  tab3Root: any = AboutPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
