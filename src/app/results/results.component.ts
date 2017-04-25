import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import { moveIn, fallIn } from '../router.animations';
import {Http} from '@angular/http';
import { MaterialModule } from '@angular/material';
import {contentHeaders} from '../headers';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.css'],
  animations: [moveIn(), fallIn()],
  host: {'[@moveIn]': ''}
})
export class ResultsComponent implements OnInit {
  public results = [];

  constructor(private router: Router,private http: Http) { 
    this.wait(1000);
    this.http.get('http://localhost:3001/api/results')
    .subscribe(response=>{
      console.log(response.json());
      this.results = response.json();
      this.formatResults();
     },
    error=>{
      alert(error);
      //this.router.navigateByUrl('/results');
    });
  }

  wait(ms){
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
}

  formatResults() {
    this.results.forEach(function(result) {
      if(result['Public(0) \/Private(1)'] === 0) {
        result['Public(0) \/Private(1)'] = "Public";
      } else {
        result['Public(0) \/Private(1)'] = "Private";
      }

      if(result['In power five no(0)\/ yes(1)'] === 1) {
        result['In power five no(0)\/ yes(1)'] = "Yes";
      } else {
        result['In power five no(0)\/ yes(1)'] = "No";
      }

      if(result.instate) {
        result.tuition = result['In-State Tuition'];
      } else {
        result.tuition = result['Out-of-state Tuition'];
      }
    });
  }

  ngOnInit() {
  }

}
