import { Component, OnInit } from '@angular/core'
import { TransferState } from '../modules/transfer-state/transfer-state';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { Title } from '@angular/platform-browser';
import 'rxjs';

@Component({
	selector: 'demo-app',
	template: `
	  <h1>Universal Demo</h1>
	  <a routerLink="/">Home</a>
	  <a routerLink="/lazy">Lazy</a>
	  <router-outlet></router-outlet>
	`,
  styles: [
    `h1 {
      color: green;
    }`
  ]
})
export class AppComponent implements OnInit {

  constructor(
    private _titleService: Title,
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private cache: TransferState
    ) {}
  ngOnInit() {

    this.cache.set('cached', true);

    this._router.events
			.filter(event => event instanceof NavigationEnd)
			.map(() => this._activatedRoute)
			.map(route => {
				while (route.firstChild) route = route.firstChild;
				return route;
			})
			.filter(route => route.outlet === 'primary')
  			.mergeMap(route => route.data)
			.subscribe((data) => {
				console.log('NavigationEnd:', data);
        this._titleService.setTitle(data.title);
			});


  }
}
