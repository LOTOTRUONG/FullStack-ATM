import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AuthService } from '../authentification/AuthService';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-pincode-dialog',
  templateUrl: './pincode-dialog.component.html',
  styleUrl: './pincode-dialog.component.scss'
})
export class PincodeDialogComponent implements OnInit {
  pinCode !: string;
  login !: string;
  codeForm !: FormGroup;

  constructor( private router : Router,
    public dialogRef: MatDialogRef<PincodeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: {login: string},
    private authService : AuthService,
    private fb: FormBuilder,

  ) { 
    this.login = data.login;
  }
  ngOnInit(): void {
    this.codeForm = this.fb.group({
      pinCode: ['', Validators.required]
    });
  }


  onOK(event : Event) {
    event.preventDefault();
    if (this.codeForm.invalid) {
      return;
    }
    const codePin = this.codeForm.value.pinCode;
    this.authService.login(this.login, codePin ).subscribe(
      () => {
        this.dialogRef.close(true); 
        this.router.navigate(['/mainboard']); 
      }
    );
    }
  }

