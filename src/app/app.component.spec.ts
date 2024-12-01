import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let app: AppComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [],
    }).compileComponents();

    const fixture = TestBed.createComponent(AppComponent);
    app = fixture.componentInstance;

    // Object.assign(app, {
    //   document: {
    //     defaultView: {
    //       matchMedia: () => ({ matches: true }),
    //     },
    //   } as never,
    // });
  });

  it('should create the app', () => expect(app).toBeTruthy());

  describe('Method: toggleDarkMode', () => {
    it('should toggle the value of the isDarkMode property', () => {
      app.isDarkMode = false;

      app.toggleDarkMode();

      expect(app.isDarkMode).toBe(true);
    });
  });

  describe('Method: toggleShowKeycodeTable', () => {
    it('should toggle the value of the isShowingKeycodeTable property', () => {
      app.isShowingKeycodeTable = false;

      app.toggleShowKeycodeTable();

      expect(app.isShowingKeycodeTable).toBe(true);
    });
  });
});
