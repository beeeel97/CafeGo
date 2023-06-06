import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminUsuarioCrearComponent } from './admin-usuario-crear.component';

describe('AdminUsuarioCrearComponent', () => {
  let component: AdminUsuarioCrearComponent;
  let fixture: ComponentFixture<AdminUsuarioCrearComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminUsuarioCrearComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminUsuarioCrearComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
