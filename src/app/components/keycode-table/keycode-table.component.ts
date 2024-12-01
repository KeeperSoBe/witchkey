import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import keycodes from '../../constants/chrome.constants';
import { CommonModule } from '@angular/common';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-keycode-table',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
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
export class KeycodeTableComponent implements AfterViewInit {
  @Input({ required: true })
  public show = false;

  @Output()
  public readonly close: EventEmitter<void> = new EventEmitter<void>();

  public readonly searchForm = new FormControl();

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

  public readonly chromeKeycodes = keycodes;

  public searchResults: {
    code: string;
    keyCode: number;
    key: string;
    location: string;
  }[] = this.chromeKeycodes.sort((a, b) => a.keyCode - b.keyCode);

  public ngAfterViewInit(): void {
    this.searchForm.valueChanges
      .pipe(debounceTime(1250))
      .pipe(distinctUntilChanged())
      .subscribe((value) => {
        console.log('delayed key press value', value);
        this.search();
      });
  }

  public search() {
    this.searchResults = this.chromeKeycodes.filter((keycode) => {
      return this.fuzzyMatch(
        this.searchForm.value.toLowerCase(),
        keycode.code.toLowerCase(),
      );
    });
  }

  private escapeRegExp(str: string): string {
    return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  }

  private fuzzyMatch(pattern: string, str: string): boolean {
    pattern =
      '.*' +
      pattern
        .split('')
        .map((l) => `${this.escapeRegExp(l)}.*`)
        .join('');

    return new RegExp(pattern).test(str);
  }

  // public detectBrowser(): void {
  //   if (navigator.userAgent.indexOf('Chrome') !== -1) {
  //     this.browser = 'chrome';
  //   }
  // }
}
