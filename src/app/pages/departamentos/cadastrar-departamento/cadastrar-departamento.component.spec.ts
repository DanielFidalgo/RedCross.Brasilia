import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarDepartamentoComponent } from './cadastrar-departamento.component';

describe('CadastrarDepartamentoComponent', () => {
  let component: CadastrarDepartamentoComponent;
  let fixture: ComponentFixture<CadastrarDepartamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarDepartamentoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarDepartamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
