import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PopoverActiveMenuPage } from './popover-active-menu.page';

describe('PopoverActiveMenuPage', () => {
  let component: PopoverActiveMenuPage;
  let fixture: ComponentFixture<PopoverActiveMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PopoverActiveMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PopoverActiveMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
