import { Component, AfterViewInit, Input, Output, EventEmitter, NgZone, ViewChild, ElementRef } from '@angular/core';

import { ReCaptchaService } from './recaptcha.service';

// RxJS
import { AsyncSubject } from 'rxjs/AsyncSubject';
import { Observable } from 'rxjs/Observable';

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

  constructor(protected recaptcha: ReCaptchaService) {}

  ngAfterViewInit() {
    // this.recaptcha.render(this.container);
    this.recaptcha.render(this.container, {
      sitekey: '6LchCyYTAAAAAP9kT5GMPALXcLrZUu8eMjPdQbNL',
      tabindex: parseInt(this.tabindex),
      theme: this.theme,
      size: this.size,
      type: this.type,
    }).subscribe((response: string) => {
      this.success.emit(response);
    });
  }
}
