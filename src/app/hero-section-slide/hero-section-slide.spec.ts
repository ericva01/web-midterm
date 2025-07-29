import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeroSectionSlide } from './hero-section-slide';

describe('HeroSectionSlide', () => {
  let component: HeroSectionSlide;
  let fixture: ComponentFixture<HeroSectionSlide>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeroSectionSlide]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeroSectionSlide);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
