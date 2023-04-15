import './App.css';
import { useState } from 'react';
import Editor from "@monaco-editor/react";

function App() {
  const [code, setCode] = useState('');
  const [aiCode, setAiCode] = useState('');

  const handleCodeSubmit = async () => {
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ code })
    }
    setAiCode(code);
    // try {
    //   const response = await fetch('', requestOptions);
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok.');
    //   }
    //   const data = await response.json();
    //   setAiCode(data.code);
    // } catch (error) {
    //   console.log(error);
    // }
  }
  const handleExecuteCode = () => {}

  const handleClearInput = () => {
    setCode('// input your code here...');
    setAiCode('// AI will generate in a second...');
  }

  return (
    <div className="main">
      <h1 className="title ">AI Bug Hunter</h1>
      <div className="code-container">
        <CodeInput code={code} setCode={setCode} handleCodeSubmit={handleCodeSubmit} handleClearInput={handleClearInput}/>
        <CodeOutput aiCode={aiCode}/>
      </div>
    </div>
  );
}

function CodeInput({handleCodeSubmit, code, setCode, handleExecuteCode, handleClearInput}) {
  return (
    <div className="code">
      <Editor
        height="50vh"
        width="664px"
        language="javascript"
        value={code}
        defaultValue="// input your code here..."
        onChange={(val) => setCode(val)}/>
      {/* <textarea
        placeholder="Input your code here..."
        onChange={(e) => setCode(e.target.value)}
        value={code}/> */}
      <button className="generate-button" onClick={handleCodeSubmit}>Generate</button>
      <button className="generate-button" onClick={handleExecuteCode}>Execute code</button>
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
