import { useState } from 'react'
import Header from './components/Header'

function App() {

  const [open, setOpen] = useState(false)

  return (
    <div className="App">
      <Header
        open={open}
        setOpen={setOpen} />

    </div>
  );
}

export default App;
