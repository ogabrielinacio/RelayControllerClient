import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SendRecoveryPasswordComponent } from './send-recovery-password.component';

describe('SendRecoveryPasswordComponent', () => {
  let component: SendRecoveryPasswordComponent;
  let fixture: ComponentFixture<SendRecoveryPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SendRecoveryPasswordComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SendRecoveryPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
