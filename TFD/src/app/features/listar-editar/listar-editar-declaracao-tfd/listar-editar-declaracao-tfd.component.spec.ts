import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEditarDeclaracaoTfdComponent } from './listar-editar-declaracao-tfd.component';

describe('ListarEditarDeclaracaoTfdComponent', () => {
  let component: ListarEditarDeclaracaoTfdComponent;
  let fixture: ComponentFixture<ListarEditarDeclaracaoTfdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEditarDeclaracaoTfdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEditarDeclaracaoTfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
