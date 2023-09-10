import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee.model';

@Component({
  selector: 'app-employee-management',
  templateUrl: './employee-management.component.html',
  styleUrls: ['./employee-management.component.css'],
})
export class EmployeeManagementComponent implements OnInit {
  employeeList: Employee[] = [];
  employeeForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private employeeService: EmployeeService
  ) {
    this.employeeForm = this.fb.group({
      name: ['', Validators.required],
      age: [null, Validators.required],
      qualification: ['', Validators.required],
      location: ['', Validators.required],
      experience: [null, Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEmployeeList();
  }

  loadEmployeeList(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employeeList = data;
    });
  }

  createEmployee(): void {
    if (this.employeeForm.valid) {
      this.employeeService
        .createEmployee(this.employeeForm.value)
        .subscribe(() => {
          // After creating the employee, reload the employee list
          this.loadEmployeeList();
          // Reset the form
          this.employeeForm.reset();
        });
    }
  }
}
