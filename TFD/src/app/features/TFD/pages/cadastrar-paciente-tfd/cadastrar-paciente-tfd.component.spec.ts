import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarPacienteTfdComponent } from './cadastrar-paciente-tfd.component';

describe('CadastrarPacienteTfdComponent', () => {
  let component: CadastrarPacienteTfdComponent;
  let fixture: ComponentFixture<CadastrarPacienteTfdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarPacienteTfdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarPacienteTfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
