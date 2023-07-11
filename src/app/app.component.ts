import { Component, OnInit } from '@angular/core';
import { RestApi } from './shared/rest-api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'GeStamp-Web';
  serviceAvailable = false;
  version = "";
  buildDate = "";

  constructor(private rest: RestApi) {
    
  }

  ngOnInit(): void {
    this.rest.get('/').subscribe(res => {
      //console.log(res);
      this.serviceAvailable = true;
      this.version = res.version;
      this.buildDate = res.buildDate;
    });
  }
  
}
