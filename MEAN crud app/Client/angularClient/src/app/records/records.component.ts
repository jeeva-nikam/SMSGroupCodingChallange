import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';

export interface SMSRecords extends SMSGroupData{
  SMSGroupData:Array<SMSGroupData>;
  count: number;
}
export interface SMSGroupData extends Request{
  city: string;
  start_date: Date;
  end_date: Date;
  price: string;
  status: string;
  color: string;
  _id: string;
  request: Request;
}

export interface Request{
  type: string;
  url: string;
}

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.sass']
})
export class RecordsComponent implements OnInit  {
  SMSData: SMSGroupData;
  cols: any[];
  today: Date;
  priorDate: Date;
  showDataLoader: boolean = false;
  constructor(private commonService: CommonService,  private router: Router) { }
  dateFilterForm = new FormGroup({
    from: new FormControl('', [Validators.required]),
    to: new FormControl('', [Validators.required])
  });
  ngOnInit() {
    this.today = new Date()
    this.priorDate = new Date(new Date().setDate(new Date().getDate() - 30*12*10));
    //this.dateFilterForm.setValue({from: this.priorDate, to: this.today});
    this.getRecords(this.priorDate, this.today);
    this.cols = [
      { field: 'city', header: 'City' },
      { field: 'start_date', header: 'Start Date' },
      { field: 'end_date', header: 'End Date' },
      { field: 'price', header: 'Price' },
      { field: 'status', header: 'Status' },
      { field: 'color', header: 'Color' },
  ];
  }

  getRecords(from: Date, to:Date){
    this.showDataLoader = true;
   let url = this.commonService.baseUrl + 'SMS/' + from +'/' + to;
   this.commonService.getService(url)
    .subscribe(data => {
      this.SMSData = data.SMSGroupData;
      this.showDataLoader = false;
    });
  }

  editRecord(id:string){
    this.router.navigate(['/SaveRecord', {id: id}]);
  }

  deleteConfirm(id: string){
    var r = confirm("Would you like to delete record?");
    if (r == true) {
      this.deleteRecord(id);
    } else {
      return
    }
  }

  deleteRecord(id: string){
    let url = this.commonService.baseUrl + 'SMS/' + id;
   this.commonService.deleteService(url)
    .subscribe(data => {
      if(data.message == 'Record deleted'){
        alert('Record deleted successfully');
        this.getRecords(this.dateFilterForm.value.from, this.dateFilterForm.value.to);
      }else{
        alert('Record not deleted.');
      }
    });
  }

}
