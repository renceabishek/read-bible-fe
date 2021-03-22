import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Environment } from 'src/app/model/Environment';
import { DailyData } from '../model/DailyData';
import { ProfileModel } from '../model/ProfileModel';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  //private readonly environtmentURL ="http://localhost:8082/";
  private readonly environtmentURL = "https://read-bible-service.herokuapp.com/";

  constructor(private http: HttpClient) { }

  public getProfiles(): Observable<ProfileModel[]> {
    return this.http.get<ProfileModel[]>(this.environtmentURL+'api/admin/profile');
  }

  public viewBibleInfo(): Observable<DailyData[]> {
    return this.http.get<DailyData[]>(this.environtmentURL+'api/admin/data');
  }

  public postBibleInfo(dailyData): Observable<any> {
    return this.http.post(this.environtmentURL+'api/admin/data', dailyData, { responseType: 'text' });
  }

  public putBibleInfo(dailyData, uniqueId): Observable<any> {
    return this.http.put(this.environtmentURL+'api/admin/data/' + uniqueId, dailyData, { responseType: 'text' });
  }

  public deleteBibleInfo(uniqueId): Observable<any> {
    return this.http.delete<any>(this.environtmentURL+'api/admin/data' + uniqueId);
  }
}
