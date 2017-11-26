import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarMissaoComponent } from './listar-missao.component';

describe('ListarMissaoComponent', () => {
  let component: ListarMissaoComponent;
  let fixture: ComponentFixture<ListarMissaoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListarMissaoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListarMissaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
