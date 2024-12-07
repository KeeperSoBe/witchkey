import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-event-card',
  imports: [],
  templateUrl: './event-card.component.html',
})
export class EventCardComponent {
  @Input({ required: true })
  public header!: string;

  @Input({ required: true })
  public body!: string;

  @Input({ required: true })
  public documentationLink!: string;

  @Output()
  public readonly copyToClipboard: EventEmitter<void> =
    new EventEmitter<void>();

  public openDocumentationLink(): void {
    window.open(this.documentationLink);
  }
}
