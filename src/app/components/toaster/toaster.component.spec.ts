import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToasterComponent } from './toaster.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('Component: Toaster', () => {
  let component: ToasterComponent;
  let fixture: ComponentFixture<ToasterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToasterComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(ToasterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => expect(component).toBeTruthy());

  describe('Method: addToast', () => {
    const mockToastType = 'info';
    const mockToastMessage = 'mock-toast-message';
    const mockTimeout = 'mock-timeout';

    beforeEach(() => {
      ToasterComponent.toasts = [];
    });

    it('should create and add a new toast', () => {
      const closeAlert = jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn<any, any>(ToasterComponent, 'closeAlert')
        .mockImplementationOnce(() => undefined);
      const findIndexOfToast = jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn<any, any>(ToasterComponent, 'findIndexOfToast')
        .mockImplementationOnce(() => -1);
      const createToastHandler = jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn<any, any>(ToasterComponent, 'createToastHandler')
        .mockImplementationOnce(() => mockTimeout);

      ToasterComponent.addToast(mockToastType, mockToastMessage);

      expect(closeAlert).toHaveBeenCalledWith(mockToastType, mockToastMessage);
      expect(findIndexOfToast).toHaveBeenCalledWith(
        mockToastType,
        mockToastMessage,
      );
      expect(createToastHandler).toHaveBeenCalledWith(
        mockToastType,
        mockToastMessage,
      );
      expect(ToasterComponent['toasts']).toEqual([
        {
          type: mockToastType,
          message: mockToastMessage,
          handler: mockTimeout,
        },
      ]);
    });

    it('should not add an existing toast', () => {
      const mockToast = {
        type: mockToastType,
        message: mockToastMessage,
      } as never;

      const closeAlert = jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn<any, any>(ToasterComponent, 'closeAlert')
        .mockImplementationOnce(() => undefined);
      const findIndexOfToast = jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn<any, any>(ToasterComponent, 'findIndexOfToast')
        .mockImplementationOnce(() => 1);

      jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn<any, any>(ToasterComponent, 'createToastHandler')
        .mockImplementationOnce(() => mockTimeout);

      ToasterComponent.toasts = [mockToast];
      ToasterComponent.addToast(mockToastType, mockToastMessage);

      expect(findIndexOfToast).toHaveBeenCalledWith(
        mockToastType,
        mockToastMessage,
      );
      expect(closeAlert).not.toHaveBeenCalled();

      expect(ToasterComponent['toasts']).toEqual([mockToast]);
    });

    it('should create toasts using the default message values', () => {
      jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn<any, any>(ToasterComponent, 'closeAlert')
        .mockImplementationOnce(() => undefined);

      jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn<any, any>(ToasterComponent, 'createToastHandler')
        .mockImplementationOnce(() => mockTimeout);

      ToasterComponent.addToast('info');
      ToasterComponent.addToast('error');

      expect(ToasterComponent['toasts']).toEqual([
        {
          type: 'info',
          message: 'Copied to Clipboard',
          handler: mockTimeout,
        },
        {
          type: 'error',
          message: 'An error occurred',
          handler: mockTimeout,
        },
      ]);
    });
  });

  describe('Method: findIndexOfToast', () => {
    it('should return the current index of a toast', () => {
      const mockToastType = 'info';
      const mockToastMessage = 'mock-info-toast-message';

      ToasterComponent['toasts'] = [
        {
          type: 'error',
          message: 'mock-error-toast-message',
        } as never,
        {
          type: mockToastType,
          message: mockToastMessage,
        } as never,
      ];

      expect(
        ToasterComponent['findIndexOfToast'](mockToastType, mockToastMessage),
      ).toBe(1);
    });
  });

  describe('Method: closeAlert', () => {
    it('should call the windows open method with the documentLink', () => {
      const mockHandler = 'mock-handler';
      const mockToastType = 'info';
      const mockToastMessage = 'mock-info-toast-message';

      const findIndexOfToast = jest
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .spyOn<any, any>(ToasterComponent, 'findIndexOfToast')
        .mockImplementationOnce(() => 0);
      const clearTimeout = jest
        .spyOn(window, 'clearTimeout')
        .mockImplementationOnce(() => undefined);

      ToasterComponent['toasts'] = [
        {
          type: mockToastType,
          message: mockToastMessage,
          handler: mockHandler,
        } as never,
      ];

      ToasterComponent['closeAlert'](mockToastType, mockToastMessage);

      expect(findIndexOfToast).toHaveBeenCalledWith(
        mockToastType,
        mockToastMessage,
      );
      expect(clearTimeout).toHaveBeenCalledWith(mockHandler);
      expect(ToasterComponent['toasts']).toEqual([]);
    });
  });

  describe('Method: createToastHandler', () => {
    it('should return a timeout to handle closing the toast', () => {
      const mockHandler = 'mock-handler';
      const mockToastType = 'info';
      const mockToastMessage = 'mock-info-toast-message';
      const mockTimeout = 'mock-timeout';

      const setTimeout = jest
        .spyOn(window, 'setTimeout')
        .mockImplementationOnce(() => mockTimeout as never);

      ToasterComponent['toasts'] = [
        {
          type: mockToastType,
          message: mockToastMessage,
          handler: mockHandler,
        } as never,
      ];

      expect(
        ToasterComponent['createToastHandler'](mockToastType, mockToastMessage),
      ).toBe(mockTimeout);
      expect(setTimeout).toHaveBeenCalled();
    });
  });
});
