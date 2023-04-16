import { useState } from "react"
import axios from "axios"

export default function Home() {
  const [query, setQuery] = useState("");
  const [response, setResponse] = useState([]);
  const [lastResponse, setLastResponse] = useState("");

  const submitHandle = (e) => {
    e.preventDefault();

    axios.post("/api/response", {
        question: query,
      })
      .then((res) => {
        const newResponse = [
          {
            id: response.length + 1,
            question: query,
            response: res.data.response,
          },
          ...response,
        ];
        setResponse(newResponse);
        setLastResponse({
          response: res.data.response,
          question: res.data.question,
        });
      })
      .then(() => setQuery(""));
  };

  const deleteResponse = () => {
    setResponse([]);
    setLastResponse("");
  };

  return (
    <main className="w-screen h-screen bg-zinc-900">
      <form className="" onSubmit={submitHandle}>
        <div className="flex justify-center items-center gap-x-3 font-medium pt-28">
          <input spellCheck="false" value={query} onChange={e => setQuery(e.target.value)} className="bg-zinc-800 rounded-md h-12 w-96 px-4 outline-none text-zinc-300" placeholder="Ask me something..."/>
          <button disabled={!query} className="bg-blue-500 px-4 h-12 rounded-md text-zinc-100 disabled:opacity-50">Submit</button>
          {response.length > 0 && (
            <button onClick={deleteResponse} className="bg-red-500 text-red-100 px-4 h-12 rounded-md">Delete Responses</button>
          )}
        </div>

      </form>

      {lastResponse && (
      <div className="flex justify-center items-center mt-8">
        <div>
          <div className="pl-6 pr-12 py-6 bg-zinc-800 rounded-md h-auto text-zinc-200 font-medium flex flex-col justify-between">
            <div className="flex items-center justify-center">
              <div className="mr-4 py-2 px-4 rounded-md bg-zinc-900">Last</div>
              <div>
                <div className="text-blue-500">Question: <span className="text-white ml-2">{lastResponse.question}</span></div>
                <div className="text-blue-500">Response: <span className="text-white ml-2">{lastResponse.response}</span></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      )}
      
      {response.length > 1 && (
      <>
      <div className="text-blue-600 text-3xl font-bold mt-20 flex items-center justify-center">Response History</div>
      <div className="flex flex-grow justify-center items-center">
        <div className="grid gap-x-6 gap-y-6 mt-8 mx-20">
          { response.map(item => (
            <div key={item.id} className="pl-6 pr-12 py-6 bg-zinc-800 rounded-md h-auto text-zinc-200 font-medium flex flex-col justify-between">
              <div className="flex items-center justify-start">
                <div className="mr-4 py-2 px-4 rounded-md bg-zinc-900">{item.id}</div>
                <div>
                  <div className="text-blue-500">Question: <span className="text-white ml-2">{item.question}</span></div>
                  <div className="text-blue-500">Response: <span className="text-white ml-2">{item.response}</span></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      </>
      )}
    </main>
  )
}