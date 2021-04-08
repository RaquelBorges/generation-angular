import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Postagem } from 'src/app/model/Postagem';
import { Tema } from 'src/app/model/Tema';
import { AlertaService } from 'src/app/service/alerta.service';
import { PostagemService } from 'src/app/service/postagem.service';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-postagem-delete',
  templateUrl: './postagem-delete.component.html',
  styleUrls: ['./postagem-delete.component.css']
})
export class PostagemDeleteComponent implements OnInit {

  postagem: Postagem = new Postagem()
  idPost: number

  constructor(private router: Router,
    private route: ActivatedRoute,
    private postagemService: PostagemService,
    private alerta: AlertaService
    ) { }

  ngOnInit(){

    this.idPost = this.route.snapshot.params['id']
    this.findByIdPostagem(this.idPost)
        
    if (environment.token == "") {
      this.alerta.showAlertInfo("sua sessão expirou")
      this.router.navigate(["/login"])
    }
  }

  findByIdPostagem(id: number)
  {
    this.postagemService.getByIdPostagem(id).subscribe((resp: Postagem)=>{this.postagem = resp})
  }

  deletePostagem()
  {
    this.postagemService.deletePostagem(this.idPost).subscribe(()=>{})
    this.alerta.showAlertSuccess("Postagem apagada")
    this.router.navigate(['/home'])
  }

}
