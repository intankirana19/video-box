import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyRouteComponent } from './empty-route.component';

describe('EmptyRouteComponent', () => {
  let component: EmptyRouteComponent;
  let fixture: ComponentFixture<EmptyRouteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EmptyRouteComponent]
    });
    fixture = TestBed.createComponent(EmptyRouteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
