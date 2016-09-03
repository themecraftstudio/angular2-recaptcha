import { AfterViewInit, EventEmitter, ElementRef } from '@angular/core';
import { ReCaptchaService } from './recaptcha.service';
export declare class ReCaptchaComponent implements AfterViewInit {
    protected recaptcha: ReCaptchaService;
    tabindex: number;
    theme: 'dark' | 'light';
    size: 'compact' | 'normal';
    type: 'audio' | 'image';
    container: ElementRef;
    success: EventEmitter<string>;
    constructor(recaptcha: ReCaptchaService);
    ngAfterViewInit(): void;
}
