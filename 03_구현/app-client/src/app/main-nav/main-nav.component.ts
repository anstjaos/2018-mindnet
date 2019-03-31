import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main-nav',
  templateUrl: './main-nav.component.html',
  styleUrls: ['./main-nav.component.css']
})
export class MainNavComponent implements OnInit {

  constructor(private _router: Router) {

  }

  ngOnInit() {

  }

  goMain() {
    let link = ['/main'];
    this._router.navigate(link);
  }
}
