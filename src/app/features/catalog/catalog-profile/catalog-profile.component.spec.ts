import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogProfileComponent } from './catalog-profile.component';

describe('CatalogProfileComponent', () => {
  let component: CatalogProfileComponent;
  let fixture: ComponentFixture<CatalogProfileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogProfileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
