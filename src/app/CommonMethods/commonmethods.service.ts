import { Injectable } from '@angular/core';
import swal from 'sweetalert2';
import * as moment from 'moment/moment';

@Injectable({
  providedIn: 'root'
})
export class CommonmethodsService {
  public static saveMessage: string = " saved successfully";
  public static updateMessage: string = " updated successfully";
  public static deleteMessage: string = " deleted successfully";
  public static linkedMessage: string = "Transaction already linked";
  public static errorMessage: string = "Some thing went wrong plz check once..";
  public static ExistMessage: string = " Already Exist";
  public static DeactiveMessage: string = "Status Deactivated Successfully";
  public static ActiveMessage: string = "Status Activated Successfully";
  public static WarningMessage: string = "Please select valid date";
  constructor() { }

  public static showAlert(stringVal, action) {
    switch (action) {
        case "save":
            {
              swal.fire('Save',this.saveMessage,"success")
                //swal({ title: stringVal, text: this.saveMessage, type: 'success', width: 465, padding: 5 })
                break;
            }
        case "update":
            {
              swal.fire('Update',this.updateMessage,"success")
                break
            }
        case "delete":
            {
              swal.fire('Delete',this.deleteMessage,'success');
                break
            }
        // case "linked":
        //     {
        //         swal({ title: '', text: this.linkedMessage, type: 'error', width: 465, padding: 5 })
        //         break
        //     }
         case "error":
             {
              swal.fire('Error',this.errorMessage,"error")
                 break
        }
        // case "custom":
        //     {
        //         swal({ title: '', text: stringVal, type: 'error', width: 465, padding: 5 })
        //         break
        //     }
        // case "Exist":
        //     {
        //         swal({ title: '', text: stringVal + this.ExistMessage, type: 'error', width: 465, padding: 5 })
        //         break
        //     }
        // case "Active":
        //     {
        //         swal({ title: stringVal, text: this.ActiveMessage, type: 'success', width: 465, padding: 5 })
        //         break
        //     }
        // case "Deactive":
        //     {
        //         swal({ title: stringVal, text: this.DeactiveMessage, type: 'success', width: 465, padding: 5 })
        //         break
        //     }
        // case "Warning":
        //     {
        //         swal({ title: stringVal, text: this.WarningMessage, type: 'warning', width: 465, padding: 5 })
        //         break
        //     }
        // case "Status":
        //     {
        //         swal({ title: '', text: stringVal, type: 'success', width: 465, padding: 5 })
        //         break
        //     }
    }
}

// public static ConfirmAlert(Text, title) {

//     return swal(  {
//       title: '<h5>Are you sure?</h5>',
//             width: 425,
//             padding: 5,
//             text: Text,
//             type: 'warning',
//             showCancelButton: true,
//             confirmButtonColor: '#3085d6',
//             cancelButtonColor: '#d33',
//             confirmButtonText: 'Yes',
//             cancelButtonText: 'No',
//             confirmButtonClass: 'btn btn-success btn-xs',
//             cancelButtonClass: 'btn btn-danger btn-xs',
//             buttonsStyling: true,
//             reverseButtons: true,
//             customClass: 'swAlert'
//     })
// }
convertGUIDateFormat(dt) {
  var ConvDate = {};
  if (dt) {
      let DateObj = new Date(dt);
      ConvDate = {
          date: { year: DateObj.getFullYear(), month: DateObj.getMonth() + 1, day: DateObj.getDate() }
      }
  }
  return ConvDate;
}
convertDateToDBFormat(dt) {
  var stringdt = null;
  if (dt) {
      var newdate = new Date(dt);
      stringdt = moment(newdate, 'MM-DD-YYYY').format("YYYY-MM-DD");
  }
  return stringdt = stringdt == "Invalid date" ? null : stringdt;
}
}