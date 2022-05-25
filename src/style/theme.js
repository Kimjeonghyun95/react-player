const size = {
  mobile: '640px',
  tablet: '1024px',
  laptop: '1200px',
  desktop: '1500px',
}

const theme = {
  mainColor: '#0a4297',
  mobile: `(max-width: ${size.mobile})`,
  tablet: `(max-width: ${size.tablet})`,
  laptop: `(max-width: ${size.laptop})`,
  desktop: `(min-width: ${size.desktop})`,
}

export default theme
