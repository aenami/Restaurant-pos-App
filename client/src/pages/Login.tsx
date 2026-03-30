import { useState } from 'react'
import { ArrowRight, Dot, IdCard, Lock, Eye, EyeOff } from 'lucide-react'

function Login() {
    const [isVisible, setIsVisible] = useState(false)

    const handlerPassword = () => {
        setIsVisible(!isVisible)
    }
  return (
    <main className='w-screen h-screen grid grid-cols-1 
                    md:grid-cols-[2fr_1fr] 
                    bg-[#1f1714]'>

        {/* ---- Contenedor IZQUIERDO ----- */}
        <div className='relative h-screen'>
            {/* --- div IMAGEN de fondo --- */}
            <div className='absolute inset-0 bg-[url(./assets/login/fondo.png)] bg-contain grayscale bg-no-repeat bg-center '></div>
            
            {/* --- div EFECTO sobre la imagen --- */}
            <div className='absolute inset-0 bg-black/50 '></div>
            
            {/* --- div de CONTENIDO */}
            <section className='absolute flex flex-col gap-4 bottom-10 left-10 lg:bottom-20 lg:left-25 max-w-2xl'>
                <span className='text-[#bd734c] text-sm'>────── HIGH VELOCITY STATIONS</span>

                <div className='text-6xl font-bold sm:text-6xl lg:8xl'>
                    <h1 className='text-white'>PRECICION</h1>
                    <h1 className='text-[#ff9157] italic'>IN MOTION.</h1>
                </div>
                
                <span className='text-[#5a5858] text-lg'>The Kinetic Hearth POS. Professional tools for the high-velocity atelier. Authenticate to begin service.</span>
            </section>
            
        </div>
        
        {/* ---- Contenedor DERECHO ---- */}
        <aside className='bg-[#0e0e0e] font text-[#a8aaaa] flex flex-col gap-8 p-16' >
            {/* -- Titulo -- */}
            <div>
                <h2 className='text-[#ff9157] text-3xl font-bold'>YOUR BUSSINES</h2>
                <h2 className='text-[#ff9157] text-3xl font-bold'>HEART</h2>
                <span className='text-lg'>Service Management Interface</span>
            </div>

            <div className='flex flex-col gap-6'>
                
                {/* --- Formulario --- */}
                <form action="" className='flex flex-col gap-6'>
                    {/* -- Input Email -- */}
                    <div className='group'>
                        <label htmlFor="email" className='group-focus-within:text-[#ff8c4e]'>PERSONNAL EMAIL</label>

                        <div className='relative flex flex-col gap-2'>
                            <IdCard  size={30} 
                            className='absolute left-3 top-3'/>

                            <input type="email" id="email" placeholder='name@gmail.com' required 
                            className='bg-black ring-1 focus:ring-2 focus:ring-[#ff8c4e]/40 rounded-xl py-4 pl-14 pr-4 transition-all outline-none '/> 
                        </div>

                    </div>
                    
                    {/* -- Input contraseña -- */}
                   <div className='group'>
                        <div className='flex justify-between'>
                            <label htmlFor="password" className='group-focus-within:text-[#ff8c4e]'>ACCESS PIN </label>
                            <label htmlFor="password" className=''>FORGOT PASSWORD?</label>
                        </div>
                        

                        <div className='relative flex flex-col gap-2'>
                            <Lock  size={30} 
                            className='absolute left-3 top-3'/>
                            <input type={ isVisible ? 'text': 'password' } id="password" placeholder='******' required 
                            className='bg-black ring-1 focus:ring-2 focus:ring-[#ff8c4e]/40 rounded-xl py-4 pl-14 pr-14 transition-all outline-none '/> 
                            { isVisible ?  <EyeOff size={30} 
                            className='absolute right-3 top-3 cursor-pointer'
                            onClick={ handlerPassword }/> 
                            : 
                            <Eye size={30} 
                            className='absolute right-3 top-3 cursor-pointer'
                            onClick={ handlerPassword }/>}
                            
                        </div>

                    </div>

                    <button className='bg-[#ff8c4e] text-black flex justify-center align-middle gap-4 border-none rounded-md p-5 font-bold text-lg cursor-pointer hover:bg-[#f86b20]' >
                        Initialize Session <ArrowRight/>
                    </button>

                </form>
                
                {/* --- Informacion inferior --- */}
                <div className='flex gap-8'>
                    <div className='flex gap-4'>
                        <Dot color='yellow'/>
                        <span>SYSTEM STATUS: ONLINE/OFFLINE</span>
                    </div>
                    <div>
                        <span>VER 1.0.0 STABLE</span>
                    </div>
                </div>
                
            </div>
            
        </aside>

    </main>

  )
}

export default Login
