import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCrearProductoComponent } from './admin-crear-producto.component';

describe('AdminCrearProductoComponent', () => {
  let component: AdminCrearProductoComponent;
  let fixture: ComponentFixture<AdminCrearProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCrearProductoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminCrearProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
