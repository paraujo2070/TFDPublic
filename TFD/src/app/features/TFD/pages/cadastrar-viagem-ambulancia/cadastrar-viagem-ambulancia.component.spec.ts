import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarViagemAmbulanciaComponent } from './cadastrar-viagem-ambulancia.component';

describe('CadastrarViagemAmbulanciaComponent', () => {
  let component: CadastrarViagemAmbulanciaComponent;
  let fixture: ComponentFixture<CadastrarViagemAmbulanciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarViagemAmbulanciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarViagemAmbulanciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
