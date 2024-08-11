import { defineStore } from 'pinia'

export const useMusicStore = defineStore('musicStore', {
  state: () => ({
    album: '' as string, //专辑
    title: '' as string, //歌曲名
    artist: '' as string, //歌手
    playbackRate: 0 as number, // 0暂停 1播放
    duration: 0 as number, //总时长
    elapsedTime: 0 as number, //已经播放时间
    timestamp: '' as string, //时间戳
    lyric: '' as string //歌词
  }),
  actions: {
    updatePlayingMusic(data: Record<string, any>) {
      if (data) {
        if (data.kMRMediaRemoteNowPlayingInfoTimestamp != this.timestamp) {
          if (this.title != data.kMRMediaRemoteNowPlayingInfoTitle) {
            this.updateLyric()
          }
          this.album = data.kMRMediaRemoteNowPlayingInfoAlbum
          this.title = data.kMRMediaRemoteNowPlayingInfoTitle
          this.artist = data.kMRMediaRemoteNowPlayingInfoArtist
          this.playbackRate = data.kMRMediaRemoteNowPlayingInfoPlaybackRate
          this.duration = data.kMRMediaRemoteNowPlayingInfoDuration
          this.elapsedTime = data.kMRMediaRemoteNowPlayingInfoElapsedTime
          this.timestamp = data.kMRMediaRemoteNowPlayingInfoTimestamp
        }
      }
    },
    async updateLyric() {
      await window.electronAPI?.music('lyric').then((lyric: string) => {
        this.lyric = lyric
      })
      console.log(this.lyric)
    }
  }
})
