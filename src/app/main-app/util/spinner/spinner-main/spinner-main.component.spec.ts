import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinnerMainComponent } from './spinner-main.component';

describe('SpinnerMainComponent', () => {
  let component: SpinnerMainComponent;
  let fixture: ComponentFixture<SpinnerMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SpinnerMainComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinnerMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
