import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { Router } from '@angular/router';

@Component({
  selector: 'app-crear-productos',
  templateUrl: './crear-productos.component.html',
  styleUrls: ['./crear-productos.component.css']
})
export class CrearProductosComponent implements OnInit {

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router

  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      name: ['', Validators.required ],
      description: [''],
      price: [0, Validators.required ],
      unit: [''],
      image: ['', Validators.required ]
    });
  }


  onCreateProduct() {
    
  }

  onCancel() {
    this.form.reset();
  }



}
