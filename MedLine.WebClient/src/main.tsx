import ReactDOM from 'react-dom/client'
import App from './app/App.tsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ConfigProvider } from 'antd'
import StoreProvider from './app/StoreProvider/storeProvider/storeProvider.tsx'
import { StoreProviderContext } from './app/StoreProvider/storeProvider/storeProviderContext.ts'
import axios from 'axios'

axios.defaults.withCredentials = true;

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StoreProviderContext.Provider value={new StoreProvider}>
  <ConfigProvider>
    <BrowserRouter>
        <App />
    </BrowserRouter>
  </ConfigProvider>
  </StoreProviderContext.Provider>
)
