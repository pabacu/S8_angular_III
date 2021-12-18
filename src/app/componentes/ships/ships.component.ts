import { LoginService } from './../../login.service';
import { StarwarsService } from './../../starwars.service';
import { Ship } from './../../model/ship';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalLoginComponent } from '../modal-login/modal-login.component';

@Component({
  selector: 'app-ships',
  templateUrl: './ships.component.html',
  styleUrls: ['./ships.component.css']
})
export class ShipsComponent implements OnInit {

  ships!: Ship[];
  ship: Ship = new Ship();
  next: string = "";
  isloading: boolean = true;
  errorMsg: string;
  closeResult: string;

  constructor(private modalService: NgbModal, private starWarsService: StarwarsService, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    if(this.loginService.getIsLogeado())
      this.getdata();
    else
    {
      this.modalService.open(ModalLoginComponent).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
        console.log("modal close " + this.closeResult);
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        console.log("modal Dismissed");
        if(this.loginService.getIsLogeado())
          this.getdata();
      });
    }
  }

  shipDetails(url_id: String) {
    this.router.navigate(['/shipDetail', this.satinize_url(url_id)]);
  }

  satinize_url(url_id: String)
  {
    let param = url_id.split('/');
    return param[param.length-2];
  }

  onScrollDown(ev: any) {
    console.log("scrolled down!!", ev);
    if (this.next != null)
      this.getdata();

  }

  getdata() {
    this.isloading = true;
    this.starWarsService.getShips(this.next).pipe(
      catchError(error => {
          this.errorMsg = error;
          this.isloading = false;
          return of([]);
      })
  ).subscribe(data => {
      console.log(data);
      if (data != null) {
        if (!this.ships)
          this.ships = data.results;
        else
        {
          data.results.forEach((itemship:Ship) => {
            this.ships.push(itemship);
          });
        }
        this.next = data.next;
      }
      console.log(this.ships);
      this.isloading = false;
    })
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return  `with: ${reason}`;
    }
  }

}
