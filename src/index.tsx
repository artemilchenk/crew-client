import { createRoot } from 'react-dom/client'
import { ThemeProvider } from 'styled-components'
import { Normalize } from 'styles/normalize'
import { GlobalStyles } from 'styles/global'
import { theme } from 'styles/theme'
import { App } from 'components/App/index'
import { Provider as StoreProvider } from 'react-redux'
import { store } from 'store'


createRoot(document.getElementById('root')!).render(
  <StoreProvider store={store}>
    <ThemeProvider theme={theme}>
      <Normalize />
      <GlobalStyles />
      <App />
    </ThemeProvider>
  </StoreProvider>,
)
