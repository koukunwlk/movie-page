export interface MovieInterface {
  imdbId: string;
  image: string;
  title: string;
  description: string;
  likesCount?: number;
}

export interface IMDBMovieResponse {
  id: string;
  image: string;
  title: string;
  description: string;
}

export interface IMDBResponse {
  results: IMDBMovieResponse[];
}

export interface MovieAPIResponse {
  results: MovieInterface[];
}

export class Movie {
  private _imdbId: string;
  private _image: string;
  private _title: string;
  private _description: string;
  private _likeCounts?: number;
  constructor(
    _imdbId: string,
    _image: string,
    _title: string,
    _description: string,
    _likeCounts?: number
  ) {
    this._imdbId = _imdbId;
    this._image = _image;
    this._title = _title;
    this._description = _description || 'Descrição não disponível';
    this._likeCounts = _likeCounts;
  }

  get imdbId(): string {
    return this._imdbId;
  }

  get image(): string {
    return this._image;
  }

  get title(): string {
    return this._title;
  }

  get description(): string {
    return this._description;
  }

  get likesCount(): number | undefined {
    return this._likeCounts;
  }

  toJSON() {
    return {
      imdbId: this.imdbId,
      image: this.image,
      title: this.title,
      description: this.description,
      likesCount: this.likesCount,
    };
  }
}
