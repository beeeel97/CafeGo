import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVistaUsuarioComponent } from './admin-vista-usuario.component';

describe('AdminVistaUsuarioComponent', () => {
  let component: AdminVistaUsuarioComponent;
  let fixture: ComponentFixture<AdminVistaUsuarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVistaUsuarioComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminVistaUsuarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
