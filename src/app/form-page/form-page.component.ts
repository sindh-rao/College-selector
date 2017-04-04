import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import { MaterialModule } from '@angular/material';
//Added http import
import {Http} from '@angular/http';
import {contentHeaders} from '../headers';

@Component({
  selector: 'app-form-page',
  templateUrl: './form-page.component.html',
  styleUrls: ['./form-page.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class FormPageComponent implements OnInit {
  public directions = [
    { value: 'North', display: 'North' },
    { value: 'South', display: 'South' },
    { value: 'East', display: 'East' },
    { value: 'West', display: 'West' }
  ];

  public categories = [
    { value: 'academic', display: 'Academic Reputation'},
    { value: 'social', display: 'Social / Lifestyle'},
    { value: 'aesthetics', display: 'Aesthetics'},
    { value: 'finance', display: 'Financial Limitations'}
  ];
//Added http instance
  constructor(private router: Router,private http: Http) { }

  ngOnInit() {
  }
//Added this method
  onSubmit(FormData: any){
	  console.log(FormData.form._value);
    var body = JSON.stringify(FormData.form._value);
   this.http.post('http://localhost:3001/api/formDetails',body,{ headers: contentHeaders })
    .subscribe(response=>{
      console.log(response);
     },
    error=>{
      alert(error);
    });
  }

}
