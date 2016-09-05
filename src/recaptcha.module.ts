import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReCaptchaService } from './recaptcha.service';
import { ReCaptchaComponent } from './recaptcha.component';

@NgModule({
  imports: [ CommonModule ],
  declarations: [ ReCaptchaComponent ],
  providers: [ ReCaptchaService ], // App scoped singleton
  exports: [
    ReCaptchaComponent
  ]
})
export class RecaptchaModule { }
