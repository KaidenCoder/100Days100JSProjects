import React, { useState } from 'react'
import MovieComp from './movieComp'

const SearchMovie = () => {

    const [query, setQuery] = useState('')
    const [movies, setMovies] = useState([])

    const searchMovies = async (e) => {
        e.preventDefault()
        console.log('Submitting')

        // const query = "Jurassic Park"
        const apiKey = '595658ad363d305dfdd75b6826f7a0d9'

        const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${query}&page=1&include_adult=false`

        try {
            const res = await fetch(url)
            const data = await res.json()
            console.log(data.results)
            setMovies(data.results)
        } catch (err) {
            console.log(err)
        }

    }

    return (
        <>
            <form className="form" onSubmit={searchMovies}>
                <label className="label" htmlFor="query">
                    Movie Name
                </label>
                <input className="input" type="text" name="query"
                    placeholder="i.e. Jurassic park"
                    value={query} onChange={(e) => setQuery(e.target.value)} />
                <button className="button" type="submit">Search</button>
            </form>
            <div className="card-list">
                {movies.filter(movie => movie.poster_path).map(movie => (
                    <MovieComp movie={movie} key={movie.id} />
                ))}
            </div>
        </>
    )
}

export default SearchMovie
