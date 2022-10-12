import React, { useState } from 'react'
import QRCode from "react-qr-code"
import { QrReader } from "react-qr-reader";

//https://github.com/TylerPottsDev/yt-react-qr-generator

function App() {
  const [value, setValue] = useState('')
  const [startScan, setStartScan] = useState(false);
  const [loadingScan, setLoadingScan] = useState(false);
  const [camera, setCamera] = useState("user")
  const [data, setData] = useState("");

  const [width, setWidth] = useState(window.innerWidth);

  let isDesktop = (width > 768);

  const hadleScan = (result, error) => {
    setLoadingScan(false)
    if (!!result) {
      setData(result?.text);
      setStartScan(!startScan)
    }

    if (!!error) {
      console.info(error);
    }
  }

  return (
    <div className=' p-3 container mx-auto '>
      <h1 className='py-4 font-bold text-center text-2xl'>StudQR</h1>
      <p className='mb-4'>Инструкциясы: Вебсайттын ссылкасын қойыңыз</p>
      <input
        onChange={(e) => setValue(e.target.value)}
        value={value}
        type="text"
        placeholder="Введите ссылку"
        className="border border-gray-300 w-full h-8 p-4 font-light text-sm focus"
      />
      <QRCode
        className='mx-auto mt-20'
        value={value}
      />

      <div className='mt-5 pt-4 border-t-4'>
        <h1 className=' mb-4 font-bold text-center text-2xl'>QR code scanner</h1>
        <button
          className=' bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded'
          onClick={() => {
            setStartScan(!startScan);
          }}
        >
          {startScan ? "Stop Scan" : "Start Scan"}
        </button>

        {loadingScan && <p className='text-center mt-3'>Загрузка...</p>}
        {data !== "" && <p className='mt-3'>Результат QR code: <a className='text-[#3067ce]' href={data}>{data}</a></p>}

        {startScan && (
          <>
            <select className='ml-3 border' onChange={(e) => setCamera(e.target.value)}>
              <option value={"environment"}>Camera 1</option>
              <option value={"user"}>Camera 2</option>
              {/* <option value={{exact: "user"}}>Camera 3</option>
              <option value={{exact: "user"}}>Camera 4</option> */}
            </select>
            <div className='p-3'>
              <QrReader
                className='max-w-xl mx-auto mt-1'
                constraints={
                  isDesktop
                  ? {
                    video: {
                      facingMode: { exact: `user` }
                    }
                  }
                  : {
                      video: {
                          facingMode: { exact: `environment` }
                      }
                    }
                }
                onResult={hadleScan}
                style={{ width: '100%' }}
              />
            </div>

          </>
        )}

      </div>
    </div>
  )
}

export default App