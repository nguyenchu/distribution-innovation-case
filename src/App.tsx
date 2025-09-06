import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getStreetCollections } from './lib/addresshelper'

function App() {
  const [data, setData] = useState<string>('Loading...')

  useEffect(() => {
    getStreetCollections('NO', 'Bøkkerveien, Oslo')
      .then(response => setData(JSON.stringify(response, null, 2)))
      .catch(error => setData(`Error: ${error.message}`))
  }, [])

  return (
    <div style={{ padding: '1rem', fontFamily: 'system-ui' }}>
      <h1>Røyk-test AddressHelper</h1>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{data}</pre>
    </div>
  )
}

export default App
