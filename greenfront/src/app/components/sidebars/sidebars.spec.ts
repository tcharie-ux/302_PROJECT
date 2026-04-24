import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sidebars } from './sidebars';

describe('Sidebars', () => {
  let component: Sidebars;
  let fixture: ComponentFixture<Sidebars>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Sidebars]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sidebars);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
