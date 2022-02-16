import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

import { Player } from './player';
import { MessageService } from './message.service';

export interface PlayerListModelServerResponse {
  "@context": string;
  "@id": string;
  "@type": string;
  "hydra:member": Player[];
  "hydra:totalItems": number;
}


@Injectable({ providedIn: 'root' })
export class PlayerService {

  private playersUrl = 'http://127.0.0.1:8741/api/players';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }

  /** GET players from the server */
  getPlayers(): Observable<Player[]> {
    const url = `${this.playersUrl}/?page=1`;
    return this.http.get<PlayerListModelServerResponse>(this.playersUrl)
      .pipe(
        map(response => response['hydra:member']),
        tap(_ => this.log('fetched players')),
        catchError(this.handleError<Player[]>('getPlayers', []))
      );
  }

  /** GET player by id. Return `undefined` when id not found */
  getPlayerNo404<Data>(id: number): Observable<Player> {
    const url = `${this.playersUrl}/?id=${id}`;
    return this.http.get<Player[]>(url)
      .pipe(
        map(players => players[0]), // returns a {0|1} element array
        tap(h => {
          const outcome = h ? 'fetched' : 'did not find';
          this.log(`${outcome} player id=${id}`);
        }),
        catchError(this.handleError<Player>(`getPlayer id=${id}`))
      );
  }

  /** GET player by id. Will 404 if id not found */
  getPlayer(id: number): Observable<Player> {
    const url = `${this.playersUrl}/${id}`;
    return this.http.get<Player>(url).pipe(
      tap(_ => this.log(`fetched player id=${id}`)),
      catchError(this.handleError<Player>(`getPlayer id=${id}`))
    );
  }

  //////// Save methods //////////

  /** POST: add a new player to the server */
  addPlayer(player: Player): Observable<Player> {
    return this.http.post<Player>(this.playersUrl, player, this.httpOptions).pipe(
      tap((newPlayer: Player) => this.log(`added player w/ id=${newPlayer.id}`)),
      catchError(this.handleError<Player>('addPlayer'))
    );
  }

  /** DELETE: delete the player from the server */
  deletePlayer(id: number): Observable<Player> {
    const url = `${this.playersUrl}/${id}`;

    return this.http.delete<Player>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted player id=${id}`)),
      catchError(this.handleError<Player>('deletePlayer'))
    );
  }

  /** PUT: update the player on the server */
  updatePlayer(player: Player): Observable<any> {
    const url = `${this.playersUrl}/${player.id}`;
    return this.http.put(url, player, this.httpOptions).pipe(
      tap(_ => this.log(`updated player id=${player.id}`)),
      catchError(this.handleError<any>('updatePlayer'))
    );
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   *
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /** Log a PlayerService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`PlayerService: ${message}`);
  }
}
