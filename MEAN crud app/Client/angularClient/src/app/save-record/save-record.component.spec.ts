import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveRecordComponent } from './save-record.component';

describe('SaveRecordComponent', () => {
  let component: SaveRecordComponent;
  let fixture: ComponentFixture<SaveRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SaveRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
