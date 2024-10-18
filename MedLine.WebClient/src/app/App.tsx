import { useEffect, useState } from 'react'
import { ConfigProvider, Layout, Spin } from 'antd'
import Navbar from '../widgets/navbar/Navbar'
import AppRouter from './router/AppRouter'
import { observer } from 'mobx-react-lite'
import { useStoreProvider } from './StoreProvider/storeProvider/storeProviderContext'
import { fetchPerson } from '../features/Person/getPerson/fetchPerson'
import Version from './Version'
import './App.css'

const App = observer(() => {


  const [loading, setLoading] = useState<boolean>(true)
  const { rootStore } = useStoreProvider();

  useEffect(() => {
    const userId = new URLSearchParams(window.location.search).get('userId');

    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0 || navigator.maxTouchPoints > 0;

    if(isTouchDevice) {
      const styleElement = document.createElement('style');
      styleElement.innerHTML = `
      html, body {
          overflow-y: auto;
          scrollbar-width: none;
      }
      
      body::-webkit-scrollbar {
          display: none;
      } `;
      

      document.head.appendChild(styleElement)
    }
    const fetchData = async () => {

      try{
      var user = await fetchPerson(userId);
      await rootStore.fetchUserInfo(user)
      }
      catch(error) {
        console.log(error)
      } finally{
        setLoading(false)
      }}
    fetchData();
  }, []);

  Version();


  if (loading) {
    return (
        <Spin spinning={loading} fullscreen={true} />
    )
  }

  return (
        <ConfigProvider>
          <Layout>
            <Navbar/>
                <Layout.Content>
                  <AppRouter/>
                </Layout.Content>
          </Layout>
        </ConfigProvider>
  )
}
)
export default App
