import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie.model';
import { LoginService } from 'src/app/auth/services/login.service';
import { Observable, catchError, map, of } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

const BASE_URL = 'http://localhost:3000/movie';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  constructor(
    private http: HttpClient,
    private loginService: LoginService,
    private router: Router
  ) {}

  create(movie: Movie) {
    const user = this.loginService.getUser();
    const accessToken = user?.accessToken;
    return this.http.post(BASE_URL, movie.toJSON(), {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  }

  getMostLiked(): Observable<Movie[]> {
    const user = this.loginService.getUser();
    const accessToken = user?.accessToken;
    return this.http.get<Movie[]>(`${BASE_URL}/most-liked`, {
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  }

  likeMovie(movie: Movie) {
    const user = this.loginService.getUser();
    const accessToken = user?.accessToken;
    if (!accessToken) {
      this.router.navigate(['/login']);
    }
    this.getMovie(movie.imdbId).subscribe({
      next: (movieExists) => {
        if (!movieExists) {
          this.create(movie).subscribe({
            next: () => {},
            complete: () => {},
          });
        }
      },
    });

    this.http
      .patch(
        `${BASE_URL}/${movie.imdbId}/like`,
        {},
        {
          headers: {
            authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .subscribe({
        next: () => {},
        error: (error) => {},
        complete: () => {},
      });
  }

  getMovie(imdbId: string): Observable<boolean> {
    return this.http.get<Movie>(`${BASE_URL}/${imdbId}`).pipe(
      map((movie) => !!movie),
      catchError(() => of(false))
    );
  }
}
