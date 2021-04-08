import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { AlertaService } from 'src/app/service/alerta.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-edit',
  templateUrl: './postagem-edit.component.html',
  styleUrls: ['./postagem-edit.component.css']
})
export class PostagemEditComponent implements OnInit {

  postagem: Postagem = new Postagem()
  tema: Tema = new Tema()
  listaTemas: Tema[]
  idTema: number

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private temaService: TemaService,
    private alerta: AlertaService
  ) { }

  ngOnInit() {

    window.scroll(0, 0)

    let id = this.route.snapshot.params['id']
    this.findByIdPostagem(id)
    this.findAllTema()

    if (environment.token == "") {
      this.alerta.showAlertInfo("sua sessão expirou")
      this.router.navigate(["/login"])
    }

  }

  findByIdPostagem(id: number) {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem) => { this.postagem = resp })
  }

  findByIdTema() {
    this.temaService.getByIdTema(this.idTema).subscribe((resp: Tema) => { this.tema = resp })
  }

  findAllTema() {
    this.temaService.getAllTema().subscribe((resp: Tema[]) => { this.listaTemas = resp })
  }

  atualizar() {

    this.tema.id = this.idTema
    this.postagem.tema = this.tema

    this.postagemService.putPostagem(this.postagem).subscribe((resp: Postagem) => {
      this.postagem = resp
      this.alerta.showAlertSuccess("postagem atualizada com sucesso")
      this.router.navigate(['/home'])
    })
  }

}
