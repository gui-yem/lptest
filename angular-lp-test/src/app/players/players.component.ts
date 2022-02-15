import { Component, OnInit } from '@angular/core';
import { Player } from '../player';
import { PLAYERS } from '../mock-players';

import { PlayerService } from '../player.service';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-players',
  templateUrl: './players.component.html',
  styleUrls: ['./players.component.css']
})
export class PlayersComponent implements OnInit {

  selectedPlayer?: Player;

  players: Player[] = [];

  constructor(private playerService: PlayerService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getPlayers();
  }

  onSelect(player: Player): void {
    this.selectedPlayer = player;
    this.messageService.add(`PlayersComponent: Selected player id=${player.id}`);
  }

  getPlayers(): void {
    this.playerService.getPlayers()
        .subscribe(players => this.players = players);
  }

}
