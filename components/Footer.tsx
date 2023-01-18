import React from 'react'
import { FiLink } from 'react-icons/fi'

export default function Footer() {
    return (
        <div className='p-5 pt-20 z-50 flex flex-col justify-center text-slate-300  text-sm text-center'>
            <div className='text-xs'>
                Designed & Built by Munish
            </div>
            <div className='text-xs flex justify-center items-center'>
                <a href="https://munish.dev" className='text-teal-400'>
                    <div className="flex items-center">
                        <FiLink />
                        <div>
                            &nbsp;munish.dev
                        </div>
                    </div>
                </a>
            </div>
        </div>
    )
}
