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
  public results = [
    // {value: '1', display: 'NCSU'},
    // {value: '2', display: 'UNCG'},
    // {value: '3', display: 'UNCW'},
    // {value: '4', display: 'Duke'},
  ];

  constructor(private router: Router,private http: Http) { 
    this.http.get('http://localhost:3001/api/results')
    .subscribe(response=>{
      console.log(response.json());
      this.results = response.json();
     },
    error=>{
      alert(error);
      //this.router.navigateByUrl('/results');
    });

  }

  ngOnInit() {
  }

}
