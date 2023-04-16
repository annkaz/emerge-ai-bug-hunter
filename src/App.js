import './App.css';
import { useState } from 'react';
import Editor from "@monaco-editor/react";
import { ReactComponent as Logo } from './target.svg';

function App() {
  const [code, setCode] = useState('');
  const [aiCode, setAiCode] = useState('');
  const [loading, setLoading] = useState(false);

  const handleCodeSubmit = async () => {
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'},
      body: JSON.stringify({ code })
    }
    try {
      setLoading(true)
      setAiCode('// Loading...')

      const response = await fetch('http://localhost:3001/api/generate', requestOptions);
      if (!response.ok) {
        throw new Error('Network response was not ok.');
      }
      const data = await response.json();
      setLoading(false)
      setAiCode(data.choices[0].text);
    } catch (error) {
      console.log(error);
    }
  }

  const handleClearInput = () => {
    setCode('// input your code here...');
    setAiCode('// AI will generate in a second...');
  }

  return (
    <div className="main">
      {/* <Bug className="bug"/> */}
      <div className="header-title">
        <Logo className="logo"/>
        <h1 className="title ">AI Hunter</h1>
      </div>
      <p className="description">Paste your code into the input box and AI will suggest a bug fix</p>
      <div className="code-container">
        <CodeInput code={code} setCode={setCode} handleCodeSubmit={handleCodeSubmit} loading={loading}/>
        <CodeOutput aiCode={aiCode} handleClearInput={handleClearInput}/>
      </div>
    </div>
  );
}

function CodeInput({handleCodeSubmit, code, setCode, loading}) {
  return (
    <div className="code">
      <Editor
        height="50vh"
        width="664px"
        language="javascript"
        value={code}
        defaultValue="// input your code here..."
        onChange={(val) => setCode(val)}/>

      <button className="generate-button" onClick={handleCodeSubmit}>{!loading ? 'Generate' : 'Generating...'}</button>
      {/* <button className="generate-button" onClick={handleClearInput}>Clear input</button> */}
    </div>
  );
}

function CodeOutput({aiCode, handleClearInput}) {

  return (
    <div className="code">
      <Editor
        height="50vh"
        width="664px"
        language="javascript"
        value={aiCode}
        defaultValue="// AI will generate in a second..."/>
      <button className="generate-button" onClick={handleClearInput}>Clear input</button>
    </div>
  );
}

export default App;
