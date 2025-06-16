import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEditarViagemExtraComponent } from './listar-editar-viagem-extra.component';

describe('ListarEditarViagemExtraComponent', () => {
  let component: ListarEditarViagemExtraComponent;
  let fixture: ComponentFixture<ListarEditarViagemExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEditarViagemExtraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEditarViagemExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
