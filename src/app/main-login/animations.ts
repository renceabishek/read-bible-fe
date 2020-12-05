import {
    trigger, animateChild, group,
    transition, animate, style, query
  } from '@angular/animations';
  
  
  // Routable animations
  export const slideInAnimation =
  trigger('routeAnimation', [
    transition('login1 <=> signup1', [
      style({ position: 'relative' }),
      query(':enter, :leave', [
        style({
          position: 'absolute',
          margin: '0 0 10px',
          padding: '10px 57px'
          //width: '100%'
        })
      ]),
      query(':enter', [
        style({ left: '-10%'})
      ]),
      query(':leave', animateChild()),
      group([
        query(':leave', [
          animate('3000ms ease-out', style({ left: '100%'}))
        ]),
        query(':enter', [
          animate('3000ms ease-out', style({ left: '0%'}))
        ])
      ]),
      query(':enter', animateChild()),
    ])
  ]);
  