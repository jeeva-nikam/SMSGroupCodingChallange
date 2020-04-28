import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CommonService } from '../common.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { SMSGroupData } from '../records/records.component'

export interface updateRecord{
  message: string;
  result: request;
  
}
export interface request{
  type: string,
  url: string;
}

@Component({
  selector: 'app-save-record',
  templateUrl: './save-record.component.html',
  styleUrls: ['./save-record.component.sass']
})
export class SaveRecordComponent implements OnInit {
  SMSDataById: any;
  isUpdate: boolean = false;
  id: string;
  updateRecordResult: any;
  constructor(
    private commonService: CommonService, 
    private cookieService: CookieService, 
    private router: Router,
    private route: ActivatedRoute) {
     
    }

  ngOnInit() {
    if(this.route.snapshot.params.id){
      this.id = this.route.snapshot.params.id;
      this.getRecordById();
      this.isUpdate = true
     
    }
  }
  saveRecordForm = new FormGroup({
    city: new FormControl('', [Validators.required]),
    start_date: new FormControl('', [Validators.required]),
    end_date: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    color: new FormControl('', [Validators.required]),
    _id: new FormControl('')
  });

  saveRecord(){
    console.log(this.saveRecordForm.value);
    let url = this.commonService.baseUrl + 'SMS';
    this.commonService.postService(url, this.saveRecordForm.value)
     .subscribe(data => {
       if(data.message == 'Record saved successfully'){
        alert("Record saved successfully");
        this.router.navigate(['/Records']);
       }else{
        alert("Record not saved");
       }
     });
  }

  getRecordById(){
    let url = this.commonService.baseUrl + 'SMS/' + this.id;
    this.commonService.getService(url)
     .subscribe(data => {
       this.SMSDataById = data.SMSGroupRecord;
       this.saveRecordForm.setValue(this.SMSDataById);
     });
  }

  updateRecord(){
    let url = this.commonService.baseUrl + 'SMS/' + this.id;
    var formData =[
      {propName: "city", value: this.saveRecordForm.value.city},
      {propName: "start_date", value: this.saveRecordForm.value.start_date},
      {propName: "end_date", value: this.saveRecordForm.value.end_date},
      {propName: "price", value: this.saveRecordForm.value.price},    
      {propName: "status",value: this.saveRecordForm.value.status},
      {propName: "color", value: this.saveRecordForm.value.color}
    ];

    this.commonService.patchService(url, formData)
    .subscribe(data => {
       this.updateRecordResult = data;
       if(this.updateRecordResult.message == 'Record updated'){
         alert('Record updated successfully');
         this.router.navigate(['/Records']);
       }else{
         alert('Could not update record');
       }
     });
  }
}
