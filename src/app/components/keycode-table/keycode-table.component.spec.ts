import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KeycodeTableComponent } from './keycode-table.component';

describe('KeycodeTableComponent', () => {
  let component: KeycodeTableComponent;
  let fixture: ComponentFixture<KeycodeTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KeycodeTableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(KeycodeTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  describe('Method: escapeRegExp', () => {
    it('should return a given string after calling replace with the regexp', () => {
      const replace = jest.spyOn(String.prototype, 'replace');

      expect(component['escapeRegExp']('mock-string'));
      expect(replace).toHaveBeenCalledWith(/[.*+?^${}()|[\]\\]/g, '\\$&');
    });
  });
});
