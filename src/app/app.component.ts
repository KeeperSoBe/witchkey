import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { CommonModule, DOCUMENT } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventCardComponent } from './components/event-card/event-card.component';

interface KeyEventInterface {
  key: string;
  location: string;
  code: string;
  keyCode?: number;
}

const KeyEventLocation: { [key: number]: string } = {
  0: '(General keys)',
  1: '(Left-side modifier keys)',
  2: '(Right-side modifier keys)',
  3: '(Numpad)',
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, NavbarComponent, EventCardComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit, OnDestroy {
  public readonly allKeyCodes: KeyEventInterface[] = [];

  public isDarkMode = true;
  public isShowingKeycodeTable = false;

  public constructor(
    @Inject(DOCUMENT)
    private readonly document: Document,
  ) {}

  public ngOnInit(): void {
    this.document.addEventListener('keydown', (event) =>
      this.keydownHandler(event),
    );
  }

  public ngOnDestroy(): void {
    this.document.removeEventListener('keydown', (event) =>
      this.keydownHandler(event),
    );
  }

  public toggleDarkMode(): void {
    this.isDarkMode = !this.isDarkMode;
  }

  public toggleShowKeycodeTable(): void {
    this.isShowingKeycodeTable = !this.isShowingKeycodeTable;
  }

  private keydownHandler({
    code,
    key,
    location,
    keyCode,
  }: KeyboardEvent): void {
    let indexOfKeyCode = -1;

    for (let index = 0; index < this.allKeyCodes.length; index++) {
      const item = this.allKeyCodes[index];

      if (item.key === key && item.code === code) {
        indexOfKeyCode = index;
        break;
      }
    }

    if (indexOfKeyCode !== -1) {
      this.allKeyCodes.splice(indexOfKeyCode, 1);
    }

    this.allKeyCodes.push({
      code,
      keyCode,
      key: key === ' ' && code === 'Space' ? '(Spacebar)' : key,
      location: `${location} ${KeyEventLocation[location]}`,
    });
  }

  // public copyToClipboard(message: string): void {
  //   navigator.clipboard.writeText(message).then(
  //     () => {
  //       const toaster = this.$refs.toaster as Toaster;
  //       toaster.createToast('Copied to clipboard');
  //     },
  //     (err) => console.error('Async: Could not copy text: ', err),
  //   );
  // }
}
