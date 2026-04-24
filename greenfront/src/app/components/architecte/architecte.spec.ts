import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Architecte } from './architecte';

describe('Architecte', () => {
  let component: Architecte;
  let fixture: ComponentFixture<Architecte>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Architecte]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Architecte);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
