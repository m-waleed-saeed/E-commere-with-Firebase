import React from "react"
import { ConfigProvider } from 'antd'
import './App.scss'
import Routes from './pages/Routes'
import '@ant-design/v5-patch-for-react-19';
import ScreenLoader from './components/ScreenLoader';
import { useAuthContext } from './contexts/Auth';

function App() {
  const { isAppLoading} = useAuthContext()
  return (
    <>
      <ConfigProvider theme={{ tokan: { colorPrimary: "#1d3557" } }}>
        {isAppLoading ? <ScreenLoader /> : <Routes />}
      </ConfigProvider>
    </>
  )
}

export default App