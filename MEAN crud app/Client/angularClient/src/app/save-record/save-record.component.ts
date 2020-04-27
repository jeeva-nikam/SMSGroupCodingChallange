import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';


@Component({
  selector: 'app-save-record',
  templateUrl: './save-record.component.html',
  styleUrls: ['./save-record.component.sass']
})
export class SaveRecordComponent implements OnInit {
  constructor(
    private commonService: CommonService, 
    private cookieService: CookieService, 
    private router: Router,
    private route: ActivatedRoute) { 
      let id = this.route.snapshot.params.id;
  
      console.log(id);
    }

  ngOnInit() {
  }
  saveRecordForm = new FormGroup({
    city: new FormControl('', [Validators.required]),
    start_date: new FormControl('', [Validators.required]),
    end_date: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
  });

  saveRecord(){
    let url = this.commonService.baseUrl + 'SMS';
    this.commonService.postService(url, this.saveRecordForm.value)
     .subscribe(data => {
       if(data.message == 'Record saved successfully'){
       
        this.router.navigate(['/Records']);
       }else{
       
       }
     });
  }

  updateRecord(){
    
  }
}
