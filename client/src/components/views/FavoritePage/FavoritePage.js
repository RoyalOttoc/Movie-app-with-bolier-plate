import Axios from 'axios'
import React, { useEffect, useState } from 'react'
import './favorite.css'
import { Popover } from 'antd'
import { IMAGE_BASE_URL } from '../../Config'
function FavoritePage() {

    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoritedMovie()
    }, [])

    const fetchFavoritedMovie = () => {
        Axios.post('/api/favorite/getFavoritedMovie', { userFrom: localStorage.getItem('userId') })
            .then(response => {
                if (response.data.success) {

                    setFavorites(response.data.favorites)
                } else {
                    alert('Failed to get movie information')
                }
            })
    }

    const onClickDelete = (movieId, userFrom) => {

        const variables = {
            movieId,
            userFrom
        }

        Axios.post('/api/favorite/removeFromFavorite', variables)
            .then(response => {
                if (response.data.success) {
                    fetchFavoritedMovie()
                } else {
                    alert('Failed to delete from the list')
                }
            })
    }

    const renderCards = Favorites.map((favorite, index) => {

        const content = (
            <div>
                {favorite.moviePost ?
                    <img src={`${IMAGE_BASE_URL}/w500/${favorite.moviePost}`} /> : 'No image'
                }
            </div>
        )

        return <tr key={index}>
            <Popover content={content} title={`${favorite.movieTitle}`}>
                <td>{favorite.movieTitle}</td>
            </Popover>

            <td>{favorite.movieRunTime} mins</td>
            <td><button style={{ cursor: 'pointer' }} onClick={() => onClickDelete(favorite.movieId, favorite.userFrom)}>Remove</button></td>
        </tr>
    })

    return (
        <div style={{ width: '85%', margin: '3rem auto' }}>
            <h2>Favorite Movies</h2>
            <hr />

            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Remove from favorites</th>
                    </tr>
                </thead>
                <tbody>
                    {renderCards}
                </tbody>
            </table>

        </div>
    )
}

export default FavoritePage
