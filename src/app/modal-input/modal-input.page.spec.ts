import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ModalInputPage } from './modal-input.page';

describe('ModalInputPage', () => {
  let component: ModalInputPage;
  let fixture: ComponentFixture<ModalInputPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalInputPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ModalInputPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
