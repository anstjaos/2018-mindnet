import { Component, OnInit, } from '@angular/core';
import { LoginService } from '../service/login.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/debounceTime';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-main-container',
  templateUrl: './main-container.component.html',
  styleUrls: ['./main-container.component.css']
})
export class MainContainerComponent implements OnInit {
  private _success = new Subject<string>();
  staticAlertClosed = false;
  successMessage: string;
  
  constructor(
    private _loginService: LoginService,
    private _router: Router) { }

  ngOnInit() {

    setTimeout(() => this.staticAlertClosed = true, 20000);

    this._success.subscribe((message) => this.successMessage = message);
    this._success.pipe(
      debounceTime(5000)
    ).subscribe(() => this.successMessage = null);
  

    if (this._loginService.getMember() != null) {
      // member-main 페이지로 이동    
      let link = ['/member-main'];
      this._router.navigate(link);
    }
  }

  public changeSuccessMessage() {
    this._success.next(`${new Date()} - Message successfully changed.`);
  }
}
