import React from 'react';
import axios from 'axios';
import Movie from './Movie';
import './App.css';

class App extends React.Component {
  state = {
    isLoading: true,
    movies: [],
  };
  /*
getMovies 함수를 만들어서 호출하거나, 아래와 같은 방식으로 해도 무관
 async componentDidMount(){
  const movies = axios.get("https://yts.mx/api/v2/list_movies.json");
  }
*/
  /* 
여기서도 호출하는데 시간이 걸리기 때문에 비동기화를 위해 async 함수 추가
함수 내부에는 await을 써서 axios가 끝날 때까지 기다렸다가 계속할 수 있게 만듦
*/
  /*
1. 처음에 render를 하고 isLoading이 true니까 "Loading" 이라는 글자가 보임
2. application이 mount 된 후, getMovies function 호출
3. getMovies는 axios.get 사용하나 완료까지 시간이 필요해서 await식을 추가
*/
  getMovies = async () => {
    const {
      data: {
        data: { movies },
      },
    } = await axios.get(
      "https://yts.mx/api/v2/list_movies.json?sort_by=rating"
    );
    /* 
    data 안에 data.movies를 출력해보기 위해서 movies.data.data.movies로 입력 하는 대신
    const에서 {data: {data: {movies}}} 로 설정해주면 movies만 입력해도 같은 결과 출력
    */
    console.log(movies);
    // this.setState({ movies: movies }); 이렇게 적는 대신 아래와 같이 적어도 됨
    this.setState({ movies, isLoading: false });
  };
  // 컴포넌트가 mount되면 getMovies를 호출하게 됨
  componentDidMount() {
    this.getMovies();
  }
  render() {
    const { isLoading, movies } = this.state;
    return (
      <section className="container">
        {isLoading ? (
          <div className="loader">
            <span className="loader_text">Loading...</span>
          </div>
        ) : (
          <div className="movies">
            {movies.map((movie) => (
              <Movie
                key={movie.id}
                id={movie.id}
                year={movie.year}
                title={movie.title}
                summary={movie.summary}
                poster={movie.medium_cover_image}
                genres={movie.genres}
              />
            ))}
          </div>
        )}
      </section>
    );
  }
}

export default App;

