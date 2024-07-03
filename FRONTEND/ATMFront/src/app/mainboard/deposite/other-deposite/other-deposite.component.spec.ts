import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OtherDepositeComponent } from './other-deposite.component';

describe('OtherDepositeComponent', () => {
  let component: OtherDepositeComponent;
  let fixture: ComponentFixture<OtherDepositeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OtherDepositeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OtherDepositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
