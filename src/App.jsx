import { BrowserRouter,Link,Route,Routes } from 'react-router-dom';

import Step01 from "./components/step01"
import Page2 from './components/Page2';
import Page3 from './components/Page3';
import Page4 from './components/Page4';
import Page5 from './components/Page5';
import Page6 from './components/Page6';
import Page26 from './components/Page26';
import Page29 from './components/Page29';
import LoginPage from './components/loginPage';

import '@fontsource/inter/400.css'; // Normal weight
import '@fontsource/inter/600.css'; // Semi-bold weight
import '@fontsource/inter/700.css'; // Bold weight

// import '@fontsource/inter/variable.css'; 

function App() {

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/" element={<Step01/>} />
        <Route path="/page1" element={<Step01/>} />
        <Route path="/page2" element={<Page2/>} />
        <Route path="/page3" element={<Page3/>} />
        <Route path="/page4" element={<Page4/>} />
        <Route path="/page5" element={<Page5/>} />
        <Route path="/page6" element={<Page6/>} />
        <Route path='/page26' element={<Page26/>} />
        <Route path='/page29' element={<Page29/>}/>
        <Route path='/LoginPage' element= {<LoginPage/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
