import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEditarViagemTfdComponent } from './listar-editar-viagem-tfd.component';

describe('ListarEditarViagemTfdComponent', () => {
  let component: ListarEditarViagemTfdComponent;
  let fixture: ComponentFixture<ListarEditarViagemTfdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEditarViagemTfdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEditarViagemTfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
