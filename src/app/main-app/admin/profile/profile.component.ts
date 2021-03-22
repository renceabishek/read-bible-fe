import { Component, OnInit } from '@angular/core';
import { AdminService } from '../service/admin.service';

@Component({
  selector: 'app-admin-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  avatarBackGround = '../../../assets/admin/profilepic/male.jpg';
  loading = false;
  model: any = {}
  imageFile: any

  constructor(private adminService:AdminService) { }

  ngOnInit(): void {
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
    //this.base64textString.push('data:image/png;base64,' + btoa(e.target.result));
  }

  onSubmit() {
    this.loading=true;
    console.log("saving "+this.model.fullname);
    console.log("image file "+this.imageFile)
    this.loading =  false;
  }


}
