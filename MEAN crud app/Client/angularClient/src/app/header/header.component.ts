import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { CommonService } from '../common.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.sass']
})
export class HeaderComponent implements OnInit {

  constructor(private cookieService: CookieService,
    private router: Router,
    private commonService: CommonService) { }

  ngOnInit() {
  }

  logOut(){
    //document.cookie = "jsonWebToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    this.cookieService.delete('jsonWebToken', '/', window.location.hostname, false, 'Lax' );
    this.router.navigate(['/Login']);
  }

}
