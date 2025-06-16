import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEditarViagemAmbulanciaComponent } from './listar-editar-viagem-ambulancia.component';

describe('ListarEditarViagemAmbulanciaComponent', () => {
  let component: ListarEditarViagemAmbulanciaComponent;
  let fixture: ComponentFixture<ListarEditarViagemAmbulanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEditarViagemAmbulanciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEditarViagemAmbulanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
