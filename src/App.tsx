import { useRete } from 'rete-react-plugin';
import { createEditor } from './rete';
import './common.css';
import './customization/background.css';
import './App.css'
import './rete.css';

function App() {
  const [ref] = useRete(createEditor)

  return (
    <div className="container">
      <div ref={ref} className="rete"></div>
    </div>
  )
}

export default App
