import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-request',
  templateUrl: './create-request.component.html',
  styleUrls: ['./create-request.component.css']
})
export class CreateRequestComponent implements OnInit {
  requestForm: FormGroup;
  constructor(private fb: FormBuilder) {
    this.requestForm = this.fb.group({
      name: '',
      dob: '',
      sex: '',
      requestFor: '',
      bloodGroup: '',
      units: '',
      location: '',
      requiredDate: ''
    });
  }

  ngOnInit() {}
  saveRequest() {
    console.log(this.requestForm.value);
  }
}
