import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { FaGlobe, FaLanguage } from 'react-icons/fa';

function LangToggle() {
    const { i18n , t } = useTranslation();
    const changeLang = (e) => {
        if(e.target.value==='ar'){
            document.body.dir='rtl'
        }
        else {
            document.body.dir='ltr'
        }

        i18n.changeLanguage(e.target.value);
        setShow(false);
    }
    const [show, setShow] = useState(false);
    const toggle = () => {
        setShow(prev => !prev);
    }
    return (
        <div className=' '>
            {show && <ul className='space-y-2 fixed bottom-14 ltr:right-[4%] rtl:left-[4%] w-20 py-2 rounded transition-all duration-300 transform  bg-gray-700 text-white flex flex-col items-center '>
                <button onClick={changeLang} value='ar'>
                    عربي
                </button>
                <button onClick={changeLang} value='en'>
                    EN
                </button>
            </ul>}
            <div onClick={toggle} className='flex items-center justify-center flex-col space-y-2'>
                <FaLanguage className='cursor-pointer fill-blue-400  text-lime-800 w-12 h-12' />

            </div>
        </div>
    )
}

export default LangToggle;
// <div className='flex flex-col '>
// <ul className={`${show ?  'block' : 'hidden'}`}>
//     <li>
//         AR
//         <FaLanguage />
//     </li>
//     <li>
//         EN
//         <FaLanguage />
//     </li>
// </ul>

// <button className='mt-4' onClick={setShow(!show)}>
//     <FaGlobe/>
// </button>
// </div>