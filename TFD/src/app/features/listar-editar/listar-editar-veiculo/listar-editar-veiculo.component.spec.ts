import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEditarVeiculoComponent } from './listar-editar-veiculo.component';

describe('ListarEditarVeiculoComponent', () => {
  let component: ListarEditarVeiculoComponent;
  let fixture: ComponentFixture<ListarEditarVeiculoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEditarVeiculoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEditarVeiculoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
