import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchRutasComponent } from './search-rutas.component';

describe('SearchRutasComponent', () => {
  let component: SearchRutasComponent;
  let fixture: ComponentFixture<SearchRutasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchRutasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchRutasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
