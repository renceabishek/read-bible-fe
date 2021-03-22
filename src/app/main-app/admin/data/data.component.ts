import { formatDate } from '@angular/common';
import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, ValidatorFn, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarConfig, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ApiError } from 'src/app/model/ApiError';
import { ApiErrorResponse } from 'src/app/model/ApiErrorResponse';
import { AutoCompleteDialogComponent } from 'src/app/util/auto-complete-dialog/auto-complete-dialog.component';
import { SpinnerService } from '../../service/spinner.service';
import { DailyData } from '../model/DailyData';
import { NameModel } from '../model/NameModel';
import { AdminService } from '../service/admin.service';
import { BibledataService } from '../service/bibledata.service';
import { DatatableComponent } from './datatable/datatable.component';

@Component({
  selector: 'app-admin-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.css']
})
export class DataComponent implements OnInit {

  listOfBooks: string[] = [
    'Genesis', 'Exodus', 'Leviticus', 'Numbers', 'Deuteronomy', 'Joshua', 'Judges', 'Ruth', '1 Samuel', '2 Samuel',
    '1 Kings', '2 Kings', '1 Chronicles', '2 Chronicles', 'Ezra', 'Nehemiah', 'Esther', 'Job', 'Psalms', 'Proverbs', 'Ecclesiastes',
    'Song of Solomon', 'Isaiah', 'Jeremiah', 'Lamentations', 'Ezekiel', 'Daniel', 'Hosea', 'Joel', 'Amos', 'Obadiah', 'Jonah',
    'Micah', 'Nahum', 'Habakkuk', 'Zephaniah', 'Haggai', 'Zechariah', 'Malachi',
    'Matthew','Mark','Luke','John','Acts of the Apostles','Romans','1 Corinthians','2 Corinthians',
    'Galatians','Ephesians','Philippians','Colossians','1 Thessalonians','2 Thessalonians',
    '1 Timothy','2 Timothy','Titus','Philemon','Hebrews','James','1 Peter','2 Peter',
    '1 John','2 John','3 John','Jude','Revelation'];


  dataForm: FormGroup
  nameData: NameModel[] = [];
  filteredNames: Observable<NameModel[]>;
  filteredBooks: Observable<string[]>;

  @ViewChild(DatatableComponent, { static: true }) child: DatatableComponent;
  @ViewChild(FormGroupDirective, { static: true }) form: FormGroupDirective;

  constructor(private formBuilder: FormBuilder, private bibleDataService: BibledataService,
    private adminService:AdminService, public dialog: MatDialog, public snackBar: MatSnackBar,
    private spinnerService: SpinnerService) { }

