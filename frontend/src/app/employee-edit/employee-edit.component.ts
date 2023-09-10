import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Employee } from '../employee.model';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css'],
})
export class EmployeeEditComponent implements OnInit {
  employeeForm: FormGroup;
  employeeId!: string; // Initialize as an empty string
  employee: Employee | null = null; // Initialize as null

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private employeeService: EmployeeService,
    private router: Router
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
    this.route.paramMap.subscribe((params) => {
      this.employeeId = params.get('id') || ''; // Ensure a default value (empty string) if it's null
      this.loadEmployee();
    });
  }

  loadEmployee(): void {
    this.employeeService.getEmployee(this.employeeId).subscribe((data) => {
      this.employee = data;
      this.employeeForm.patchValue(this.employee);
    });
  }

  onSubmit(): void {
    if (this.employeeForm.valid && this.employee) {
      this.employeeService
        .updateEmployee(this.employeeId, this.employeeForm.value)
        .subscribe(() => {
          this.router.navigate(['/']);
        });
    }
  }
}
