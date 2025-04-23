import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JassmemoryComponent } from './jassmemory.component';

describe('JassmemoryComponent', () => {
  let component: JassmemoryComponent;
  let fixture: ComponentFixture<JassmemoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [JassmemoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JassmemoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
