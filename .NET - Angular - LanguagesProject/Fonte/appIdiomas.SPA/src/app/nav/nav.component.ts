import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { AlertifyService } from '../_services/alertify.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService, private alertify: AlertifyService, private router: Router) { }

  ngOnInit() {
  }

  login() {
    // esse subscribe é uma coisa que parece melhor que Promises, que te deixa
    // usar os dados enquanto eles ainda estao sendo buscados, em caso de erro,
    // e depois que foi recebido (por isso tem esses 3 parametros - functions)
    this.authService.login(this.model).subscribe(data => {
      this.alertify.success('Login realizado!');
    }, error => {
      this.alertify.error('Dados incorretos');
    }, () => {
      this.router.navigate(['/mygroups']);
    });
  }

  logout() {
    this.authService.userToken = null;
    localStorage.removeItem('token');
    this.alertify.message('Desconectado!');
    this.router.navigate(['/home']);
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

}
