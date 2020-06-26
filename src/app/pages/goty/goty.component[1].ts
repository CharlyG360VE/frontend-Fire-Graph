import { Component, OnInit } from '@angular/core';
import { GameService } from '../../services/game.service';
import { Game } from '../../interfaces/interface';

import Swal from 'sweetalert2'
import { ThemePalette } from '@angular/material/core';
import { ProgressSpinnerMode } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-goty',
  templateUrl: './goty.component.html',
  styleUrls: ['./goty.component.css']
})
export class GotyComponent implements OnInit {

  juegos: Game[] = [];
  bool = true;

  constructor( private gameService: GameService ) {};

  color: ThemePalette = 'warn';
  mode: ProgressSpinnerMode = 'indeterminate';

  ngOnInit(): void {

    this.gameService.getNominados()
      .subscribe( list => {
        this.juegos = list;
        this.bool = false;
      } )

  };

  votarJuego( juego: Game ){

    this.gameService.votarJuego( juego.id )
      .subscribe( resp => {

        if(resp['ok']){
          Swal.fire( 'Gracias', resp['mensaje'], 'success' )
        } else {
          Swal.fire( 'Oops', resp['mensaje'], 'error' )
        }

      } )

  }

}