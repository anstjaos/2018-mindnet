import { Component, OnInit } from '@angular/core';
import { MemberService } from '../service/member.service';
import { Member } from '../model/member';

import { Crypto } from '../model/crypto';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-member-register',
  templateUrl: './member-register.component.html',
  styleUrls: ['./member-register.component.css']
})
export class MemberRegisterComponent implements OnInit {
  member: Member;
  p_confrim: string;

  constructor(private _memberService: MemberService) {
    this.member = new Member();
    this.p_confrim = '';
  }

  ngOnInit() {

  }

  registerMember() {
    let member: Member = {
      id: this.member.id,
      password: Crypto.encryption(this.member.password)
    };

    this._memberService.create(member)
      .subscribe((res) => {
        this.member = new Member();
        this.p_confrim = '';
        switch (res.status) {
          /* 회원가입하면 바로 로그인 된 상태로 되게 만들 것 */
          case 201:
            window.alert("회원가입이 성공했습니다.");
            console.log("성공");
            break;
          case 202:
          window.
            window.alert("이미 존재하는 Email입니다.");
            //alert("해당 Email로 생성된 아이디가 이미 있습니다.")
            console.log("이미존재하는 계정");
            break;
        }
      });
  }
}