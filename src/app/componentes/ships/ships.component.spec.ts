
import { StarwarsService } from './../../starwars.service';
import { LoginService } from 'src/app/login.service';
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ShipsComponent } from './ships.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';
import { StarwarsTestService } from 'src/app/testing/starWarsHttp.test';


describe('Ship List', () =>  {
  let fixture: ComponentFixture<ShipsComponent>;
  let component: ShipsComponent;
  let starwarsService: StarwarsService;

  beforeEach(waitForAsync( () => {
    TestBed.configureTestingModule({
      declarations: [ ShipsComponent ],
        providers: [
        {provide: StarwarsService, useClass: StarwarsTestService}
       ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    starwarsService = TestBed.inject(StarwarsService);
  });

  it('crear componente', () => {
    expect(component).toBeDefined();
    expect(component).toBeInstanceOf(ShipsComponent);
  });

  it('Comprobar si API Ships retorna datos', () => {
    //component.getdata();
    spyOn(starwarsService, 'getShips').and.callThrough();
    expect(component.ships.length).toBeGreaterThan(0);
  });

});
