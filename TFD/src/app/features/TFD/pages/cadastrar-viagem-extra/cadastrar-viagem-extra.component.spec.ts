import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarViagemExtraComponent } from './cadastrar-viagem-extra.component';

describe('CadastrarViagemExtraComponent', () => {
  let component: CadastrarViagemExtraComponent;
  let fixture: ComponentFixture<CadastrarViagemExtraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarViagemExtraComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarViagemExtraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
