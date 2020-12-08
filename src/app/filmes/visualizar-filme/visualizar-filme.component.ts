import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filme',
  templateUrl: './visualizar-filme.component.html',
  styleUrls: ['./visualizar-filme.component.scss']
})
export class VisualizarFilmeComponent implements OnInit {

  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  filme: Filme;
  id: number;

  constructor(private activated: ActivatedRoute,
              private filmesService: FilmesService,
              private router: Router,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.id = this.activated.snapshot.params['id'];
    this.visualizar();
  }

  editar(): void {
    this.router.navigateByUrl('/filmes/cadastro/' + this.id);
  }
  excluir(): void {
    const config = {
      data:{
        titulo: "Você tem certeza que deseja excluir?",
        descricao: "Caso você tenha certeza que deseja excluir, clique no botão OK",
        corBtnCancelar: 'primary',
        corBtnSucesso: 'warn',
        possuirBtnFechar: true
      } as Alerta
    }
    const dialogRef = this.dialog.open(AlertaComponent, config);
    dialogRef.afterClosed().subscribe(
      (opcao: boolean) => {
        if(opcao){
          this.filmesService.excluir(this.id)
          .subscribe(() => this.router.navigateByUrl('/filmes'));
        }
      })
    
  }

  private visualizar(): void {
    this.filmesService.visualizar(this.id).subscribe((filme: Filme) => this.filme = filme)
  }
}
