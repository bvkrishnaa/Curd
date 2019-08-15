import { Component, OnInit } from '@angular/core';
import { CommonmethodsService } from '../CommonMethods/commonmethods.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {

  Submit: number = 1;
  Creation:any={HNo:'', Pincode:0,City:'',State:'',Landmark:'',Name:'',Mobileno:''};
  constructor(private _service:ApiService,private common:CommonmethodsService){
    this.IsCreation=false;
  }
 ngOnInit(): void {
   //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
   //Add 'implements OnInit' to the class.
   this.Creation={};
 }
  resData:any;
  Save(){
    this._service.post("Product/PostSave",this.Creation).subscribe(res=>{
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
    this._service.get("Product/GetData").subscribe(res=>{
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
    this._service.get('Product/EditData?id='+id)
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
    this._service.get('Product/DeleteData?Id='+id)
    .subscribe(res=>{
      this.resData=res;
      CommonmethodsService.showAlert('','delete');
      this.GetData();
    })
  }

  Update(){
    this._service.post('Product/Update',this.Creation)
    .subscribe(res=>{
      this.resData=res;
      this.ngOnInit();
      CommonmethodsService.showAlert('','update');
    },error=>{
      console.log(error);
    })
  }
  onChange(value:number,isQty){
    if(isQty){
      this.Creation.Quantity=value;
    }else{
      this.Creation.Rate=value;
    }
    this.Creation.Amount=Number(this.Creation.Rate)*Number(this.Creation.Quantity);
  }
}
