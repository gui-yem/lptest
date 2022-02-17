import { Component, OnInit } from '@angular/core';

import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {
  players: Player[] = [];
  playersAffrontSelection: Player[] = [];
  affrontNotification: string = '';

  constructor(private playerService: PlayerService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  getPlayers(): void {
    this.playerService.getPlayers()
    .subscribe(players => this.players = players);
  }

  add(name: string, power: string): void {
    name = name.trim();
    if (!name) { return; }
    var powerToNumber: number;
    power = power.trim();
    powerToNumber = +power;
    if (!powerToNumber) { return; }
    this.playerService.addPlayer({ name, power: powerToNumber } as Player)
      .subscribe(player => {
        this.players.push(player);
      });
  }

  delete(player: Player): void {
    this.players = this.players.filter(h => h !== player);
    this.playerService.deletePlayer(player.id).subscribe();
  }

  addToSelection(player: Player): void {
    this.playersAffrontSelection.push(this.players.filter(h => h == player)[0]);
  }

  resetSelection(): void {
    this.playersAffrontSelection = [];
    this.affrontNotification = '';
  }

  affront(): void {
    if (this.playersAffrontSelection.length === 0) {
      this.affrontNotification = "Aucun joueur sélectionné pour l'affrontement. Veuillez d'abord effectuer votre sélection en cliquant sur l'icone A de chaque joueur.";
    } else {
      var winner: string = '';
      var bestPower: number = 0;
      this.affrontNotification = '';

      this.playersAffrontSelection.forEach(function (value) {
        if (value.power > bestPower) {
          bestPower = value.power
          winner = value.name;
          console.log(winner);
        }
      }); 
      this.affrontNotification = 'The winner is: ' + winner;
    }
  }
}
