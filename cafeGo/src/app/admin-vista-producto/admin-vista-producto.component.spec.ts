import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVistaProductoComponent } from './admin-vista-producto.component';

describe('AdminVistaProductoComponent', () => {
  let component: AdminVistaProductoComponent;
  let fixture: ComponentFixture<AdminVistaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVistaProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVistaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
