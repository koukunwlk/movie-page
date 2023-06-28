import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { IMDBResponse, Movie } from 'src/app/shared/models/movie.model';

const IMDB_URL = `https://imdb-api.com/API/AdvancedSearch/k_q5s855bv?title_type=feature&countries=br&languages=pt&count=10&sort=release_date,desc`;

@Component({
  selector: 'movie-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  movies: Movie[] = [];
  loading: boolean = true;

  constructor(private httpClient: HttpClient) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.httpClient.get<IMDBResponse>(IMDB_URL).subscribe({
      next: ({ results }) => {
        for (const movie of results) {
          this.movies.push(
            new Movie(movie.id, movie.image, movie.title, movie.description)
          );
        }
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
      },
    });
  }
}
