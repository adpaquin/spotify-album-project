# README

## Overview
My app, Album Analytics, is a React/Rails application that aims to give the user a deeper understanding of their music library.

The app connects to a user's Spotify account and renders tiles of a user's albums on the screen as clickable React components. Clicking on an album will bring the user to a details page about the album including a list of songs and a graph showing six of the album's audio attributes. Selecting an album from the bottom bar will overall that album's graph as well, so the user can compare and contrast their different albums

On the home page, clicking the "Create a Playlist" button will bring the user to a form where they can create a new playlist with song's from any of the albums in the database. The playlist can also be given a name and a cover image. After submitting, the playlist will be added to the home page to be explored as well.


## Technologies

**rspotify Ruby gem**
- Wrapper for the Spotify API that assists in connecting

**React-Vis**
- Data visualization library created by Uber

**CarrierWave**
- Rails library to assist in uploading files/images


## Notes

During devlopement, please sign in with the following credentials:
- Email: test@<span></span>email.com
- Password: password
