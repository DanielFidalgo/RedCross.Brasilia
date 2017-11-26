import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarMissaoComponent } from './cadastrar-missao.component';

describe('CadastrarMissaoComponent', () => {
  let component: CadastrarMissaoComponent;
  let fixture: ComponentFixture<CadastrarMissaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarMissaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarMissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
