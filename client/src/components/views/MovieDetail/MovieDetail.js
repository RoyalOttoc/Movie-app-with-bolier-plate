import React, { useEffect, useState } from 'react'
import { API_URL, API_KEY, IMAGE_BASE_URL } from '../../Config'
import MainImage from '../LandingPage/Sections/MainImage'
import MovieInfo from './Sections/MovieInfo'
import GridCard from '../Commons/GridCard'
import { Row } from 'antd'

function MovieDetail(props) {

    const [Movie, setMovie] = useState([])
    const [casts, setcasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    let movieId = props.match.params.movieId

    useEffect(() => {

        let endpointCrew = `${API_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
        let endpointInfo = `${API_URL}/movie/${movieId}?api_key=${API_KEY}`

        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                setMovie(response)
            })

        fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                console.log('responseChar', response)
                setcasts(response.cast)
            })


    }, [])

    const toggleActorView = () => {
        setActorToggle(!ActorToggle)
    }

    return (

        <div>
            {/* Header */}
            <MainImage
                image={`${IMAGE_BASE_URL}/w1280/${Movie.backdrop_path}`}
                title={Movie.title}
                desc={Movie.overview} />

            {/* Body */}
            <div style={{ width: '85%', margin: '1rem auto' }}>
                {/* MovieInfo */}
                <MovieInfo movie={Movie} />
                <br />
                {/* Actors Grid */}

                <div style={{ display: 'flex', justifyContent: 'center', margin: '2rem' }}>
                    <button onClick={toggleActorView}>Toggle Actor View</button>


                </div>

                {ActorToggle &&
                    <Row gutter={[16, 16]}>

                        {casts && casts.map((cast, index) => (
                            <React.Fragment key={index}>
                                <GridCard
                                    image={cast.profile_path ? `${IMAGE_BASE_URL}/w500/${cast.profile_path}` : null}
                                    name={cast.character}
                                />
                            </React.Fragment>
                        ))}
                    </Row>
                }


            </div>

        </div>


    )
}


export default MovieDetail
