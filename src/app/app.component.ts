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
  constructor(private _service:ApiService,private common:CommonmethodsService){
    this.feb(0,1,10,1);
    
    this.IsCreation=false;
  }
 ngOnInit(): void {
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
    this._service.post("Items/PostSave",this.Creation).subscribe(res=>{
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
    this._service.get("Items/GetData").subscribe(res=>{
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

  Edit(id){
    this._service.get('Items/EditData?id='+id)
    .subscribe(res=>{
      this.Creation.Id=res[0].Id;
      this.Creation.FirstName=res[0].FirstName;
      this.Creation.LastName=res[0].LastName;
      this.Creation.Date=this.common.convertDateToDBFormat(res[0].Date);
      this.Creation.Email=res[0].Email;
      this.IsCreation=false;
      this.Submit=0;
    },
    error=>{
      console.log(error);
    })
  }
  View(id){
    this.Edit(id);
  }
  Delete(id){
    this._service.get('Items/DeleteData?Id='+id)
    .subscribe(res=>{
      this.resData=res;
      CommonmethodsService.showAlert('','delete');
      this.GetData();
    })
  }

  Update(){
    this._service.post('Items/Update',this.Creation)
    .subscribe(res=>{
      this.resData=res;
      this.ngOnInit();
      CommonmethodsService.showAlert('','update');
    },error=>{
      console.log(error);
    })
  }
}
