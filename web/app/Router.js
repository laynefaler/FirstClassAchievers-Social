import React from 'react'
import { Route, IndexRoute, Redirect } from 'react-router'

// Pages
import MasterPage from './pages/MasterPage'
import MainPage from './pages/MainPage/MainPage'
import TestimonialPage from './pages/TestimonialPage/TestimonialPage'
import AboutUsPage from './pages/AboutUsPage/AboutUsPage'
import ProfilePage from './pages/ProfilePage/ProfilePage'
import FavoritesPage from './pages/FavoritesPage/FavoritesPage'
import DetailPage from './pages/DetailPage/DetailPage'
import DetailEntry from './pages/DetailEntry/DetailEntry'


export default (
    <Route>

        <Route path="/" component={MasterPage}>
            <IndexRoute component={MainPage} />
            <Route path="testimonials" component={TestimonialPage} />
            <Route path="testimonials/:entryId" component={DetailEntry} />
            <Route path="about" component={AboutUsPage} />
            <Route path="profile" component={ProfilePage} />
            <Route path="favorites" component={FavoritesPage} />
            <Route path="profile/:userId" component={DetailPage} />
        </Route>

    </Route>
)
