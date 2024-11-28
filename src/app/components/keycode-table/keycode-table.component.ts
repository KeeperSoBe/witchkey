import { Component } from '@angular/core';
import keycodes from '../../constants/chrome.constants';

// function escapeRegExp(str: string) {
//   return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// }

// function fuzzyMatch(pattern, str) {
//   pattern = '.*' + pattern.split('').map(l => `${escapeRegExp(l)}.*`).join('');
//   const re = new RegExp(pattern);
//   return re.test(str);
// }

@Component({
  selector: 'app-keycode-table',
  standalone: true,
  imports: [],
  templateUrl: './keycode-table.component.html',
})
export class KeycodeTableComponent {
  public browser: 'chrome' | 'firefox' | 'safari' | 'edge' = 'chrome';

  public sortBy = 'keyCode';
  public sortDesc = false;

  public readonly fuseOptions = {
    keys: ['code', 'keyCode', 'key'],
  };

  public fields = [
    { key: 'code', sortable: true },
    { key: 'keyCode', sortable: true },
    { key: 'key', sortable: true },
    { key: 'location', sortable: true },
  ];

  public searchText = '';

  public readonly chromeKeycodes = keycodes;

  public searchResults = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  public handleSearchResults(_results: any): void {
    // console.log('handleSearchResults: ', results);
    // this.searchResults = results.map((r) => r.item);
  }

  public detectBrowser(): void {
    if (navigator.userAgent.indexOf('Chrome') !== -1) {
      this.browser = 'chrome';
    }
  }
}
