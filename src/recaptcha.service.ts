import { Inject, Injectable, NgZone, ElementRef } from '@angular/core';
// RxJS
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { AsyncSubject } from 'rxjs/AsyncSubject';

import { RECAPTCHA_CONFIG, RecaptchaConfig } from './recaptcha.config';

export interface ReCaptchaOptions {
  sitekey: string,
	theme?: 'light' | 'dark';
  type?: 'audio' | 'image';
  size?: 'compact' | 'normal';
	tabindex?: number;
	callback?: (response: string) => void;
	'expired-callback'?: () => void;
}

@Injectable()
export class ReCaptchaService {
  private _recaptcha: AsyncSubject<any> = new AsyncSubject<any>();

  constructor(
    @Inject(RECAPTCHA_CONFIG) protected config: RecaptchaConfig,
    private zone: NgZone
  ) {
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
  render(element: ElementRef, opts?: ReCaptchaOptions): Observable<string> {
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
