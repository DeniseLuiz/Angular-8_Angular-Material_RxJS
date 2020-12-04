import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.component';
import { validarCamposService } from 'src/app/shared/components/campo/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {

  cadastro: FormGroup;

  constructor(public validacao: validarCamposService,
          private fb: FormBuilder,
          private filmesService: FilmesService, 
          public dialog: MatDialog,
          private router: Router) { }

  get f(){
    return this.cadastro.controls;
  }

  ngOnInit() {

    this.cadastro = this.fb.group({

      titulo:['', [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: ['', [Validators.maxLength(10)]],
      dtLancamento: ['', [Validators.required]],
      descricao: [''],
      nota: [0, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMdb: ['', [Validators.minLength(10)]],
      genero: ['', [Validators.required]],

    });

  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if(this.cadastro.invalid){
      return;
    }
    const filme = this.cadastro.getRawValue() as Filme;
    this.salvar(filme);
    this.reiniciarForm();
  }

  reiniciarForm(): void {
    this.cadastro.reset();
  }

  private salvar(filme: Filme): void {
    this.filmesService.salvar(filme).subscribe(
      ()=>{
        const config = {
          data:{
            btnSucesso: 'Ir para a listagem',
            btnCancelar: 'Cadastrar novo filme',
            corBtnCancelar:'primary',
            possuirBtnFechar: true
          } as Alerta
        }
        const dialogRef = this.dialog.open(AlertaComponent, config);
        dialogRef.afterClosed().subscribe(
          (opcao: boolean) => {
            if(opcao){
              this.router.navigateByUrl('filmes');
            }else{
              this.reiniciarForm();
            }
          })
      },
      ()=>{
         const config = {
         data: {
          titulo: 'Erro ao salvar o registro!',
          descricao: 'Não conseguimos salvar seu registro. Favor tentar novamente mais tarde.',
          corBtnSucesso: 'warn',
          btnSucesso: 'Fechar',
         }
      };
      this.dialog.open(AlertaComponent, config);
    })
  }
}
