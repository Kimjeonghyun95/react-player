import React, { forwardRef } from 'react'
import styled from 'styled-components'
import { useState } from 'react'
import { RiFullscreenExitFill } from 'react-icons/ri'
import {
  BsFillVolumeMuteFill,
  BsVolumeUpFill,
  BsGearFill,
} from 'react-icons/bs'
import { MdOutlineSubtitles } from 'react-icons/md'
import {
  CgPlayTrackPrev,
  CgPlayPause,
  CgPlayStop,
  CgPlayTrackNext,
} from 'react-icons/cg'
import { GiHamburgerMenu } from 'react-icons/gi'
import Loading from './Loading'

const PlayerControls = forwardRef(
  (
    {
      PlayerStop,
      playing,
      PlayerGoBack,
      PlayerGoForward,
      playerCurrentTime,
      playerTotalTime,
      played,
      ChangeSeekBar,
      FullScreen,
      MouseDownSeekBar,
      MouseUpSeekBar,
      rateStyle,
      setRateStyle,
      ChangePlayBackRate,
      rateColor,
      subtitlesStyle,
      setSubtitlesStyle,
      subtitleColor,
      ChangeSubtitle,
      showSpinner,
      setIsSideActive,
      muted,
      ChangeMuted,
      volume,
      ChangeVolume,
      quality,
      ChangeQuality,
    },
    ref
  ) => {
    const [style, setStyle] = useState({ display: 'none' })
    const [isActive, setIsActive] = useState(false)

    const subtitle = [
      { name: 'English', lang: 'en' },
      { name: '자막끄기', lang: '' },
    ]

    const OpenRate = () => {
      rateStyle.opacity === '0'
        ? setRateStyle({ opacity: '1' })
        : setRateStyle({ opacity: '0' })
    }

    const OpenSubtitles = () => {
      subtitlesStyle.opacity === '0'
        ? setSubtitlesStyle({ opacity: '1' })
        : setSubtitlesStyle({ opacity: '0' })
    }

    const ChangeBurgerMenu = () => {
      setIsActive(false)
      setIsSideActive(true)
    }

    return (
      <ControlsWrapper ref={ref}>
        <div className="controlsWrapperBottom">
          <input
            className="seekBar"
            type="range"
            min="0"
            max="100"
            step="1"
            value={played * 100}
            onChange={ChangeSeekBar}
            onMouseDown={MouseDownSeekBar}
            onMouseUp={MouseUpSeekBar}
            onTouchStart={MouseDownSeekBar}
            onTouchEnd={MouseUpSeekBar}
          />
          <div className="controlsDiv">
            <div className="controlsLeft">
              <div className="playerIcon">
                <CgPlayTrackPrev onClick={PlayerGoBack} />
                <div onClick={PlayerStop}>
                  {playing ? <CgPlayPause /> : <CgPlayStop />}
                </div>
                <CgPlayTrackNext onClick={PlayerGoForward} />
              </div>
              <div
                className="playerVolume"
                onMouseEnter={() => {
                  setStyle({ display: 'block' })
                }}
                onMouseLeave={() => {
                  setStyle({ display: 'none' })
                }}
              >
                {muted ? (
                  <BsFillVolumeMuteFill onClick={ChangeMuted} />
                ) : (
                  <BsVolumeUpFill onClick={ChangeMuted} />
                )}
                <div className="volumeDiv">
                  <input
                    style={style}
                    className="volumeBar"
                    type="range"
                    min="0"
                    max="100"
                    value={muted ? 0 : volume * 100}
                    onChange={ChangeVolume}
                  />
                </div>
              </div>
              <span>
                {playerCurrentTime} / {playerTotalTime}
              </span>
            </div>
            <div className="controlsRight">
              {quality
                ?.getBitrateInfoListFor('video')
                ?.map((quality, index) => (
                  <button key={index} onClick={ChangeQuality}>
                    {quality.height}p
                  </button>
                ))}
              <div className="burgerOption">
                <GiHamburgerMenu
                  className="burgerMenu"
                  onClick={() => setIsActive(!isActive)}
                />
                {isActive && (
                  <ul className="burgerList">
                    {['목차', '브러쉬', '레퍼런스', '메모'].map(
                      (rate, index) => (
                        <li key={index} onClick={ChangeBurgerMenu}>
                          {rate}
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>
              <div className="speedOption">
                <BsGearFill onClick={OpenRate} />
                <ul className="optionList" style={rateStyle}>
                  {['0.5', '0.8', '1.0', '1.2', '1.5', '2.0'].map(
                    (rate, index) => (
                      <li
                        key={index}
                        className={rateColor === rate ? 'colorOn' : ''}
                        onClick={() => ChangePlayBackRate(rate)}
                      >
                        {rate}x
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div className="subtitlesOption">
                <MdOutlineSubtitles onClick={OpenSubtitles} />
                <ul className="subtitlesList" style={subtitlesStyle}>
                  {subtitle.map((subtitles, index) => (
                    <li
                      key={index}
                      className={
                        subtitleColor === subtitles.name ? 'colorOn' : ''
                      }
                      onClick={() => ChangeSubtitle(subtitles)}
                    >
                      {subtitles.name}
                    </li>
                  ))}
                </ul>
              </div>
              <RiFullscreenExitFill onClick={FullScreen} />
            </div>
          </div>
        </div>
        {showSpinner && (
          <div className="loading">
            <Loading />
          </div>
        )}
      </ControlsWrapper>
    )
  }
)

const ControlsWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column-reverse;
  justify-content: space-between;
  z-index: 1;

  .controlsWrapperBottom {
    background-color: rgba(0, 0, 0, 0.05);

    > input[type='range'] {
      -webkit-appearance: none;
      overflow: hidden;
      height: 3px;
      //margin: 10px 0;
      width: 100%;
      background: #ffffff;
    }

    > input[type='range']:focus {
      outline: none;
    }

    > input[type='range']::-webkit-slider-runnable-track {
      width: 100%;
      height: 100%;
      cursor: pointer;
      border-radius: 5px;
    }

    > input[type='range']::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 1px;
      height: 20px;
      background: #ffa200;
      box-shadow: 1px 1px 7px #ffa200;
      cursor: pointer;
      box-shadow: -100vw 0 0 100vw #ffa200;
    }

    .seekBar {
      width: 99.5%;
      outline: none;
      cursor: pointer;
    }

    .controlsDiv {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px 20px;

      .controlsLeft {
        display: flex;
        align-items: center;

        span {
          color: rgba(191, 191, 191, 1);
          letter-spacing: -0.02em;
          font-size: 14px;
          line-height: 150%;
          user-select: none;
        }

        .playerIcon {
          display: inline-flex;
          height: 24px;
          gap: 20px;

          svg {
            width: 24px;
            height: 24px;
            color: white;
            cursor: pointer;
          }
        }

        .playerVolume {
          display: inline-flex;
          margin: 0px 30px;

          .volumeDiv {
            display: flex;

            > input[type='range'] {
              -webkit-appearance: none;
              overflow: hidden;
              height: 3px;
              margin: 10px 0;
              width: 100px;
              background: #ffffff;
            }

            > input[type='range']:focus {
              outline: none;
            }

            > input[type='range']::-webkit-slider-runnable-track {
              width: 100%;
              height: 100%;
              cursor: pointer;
              border-radius: 5px;
            }

            > input[type='range']::-webkit-slider-thumb {
              -webkit-appearance: none;
              width: 1px;
              height: 20px;
              background: #ffa200;
              box-shadow: 1px 1px 7px #ffa200;
              cursor: pointer;
              box-shadow: -100vw 0 0 100vw #ffa200;
            }
          }

          svg {
            color: white;
            width: 24px;
            height: 24px;
            margin-right: 10px;
            cursor: pointer;
          }
        }
      }

      .controlsRight {
        display: flex;
        align-items: center;

        .burgerMenu {
          display: none;

          @media ${props => props.theme.tablet} {
            display: block;
          }
        }
        .burgerOption {
          display: flex;
          position: relative;

          .burgerList {
            display: none;

            @media ${props => props.theme.tablet} {
              display: block;
              width: 78px;
              position: absolute;
              list-style-type: none;
              padding: 0px;
              left: -15px;
              bottom: 44px;
              margin: 4px 0px;
              background: #282828;
              color: rgba(255, 255, 255, 1);
            }

            li {
              text-align: center;
              padding: 3px 10px;
              cursor: pointer;

              &.colorOn {
                color: #ffa200;
              }

              :hover {
                background: #434343;
              }
            }
          }
        }

        .speedOption {
          display: flex;
          position: relative;

          .optionList {
            display: flex;
            flex-direction: column-reverse;
            position: absolute;

            left: 5px;
            bottom: 44px;
            list-style-type: none;
            padding: 0px;
            margin: 4px 0px;
            background: #282828;
            color: rgba(255, 255, 255, 1);

            li {
              text-align: center;
              padding: 3px 10px;
              cursor: pointer;

              &.colorOn {
                color: #ffa200;
              }

              :hover {
                background: #434343;
              }
            }
          }
        }

        .subtitlesOption {
          .subtitlesList {
            position: absolute;
            bottom: 63px;
            padding: 0px;
            background: #282828;
            color: rgba(255, 255, 255, 1);
            list-style-type: none;
            li {
              text-align: center;
              padding: 3px 10px;
              cursor: pointer;

              &.colorOn {
                color: #ffa200;
              }
              :hover {
                background: #434343;
              }
            }
          }
        }

        svg {
          color: white;
          font-size: 30px;
          margin-left: 15px;
          cursor: pointer;
        }
      }
    }
  }

  .loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
  }
`

export default PlayerControls
