import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { EmpAddEditComponent } from '../emp-add-edit/emp-add-edit.component';
import { EmployeeService } from '../service/employee.service';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { FilterComponent } from '../filter/filter.component';
import {MatTableDataSource} from '@angular/material/table';
import {HttpClient} from '@angular/common/http'

@Component({
  selector: 'app-advancesearch',
  templateUrl: './advancesearch.component.html',
  styleUrls: ['./advancesearch.component.scss']
})
export class AdvancesearchComponent implements OnInit{

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
  private http: HttpClient,
  private _service: EmployeeService,
  private _router: Router,
  private filterComponent: FilterComponent
  ){}


  ngOnInit(): void {

    this.getEmployeeList();
    
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
 
}
