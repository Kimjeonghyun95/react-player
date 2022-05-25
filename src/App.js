import React, { useEffect } from 'react'
import Player from './Player'
import styled from 'styled-components'
import Side from './Side'

const App = () => {
  useEffect(() => {
    document.body.style.overflow = 'hidden'
  }, [])

  return (
    <MainPage>
      <div className="playerContent">
        <Player />
      </div>
      <div className="sideComponent">
        <Side />
      </div>
    </MainPage>
  )
}

const MainPage = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
  background-color: #1a1a1a;
  @media ${props => props.theme.tablet} {
  }

  & .playerContent {
    padding: 0px 20px;
    flex-grow: 1;
    max-width: 1566px;
    height: 1080px;

    @media ${props => props.theme.tablet} {
      padding: 0px;
    }
  }

  & .sideComponent {
    width: 100%;
    max-width: 354px;
    align-self: stretch;
    color: white;

    @media ${props => props.theme.tablet} {
      display: none;
    }
  }
`

export default App
