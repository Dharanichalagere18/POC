
import { Component, OnInit, ViewChild } from '@angular/core';
import { AdvancesearchComponent } from './search/advancesearch.component';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmpAddEditComponent } from './emp-add-edit/emp-add-edit.component';
import { EmployeeService } from './service/employee.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { FilterComponent } from './filter/filter.component';
import {MatTableDataSource} from '@angular/material/table';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  displayedColumns:string[] = [
    'employeeId',
    'employeeName',
    'gender',
    'age',
    'department',
    'phoneno',
    'location'

  ];
  
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

constructor(private _dialog: MatDialog,
  private _service: EmployeeService,
  private _router: Router,
  private filterComponent: FilterComponent
  ){}
  ngOnInit(): void {

    this.getEmployeeList();
    
  }


openAddEditEmpForm() {
 const dialogRef= this._dialog.open(EmpAddEditComponent);
 dialogRef.afterClosed().subscribe({
  next:(val) => {
    if(val) {
      this.getEmployeeList();
    }
  }
 })
}

getEmployeeList() {
  this._service.getEmployeeList().subscribe({
    next:(res) => {
this.dataSource=new MatTableDataSource(res);
this.dataSource.sort=this.sort;
this.dataSource.paginator=this.paginator;
    },
    error:console.log,
    });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  openFilter(){
    this._router.navigate(['/filter']);
  }

  
}
