import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterSuperAdminComponent } from './footer-super-admin.component';

describe('FooterSuperAdminComponent', () => {
  let component: FooterSuperAdminComponent;
  let fixture: ComponentFixture<FooterSuperAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterSuperAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterSuperAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
