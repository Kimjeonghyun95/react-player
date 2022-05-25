import { useEffect, useRef, useState } from 'react'
import PlayerControls from './PlayerControls'
import styled from 'styled-components'
import ReactPlayer from 'react-player'
import screenfull from 'screenfull'
import Side from './Side'

function Player() {
  const [player, setPlayer] = useState({
    playing: false,
    played: 0,
    watch: false,
    playerRate: 1,
    tracks: true,
    muted: true,
    volume: 0.5,
  })
  const [showSpinner, setShowSpinner] = useState(false)
  const [rateStyle, setRateStyle] = useState({ opacity: '0' })
  const [subtitlesStyle, setSubtitlesStyle] = useState({ opacity: '0' })
  const [rateColor, setRateColor] = useState('1.0')
  const [subtitleColor, setSubtitleColor] = useState('자막끄기')
  const [trackLang, setTrackLang] = useState()
  const [isSideActive, setIsSideActive] = useState(false)
  const [quality, setQuality] = useState(null)

  const playerRef = useRef(null)
  const playerWrapperRef = useRef(null)
  const controlsRef = useRef(null)

  useEffect(() => {
    playerWrapperRef.current.focus()
  }, [])

  useEffect(() => {
    const textTracks = playerRef.current.getInternalPlayer()?.textTracks

    for (let i = 0; textTracks?.length && i < textTracks.length; i++) {
      if (textTracks[i].language === trackLang) {
        textTracks[i].mode = 'showing'
      } else {
        textTracks[i].mode = 'hidden'
      }
    }
  }, [trackLang])

  const TimeConversion = seconds => {
    if (isNaN(seconds)) {
      return '00:00'
    }
    const date = new Date(seconds * 1000)
    const hour = date.getUTCHours()
    const min = date.getUTCMinutes().toString().padStart(2, '0')
    const sec = date.getUTCSeconds().toString().padStart(2, '0')

    return hour > 0 ? `${hour}:${min}:${sec}` : `${min}:${sec}`
  }

  const playerCurrentTime =
    playerRef && playerRef.current
      ? playerRef.current.getCurrentTime()
      : '00:00'

  const playerTotalTime =
    playerRef && playerRef.current ? playerRef.current.getDuration() : '00:00'

  const PlayerGoBack = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() - 10)
  }

  const PlayerStop = () => {
    setPlayer({ ...player, playing: !player.playing })
  }

  const PlayerGoForward = () => {
    playerRef.current.seekTo(playerRef.current.getCurrentTime() + 10)
  }

  const PlayerOnProgress = e => {
    if (!player.watch) {
      setPlayer({ ...player, ...e })
    }
  }

  const ChangeSeekBar = e => {
    setPlayer({ ...player, played: e.target.value / 100 })
  }

  const KeyPress = e => {
    if (e.code === 'ArrowLeft') {
      PlayerGoBack()
    }
    if (e.code === 'Space') {
      PlayerStop()
    }
    if (e.code === 'ArrowRight') {
      PlayerGoForward()
    }
  }

  const FullScreen = () => {
    screenfull.toggle(playerWrapperRef.current)
  }

  const MouseDownSeekBar = () => {
    setPlayer({ ...player, watch: true })
  }

  const MouseUpSeekBar = e => {
    playerWrapperRef.current.focus()
    setPlayer({ ...player, watch: false })
    playerRef.current.seekTo(e.target.value / 100)
  }

  const ChangePlayBackRate = rate => {
    setPlayer({ ...player, playerRate: Number(rate) })
    setRateColor(rate)
    setRateStyle({ opacity: '0' })
  }

  const ChangeSubtitle = sub => {
    setTrackLang(sub.lang)
    setSubtitleColor(sub.name)
    setSubtitlesStyle({ opacity: '0' })
  }

  const ChangeMuted = () => {
    setPlayer({ ...player, muted: !player.muted })
  }

  const ChangeVolume = e => {
    console.log('volume', e.target.value)
    const volumeValue = e.target.value / 100
    setPlayer({
      ...player,
      volume: volumeValue,
      muted: volumeValue === 0 ? true : false,
    })
  }

  const getDashData = dash => {
    console.log('dash', dash)
    setQuality(dash)
  }

  const ChangeQuality = e => {
    setShowSpinner(true)

    quality?.getBitrateInfoListFor('video')?.forEach(quality => {
      if (quality.height + 'p' === e.target.innerHTML) {
        console.log(
          'ChangeQuality',
          quality.height,
          quality.qualityIndex,
          e.target.innerHTML
        )
        playerRef.current.player.getInternalPlayer('dash').updateSettings({
          streaming: { abr: { autoSwitchBitrate: { video: false } } },
        })
        playerRef.current.player
          .getInternalPlayer('dash')
          .setQualityFor('video', quality.qualityIndex)
      }
    })
    playerRef.current.seekTo(playerRef.current.getCurrentTime())
    setShowSpinner(false)
  }
  // console.log('Ref', playerRef)
  // console.log('showSpinner', showSpinner)
  // console.log('1,1,1', playerRef?.current?.player?.getInternalPlayer())
  return (
    <>
      <PlayerNav>헤더</PlayerNav>
      <PlayerWrapper
        onKeyDown={KeyPress}
        tabIndex="0"
        ref={playerWrapperRef}
        onMouseMove={() => (controlsRef.current.style.visibility = 'visible')}
        onMouseLeave={() => {
          setTimeout(() => {
            controlsRef.current.style.visibility = 'hidden'
          }, 1500)
        }}
      >
        <ReactPlayer
          className="react-player"
          url="https://dash.akamaized.net/dash264/TestCasesHD/2b/qualcomm/1/MultiResMPEG2.mpd"
          //url="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
          //url="https://bitdash-a.akamaihd.net/content/MI201109210084_1/m3u8s/f08e80da-bf1d-4e3d-8899-f0f6155f6efa.m3u8"
          ref={playerRef}
          width={'100%'}
          height={'100%'}
          volume={player.volume}
          muted={player.muted}
          playing={player.playing}
          controls={false}
          onProgress={PlayerOnProgress}
          playbackRate={player.playerRate}
          onEnded={() => setPlayer({ ...player, playing: false })}
          onBuffer={() => setShowSpinner(true)}
          onBufferEnd={() => setShowSpinner(false)}
          light={false}
          onReady={() => {
            getDashData(playerRef?.current?.player?.player?.dash)
            console.log('시작했다!')
          }}
          config={{
            file: {
              attributes: {
                crossOrigin: 'true',
              },
              tracks: [
                {
                  kind: 'subtitles',
                  src: 'https://raw.githubusercontent.com/benwfreed/test-subtitles/master/mmvo72166981784.vtt',
                  srcLang: 'en',
                  mode: trackLang === 'en' ? 'showing' : 'hidden',
                  default: false,
                },
              ],
            },
          }}
        />
        <PlayerControls
          ref={controlsRef}
          playing={player.playing}
          PlayerStop={PlayerStop}
          PlayerGoBack={PlayerGoBack}
          PlayerGoForward={PlayerGoForward}
          playerCurrentTime={TimeConversion(playerCurrentTime)}
          playerTotalTime={TimeConversion(playerTotalTime)}
          played={player.played}
          ChangeSeekBar={ChangeSeekBar}
          FullScreen={FullScreen}
          MouseDownSeekBar={MouseDownSeekBar}
          MouseUpSeekBar={MouseUpSeekBar}
          rateStyle={rateStyle}
          setRateStyle={setRateStyle}
          ChangePlayBackRate={ChangePlayBackRate}
          rateColor={rateColor}
          subtitlesStyle={subtitlesStyle}
          setSubtitlesStyle={setSubtitlesStyle}
          subtitleColor={subtitleColor}
          ChangeSubtitle={ChangeSubtitle}
          showSpinner={showSpinner}
          setIsSideActive={setIsSideActive}
          muted={player.muted}
          ChangeMuted={ChangeMuted}
          volume={player.volume}
          ChangeVolume={ChangeVolume}
          quality={quality}
          ChangeQuality={ChangeQuality}
        />
        {isSideActive && (
          <div className="sideModal">
            <Side modal={isSideActive} closeModal={setIsSideActive} />
          </div>
        )}
      </PlayerWrapper>
    </>
  )
}

const PlayerNav = styled.div`
  height: 74px;
  color: white;
  text-align: center;
  @media ${props => props.theme.tablet} {
    display: none;
  }
`
const PlayerWrapper = styled.div`
  position: relative;
  padding-top: 56.25%;

  .react-player {
    position: absolute;
    top: 0;
    left: 0;
  }

  .sideModal {
    position: absolute;
    background: rgba(17, 17, 17, 1);
    display: none;
    max-width: 308px;
    max-height: 463px;
    z-index: 999;

    @media ${props => props.theme.tablet} {
      width: 100%;
      height: 100%;
      display: block;
      top: 47px;
      left: 55%;
    }
    @media ${props => props.theme.mobile} {
      display: block;
      max-height: 296px;
      top: 0px;
      left: 52%;
    }
  }
`

export default Player
