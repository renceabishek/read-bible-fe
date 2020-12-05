import { Injectable } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private behaviourSubject = new BehaviorSubject(null)
  validationComponentData = this.behaviourSubject.asObservable();

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { }

  public addGoogleIcons(): void {
    this.matIconRegistry.addSvgIcon(
      `google`,
      this.domSanitizer.bypassSecurityTrustResourceUrl('../../../assets/icon/google.svg')
    );
  }

  public setDataForValidationComponent(data) {
    this.behaviourSubject.next(data);
  }
}
