import { Component, OnInit } from '@angular/core';
import { Member } from '../model/member';
import { LoginService } from '../service/login.service';
import { MemberService } from '../service/member.service';
import { Crypto } from '../model/crypto'
import { Filter } from '../model/filter';
import { Router } from '@angular/router';

@Component({
  selector: 'app-member-info-container',
  templateUrl: './member-info-container.component.html',
  styleUrls: ['./member-info-container.component.css'],
  host: { style: 'width: 100%' }
})
export class MemberInfoContainerComponent implements OnInit {
  member: Member
  p_confirm: string;

  constructor(private _loginService: LoginService,
    private _memberService: MemberService,
    private _router: Router) {
    this.member = {
      id: _loginService.getMember().id,
      password: ''
    }
    this.p_confirm = "";
  }

  ngOnInit() {

  }

  updateMember() {
    let member: Member = {
      id: this.member.id,
      password: Crypto.encryption(this.member.password)
    };

    this._memberService.update(member)
      .subscribe((res) => {
        /* 성공 팝업 띄우고 초기화 */
        this.member.password = '';
        this.p_confirm = '';
      });
  }

  unregisterMember() {
    this._memberService.delete(this.member.id)
      .subscribe((res) => {
        /* 탈퇴 팝업 띄우고 메인 이동 */
        this._loginService.logout();
        /* 마인드맵에 owner 삭제해야할듯 */

        // main 페이지로 이동    
        let link = ['/main'];
        this._router.navigate(link);
      });
  }
}
