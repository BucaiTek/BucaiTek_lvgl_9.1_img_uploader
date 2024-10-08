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
    intervalId: null as number | null,
    lyricUpdateFailures: 0 as number,
    percentage: 0 as number
  }),
  actions: {
    togglePlayPause() {
      if (this.playbackRate == 0) {
        this.playbackRate = 1
        window.electronAPI?.music('play')
      } else {
        this.playbackRate = 0
        window.electronAPI?.music('pause')
      }
    },
    next() {
      window.electronAPI?.music('next')
    },
    previous() {
      window.electronAPI?.music('previous')
    },
    updatePlayingMusic(data: Record<string, any>) {
      if (data) {
        if (data.kMRMediaRemoteNowPlayingInfoTitle != this.title) {
          this.playbackRate = data.kMRMediaRemoteNowPlayingInfoPlaybackRate
        }
        //更新音乐
        if (
          data.kMRMediaRemoteNowPlayingInfoTimestamp != this.timestamp ||
          data.kMRMediaRemoteNowPlayingInfoTitle != this.title
        ) {
          this.album = data.kMRMediaRemoteNowPlayingInfoAlbum
          this.title = data.kMRMediaRemoteNowPlayingInfoTitle
          this.artist = data.kMRMediaRemoteNowPlayingInfoArtist
          this.duration = data.kMRMediaRemoteNowPlayingInfoDuration
          this.elapsedTime = data.kMRMediaRemoteNowPlayingInfoElapsedTime
          this.timestamp = data.kMRMediaRemoteNowPlayingInfoTimestamp
          this.lyricUpdateFailures = 0
        }
        //更新歌词
        if (
          this.title != data.kMRMediaRemoteNowPlayingInfoTitle ||
          this.lyric == '' ||
          this.lyricsData.length == 0 ||
          this.musicInfo.ti != this.title
        ) {
          if (this.title != undefined && this.title != '') {
            this.updateLyric()
            this.lyricUpdateFailures += 1
          }
        }
      }
    },
    async updateLyric() {
      if (this.lyricUpdateFailures == 3) {
        if (navigator.language == 'zh-CN') {
          this.lyricsData = [{ time: 0, text: '无法找到歌词' }]
        } else {
          this.lyricsData = [{ time: 0, text: 'Unable to find lyrics' }]
        }
      }
      if (this.lyricUpdateFailures >= 3) {
        return
      }
      this.lyric = ''
      this.lyricsData = []
      await window.electronAPI?.music('lyric').then((lyric: string) => {
        this.lyric = lyric
        this.lyricsData = this.parseLRC(lyric)
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
      const lrcData: LyricLine[] = []
      const timeRegex = /\[(\d{2}):(\d{2})\.(\d{2,3})\]/
      const metadataRegex = /\[(ti|ar|al):(.+)\]/

      lines.forEach((line) => {
        const timeMatch = line.match(timeRegex)
        if (timeMatch) {
          const minutes = parseInt(timeMatch[1], 10)
          const seconds = parseInt(timeMatch[2], 10)
          const milliseconds = parseInt(timeMatch[3], 10)
          const time = minutes * 60 * 1000 + seconds * 1000 + milliseconds
          const text = line.replace(timeRegex, '').trim()
          lrcData.push({ time, text })
        } else {
          // Parse metadata tags
          const metadataMatch = line.match(metadataRegex)
          if (metadataMatch) {
            const tag = metadataMatch[1]
            const value = metadataMatch[2]
            switch (tag) {
              case 'ti':
                this.musicInfo.ti = value
                break
              case 'ar':
                this.musicInfo.ar = value
                break
              case 'al':
                this.musicInfo.al = value
                break
            }
          }
        }
      })

      return lrcData
    },
    updateCurrentLyric() {
      if (this.playbackRate !== 0) {
        if (this.lyricsData.length == 0) {
          this.currentLyric = ''
        } else {
          const now = Date.now()
          const timestampDate = new Date(this.timestamp).getTime()
          // 计算当前应该播放的时间点
          const adjustedTime = this.elapsedTime * 1000 + (now - timestampDate) * this.playbackRate

          if (this.duration > 0) {
            this.percentage = adjustedTime / (this.duration * 10)
          }
          // 找到最后一个时间戳小于或等于 adjustedTime 的歌词
          let currentLyricIndex = this.lyricsData.findIndex((line, index) => {
            // 判断是否为最后一行或下一行时间戳大于 adjustedTime
            return this.lyricsData[index + 1]
              ? this.lyricsData[index + 1].time > adjustedTime
              : true
          })
          // 确保找到有效的索引，并且设置当前歌词
          if (currentLyricIndex !== -1) {
            if (this.lyricsData[currentLyricIndex].text.startsWith('[tr]')) {
              currentLyricIndex -= 1
            }
            this.currentLyric = this.lyricsData[currentLyricIndex].text
          }
        }
      }
    }
  }
})
