import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarViagemTFDComponent } from './cadastrar-viagem-tfd.component';

describe('CadastrarViagemTFDComponent', () => {
  let component: CadastrarViagemTFDComponent;
  let fixture: ComponentFixture<CadastrarViagemTFDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarViagemTFDComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarViagemTFDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
