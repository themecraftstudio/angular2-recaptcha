import { Inject, Component, AfterViewInit, Input, Output, EventEmitter, NgZone, ViewChild, ElementRef } from '@angular/core';
// RxJS
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { Observable } from 'rxjs/Observable';

import { RECAPTCHA_CONFIG, RecaptchaConfig } from './recaptcha.config';
import { ReCaptchaService, ReCaptchaOptions } from './recaptcha.service';

@Component({
  selector: 're-captcha',
  template: '<div #container></div>'
})
export class ReCaptchaComponent implements AfterViewInit {
  @Input()
  tabindex: number = 0;

  @Input()
  theme: 'dark' | 'light';

  @Input()
  size: 'compact' | 'normal';

  @Input()
  type: 'audio' | 'image';

  @ViewChild('container')
  container: ElementRef;

  @Output()
  success = new EventEmitter<string>();

  constructor(
    @Inject(RECAPTCHA_CONFIG) protected config: RecaptchaConfig,
    protected recaptcha: ReCaptchaService
  ) {}

  ngAfterViewInit() {
    // this.recaptcha.render(this.container);
    this.recaptcha.render(this.container, {
      sitekey: this.config.siteKey,
      tabindex: this.tabindex,
      theme: this.theme,
      size: this.size,
      type: this.type,
    }).subscribe((response: string) => {
      this.success.emit(response);
    });
  }
}
