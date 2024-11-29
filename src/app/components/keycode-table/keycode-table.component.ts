import { Component, EventEmitter, Input, Output } from '@angular/core';
import keycodes from '../../constants/chrome.constants';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

// function escapeRegExp(str: string) {
//   return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
// }

// function fuzzyMatch(pattern, str) {
//   pattern =
//     '.*' +
//     pattern
//       .split('')
//       .map((l) => `${escapeRegExp(l)}.*`)
//       .join('');
//   const re = new RegExp(pattern);
//   return re.test(str);
// }

@Component({
  selector: 'app-keycode-table',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './keycode-table.component.html',
  animations: [
    trigger('flyInOut', [
      state('in', style({ transform: 'translateX(0)' })),
      transition('void => *', [
        style({ transform: 'translateX(-100%)' }),
        animate(100),
      ]),
      transition('* => void', [
        animate(100, style({ transform: 'translateX(100%)' })),
      ]),
    ]),
  ],
})
export class KeycodeTableComponent {
  @Input({ required: true })
  public show = false;

  @Output()
  public readonly close: EventEmitter<void> = new EventEmitter<void>();

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

  public readonly chromeKeycodes = keycodes.sort(
    (a, b) => a.keyCode - b.keyCode,
  );

  public searchResults: {
    code: string;
    keyCode: number;
    key: string;
    location: string;
  }[] = [];

  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
  public handleSearchResults(_results: any): void {
    // this.searchResults = this.chromeKeycodes.filter(({ key }) =>
    //   fuzzyMatch(this.searchText, key),
    // );
    // console.log('handleSearchResults: ', results);
    // this.searchResults = results.map((r) => r.item);
  }

  public detectBrowser(): void {
    if (navigator.userAgent.indexOf('Chrome') !== -1) {
      this.browser = 'chrome';
    }
  }
}
