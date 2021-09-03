# MVC(S) - Architecture

- Model
- View
- Controller
- Services

# Model

- likedSongList
- commentsForSong
- playlist [private, public]
- musicRooms
- membersListInMusicRoom
- playlistHistory
- musicRoomPlaylist
- bookmarks

# View

- Player - Music and Video

  - switchToAudioVideo
  - volumeControl
  - playbackSpeed
  - skipForward
  - rewind
  - playMediaWithTimestamp

  - Video Controls

    - pictureInPictureMode
    - changeVideoQuality
    - dragAndDrop

  - Audio Controls
    - editSoundEffects
    - homeScreenLyrics

- VolumeControl
- PlayList
- SongRecommendations - params
- Notification
- Like
- Rate
- Search
- Comments
- MusicRoom [private, public]
- MembersInMusicRoom [show currently playing song next to member]
- ViewMember
- DisplayLyrics (button)
- LyricsView
- GrantUserAccess
- PreviewAudio
- PreviewVideo
- PlaylistHistory

# Controller

- addMusicButton
- addPlaylist
- createPlaylist
- addSongToPlaylist - param (url)
- savePlaylistToAccount
- deletePlaylist
- deleteSongFromPlaylist
- sharePlaylist
- shareSongLink
- shareVideoWithTimestamp
- shareAudioWithTimestamp
- sortPlaylist - params (shuffle, time, mostPlayed, recentlyAdded, genre)
- importPlaylistFromYouTube
- songRecommendations - param (favoriteArtist, genre, ratings)
- playlistRecommendation - params (history)
- searchSongs - params (title, lyrics, artist, genre)
- songNotifications - params ()
- rateSongs
- comment
- removeSongFromPlaylist
- likeSong
- viewMembersInMusicRoom
- getLyricsOfSong
- addLyricsToSong
- inviteUserToMusicRoom
- grantUserAccess
- downloadMusicFilesToPhone
- importPlaylistWithUrl
- saveSoundEffects
- bookmarkSongs

# Service

- playlistService

  - savePlaylist
  - importPlaylistFromYouTube

- lyricsService
  - getLyricsOfSong
