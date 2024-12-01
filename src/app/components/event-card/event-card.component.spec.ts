import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCardComponent } from './event-card.component';

describe('Component: EventCard', () => {
  let component: EventCardComponent;
  let fixture: ComponentFixture<EventCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventCardComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EventCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  describe('Method: openDocumentationLink', () => {
    it('should call the windows open method with the documentLink', () => {
      const mockDocumentationLink = 'mock-documentation-link';
      const open = jest
        .spyOn(window, 'open')
        .mockImplementationOnce(() => null);

      component.documentationLink = mockDocumentationLink;

      component.openDocumentationLink();

      expect(open).toHaveBeenCalledWith(mockDocumentationLink);
    });
  });
});
