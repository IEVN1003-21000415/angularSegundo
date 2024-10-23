import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Recistencias2Component } from './recistencias2.component';

describe('Recistencias2Component', () => {
  let component: Recistencias2Component;
  let fixture: ComponentFixture<Recistencias2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Recistencias2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Recistencias2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
