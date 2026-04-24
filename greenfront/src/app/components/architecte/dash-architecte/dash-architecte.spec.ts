import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashArchitecte } from './dash-architecte';

describe('DashArchitecte', () => {
  let component: DashArchitecte;
  let fixture: ComponentFixture<DashArchitecte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DashArchitecte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashArchitecte);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
