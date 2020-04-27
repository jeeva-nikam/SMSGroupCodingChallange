import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

export interface loginResponse{
  message: string;
  token?: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginResponse: loginResponse;
  constructor(
    private commonService: CommonService, 
    private cookieService: CookieService, 
    private router: Router) { }

  ngOnInit() {
  }

  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  });

  login(){
    let url = this.commonService.baseUrl + 'users/login';
    this.commonService.postService(url, this.loginForm.value)
     .subscribe(data => {
       if(data.token.length>0){
          let token = `Bearer ${data.token}`;
          this.cookieService.set('jsonWebToken', token, 1/24);
      
          this.router.navigate(['/Records']);
       }else{
     
       }
     });
  }

}
