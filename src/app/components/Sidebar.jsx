import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
export function Sidebar() {
    const pathName = usePathname()
    return (
        <nav className="flex flex-col bg-[#004b87]  max-w-[220px] min-h-screen h-full transition-all duration-300" role="navigation">
            <div className='flex align-middle justify-center items-center w-[220px] h-[220px] pt-8 bg-gradient-to-r from-[#004b87] via-[#421062] to-[#a6192e] '>

                <Image id="imgLogo" src="/logo.png" width={50} height={50} alt="Diebold Nixdorf" />
            </div>
            <div className="sidebar-collapse">
                <ul className="" id="">
                    <li className=''>
                        <Link href="/" className={pathName === '/' ? 'text-[#A9B1C0] font-semibold text-2xlg h-full w-full p-4 flex items-center align-middle justify-center bg-[#a6192e] hover:text-white hover:no-underline focus:no-underline' : 'text-[#A9B1C0] font-semibold text-2xlg h-full w-full p-4 flex items-center align-middle justify-center hover:bg-[#a6192e] hover:text-white hover:no-underline'} >
                            Dashboard
                        </Link>
                        {/* <Link href="/" shallow prefetch={false} className='text-[#A9B1C0] font-semibold text-2xlg h-full w-full p-4 flex items-center align-middle justify-center hover:bg-[#a6192e] hover:text-white hover:no-underline'>
                            Dashboard
                        </Link> */}
                    </li>
                    <li className=''>
                        <Link href="/settings" className={pathName === '/settings' ? 'text-[#A9B1C0] font-semibold text-2xlg h-full w-full p-4 flex items-center align-middle justify-center bg-[#a6192e] hover:text-white hover:no-underline focus:no-underline' : 'text-[#A9B1C0] font-semibold text-2xlg h-full w-full p-4 flex items-center align-middle justify-center hover:bg-[#a6192e] hover:text-white hover:no-underline'}>
                        Configurações
                        </Link>
                        {/* <Link href="/settings" shallow prefetch={false} className='text-[#A9B1C0] font-semibold text-2xlg h-full w-full p-4 flex items-center align-middle justify-center hover:bg-[#a6192e] hover:text-white hover:no-underline'>
                            Settings
                        </Link> */}
                    </li>
                </ul>
            </div>
        </nav>
    )
}