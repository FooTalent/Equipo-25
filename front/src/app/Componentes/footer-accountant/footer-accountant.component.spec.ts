import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterAccountantComponent } from './footer-accountant.component';

describe('FooterAccountantComponent', () => {
  let component: FooterAccountantComponent;
  let fixture: ComponentFixture<FooterAccountantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterAccountantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterAccountantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
