import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-create',
  templateUrl: './employee-create.component.html',
  styleUrls: ['./employee-create.component.css'],
})
export class EmployeeCreateComponent {
  employeeForm: FormGroup;

  constructor(
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

  onSubmit(): void {
    if (this.employeeForm.valid) {
      this.employeeService
        .createEmployee(this.employeeForm.value)
        .subscribe(() => {
          this.router.navigate(['/']);
          window.location.reload();
        });
    }
  }
}
