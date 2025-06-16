import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEditarMotoristaComponent } from './listar-editar-motorista.component';

describe('ListarEditarMotoristaComponent', () => {
  let component: ListarEditarMotoristaComponent;
  let fixture: ComponentFixture<ListarEditarMotoristaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEditarMotoristaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEditarMotoristaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
