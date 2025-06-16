import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarEditarViagemHemodialiseComponent } from './listar-editar-viagem-hemodialise.component';

describe('ListarEditarViagemHemodialiseComponent', () => {
  let component: ListarEditarViagemHemodialiseComponent;
  let fixture: ComponentFixture<ListarEditarViagemHemodialiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListarEditarViagemHemodialiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarEditarViagemHemodialiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
