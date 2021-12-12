import { UserClass } from './model/user';
import { Injectable } from '@angular/core';



@Injectable({
  providedIn: 'root'
})
export class LoginService {

  public usuarios: Array<UserClass> = [];
  public usuario: UserClass | undefined;
  private logeado: boolean = false;

  constructor() { 
    const localData = this.getData();
    if(localData != null && localData.length > 0 )
    {
      this.usuarios = JSON.parse(localData);
    }
  }

  submitFormLogin(data: any): UserClass {
    if(this.userExist(data))
    {
      this.logeado = this.login(data);
      if(this.logeado)
        return this.getUserByemail(data.email);
      else
        return undefined;
    }
    else
      return new UserClass();
  }

  submitFormsigin(data:any): boolean {
    try {
      const newUser : UserClass  = new UserClass(data);
      this.save(newUser);
      return true;
    } catch (error) {
      return false;
    }
    
  }

  login(data:any) : boolean{
    if(this.userExist(data))
    {
      this.usuario = this.getUserByemail(data.email);
      if(this.usuario.password === data.password)
      {
        console.log("Login OK, nombre usuario: " + this.usuario.name);
        this.logeado = true;
        return true;
      }
    }
    console.log("Login incorrecto, email: " + data.email);
    this.usuario = undefined;
    return false;
  }

  logout()
  {
    this.logeado = false;
    this.usuario = undefined;
  }

  userExist(data:any) : boolean
  {
    
    return this.usuarios.find(x => x.email.lastIndexOf(data.email)>=0) != null;
    
  }

  getUserByemail(email:string):UserClass
  {
    this.usuario = this.usuarios.find(x => x.email.lastIndexOf(email)>=0);

    return this.usuario;

  }

  setData() {
    const jsonData = JSON.stringify(this.usuarios)
    localStorage.setItem('users', jsonData)
  }

  getData() {
    return localStorage.getItem('users')
 }

 public save(user:UserClass)
  {
    this.usuarios.push(user);
    this.usuario = user;
    this.setData();
  }

  public getIsLogeado():boolean
  {

    return this.logeado;
  }

  public getUsuarioLogeado():UserClass{
    return this.usuario;
  }

 

}
