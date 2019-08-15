import { Router } from '@angular/router';
import { CommonmethodsService } from './CommonMethods/commonmethods.service';
import { Subject } from 'rxjs';
import { ApiService } from './api.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  
  Submit: number = 1;
  Creation:any={Id:'',FirstName:'',LastName:'',Date:'',Email:''};
  title = 'DAssign';
  constructor(private _service:ApiService,private common:CommonmethodsService,private router:Router){
    this.feb(0,1,10,1);
    
    this.IsCreation=false;
  }
 ngOnInit(): void {
  this.IsView=true;
   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   //Add 'implements OnInit' to the class.
   this.Creation={};
 }
  feb(a,b,counter,num){
    console.log(a);
    if(counter>num){
      this.feb(b,a+b,counter+1,Number);
    }
  }
  resData:any;
  Save(){
    this._service.post("Customer/Post",this.Creation)
    .subscribe(res=>{
      this.resData=res;
      this.ngOnInit();
      CommonmethodsService.showAlert('','save');
    },
    error=>{
      //console.log(error);
      CommonmethodsService.showAlert('','error');
    })
  }
  itemData:any;
  IsCreation:boolean=false;
  GetData(){
    this.IsCreation=true;
    this._service.get("Customer/Get").subscribe(res=>{
      this.itemData=res;
      
    },
    error=>{
      console.log(error);
    })
  }
  Create(){
    this.IsCreation=false;
    
    this.Submit=1;
    this.ngOnInit();
  }

  Edit(id,val){
    this._service.get('Customer/GetById?id='+id)
    .subscribe(res=>{
      this.Creation.Id=res[0].Id;
      this.Creation.FirstName=res[0].FirstName;
      this.Creation.LastName=res[0].LastName;
      this.Creation.Date=this.common.convertDateToDBFormat(res[0].Date);
      this.Creation.Email=res[0].Email;
      this.IsCreation=false;
      this.Submit=0;
      this.IsView=val;
    },
    error=>{
      console.log(error);
    })
  }
  IsView:boolean;
  View(id,val){
    this.IsView=val;
    this.Edit(id,val);
  }
  Delete(id){
    this._service.delete('Customer/Delete?Id='+id)
    .subscribe(res=>{
      this.resData=res;
      CommonmethodsService.showAlert('','delete');
      this.GetData();
    })
  }

  Update(){
    this._service.put('Customer/Put',this.Creation)
    .subscribe(res=>{
      this.resData=res;
      this.ngOnInit();
      CommonmethodsService.showAlert('','update');
    },error=>{
      console.log(error);
    })
  }

  Delivery(){
    this.router.navigate(['/product']);
  }
}
