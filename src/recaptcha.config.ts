import { OpaqueToken } from '@angular/core';

export interface RecaptchaConfig {
  siteKey: string;
}

export const RECAPTCHA_CONFIG = new OpaqueToken('RecaptchaConfig');
