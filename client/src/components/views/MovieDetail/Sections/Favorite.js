import Axios from 'axios'
import React, { useEffect, useState } from 'react'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false)

    useEffect(() => {

        let variable = {
            userFrom,
            movieId
        }

        Axios.post('/api/favorite/favoriteNumber', variable)
            .then(response => {

                setFavoriteNumber(response.data.favoriteNumber)
                if (response.data.success) {

                } else {
                    alert('Failed to get number information')
                }
            })

        Axios.post('/api/favorite/favorited', variable)
            .then(response => {

                if (response.data.success) {

                    setFavorited(response.data.favorited)
                } else {
                    alert('Failed to get information')
                }
            })
    }, [])

    return (
        <div>
            <button style={{ cursor: 'pointer' }}>
                {Favorited ? "Cancel Favorite" : "Add to Favorite"} {FavoriteNumber}
            </button>
        </div>
    )
}

export default Favorite
