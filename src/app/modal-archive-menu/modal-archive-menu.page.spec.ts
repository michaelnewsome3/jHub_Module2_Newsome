import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalArchiveMenuPage } from './modal-archive-menu.page';

describe('ModalArchiveMenuPage', () => {
  let component: ModalArchiveMenuPage;
  let fixture: ComponentFixture<ModalArchiveMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalArchiveMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalArchiveMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
