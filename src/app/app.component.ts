import { Component, OnInit } from '@angular/core';
import { Employee } from './employee';
import { EmployeeService } from './employee.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { NgForm } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = "employeemanager"
  public employees: Employee[];
  public editEmployee: Employee;
  public deleteEmployee: Employee;
  constructor(private employeeService: EmployeeService,
    public dialog: MatDialog){ }
  ngOnInit(): void {
    this.getEmployees();
  }
  getEmployees(): void{
    this.employeeService.getEmployees().subscribe(
      (response: Employee[])=>{
        this.employees=response;
      },
      (error: HttpErrorResponse)=>{
        alert(error.message);
      }

    );
  }
  onAddEmloyee(addForm: NgForm){

    this.employeeService.addEmployee(addForm.value).subscribe(
      (response: Employee)=>{
        addForm.reset();
        this.getEmployees();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
        addForm.reset();
      }
    ); 
  }
  onUpdateEmloyee(employee: Employee){

    this.employeeService.updateEmployee(employee).subscribe(
      (response: Employee)=>{
        this.getEmployees();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    );
    
  }
  onDeleteEmloyee(employeeid:number){
    this.employeeService.deleteEmployee(employeeid).subscribe(
      (response:void)=>{
        console.log(response);
        this.getEmployees();
      },
      (error:HttpErrorResponse)=>{
        alert(error.message);
      }
    )
  }
  searchEmployee(key: string):void{
    const searchresults: Employee[]=[];
    // const regex = new RegExp("^"+key.toUpperCase())
    for(const employee of this.employees){
        // if(regex.test(employee.name.toUpperCase())
        // ||regex.test(employee.email.toUpperCase())
        // ||regex.test(employee.jobTitle.toUpperCase())
        // ||regex.test(employee.phone.toUpperCase()))
        if(employee.name.toLowerCase().indexOf(key.toLowerCase())!==-1||
        employee.email.toLowerCase().indexOf(key.toLowerCase())!==-1||
        employee.jobTitle.toLowerCase().indexOf(key.toLowerCase())!==-1||
        employee.phone.toLowerCase().indexOf(key.toLowerCase())!==-1){
            searchresults.push(employee);
        }
      }
        this.employees=searchresults;
        if(!key){
          this.getEmployees();
        }
  } 
  
}

