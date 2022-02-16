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
}
