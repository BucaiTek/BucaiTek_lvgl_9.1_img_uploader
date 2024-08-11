import { defineStore } from 'pinia'
interface LyricLine {
  time: number // 时间毫秒
  text: string // 歌词文本
}
export const useMusicStore = defineStore('musicStore', {
  state: () => ({
    album: '' as string, //专辑
    title: '' as string, //歌曲名
    artist: '' as string, //歌手
    playbackRate: 0 as number, // 0暂停 1播放
    duration: 0 as number, //总时长
    elapsedTime: 0 as number, //已经播放时间
    timestamp: '' as string, //时间戳
    lyric: '' as string, //歌词
    currentLyric: '' as string,
    lyricsData: [] as LyricLine[],
    // 其他音乐元数据
    musicInfo: {
      ti: '' as string, // 歌曲标题
      ar: '' as string, // 歌手
      al: '' as string, // 专辑
      length: '' as string // 歌曲长度
    },
    intervalId: null as number | null
  }),
  actions: {
    updatePlayingMusic(data: Record<string, any>) {
      if (data) {
        if (
          data.kMRMediaRemoteNowPlayingInfoTimestamp != this.timestamp ||
          data.kMRMediaRemoteNowPlayingInfoTitle != this.title
        ) {
          this.album = data.kMRMediaRemoteNowPlayingInfoAlbum
          this.title = data.kMRMediaRemoteNowPlayingInfoTitle
          this.artist = data.kMRMediaRemoteNowPlayingInfoArtist
          this.playbackRate = data.kMRMediaRemoteNowPlayingInfoPlaybackRate
          this.duration = data.kMRMediaRemoteNowPlayingInfoDuration
          this.elapsedTime = data.kMRMediaRemoteNowPlayingInfoElapsedTime
          this.timestamp = data.kMRMediaRemoteNowPlayingInfoTimestamp
        }
        if (
          this.title != data.kMRMediaRemoteNowPlayingInfoTitle ||
          this.lyric == '' ||
          this.lyricsData.length == 0
        ) {
          this.lyric = ''
          this.lyricsData = []
          this.updateLyric()
        }
      }
    },
    async updateLyric() {
      await window.electronAPI?.music('lyric').then((lyric: string) => {
        this.lyric = lyric
        this.lyricsData = this.parseLRC(lyric)
        console.log(this.lyricsData)
        if (this.intervalId) {
          if (this.intervalId) {
            clearInterval(this.intervalId)
            this.intervalId = null
          }
        }
        this.intervalId = setInterval(() => {
          this.updateCurrentLyric()
        }, 500)
      })
    },
    parseLRC(lrcContent: string): LyricLine[] {
      const lines = lrcContent.split('\n')
      const lrcData: LyricLine[] = [] // 显式指定 lrcData 的类型
      const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/

      lines.forEach((line) => {
        const timeMatch = line.match(timeRegex)
        if (timeMatch) {
          const minutes = parseInt(timeMatch[1], 10)
          const seconds = parseInt(timeMatch[2], 10)
          const milliseconds = parseInt(timeMatch[3], 10)
          const time = minutes * 60 * 1000 + seconds * 1000 + milliseconds
          const text = line.replace(timeRegex, '').trim()
          lrcData.push({ time, text })
        }
      })

      return lrcData
    },
    updateCurrentLyric() {
      if (this.playbackRate !== 0) {
        const now = Date.now()
        const timestampDate = new Date(this.timestamp).getTime()
        // 计算当前应该播放的时间点
        const adjustedTime = this.elapsedTime * 1000 + (now - timestampDate) * this.playbackRate
        // 找到最后一个时间戳小于或等于 adjustedTime 的歌词
        let currentLyricIndex = this.lyricsData.findIndex((line, index) => {
          // 判断是否为最后一行或下一行时间戳大于 adjustedTime
          return this.lyricsData[index + 1] ? this.lyricsData[index + 1].time > adjustedTime : true
        })
        // 确保找到有效的索引，并且设置当前歌词
        if (currentLyricIndex !== -1) {
          this.currentLyric = this.lyricsData[currentLyricIndex].text
        }
      }
    }
  }
})
