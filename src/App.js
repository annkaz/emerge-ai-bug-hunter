import './App.css';
import { useState } from 'react';
import Editor from "@monaco-editor/react";

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
      <div className="header-title">
        {/* <svg className="logo" src="./target.svg"/> */}
        <h1 className="title ">AI Hunter</h1>
      </div>
      <div className="code-container">
        <CodeInput code={code} setCode={setCode} handleCodeSubmit={handleCodeSubmit} handleClearInput={handleClearInput} loading={loading}/>
        <CodeOutput aiCode={aiCode}/>
      </div>
    </div>
  );
}

function CodeInput({handleCodeSubmit, code, setCode, handleClearInput, loading}) {
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
      <button className="generate-button" onClick={handleClearInput}>Clear input</button>
    </div>
  );
}

function CodeOutput({aiCode}) {

  return (
    <div className="code">
      <Editor
        height="50vh"
        width="664px"
        language="javascript"
        value={aiCode}
        defaultValue="// AI will generate in a second..."/>
    </div>
  );
}

export default App;
