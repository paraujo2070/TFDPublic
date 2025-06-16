import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RelatorioPagamentoTfdComponent } from './relatorio-pagamento-tfd.component';

describe('RelatorioPagamentoTfdComponent', () => {
  let component: RelatorioPagamentoTfdComponent;
  let fixture: ComponentFixture<RelatorioPagamentoTfdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RelatorioPagamentoTfdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RelatorioPagamentoTfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
