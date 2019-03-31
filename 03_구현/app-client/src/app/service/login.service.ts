import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Member } from '../model/member';

@Injectable()
export class LoginService {
  private _member: Member;

  constructor(private _router: Router) {
    this._member = JSON.parse(sessionStorage.getItem('member'));
  }

  login(member: Member) {
    // 로컬 저장소에 현재 사용자 정보 저장
    sessionStorage.setItem('member', JSON.stringify(member));
    this._member = member;
  }

  logout() {
    // 로컬 저장소의 현재 사용자 정보 삭제
    sessionStorage.removeItem('member');
    this._member = null;
  }

  getMember() {
    return this._member;
  }
}
