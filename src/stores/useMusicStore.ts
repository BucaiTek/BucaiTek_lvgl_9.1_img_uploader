import { defineStore } from 'pinia'

export const useMusicStore = defineStore('musicStore', {
  state: () => ({
    album: '' as string, //专辑
    title: '' as string, //歌曲名
    artist: '' as string, //歌手
    playbackRate: 0 as number, // 0暂停 1播放
    duration: 0 as number, //总时长
    elapsedTime: 0 as number, //已经播放时间
    timestamp: '' as string //时间戳
  }),
  actions: {
    updatePlayingMusic(data: Record<string, any>) {
      if (data) {
        if (data.kMRMediaRemoteNowPlayingInfoTimestamp != this.timestamp) {
          this.album = data.kMRMediaRemoteNowPlayingInfoAlbum
          this.title = data.kMRMediaRemoteNowPlayingInfoTitle
          this.artist = data.kMRMediaRemoteNowPlayingInfoArtist
          this.playbackRate = data.kMRMediaRemoteNowPlayingInfoPlaybackRate
          this.duration = data.kMRMediaRemoteNowPlayingInfoDuration
          this.elapsedTime = data.kMRMediaRemoteNowPlayingInfoElapsedTime
          this.timestamp = data.kMRMediaRemoteNowPlayingInfoTimestamp
        }
      }
    }
  }
})
