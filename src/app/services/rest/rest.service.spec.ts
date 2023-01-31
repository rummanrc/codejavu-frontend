import {TestBed} from '@angular/core/testing';
import {RestService} from './rest.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {restAPI} from "../../constants";
import {AppConfig} from "../../app-config";
import {HTTP_INTERCEPTORS} from "@angular/common/http";


describe('RestService', () => {
  let service: RestService;
  let httpMock: HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {provide: HTTP_INTERCEPTORS, useClass: RestService, multi: true},
      ]
    });
    service = TestBed.inject(RestService);
    httpMock = TestBed.inject(HttpTestingController);
    let store: any = {};
    const mockLocalStorage = {
      getItem: (key: string): string => {
        return key in store ? store[key] : null;
      },
      setItem: (key: string, value: string): void => {
        store[key] = `${value}`;
      },
      removeItem: (key: string): void => {
        delete store[key];
      },
      clear: (): void => {
        store = {};
      }
    };
    spyOn(Object.getPrototypeOf(localStorage), 'getItem')
      .and.callFake(mockLocalStorage.getItem);
    spyOn(Object.getPrototypeOf(localStorage), 'setItem')
      .and.callFake(mockLocalStorage.setItem);
    spyOn(Object.getPrototypeOf(localStorage), 'removeItem')
      .and.callFake(mockLocalStorage.removeItem);
    spyOn(Object.getPrototypeOf(localStorage), 'clear')
      .and.callFake(mockLocalStorage.clear);

    localStorage.setItem('token', 'TOKEN');
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create api url', () => {
    expect(service.url(restAPI.LOGIN)).toMatch(AppConfig.BASE_URL + restAPI.LOGIN);
    expect(service.url(restAPI.SIGN_UP)).toMatch(AppConfig.BASE_URL + restAPI.SIGN_UP);
    expect(service.url(restAPI.SNIPPETS)).toMatch(AppConfig.BASE_URL + restAPI.SNIPPETS);
    expect(service.url(restAPI.TAGS)).toMatch(AppConfig.BASE_URL + restAPI.TAGS);
  });

  it('should return stored token from localstorage', () => {
    expect(service.getToken()).toEqual('TOKEN');
  });

  it('should call get http method', () => {
    const dummyData = {data: 'ok'};
    const dummyApi = `${AppConfig.BASE_URL}/get`;
    service.get(dummyApi).subscribe(data => {
      expect(data).toEqual(dummyData);
    });
    const req = httpMock.expectOne(dummyApi);
    expect(req.request.method).toBe("GET");
    req.flush(dummyData);
  });

  it('should call post http method', () => {
    const dummyData = {data: 'ok'};
    const dummyApi = `${AppConfig.BASE_URL}/post`;
    service.post(dummyApi, dummyData).subscribe();
    const req = httpMock.expectOne(dummyApi);
    expect(req.request.method).toBe("POST");
  });

  it('should intercept post api call', () => {
    const dummyData = {data: 'ok'};
    const dummyApiPost = `${AppConfig.BASE_URL}/post`;
    service.post(dummyApiPost, dummyData).subscribe();
    const req = httpMock.expectOne(dummyApiPost);
    expect(req.request.headers.has('Accept')).toBe(true);
    expect(req.request.headers.has('Authorization')).toBe(true);

    expect(req.request.headers.get('Accept')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer TOKEN`);
  });

  it('should intercept get api call', () => {
    const dummyApiGet = `${AppConfig.BASE_URL}/get`;
    service.get(dummyApiGet).subscribe(data => {
      expect(data).toBe(null);
    });
    const req = httpMock.expectOne(dummyApiGet);
    expect(req.request.headers.has('Accept')).toBe(true);
    expect(req.request.headers.has('Authorization')).toBe(true);

    expect(req.request.headers.get('Accept')).toBe('application/json');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer TOKEN`);
  });
});
