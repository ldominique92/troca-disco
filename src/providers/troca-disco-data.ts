import { Injectable } from '@angular/core';

import { Http } from '@angular/http';

import { UserData } from './user-data';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';


@Injectable()
export class TrocaDiscoData {
  data: any;

  constructor(public http: Http, public user: UserData) { }

  load(): any {
    if (this.data) {
      return Observable.of(this.data);
    } else {
      return this.http.get('assets/data/data.json')
        .map(this.processData, this);
    }
  }

  processData(data: any) {
    // just some good 'ol JS fun with objects and arrays
    // build up the data by linking discs to discs
    this.data = data.json();

    this.data.genres = [];

    // loop through each disc
    this.data.discs.forEach((disc: any) => {
      disc.discs = [];
      if (disc.discNames) {
        disc.discNames.forEach((discName: any) => {
          let disc = this.data.discs.find((s: any) => s.albumName === discName);
          if (disc) {
            disc.discs.push(disc);
            disc.discs = disc.discs || [];
            disc.discs.push(disc);
          }
        });
      }

      if (disc.album.genres) {
        disc.album.genres.forEach((track: any) => {
          if (this.data.genres.indexOf(track) < 0) {
            this.data.genres.push(track);
          }
        });
      }
    });

    return this.data;
  }

  getTimeline(queryText = '', genres: any[] = []) {
    return this.load().map((data: any) => {
      let info = { discs : data.discs, shownDiscs : 0 };
      
      queryText = queryText.toLowerCase().replace(/,|\.|-/g, ' ');
      let queryWords = queryText.split(' ').filter(w => !!w.trim().length);

      info.discs.forEach((disc: any) => {
          // check if this disc should show or not
          this.filterDisc(disc, queryWords, genres);

          if (!disc.hide) {
            // if this disc is not hidden then this group should show
            info.shownDiscs++;
          }
        });

      
      return info;
    });
  }

  // TODO: filter location
  filterDisc(disc: any, queryWords: string[], genres: string[]) {

    let matchesQueryText = false;
    if (queryWords.length) {
      // of any query word is in the album name or artist name than it passes the query test
      queryWords.forEach((queryWord: string) => {
        if ((disc.album.albumName.toLowerCase().indexOf(queryWord) > -1) ||
            (disc.album.artist.name.toLowerCase().indexOf(queryWord) > -1)) {
          matchesQueryText = true;
        }
      });
    } else {
      // if there are no query words then this disc passes the query test
      matchesQueryText = true;
    }

    // if the segement is 'favorites', but disc is not a user favorite
    // then this disc does not pass the segment test
    let matchesGenres = false;
    if (genres.length) {
      // of any query word is in the album name or artist name than it passes the query test
      genres.forEach((sGenre: string) => {
        if (disc.album.genres.some((dGenre: any) => {
            return dGenre.name.toLowerCase().indexOf(sGenre) == 0;
          }))
          matchesGenres = true;
      });
    }
    else {
      // if there are no query words then this disc passes the query test
      matchesGenres = true;
    }

    // all tests must be true if it should not be hidden
    disc.hide = !(matchesQueryText && matchesGenres);
  }

  getDiscs() {
    return this.load().map((data: any) => {
      return data.discs.sort((a: any, b: any) => {
        let aName = a.album.albumName.split(' ').pop();
        let bName = b.album.albumName.split(' ').pop();
        return aName.localeCompare(bName);
      });
    });
  }

  getTracks() {
    return this.load().map((data: any) => {
      return data.genres.sort();
    });
  }

  getMap() {
    return this.load().map((data: any) => {
      return data.map;
    });
  }

}
