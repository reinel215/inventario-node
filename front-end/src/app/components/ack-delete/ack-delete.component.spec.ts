import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AckDeleteComponent } from './ack-delete.component';

describe('AckDeleteComponent', () => {
  let component: AckDeleteComponent;
  let fixture: ComponentFixture<AckDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AckDeleteComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AckDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
