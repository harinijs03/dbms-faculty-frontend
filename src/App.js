
import './App.css';
import HomePage from './pages/HomePage';
import { Routes,Route } from 'react-router-dom';
import QuestionPool from './pages/QuestionPool';
import CreateQuestionPage from './pages/CreateQuestionPage';
import EditQuestionPage from './pages/EditQuestionPage';
import ViewQuestionPage from './pages/ViewQuestionPage';
import AddNewTestCasePage from './pages/AddNewTestCasePage';
import TestCasesPool from './pages/TestCasesPool';
import EditTestCasePage from './pages/EditTestCasePage';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<HomePage/>}/>
        <Route path='/questionpool' element={<QuestionPool/>}/>
        <Route path='/createquestion' element={<CreateQuestionPage/>}/>
        <Route path='/editquestion/:id' element={<EditQuestionPage/>}/>
        <Route path='/viewquestion/:id' element={<ViewQuestionPage/>}/>
        <Route path='/addtestcasepage/:id' element={<AddNewTestCasePage/>}/>
        <Route path='/viewtestcase/:id' element={<TestCasesPool/>}/>
        <Route path='/edittestcase/:id' element={<EditTestCasePage/>}/>
      </Routes>
    </div>
  );
}

export default App;
