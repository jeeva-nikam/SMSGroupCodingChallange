import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';



@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.sass']
})
export class SignUpComponent implements OnInit {
  signResponse: any
  constructor(private commonService: CommonService, private router: Router) { }

  ngOnInit() {
  }

  signUpForm = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
    repeatPassword: new FormControl('', [Validators.required])
  });

  
  signUp(){
    console.log(this.signUpForm);
    let url = this.commonService.baseUrl + 'users/signup';
    let bodydata = {email: this.signUpForm.value.email, password: this.signUpForm.value.password}
    this.commonService.postService(url, bodydata)
     .subscribe(data => {
       this.signResponse = data;
       this.router.navigate(['/Login']);
       //let token = `Bearer ${this.loginResponse.token}`;
       //this.cookieService.set('jsonWebToken', token, 60000);
     });
  }

}
