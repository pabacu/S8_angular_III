import { LoginService } from './../../login.service';
import { ModalSignComponent } from './../modal-sign/modal-sign.component';
import { Component, ElementRef, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ModalLoginComponent } from '../modal-login/modal-login.component';




@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.css']
})
export class StartComponent implements OnInit {

  closeResult = '';
  modalsign!: ModalSignComponent;
  public registrado: boolean = false;
  public modalopen: String = '';


  constructor(private modalService: NgbModal, private loginservice: LoginService) {

  }

  ngOnInit(): void {
    this.registrado = this.loginservice.getIsLogeado();
    console.log("startComponent Usuario registrado: " + this.registrado);
  }

  open(_name: string) {

    if (_name.length > 0 && _name === 'login') {
      this.modalService.open(ModalLoginComponent);
    }
    else if (_name.length > 0 && _name === 'siging') {
      this.modalService.open(ModalSignComponent);
    }
  }



  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
