import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReportsePage } from './reportse.page';

describe('ReportsePage', () => {
  let component: ReportsePage;
  let fixture: ComponentFixture<ReportsePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReportsePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
