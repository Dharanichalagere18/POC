import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { EmployeeService } from '../service/employee.service';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-emp-add-edit',
  templateUrl: './emp-add-edit.component.html',
  styleUrls: ['./emp-add-edit.component.scss']
})
export class EmpAddEditComponent {

  s:EmployeeService
  empForm :FormGroup

department:string [] = [
  'Admin',
  'IT',
  'Delivery',
  'HR',
  'Sales'
  
];

constructor (private _fb: FormBuilder , 
 private service: EmployeeService,
  private _dialogRef: MatDialogRef<EmpAddEditComponent>) {
  
    this.s = service
   
  this.empForm = this._fb.group({
    employeeName: '',
    age: '',
    gender:'',
    department:'',
    phoneno:'',
    location:''
  })
}
async onFormSubmit() {
  if(this.empForm.valid) {
   (await this.s.addEmployee(this.empForm.value)).subscribe({
    next: (val:any) =>{
      alert('Employee added successfully');
      this._dialogRef.close(true);
    },
    error:(err:any) => {
      console.error(err);
    }
   })
  }
}
}
