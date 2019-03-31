import { Component, OnInit } from '@angular/core';
import { Member } from '../model/member';
import { LoginService } from '../service/login.service';
import { MemberService } from '../service/member.service';
import { Filter } from '../model/filter';
import { Router } from '@angular/router';
import { Crypto } from '../model/crypto';

@Component({
  selector: 'app-login-manager',
  templateUrl: './login-manager.component.html',
  styleUrls: ['./login-manager.component.css']
})
export class LoginManagerComponent implements OnInit {
  member: Member;

  constructor(
    private _loginService: LoginService,
    private _memberService: MemberService,
    private _router: Router) {
    this.member = new Member();
  }

  ngOnInit() {
  }

  login() {
    let filter: Filter = new Filter();
    filter.addQueryElement('id', this.member.id);

    this._memberService.getMember(filter)
      .subscribe((members) => {
        if (members.length == 0) {
          //window.alert("존재하지 않는 계정입니다.\nEmail을 다시 확인해보세요.");
    
          console.log("존재하지 않는 계정");
        }
        else {
          let member: Member = members[0];
          if (this.member.password != Crypto.decryption(member.password)) {
            window.alert("비밀번호가 일치하지 않습니다.");
            console.log("비밀번호가 일치하지 않음");
          }
          else {
            this._loginService.login(member);

            // member-main 페이지로 이동    
            let link = ['/member-main'];
            this._router.navigate(link);
          }
        }

        this.member = {
          id: '',
          password: ''
        }
      });
  }

  logout() {
    this._loginService.logout();

    // member-main 페이지로 이동    
    let link = ['/main'];
    this._router.navigate(link);
  }
}