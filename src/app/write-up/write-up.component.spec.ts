import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WriteUpComponent } from './write-up.component';

describe('WriteUpComponent', () => {
  let component: WriteUpComponent;
  let fixture: ComponentFixture<WriteUpComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WriteUpComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WriteUpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
