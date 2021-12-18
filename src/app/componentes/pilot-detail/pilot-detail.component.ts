import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoginService } from 'src/app/login.service';
import { Pilot } from 'src/app/model/pilot';
import { StarwarsService } from 'src/app/starwars.service';

@Component({
  selector: 'app-pilot-detail',
  templateUrl: './pilot-detail.component.html',
  styleUrls: ['./pilot-detail.component.css']
})
export class PilotDetailComponent implements OnInit {
  public pilot_img : string = "";
  public pilotId : string = "";
  isloading: boolean = true;
  public pilot: Pilot = new Pilot();

  constructor(private route: ActivatedRoute, private starWarsService: StarwarsService, private router: Router, private loginService: LoginService) { }

  ngOnInit(): void {
    //has been logged in?
     if(!this.loginService.getIsLogeado())
       this.router.navigate(['/ships']);

     //routing
     let _pilotId = this.route.snapshot.paramMap.get("id")=== null ? undefined : this.route.snapshot.paramMap.get("id");
     if(_pilotId)
     {
      this.pilotId=decodeURIComponent(_pilotId);
      this.getdata();
      this.pilot_img = "https://starwars-visualguide.com/assets/img/characters/" + this.pilotId + ".jpg";
     }
  }

  getdata() {
    this.isloading = true;
    this.starWarsService.getPilot(this.pilotId).subscribe(data => {
      console.log(data);
      if (data != null) {
        if (this.pilot)
        {
          this.pilot = data;
        }
      }
      console.log(this.pilot);
      this.isloading = false;
    })
  }


}
