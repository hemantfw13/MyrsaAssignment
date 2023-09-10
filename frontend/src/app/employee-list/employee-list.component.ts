import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms'; // Import FormsModule

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = [];
  searchName = '';
  filteredEmployees: Employee[] = []; // New property for filtered employees

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
        this.loadEmployees(); // Reload the list after deletion
      });
    }
  }
  // New function to handle search
  searchEmployees(): void {
    if (this.searchName) {
      // Filter employees based on the search keyword
      this.filteredEmployees = this.employees.filter((employee) =>
        employee.name.toLowerCase().includes(this.searchName.toLowerCase())
      );
    } else {
      // If search input is empty, reset the filtered list to all employees
      this.filteredEmployees = [...this.employees];
    }
  }
}
