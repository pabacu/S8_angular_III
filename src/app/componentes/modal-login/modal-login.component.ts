import { LoginService } from './../../login.service';
import { Component, Injectable, Injector, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserClass } from 'src/app/model/user';


@Component({
  selector: 'app-modal-sign',
  templateUrl: './modal-login.component.html',
  styleUrls: ['./modal-login.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ModalLoginComponent implements OnInit {

  //loginform!: FormGroup;

  loginform = new FormGroup({
    email: new FormControl(),
    password: new FormControl()
  }); 

  formSubmitted = false;
  userExist = false;

  @Input() public modalopen: String = '';
  @ViewChild('templateLogin') templateLogin!: TemplateRef<any>;
  @ViewChild('templateSignIn') templateSignIn!: TemplateRef<any>;

  closeResult = '';
  user: UserClass;

  
  constructor(private _builder: FormBuilder, private modalService: NgbModal, private loginservice: LoginService, private router: Router) {
    
  }

  ngOnInit(): void {

    this.loginform = this._builder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required]
      }
      )


  }

  onFormSubmit() {
    console.log(this.loginform.value);
    this.formSubmitted = true;
    if (this.loginform.valid)
    {
      this.user = this.loginservice.submitFormLogin(this.loginform.value);
      if(this.user != undefined && this.user.name != undefined && this.user.name != '')
      {
        this.router.navigate(['/ships']);
        this.userExist = true;
        this.close();
      }
      else
      {
        this.userExist = false;
      }
    }else{
      this.formSubmitted = false;
    }
  }

  open(name:String): void {
    //this.modal.open(this.name);
    if (name === 'login') {
      setTimeout(() => {
        //this.modalService.open(this.templateLogin);
        this.modalService.open(this.templateLogin);
         });
    } else if (name === 'signin') {
      setTimeout(() => {
        this.modalService.open(this.templateSignIn);
      });
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

  close():void{
    document.body.classList.remove('modalExperience');
    this.modalService.dismissAll();
  }

}
