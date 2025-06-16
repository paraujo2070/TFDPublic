import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEditarUsuariosSistemaComponent } from './listar-editar-usuarios-sistema.component';

describe('ListarEditarUsuariosSistemaComponent', () => {
  let component: ListarEditarUsuariosSistemaComponent;
  let fixture: ComponentFixture<ListarEditarUsuariosSistemaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEditarUsuariosSistemaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEditarUsuariosSistemaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
