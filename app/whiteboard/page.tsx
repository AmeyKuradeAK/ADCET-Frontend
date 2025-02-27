import React from 'react'
import Whiteboard from '../components/Whiteboard'
import { ClassNames } from '@emotion/react'
import ExcalidrawToolbar from '../components/Whiteboard1'

type Props = {}

const Home = (props: Props) => {
  return (
    <>
      <div className="flex h-screen">
        {/* Left Side - Whiteboard */}
        <div className="w-1/2 bg-gray-200 flex flex-col justify-center items-center p-4">
          <h2 className="text-xl text-black font-semibold mb-4">Whiteboard</h2>
          <div className="w-full h-full border border-gray-400 rounded-lg bg-white">
            <Whiteboard />
          </div>
        </div>

        {/* Right Side - ML Output */}
        <div className="w-1/2 bg-gray-100 flex flex-col p-4">
          <h2 className="text-xl text-black font-semibold mb-4">Result</h2>
          <div className="border border-gray-400 rounded-lg bg-white p-4 h-full">
            {/* ML Output Display */}
            <p className="text-gray-500">Waiting for ML predictions...</p>
          </div>
        </div>
      </div>
    </>
  )
}

export default Home