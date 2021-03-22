import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { NameModel } from '../admin/model/NameModel';
import { AdminService } from '../admin/service/admin.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.css']
})
export class SettingComponent implements OnInit {

  settingForm: FormGroup;
  avatarBackGround = '../../../assets/admin/profilepic/male.jpg';
  loading = false;
  model: any = {}
  imageFile: any
  selectedNameToCheck: any;
  nameUniqueId: string;
  filteredNames: Observable<NameModel[]>;
  nameData: NameModel[] = [];

  constructor(private formBuilder: FormBuilder, private adminService:AdminService) { }

  ngOnInit(): void {

    this.settingForm = this.formBuilder.group({
      name: ['', Validators.required]
    });
  

    this.adminService.getProfiles().subscribe(data => {
      this.nameData = data;
      this.filteredNames = this.settingForm.controls['name'].valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterName(value))
        );
    });
  }

  selectName(fname): void {
    console.log("selection "+fname.name);
    this.selectedNameToCheck = fname;
    this.nameUniqueId = fname.uniqueId;
  }

  private _filterName(value: string): NameModel[] {
    if (value != null) {
      return this.nameData
        .filter(option => option.name.toLowerCase().includes(value));

    }
  }

  public errorHandling = (control: string, error: string) => {
    if (control == "name") {
      if (this.settingForm.controls.name.errors != null) {
        return true;
      } else {
        return false;
      }
    }
    return this.settingForm.controls[control].hasError(error);
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

}
