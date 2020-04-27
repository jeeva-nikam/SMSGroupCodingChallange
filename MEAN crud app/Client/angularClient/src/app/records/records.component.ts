import { Component, OnInit } from '@angular/core';
import { CommonService } from '../common.service';

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
  constructor(private commonService: CommonService) { }

  ngOnInit() {
    this.getRecords();
    this.cols = [
      { field: 'city', header: 'City' },
      { field: 'start_date', header: 'Start Date' },
      { field: 'end_date', header: 'End Date' },
      { field: 'price', header: 'Price' },
      { field: 'status', header: 'Status' },
      { field: 'color', header: 'Color' },
  ];
  }

  getRecords(){
   let url = this.commonService.baseUrl + 'SMS';
   this.commonService.getService(url)
    .subscribe(data => {
      this.SMSData = data.SMSGroupData;
      console.log(this.SMSData);
    });
  }

}
