import { useState } from 'react'
import './App.css'
import Input from './Input'

function App() {

  const [ data, setData ] = useState(null);
  
  const handleCallback = (childData) => {
    setData(JSON.parse(childData));
  }

  console.log(data);

  return (
    <>
      <h1 className="logo">Github Stats</h1>
      <div className=".card">Enter a Github username: <Input parentCallback={handleCallback}/></div>
      {data && <table>
        <tbody>
          <tr>
            {data && <th>Repository Count</th>}
            <td>{data && data["repoCount"]}</td>
          </tr>
          <tr>
            {data && <th>Fork Count</th>}
              {data && Object.keys(data["forkCount"]).map((key, index) => (
              <tr className="innerRow">
                <td key={index}>{key} : {data["forkCount"][key]}</td>
              </tr>
            ))}
          </tr>
          <tr>
            {data && <th>Languages</th>}
            {data && Object.keys(data["languages"]).map((key, index) => (
              <tr className="innerRow">
                <td key={index}>{key} : {data["languages"][key]}</td>
              </tr>
            ))}
          </tr>
        </tbody>
      </table>}
    </>
  )
}

export default App
