import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Usuario } from '../model/Usuario';
import { AuthService } from '../service/auth.service';

@Component({
  selector: 'app-cadastrar',
  templateUrl: './cadastrar.component.html',
  styleUrls: ['./cadastrar.component.css']
})
export class CadastrarComponent implements OnInit {

  user: Usuario = new Usuario
  confirmSenha: string
  tipoUser: string

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
  
  }

  confirmaSenha(event: any)
  {
    this.confirmSenha = event.target.value
  }

  tipoUsuario (event: any)
  {
    this.tipoUser = event.target.value
  }

  cadastrar ()
  {
    this.user.tipo = this.tipoUser

    if (this.user.senha != this.confirmSenha)
    {
      alert("Senhas não coincidem")
    }
    else
    {
      this.authService.cadastrar(this.user).subscribe((resp:Usuario) => {
        this.user = resp
        this.router.navigate(["/login"])
        alert("Usuário cadastrado com sucesso!")
        
      })
    }

  }

}
