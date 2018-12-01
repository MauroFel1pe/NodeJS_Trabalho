import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastrarEquipeComponent } from './equipe.component';

describe('CadastrarEquipeComponent', () => {
  let component: CadastrarEquipeComponent;
  let fixture: ComponentFixture<CadastrarEquipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastrarEquipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastrarEquipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
