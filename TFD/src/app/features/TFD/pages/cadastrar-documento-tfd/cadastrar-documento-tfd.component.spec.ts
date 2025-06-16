import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarDocumentoTfdComponent } from './cadastrar-documento-tfd.component';

describe('CadastrarDocumentoTfdComponent', () => {
  let component: CadastrarDocumentoTfdComponent;
  let fixture: ComponentFixture<CadastrarDocumentoTfdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CadastrarDocumentoTfdComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CadastrarDocumentoTfdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
