import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEditarPacienteTfdComponent } from './listar-editar-paciente-tfd.component';

describe('ListarEditarPacienteTfdComponent', () => {
  let component: ListarEditarPacienteTfdComponent;
  let fixture: ComponentFixture<ListarEditarPacienteTfdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEditarPacienteTfdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEditarPacienteTfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
