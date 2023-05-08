import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { api_url } from 'src/config';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http: HttpClient) { }
/// api declared here
    apiurl=api_url;


   async addEmployee(data: any): Promise<Observable<any>> {
     const httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json' }) };
     const response = this.http.post<any>(this.apiurl+'/EmployeeDBs', JSON.stringify(data), httpOptions)
      return response
     }
  
    
  
  
  getEmployeeList(): Observable<any> {
  
   return this.http.get(this.apiurl+'/EmployeeDBs');
  
  }
  
  
  
  
  updateEmployee(employee_Id: number, data: any): Observable<any> {
  
  return this.http.put(this.apiurl+`/EmployeeDBs/${employee_Id}`, data);
  
  }
  
  
  
  
  deleteEmployee(employee_Id: number): Observable<any> {
  
 return this.http.delete(this.apiurl+`/EmployeeDBs/${employee_Id}`);
  
   }

   
   private apiUrl = (this.apiurl+'/Employee/search');
   searchEmployees(employeeName: string, gender: string, age: number, department: string, phoneno: string, location: string) {
     const params = {
       employeeName: employeeName,
       gender: gender,
       age: age.toString(),
       department: department,
       phoneno: phoneno,
       location: location
     };
     return this.http.get<any[]>(this.apiUrl, { params });
   }
 }
 
  
