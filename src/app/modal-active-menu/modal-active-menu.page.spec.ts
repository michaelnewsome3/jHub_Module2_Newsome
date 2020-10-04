import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalActiveMenuPage } from './modal-active-menu.page';

describe('ModalActiveMenuPage', () => {
  let component: ModalActiveMenuPage;
  let fixture: ComponentFixture<ModalActiveMenuPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalActiveMenuPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalActiveMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
