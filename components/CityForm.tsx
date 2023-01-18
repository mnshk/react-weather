import React from 'react'
import Task from './Task'


export default function TodoForm({ city, setCity, searchWeather, btn }: { city: string | undefined, setCity: any, searchWeather: any, btn: any }) {
    return (
        <div className=''>
            <form className="flex p-5 max-w-xl mx-auto" onSubmit={(e) => { searchWeather(e); }} >
                <input placeholder="Start typing..." value={city} onChange={(e) => { setCity(() => e.target.value) }} type="text" className='flex-grow w-full mr-2 rounded-lg text-white border-slate-700 bg-slate-800 p-3 text-md  font-semibold outline-none focus:border-orange-600 border-2 transition-all' />
                <button type="submit" className='bg-teal-400 text-black drop-shadow-lg active:scale-95 transition-all py-2 px-5 rounded-lg flex-shrink-0  font-bold flex justify-center items-center'>{btn}</button>
            </form>
        </div>
    )
}
