import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverArchiveMenuPage } from './popover-archive-menu.page';

describe('PopoverArchiveMenuPage', () => {
  let component: PopoverArchiveMenuPage;
  let fixture: ComponentFixture<PopoverArchiveMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverArchiveMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverArchiveMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
