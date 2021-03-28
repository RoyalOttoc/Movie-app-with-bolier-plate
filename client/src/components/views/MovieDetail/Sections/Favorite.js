import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Button } from 'antd'

function Favorite(props) {

    const movieId = props.movieId
    const userFrom = props.userFrom
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0);
    const [Favorited, setFavorited] = useState(false)

    let variable = {
        userFrom,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }

    const onClickFavorite = () => {

        if (Favorited) {
            Axios.post('/api/favorite/removeFromFavorite', variable)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber - 1)
                        setFavorited(!Favorited)

                    } else {
                        alert('Failed to remove')
                    }
                })

        } else {

            Axios.post('/api/favorite/addToFavorite', variable)
                .then(response => {
                    if (response.data.success) {
                        setFavoriteNumber(FavoriteNumber + 1)
                        setFavorited(!Favorited)

                    } else {
                        alert('Failed to add')
                    }
                })

        }
    }
    useEffect(() => {



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
            <Button onClick={onClickFavorite} style={{ cursor: 'pointer' }} >
                {Favorited ? "Cancel Favorite" : "Add to Favorite"} {FavoriteNumber}
            </Button>
        </div>
    )
}

export default Favorite
