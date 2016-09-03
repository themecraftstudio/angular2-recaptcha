import { NgZone, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
export interface ReCaptchaOptions {
    sitekey: string;
    theme?: 'light' | 'dark';
    type?: 'audio' | 'image';
    size?: 'compact' | 'normal';
    tabindex?: number;
    callback?: (response: string) => void;
    'expired-callback'?: () => void;
}
export declare class ReCaptchaService {
    private zone;
    private _recaptcha;
    constructor(zone: NgZone);
    recaptchaCallback(): void;
    static subs: number;
    render(element: ElementRef, opts?: ReCaptchaOptions): Observable<string>;
}
