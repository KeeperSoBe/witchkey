import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-card',
  standalone: true,
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

  public openDocumentationLink(): void {
    window.open(this.documentationLink);
  }
}
