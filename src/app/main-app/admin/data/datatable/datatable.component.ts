import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, Inject, OnInit, Output, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DailyData } from '../../model/DailyData';
import { NameModel } from '../../model/NameModel';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-admin-data-datatable',
  templateUrl: './datatable.component.html',
  styleUrls: ['./datatable.component.css']
})
export class DatatableComponent implements OnInit {

  
  ELEMENT_DATA: DailyData[] = []
  Temp_ELEMENT_DATA: DailyData[]
  allNames: NameModel[] = [];

  displayedColumns: string[] = ['NAME', 'DATE', 'BOOKS', 'CHAPTER', 'FROM VERSE', 'TO VERSE'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

  @Output() rowValue: EventEmitter<DailyData> = new EventEmitter();

  constructor(private adminService: AdminService) {

  }

  ngOnInit() {
    this.adminService.viewBibleInfo().subscribe(data => {
      this.Temp_ELEMENT_DATA = data;
      this.adminService.getProfiles().subscribe(data1 => {
        let value: NameModel = {
          name: "All",
          uniqueId: "1000"
        }
        this.allNames.push(value)

        data1.forEach(f => {
          let value: NameModel = {
            name: f.name,
            uniqueId: f.uniqueId
          }
          this.allNames.push(value)
        })
        this.sendNameAndUniqueId(this.allNames);
      })
    })
  }

  sendNameAndUniqueId(nameModel: NameModel[]) {
    for (let i = 0; i < this.Temp_ELEMENT_DATA.length; i++) {
      let pureName = nameModel.filter(f => f.uniqueId == this.Temp_ELEMENT_DATA[i].name)
        .map(f => f.name).toString();
      this.Temp_ELEMENT_DATA[i].pureName = pureName;
    }
    this.ELEMENT_DATA=this.Temp_ELEMENT_DATA;
  }

  selectRow(row) {
    this.rowValue.emit(row);
  }

  UpdateRowValues(dailyData, uniqueId) {
    for (let i = 0; i < this.ELEMENT_DATA.length; i++) {
      if (this.ELEMENT_DATA[i].uniqueId == uniqueId) {
        this.ELEMENT_DATA[i].name = dailyData.name;
        this.ELEMENT_DATA[i].date = dailyData.date;
        this.ELEMENT_DATA[i].book = dailyData.book;
        this.ELEMENT_DATA[i].chapter = dailyData.chapter;
        this.ELEMENT_DATA[i].fromVerse = dailyData.fromVerse;
        this.ELEMENT_DATA[i].toVerse = dailyData.toVerse;
        this.ELEMENT_DATA[i].pureName = dailyData.pureName;
      }
    }

  }

  saveRowValues(dailyData) {
    console.log("values--> "+dailyData.pureName)
    this.ELEMENT_DATA.push(dailyData);
  }

  deleteRowValues(uniqueId) {
    let deldailyData: DailyData;
    for (let i = 0; i < this.ELEMENT_DATA.length; i++) {
      if (this.ELEMENT_DATA[i].uniqueId == uniqueId) {
        this.ELEMENT_DATA.splice(i, 1)
        return;
      }
    }

  }
}
