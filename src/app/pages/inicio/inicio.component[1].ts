import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/firestore';

import { map } from 'rxjs/operators';
import { Game } from '../../interfaces/interface';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.css']
})
export class InicioComponent implements OnInit {

  juegos: any[] = [];
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  bool = true;

  constructor( private db: AngularFirestore ) {}

  ngOnInit(): void {

    this.db.collection('goty').valueChanges()
      .pipe( 
        map( ( resp: Game[] ) => resp.map( ({ name, votos, url }) => ({ name, value: votos, url }) ) )
      )
      .subscribe( juegos => {
        this.juegos = juegos;
        this.bool = false;
      } );

  }

}
