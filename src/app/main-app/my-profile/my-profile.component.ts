import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.css']
})
export class MyProfileComponent implements OnInit {

  profileForm: FormGroup
  avatarBackGround = '../../../assets/admin/profilepic/male.jpg';
  loading = false;
  model: any = {}
  imageFile: any

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.profileForm = this.formBuilder.group({
      name: ['', Validators.required],
      dob: [''],
      username: [{value: '', disabled: true}],
      email: [{value: '', disabled: true}]
    });
  }

  public errorHandling = (control: string, error: string) => {
    if (control == "name") {
      if (this.profileForm.controls.name.errors != null) {
        return true;
      } else {
        return false;
      }
    }
    return this.profileForm.controls[control].hasError(error);
  }

  changePicture(evt: any) {
    const file = evt.target.files[0];

    if (file) {
      const reader = new FileReader();
      console.log('file is available ' + file)
      reader.readAsDataURL(file);
      reader.onload = this.handleReaderLoaded.bind(this);
      this.imageFile = file;
    }
  }

  handleReaderLoaded(e) {
    this.avatarBackGround = e.target.result;
    console.log("files "+e.target.result)
  }

  onSave(): void {

  }

}
