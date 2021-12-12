import { UserClass } from './model/user';
import { Component} from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ModalLoginComponent } from './componentes/modal-login/modal-login.component';
import { ModalSignComponent } from './componentes/modal-sign/modal-sign.component';
import { LoginService } from './login.service';
import { RouterOutlet } from '@angular/router';
import { slideInAnimation } from 'src/route-animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [
    slideInAnimation
  ]
})
export class AppComponent {
  title = 'starWarsApp';
  userloged : UserClass;
  currentChoice: string = "Home";
  closeResult: string;
  registrado : boolean = false;

  constructor(private modalService: NgbModal, public loginservice: LoginService) {

  }

  ngOnInit(): void {
    this.registrado = this.loginservice.getIsLogeado();
    if(this.registrado)
    {
      this.userloged = this.loginservice.getUsuarioLogeado();
      console.log("appComponent Usuario registrado: " + this.userloged);
    }
  }
  
  setActive(choice: string): void{
      this.currentChoice = choice;
  }

  getActive(choice: string) : string{
      if(this.currentChoice == choice)
           return "active";
      else
           return "";

  }

  logout():void{
    this.loginservice.logout();
  }

  open(_name: string) {

    if (_name.length > 0 && _name === 'login') {
      this.modalService.open(ModalLoginComponent).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
    else if (_name.length > 0 && _name === 'siging') {
      this.modalService.open(ModalSignComponent).result.then((result) => {
        this.closeResult = `Closed with: ${result}`;
      }, (reason) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      });
    }
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

  prepareRoute(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'];
  }
}
