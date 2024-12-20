import { BrowserRouter,Link,Route,Routes } from 'react-router-dom';

import Mui from "./components/Mui"
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Page4 from './components/Page4';
import Page5 from './components/Page5';
import Page6 from './components/Page6';

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Mui/>} />
        <Route path="/page1" element={<Mui/>} />
        <Route path="/page2" element={<Page2/>} />
        <Route path="/page3" element={<Page3/>} />
        <Route path="/page4" element={<Page4/>} />
        <Route path="/page5" element={<Page5/>} />
        <Route path="/page6" element={<Page6/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
