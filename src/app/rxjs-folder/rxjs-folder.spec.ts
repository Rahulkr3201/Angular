import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RxjsFolder } from './rxjs-folder';

describe('RxjsFolder', () => {
  let component: RxjsFolder;
  let fixture: ComponentFixture<RxjsFolder>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RxjsFolder]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RxjsFolder);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
