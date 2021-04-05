import React from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'
import './index.css';
import App from './App';

export async function getWatchedMovies() {
	let url = 'http://localhost:2021/api/movies/watched'
	try {
		let res = await axios.get(url);
		let movies = res.data
		console.log(movies)
		return movies

	}
	catch(e){
console.log(e)
	}
	// var movies = localStorage.getItem('movies-watched');

	// if (!movies) {
	// 	return [];
	// } else {
	// 	return JSON.parse(movies);
	// }
}

export async function getAllMovies() {
	//var movies = localStorage.getItem('movies-all');
	 let url = 'http://localhost:2021/api/movies'
	 try {
		 let res = await axios.get(url)
		 let movies = res.data
		 return movies

	 }
	 catch(e){
console.log(e)
	 }
	
	// if (!movies) {
	// 	return [
	// 	{
	// 		title: 'The Avengers',
	// 		image: 'http://d21lz9b0v8r1zn.cloudfront.net/wp-content/uploads//2012/03/detail.jpg',
	// 		comment: 'New York blows up in this!'
	// 	},
	// 	{
	// 		title: 'Dark City',
	// 		image: 'https://i.chzbgr.com/full/5569379584/hA96709E0/',
	// 		comment: 'This looks mysterious. Cool!'
	// 	},
	// 	{
	// 		title: 'Hot Tub Time Machine',
	// 		image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTG7vNmphIcVhEcybvSvMgbTkV6EE2twHBNanKvgDx3ZS7Ivn6Dtg',
	// 		comment: 'Someone said this was fun. Maybe!'
	// 	},
	// 	];
	// } else {
	// 	return JSON.parse(movies);
	// }
}

export async function add(title, image, description) {
	var movie = {};
	movie.watched = true;
	movie.tittle = title;
	movie.movieUrl = image;
	movie.comment = description;
//	movie.image = image;

	let url = 'http://localhost:2021/api/movies'
	try {
		let res = await axios.post(url, movie)
		//let movies = res.data;
		var movies = getAllMovies();
		movies.push(movie);
		localStorage.setItem('movies-all', JSON.stringify(movies));
		render();
		return movies

	}
	catch(e){

	}
}

export function addWatchedMovie(title, description, image) {
	var movie = {};
	movie.title = title;
	movie.description = description;
	movie.image = image;

	var movies = getWatchedMovies();
	movies.push(movie);

	localStorage.setItem('movies-watched', JSON.stringify(movies));

	render();
}

export function removeWatchedMovie(title) {
	var movies = getWatchedMovies();

	for (var i = 0; i < movies.length; i++) {
	   if (!movies[i]) continue;
		if (movies[i].title == title) {
			movies[i] = null
		}
	}

	localStorage.setItem('movies-watched', JSON.stringify(movies));

	render();
}

function render() {
	ReactDOM.render(<App movies={getAllMovies()} watched={getWatchedMovies()} />, document.getElementById('root'))
}

render();
