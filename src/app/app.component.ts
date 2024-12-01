import { Component, Inject, OnDestroy, OnInit } from '@angular/core';

import { CommonModule, DOCUMENT } from '@angular/common';
import { NavbarComponent } from './components/navbar/navbar.component';
import { EventCardComponent } from './components/event-card/event-card.component';
import { KeycodeTableComponent } from './components/keycode-table/keycode-table.component';
import { ToasterComponent } from './components/toaster/toaster.component';

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
  imports: [
    CommonModule,

    NavbarComponent,
    ToasterComponent,
    EventCardComponent,
    KeycodeTableComponent,
  ],
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

    this.isDarkMode =
      this.document.defaultView?.matchMedia('(prefers-color-scheme: dark)')
        .matches || false;
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

  public async copyToClipboard(message: string): Promise<void> {
    // await Clipboard.prototype.writeText(message);
    const input = document.createElement('textarea');
    input.style.position = 'fixed';
    input.style.left = '0';
    input.style.top = '0';
    input.style.opacity = '0';
    input.value = message;
    document.body.appendChild(input);
    input.focus();
    input.select();
    document.execCommand('copy');
    document.body.removeChild(input);

    ToasterComponent.addToast('info');
  }
}
