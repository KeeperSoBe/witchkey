import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-card',
  standalone: true,
  imports: [],
  templateUrl: './event-card.component.html',
})
export class EventCardComponent {
  @Input()
  public header!: string;

  @Input()
  public body!: string;

  @Input()
  public documentationLink!: string;

  public openDocumentationLink(): void {
    window.open(this.documentationLink);
  }
}
