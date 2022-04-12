class ApiServise {
  apiKey = 'aaf7120935dc388a62629d9039994774';
  baseStr = 'https://api.themoviedb.org/3/';
  token = JSON.parse(localStorage.getItem('guestToken'));

  requestGet = (url) => {
    return fetch(url).then((res) => {
      if (!res.ok) {
        throw new Error(`error fetch URL ${url}, response status ${res.status}`);
      }
      return res.json();
    });
  };

  async creatGuestSession() {
    const url = new URL(`${this.baseStr}authentication/guest_session/new`);
    url.searchParams.set('api_key', this.apiKey);

    const body = await this.requestGet(url);

    const sessionId = body.guest_session_id;
    return sessionId;
  }

  async getMovies(searchQuery, numberPage) {
    const url = new URL(`${this.baseStr}search/movie`);

    url.searchParams.set('api_key', this.apiKey);
    url.searchParams.set('query', searchQuery);
    url.searchParams.set('page', numberPage);

    const body = await this.requestGet(url);

    return {
      totalPages: body.total_pages,
      list: body.results,
    };
  }

  async getGenres() {
    const url = new URL(`${this.baseStr}genre/movie/list`);
    url.searchParams.set('api_key', this.apiKey);

    const body = await this.requestGet(url);
    return body.genres;
  }

  async rateFilm(id, rate) {
    const url = new URL(`${this.baseStr}movie/${id}/rating`);

    url.searchParams.set('api_key', this.apiKey);
    url.searchParams.set('guest_session_id', this.token);

    const body = {
      value: rate,
    };
    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    return await fetch(url, {
      method: 'POST',
      body: JSON.stringify(body),
      headers: headers,
    }).catch((e) => {
      console.log(e);
    });
  }

  async deleteRateFilm(id) {
    const url = new URL(`${this.baseStr}movie/${id}/rating`);

    url.searchParams.set('api_key', this.apiKey);
    url.searchParams.set('guest_session_id', this.token);

    const headers = {
      'Content-Type': 'application/json;charset=utf-8',
    };
    return await fetch(url, {
      method: 'DELETE',
      headers: headers,
    });
  }

  async getRatedFilms() {
    const url = new URL(`${this.baseStr}guest_session/${this.token}/rated/movies`);
    url.searchParams.set('api_key', this.apiKey);

    const body = await this.requestGet(url);

    return body;
  }
}
const apiServise = new ApiServise();

export default apiServise;
