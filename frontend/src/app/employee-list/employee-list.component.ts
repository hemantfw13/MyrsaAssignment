import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; 

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  searchName = '';
  filteredEmployees: Employee[] = []; 

  constructor(
    private employeeService: EmployeeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.employees = data;
    });
  }

  deleteEmployee(id: string): void {
    this.employeeService.deleteEmployee(id).subscribe(() => {
      this.loadEmployees();
    });
  }

  editEmployee(employeeId: string) {
    this.router.navigate(['/employee-edit', employeeId]);
  }

  deleteAllEmployees(): void {
    if (confirm('Are you sure you want to delete all employees?')) {
      this.employeeService.deleteAllEmployees().subscribe(() => {
        this.loadEmployees(); 
      });
    }
  }
  searchEmployees(): void {
    if (this.searchName) {
      this.filteredEmployees = this.employees.filter((employee) =>
        employee.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
    } else {
      this.filteredEmployees = [...this.employees];
    }
  }
}
