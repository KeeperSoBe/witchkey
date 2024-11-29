import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule],
  templateUrl: './navbar.component.html',
})
export class NavbarComponent {
  @Input({ required: true })
  public darkMode = true;

  @Input({ required: true })
  public showingKeycodeTable = false;

  @Output()
  public readonly toggleDarkMode: EventEmitter<void> = new EventEmitter<void>();

  @Output()
  public readonly toggleShowKeycodeTable: EventEmitter<void> =
    new EventEmitter<void>();
}