  ngOnInit(): void {
    this.dataForm = this.formBuilder.group({
      date: ['', Validators.required],
      name: ['', Validators.required],
      books: ['', Validators.required],
      chapter: ['', [Validators.required, this.checkChapterWithBible()]],
      fromVerse: ['', [Validators.required, this.checkVersesWithBible()]],
      toVerse: ['', [Validators.required, this.checkVersesWithBible()]]
    }, {
      validators: [
        VerseCheck('fromVerse', 'toVerse')
      ]
    });

    this.dataForm.controls.date.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));


    this.adminService.getProfiles().subscribe(data => {
      this.nameData = data;
      this.filteredNames = this.dataForm.controls['name'].valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterName(value))
        );
    });

    this.filteredBooks = this.dataForm.controls['books'].valueChanges
      .pipe(
        startWith(''),
        map(value => this._filterBook(value))
      );

  }

  private _filterName(value: string): NameModel[] {
    if (value != null) {
      return this.nameData
        .filter(option => option.name.toLowerCase().includes(value));

    }
  }

  private _filterBook(value: string): string[] {
    if (value != null) {
      const filterValue = value.toLowerCase();
      return this.listOfBooks.filter(option => option.toLowerCase().includes(filterValue));
    }
  }

  // convenience getter for easy access to form fields
  get f() { return this.dataForm.controls; }


  public errorHandling = (control: string, error: string) => {
    if (control == "toVerseGreater") {
      if (this.dataForm.controls.toVerse.errors != null &&
        this.dataForm.controls.toVerse.errors.mustMatch) {
        return true;
      } else {
        return false;
      }
    }
    if (control == "chapterBelong") {
      if (this.dataForm.controls.chapter.errors != null &&
        this.dataForm.controls.chapter.errors.chapterBelong) {
        return true;
      } else {
        return false;
      }
    }
    if (control == "verseBelong") {
      if ((this.dataForm.controls.fromVerse.errors != null &&
        this.dataForm.controls.fromVerse.errors.verseBelong)
        ||
        (this.dataForm.controls.toVerse.errors != null &&
          this.dataForm.controls.toVerse.errors.verseBelong)) {
        return true;
      } else {
        return false;
      }
    }
    return this.dataForm.controls[control].hasError(error);
  }


  // Dealing with custom validation for chapters, fromverse and toverse

  totalChapters: number
  totalToVerse: number
  selectedBookToCheck: any;
  selectedNameToCheck: any;

  selectBook(fname): void {    
    this.selectedBookToCheck = fname;
    this.totalChapters = this.bibleDataService.getBibleTotalChapter(fname);
  }

  selectName(fname): void {
    console.log("selection "+fname.name);
    this.selectedNameToCheck = fname;
    this.nameUniqueId = fname.uniqueId;
  }

  toSetToVerse(): void {
    this.totalToVerse = this.bibleDataService
      .getBibleToVerse(this.dataForm.get('books').value, this.dataForm.controls.chapter.value)
      console.log("checking.. "+this.totalToVerse)
  }

  checkSelectedBook() {
    if (!this.selectedBookToCheck || this.selectedBookToCheck !== this.dataForm.controls['books'].value) {
      this.dataForm.controls['books'].setValue(null);
      this.dataForm.get('books').setValue('');
      this.selectedBookToCheck = '';
    }
  }
  
  checkChapterWithBible(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = this.totalChapters < control.value;
      return forbidden ? { 'chapterBelong': { value: control.value } } : null;
    };
  }

  checkVersesWithBible(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = this.totalToVerse < control.value;
      return forbidden ? { 'verseBelong': { value: control.value } } : null;
    };
  }


  // To be used in displying names in autocomplete component
  displayFn(project): string {
    console.log("what is project "+project)
    if(project==null || project.name==null){
      return project;
    }
    if(project.name!=null) {
      return project.name
    }

  }

  public numberValidator(event) {
    const allowedRegex = /[0-9]/g;

    if (!event.key.match(allowedRegex)) {
      event.preventDefault();
    }
  }

  actionButtonLabel: string = 'Ok';
  action: boolean = true;
  setAutoHide: boolean = true;
  autoHide: number = 3000;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  addExtraClass: boolean = false;

  successSnackBar(message: string) {

    let config = new MatSnackBarConfig();
    config.verticalPosition = this.verticalPosition;
    config.horizontalPosition = this.horizontalPosition;
    config.duration = this.setAutoHide ? this.autoHide : 0;
    config.panelClass = ['success-snapbar']
    this.snackBar.open(message, this.action ? this.actionButtonLabel : undefined, config);
  }

  name = '';
  openNameDialog(): void {
    const dialogRef = this.dialog.open(AutoCompleteDialogComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      data: { name: this.name, animal: "" }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');

    });
  }

  uniqueId: any;
  nameUniqueId: string;
  saveUP = false;
  crudFlag: String;
  submitted = false;

  selectRowValue(dailyData: DailyData) {
    this.dataForm.controls.chapter.setValue(dailyData.chapter);
    this.dataForm.controls.fromVerse.setValue(dailyData.fromVerse);
    this.dataForm.controls.toVerse.setValue(dailyData.toVerse);
    this.dataForm.controls.date.setValue(formatDate(dailyData.date, 'yyyy-MM-dd', 'en'));
    this.dataForm.get('books').setValue(dailyData.book);
    console.log("purname -- "+dailyData.pureName)
    console.log("name--- "+dailyData.name)
    let nameModel: NameModel = {
      name: dailyData.pureName,
      uniqueId: dailyData.name
    }
    this.dataForm.get('name').setValue(nameModel);
    this.nameUniqueId = dailyData.name;
    this.saveUP = true;
    this.uniqueId = dailyData.uniqueId;
  }


  onSave() {
    if (this.crudFlag == "delete") {
      console.log("delete or clear")
      this.submitted = false;
      this.crudFlag = "";
      return;
    }

    this.submitted = true;
    if (this.dataForm.invalid) {
      console.log("form vali")
      return;
    }
    this.spinnerService.show();
    if (this.saveUP == true) {
      return this.onUpdate();
    }

    var createDailyData = <DailyData>{
      name: this.nameUniqueId,
      pureName: this.dataForm.get('name').value.name,
      date: formatDate(this.dataForm.controls.date.value, 'yyyy-MM-dd', 'en'),
      book: this.dataForm.get('books').value,
      chapter: this.dataForm.controls.chapter.value,
      fromVerse: this.dataForm.controls.fromVerse.value,
      toVerse: this.dataForm.controls.toVerse.value,
      uniqueId: ""
    };

    this.adminService.postBibleInfo(createDailyData)
      .subscribe(data => {
        createDailyData.uniqueId = data;
        this.child.saveRowValues(createDailyData);
        this.onReset();
        this.spinnerService.hide();
        this.successSnackBar("Details Saved Successfully!");
      }, err => {
        let errorResponse = err as ApiErrorResponse
        let error = JSON.parse(err.error) as ApiError;

        if (errorResponse.status == 500) {
          this.spinnerService.hide();
        this.successSnackBar("There is a problem in server! Kindly report to admin");
        } else if (errorResponse.status == 400 && error.errorCode == 4100) {
          
        }
      });

  }

  onUpdate(): void {
    var createDailyData = <DailyData>{
      name: this.nameUniqueId,
      date: formatDate(this.dataForm.controls.date.value, 'yyyy-MM-dd', 'en'),
      book: this.dataForm.get('books').value,
      chapter: this.dataForm.controls.chapter.value,
      fromVerse: this.dataForm.controls.fromVerse.value,
      toVerse: this.dataForm.controls.toVerse.value,
      pureName: this.dataForm.get('name').value.name
    };

    this.adminService.putBibleInfo(createDailyData, this.uniqueId)
      .subscribe(data => {
        this.child.UpdateRowValues(createDailyData, this.uniqueId);        
        this.onReset();
        this.spinnerService.hide();
        this.successSnackBar("Details Uploaded Successfully!");
      })
  }

  onReset() {
    this.submitted = false;
    this.uniqueId = "";
    this.crudFlag = "clear";
    // this.dataForm.controls.chapter.setValue('');
    // this.dataForm.controls.fromVerse.setValue('');
    // this.dataForm.controls.toVerse.setValue('');
    // this.dataForm.get('books').setValue('');
    // this.dataForm.get('name').setValue('');
    this.form.resetForm();
    this.dataForm.get('name').setValue('');
    this.dataForm.get('books').setValue('');
    this.dataForm.controls.date.setValue(formatDate(new Date(), 'yyyy-MM-dd', 'en'));
    this.saveUP = false

  }

  onDeleteRows(): void {
    this.crudFlag = "delete";
    if (this.uniqueId.length > 0) {
      this.spinnerService.show();
      this.adminService.deleteBibleInfo(this.uniqueId)
        .subscribe(data => {
          this.child.deleteRowValues(this.uniqueId)
          this.onReset();
          this.spinnerService.hide();
          this.successSnackBar("Details deleted Successfully!");
        })
    }
  }


}

export function VerseCheck(controlName: string, matchingControlName: string) {
  return (formGroup: FormGroup) => {
    const control = formGroup.controls[controlName];
    const matchingControl = formGroup.controls[matchingControlName];

    if (matchingControl.errors && !matchingControl.errors.mustMatch) {
      // return if another validator has already found an error on the matchingControl
      return;
    }

    // set error on matchingControl if validation fails
    if (parseFloat(control.value) > parseFloat(matchingControl.value)) {
      matchingControl.setErrors({ mustMatch: true });
    } else {
      matchingControl.setErrors(null);
    }
  }

}