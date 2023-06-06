import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCafeteriaCrearComponent } from './admin-cafeteria-crear.component';

describe('AdminCafeteriaCrearComponent', () => {
  let component: AdminCafeteriaCrearComponent;
  let fixture: ComponentFixture<AdminCafeteriaCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCafeteriaCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCafeteriaCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
