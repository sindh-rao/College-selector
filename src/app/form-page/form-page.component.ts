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
    { value: '0', display: 'Northeast' },
    { value: '1', display: 'Northwest' },
    { value: '2', display: 'Southeast' },
    { value: '3', display: 'Southwest' },
    { value: '4', display: 'Central'}
  ];

  public categories = [
    { value: 'major', display: 'Major'},
    { value: 'desired_location', display: 'Desired Location'},
    { value: 'state', display: 'State'},
    { value: 'accRate', display: 'Acceptance Rate'},
    { value: 'public_private', display: 'Public or Private'},
    { value: 'sports', display: 'College Sports'},
    { value: 'outMax', display: 'Out of State Tuition'},
    { value: 'inMax', display: 'In State Tuition'}
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
      this.router.navigateByUrl('/results');
     },
    error=>{
      alert(error);
      this.router.navigateByUrl('/results');
    });

  }

}
