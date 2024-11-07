import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ElementPanelComponent } from './element-panel.component';

describe('ElementPanelComponent', () => {
  let component: ElementPanelComponent;
  let fixture: ComponentFixture<ElementPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ElementPanelComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ElementPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
