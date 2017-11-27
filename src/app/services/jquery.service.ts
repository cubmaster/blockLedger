import { OpaqueToken } from '@angular/core';
export let JQUERY_TOKEN = new OpaqueToken('jQuery');


export function jQueryFactory() {
  window['jQuery'] = window['$'];
  return window['jQuery'];
}

export const JQUERY_PROVIDER = [
  { provide: JQUERY_TOKEN, useFactory: jQueryFactory },
];

