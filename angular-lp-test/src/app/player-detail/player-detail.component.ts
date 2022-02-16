import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Player } from '../player';
import { PlayerService } from '../player.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: [ './player-detail.component.css' ]
})
export class PlayerDetailComponent implements OnInit {
  player: Player | undefined;

  constructor(
    private route: ActivatedRoute,
    private playerService: PlayerService,
    private location: Location
  ) {}

  ngOnInit(): void {
    this.getPlayer();
  }

  getPlayer(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.playerService.getPlayer(id)
      .subscribe(player => this.player = player);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    if (this.player) {
      this.playerService.updatePlayer(this.player)
        .subscribe(() => this.goBack());
    }
  }
}
