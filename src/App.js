import React, { useState } from 'react'
import QRCode from "react-qr-code"
//https://github.com/TylerPottsDev/yt-react-qr-generator

function App() {
  const [value, setValue] = useState('')
  return (
    <div className='container mx-auto w-2/4'>
      <h1 className='py-4 font-bold text-center text-2xl'>StudQR</h1>
      <p className='mb-4'>Инструкциясы: Вебсайттын ссылкасын қойыңыз</p>
      <input
      onChange={(e) => setValue(e.target.value) }
      value={value}
      type="text"
      placeholder="Введите ссылку"
      className="border border-gray-300 w-full h-8 p-4 font-light text-sm focus"
      />
      <QRCode 
      className='mx-auto mt-20'
      value={value}
      />

    </div>
  )
}

export default App