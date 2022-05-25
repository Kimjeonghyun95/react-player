import { BrowserRouter, Routes, Route } from 'react-router-dom'
import React from 'react'
import App from './App'
import { ThemeProvider } from 'styled-components'
import theme from './style/theme'
import GlobalStyle from './style/global'

const Router = () => {
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<App />} />
        </Routes>
      </ThemeProvider>
    </BrowserRouter>
  )
}

export default Router
