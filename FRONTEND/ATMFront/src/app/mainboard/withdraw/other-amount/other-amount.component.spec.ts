import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherAmountComponent } from './other-amount.component';

describe('OtherAmountComponent', () => {
  let component: OtherAmountComponent;
  let fixture: ComponentFixture<OtherAmountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherAmountComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherAmountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
