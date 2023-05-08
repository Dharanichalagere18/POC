import { Component, OnInit ,Inject} from '@angular/core';
import { EmployeeService } from '../service/employee.service';
import { HttpClient ,HttpParams} from '@angular/common/http';
import { FormBuilder,FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {MatTableDataSource, MatTableDataSourcePaginator} from '@angular/material/table';
import { Observable } from 'rxjs';
import { api_url } from 'src/config';
@Component({
  selector: 'app-filter',
   templateUrl: './filter.component.html',
   styleUrls: ['./filter.component.scss']
 
})

export class FilterComponent {
  searchData = {employeeName: '', gender: '', age: '', department: '',phoneno:'',location:'' };
apiurl=api_url;
  filteredEmployee: any[] = [];
  employeesList$!:  Observable<any>

  
  constructor(private http: HttpClient, private EmployeesApiService: EmployeeService) {}

   ngOnInit() {

    this.employeesList$ = this.EmployeesApiService.getEmployeeList();
    
    this.employeesList$.subscribe(employees => this.filteredEmployee = employees);
  
    }
    onSubmit() {
       if (this.searchData.employeeName || this.searchData.gender || this.searchData.age || this.searchData.department||this.searchData.phoneno||this.searchData.location) {
      
    const url = this.apiurl+`/Employee/search`;
      
      const params = new HttpParams()
      .set('employeeName', this.searchData.employeeName)     
       .set('gender', this.searchData.gender)     
       .set('age', this.searchData.age)    
      .set('department', this.searchData.department)
      .set('phoneno', this.searchData.phoneno)
      .set('location', this.searchData.location)
     this.http.get(url, { params }).subscribe((data: any) => {      
       this.filteredEmployee = data;    
       });     
      } else {     
       this.employeesList$.subscribe  (employee=>  this.filteredEmployee = employee);
        
      
      }

       }

}
