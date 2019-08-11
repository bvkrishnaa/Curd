import { ApiService } from './../api.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  constructor(private _service:ApiService,private router:Router) {
    _service.loggedIn();
  }
  
  ngOnInit() {
    
  }
  
 
  loginUser(event){
    event.preventDefault();
    this._service.getMethod('Login/GetMethod')
    .subscribe(
      res => {
        if(res.sucess){
          this.router.navigate(['dashboard'])
          this._service.setLogin(true);
        }else{
          window.alert(res.message)
        }
          
      },
      error => {
          console.error(error);
      })
    console.log(event);
  }
}
