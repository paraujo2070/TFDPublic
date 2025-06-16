import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarViagemHemodialiseComponent } from './cadastrar-viagem-hemodialise.component';

describe('CadastrarViagemHemodialiseComponent', () => {
  let component: CadastrarViagemHemodialiseComponent;
  let fixture: ComponentFixture<CadastrarViagemHemodialiseComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarViagemHemodialiseComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarViagemHemodialiseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
