import { HtmlParser } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { Pilot } from 'src/app/model/pilot';
import { Ship } from 'src/app/model/ship';
import { StarwarsService } from 'src/app/starwars.service';

@Component({
  selector: 'app-ship-detail',
  templateUrl: './ship-detail.component.html',
  styleUrls: ['./ship-detail.component.css']
})
export class ShipDetailComponent implements OnInit {

  public shipId : string = "";
  public ship: Ship = new Ship();
  public ship_img : string = ""
  isloading: boolean = true;
  public extraPilots : Array<Pilot> = [];

  constructor(private route: ActivatedRoute, private starWarsService: StarwarsService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    //has been logged in?
    if(!this.loginService.getIsLogeado())
      this.router.navigate(['/ships']);

     //routing
     let _shipId = this.route.snapshot.paramMap.get("id")=== null ? undefined : this.route.snapshot.paramMap.get("id");
     if(_shipId)
     {
      this.shipId=decodeURIComponent(_shipId);
      this.getdata();
      this.ship_img = "https://starwars-visualguide.com/assets/img/starships/" + this.shipId + ".jpg";
     }
  }
  
  getdata() {
    this.isloading = true;
    this.starWarsService.getShip(this.shipId).subscribe(data => {
      console.log(data);
      if (data != null) {
        if (this.ship)
        {
          this.ship = data;
          this.getPilots();
        }
      }
      console.log(this.ship);
      this.isloading = false;
    })
  }

  getPilots()
  {
    if (this.ship.pilots.length > 0) {
      this.ship.pilots.forEach(async element => {
        let pilotTmp!: Pilot;
         this.starWarsService.getPilot(this.satinize_url(element)).subscribe(data => {
          console.log(data);
          if (data != null) {
              pilotTmp = data;
              this.extraPilots.push(pilotTmp);
          }
          console.log(this.extraPilots);
        });

      });
    }
  }

  pilotDetails(url_id: String) {
    this.router.navigate(['/pilotDetail', this.satinize_url(url_id)]);
  }

  satinize_url(url_id: String) {
    let param = url_id.split('/');
    return param[param.length - 2];
  }


}
