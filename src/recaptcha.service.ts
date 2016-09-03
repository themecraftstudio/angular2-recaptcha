import { Injectable, NgZone, ElementRef } from '@angular/core';

// RxJS
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { AsyncSubject } from 'rxjs/AsyncSubject';

@Injectable()
export class ReCaptchaService {
  private _recaptcha: AsyncSubject<any> = new AsyncSubject<any>();

  constructor(private zone: NgZone) {
    if (!('recaptchaLoaded' in window)) {
      window['recaptchaLoaded'] = () => {
        this.zone.run(this.recaptchaCallback.bind(this));
      };

      let doc = <HTMLDivElement> window.document.body;
      let script = window.document.createElement('script');
      script.innerHTML = '';
      script.src = 'https://www.google.com/recaptcha/api.js?render=explicit&onload=recaptchaLoaded';
      script.async = true;
      script.defer = true;
      doc.appendChild(script);
    }
  }

  recaptchaCallback(): void {
    console.debug('Google reCAPTCHA loaded');
    this._recaptcha.next(window['grecaptcha']);
    this._recaptcha.complete();
  }

  static subs: number = 0;
  render(element: ElementRef, opts?: {sitekey: string, tabindex?: number, size?: string, type?: string, theme?: string}): Observable<string> {
    // console.log('ReCptchaService.render(): adding subscriber', ++ReCaptchaService.subs);
    // let id = ReCaptchaService.subs;

    return new Observable<string>((observer: Subscriber<string>) => {
      this._recaptcha.subscribe((recaptcha) => {
        // console.log('Subscriber', id, 'next()');

        opts['callback'] = (response: string) => {
          // console.log('Success callback:', response);
          this.zone.runGuarded(() => {
            observer.next(response);
            observer.complete();
          });
        };

        this.zone.runOutsideAngular(() => recaptcha.render(element.nativeElement, opts));
        // let widgetId = recaptcha.render(element.nativeElement, opts);
      });
    });
  }
}
