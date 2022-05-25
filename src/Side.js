import React, { useState } from 'react'
import styled from 'styled-components'

const Side = ({ modal, closeModal }) => {
  const [menu, setMenu] = useState('목차')

  const menuList = [
    'PART 1.빛방향과 그림자',
    'PART 2.빛방향과 그림자',
    'PART 3.빛방향과 그림자',
  ]
  return (
    <SidePage>
      <ul>
        {['목차', '레퍼런스', '브러쉬', '메모'].map((list, index) => (
          <li
            className={menu === list ? 'indexOn' : ''}
            key={index}
            onClick={() => setMenu(list)}
          >
            {list}
          </li>
        ))}
        {modal && (
          <div className="closeWrap">
            <div className="closeIcon" onClick={() => closeModal(false)}>
              &times;
            </div>
          </div>
        )}
      </ul>

      <div className="menuList">
        {menuList.map((item, index) => (
          <div className="menuItem" key={index}>
            {item}
          </div>
        ))}
      </div>
    </SidePage>
  )
}

const SidePage = styled.div`
  .closeWrap {
    display: flex;
    justify-content: space-between;
    .closeIcon {
      display: flex;
      justify-content: end;
      width: 50px;
      color: rgba(191, 191, 191, 1);
      cursor: pointer;

      @media ${props => props.theme.tablet} {
        width: 80px;
      }
    }
  }
  ul {
    display: flex;
    list-style-type: none;
    margin-top: 28px;
    border-bottom: 1px solid rgba(58, 58, 58, 1);
    color: rgba(114, 114, 114, 1);

    @media ${props => props.theme.tablet} {
      margin-top: 0px;
      padding: 16px 16px 0px 16px;
    }

    li {
      margin-right: 32px;
      padding-bottom: 24px;
      font-size: 16px;
      font-weight: 700;
      cursor: pointer;

      @media ${props => props.theme.tablet} {
        margin-right: 16px;
        font-size: 13px;
        padding-bottom: 16px;
      }
    }
    .indexOn {
      color: rgba(255, 162, 0, 1);
      border-bottom: 3px solid #ffa200;
    }
  }

  .menuList {
    display: flex;
    flex-direction: column;
    margin-top: 20px;

    @media ${props => props.theme.tablet} {
      margin-top: 0px;
    }
    .menuItem {
      background: #282828;
      color: rgba(191, 191, 191, 1);
      padding: 16px 30px;
      border-bottom: 1px solid #3a3a3a;
      border-radius: 5px;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 16px;

      @media ${props => props.theme.tablet} {
        padding: 14.5px 16px;
        margin-bottom: 0px;
      }
    }
  }
`
export default Side
