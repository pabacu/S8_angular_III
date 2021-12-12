import { LoginService } from './../../login.service';
import { APP_BOOTSTRAP_LISTENER, Component, Injectable, Injector, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbModal, NgbModalOptions, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserClass } from 'src/app/model/user';


@Component({
  selector: 'app-modal-sign',
  templateUrl: './modal-sign.component.html',
  styleUrls: ['./modal-sign.component.css']
})
@Injectable({
  providedIn: 'root'
})
export class ModalSignComponent implements OnInit {

  //loginform!: FormGroup;

  loginform = new FormGroup({
    name: new FormControl(),
    email: new FormControl(),
    password: new FormControl(),
    confirmpassword: new FormControl()
  });

  formSubmitted = false;
  userExist = false;
  samePassword = false;
  register = false;

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
        name: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmpassword: ['', Validators.required]
      }
    )
  }

  onFormSubmit() {
    console.log(this.loginform.value);
    this.formSubmitted = true;
    

    if (this.loginform.valid) {
      if(this.loginform.value.password === this.loginform.value.confirmpassword)
      {
        this.samePassword = true;

      }else{
        this.samePassword = false;
      }
      if(this.loginservice.userExist(this.loginform.value))
      {
        this.userExist = true;
      }
      else
      {
        this.userExist = false;
      }

      if(this.formSubmitted && this.samePassword && !this.userExist)
      {
        this.register = this.loginservice.submitFormsigin(this.loginform.value);
      }

    } else {
      this.formSubmitted = false;
    }
  }

close():void{
  document.body.classList.remove('modalExperience');
  this.modalService.dismissAll();
}

}
