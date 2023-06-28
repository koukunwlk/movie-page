import { Component, OnInit } from '@angular/core';
import { Movie } from 'src/app/shared/models/movie.model';
import { MovieService } from 'src/app/shared/services/movie.service';

@Component({
  selector: 'movie-most-liked-component',
  templateUrl: './most-liked.component.html',
  styleUrls: ['./most-liked.component.css'],
})
export class MostLikedComponent implements OnInit {
  movies: Movie[] = [];
  loading: boolean = true;

  constructor(private movieService: MovieService) {}

  ngOnInit(): void {
    this.getMovies();
  }

  getMovies() {
    this.movieService.getMostLiked().subscribe({
      next: (movies) => {
        for (const movie of movies) {
          this.movies.push(
            new Movie(
              movie.imdbId,
              movie.image,
              movie.title,
              movie.description,
              movie.likesCount
            )
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
