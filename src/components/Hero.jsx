import React from 'react'
import { useTranslation } from 'react-i18next'
import SvgIcon from '../assets/svg/semsar-logo.svg'

export const Hero = () => {
    const { t } = useTranslation();
    return (
        <div className='flex flex-col items-center gap-y-4'>
            <div className={`min-h-[78vh] md:min-h-[80vh] w-screen  bg-svg-background    bg-cover bg-center flex flex-col items-center  justify-center  p-8 relative`}>
                <img src={SvgIcon} alt="logoicon" className='absolute inset-0 -z-10 blur-sm  backdrop-invert opacity-80 w-full h-full bg-contain  object-contain rounded-xl' />
                <div className='absolute h-full w-full bg-black z-10 opacity-50  backdrop-blur-3xl '></div>
                <div className='text-white text-center z-20 flex justify-start flex-col gap-40 '>
                    <h1 className='text-4xl font-bold mb-4'>{t('welcomeSemsar')}</h1>
                    <p className='text-lg'>{t('discover')}</p>
                </div>
            </div>
            <a href='#slider' className='bg-blue-500 scroll-smooth hover:bg-blue-600 text-white  font-bold p-2 rounded-full duration-300 animate-bounce'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 5.25l-7.5 7.5-7.5-7.5m15 6l-7.5 7.5-7.5-7.5" />
                </svg>

            </a>
        </div>
    )
}
