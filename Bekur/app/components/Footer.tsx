import React from 'react'

export default function Footer() {
  return (
    <footer className='bg-gray-50 dark:bg-gray-950 border-t-1 border-gray-200 dark:border-gray-900 px-20 py-10 flex flex-col md:flex-row items-center justify-between gap-4'>
      <p>Copyright &copy; {new Date().getFullYear()} Gerami. All right reserved.</p>
      <p className='text-gray-800 dark:text-white'>Powered by <span className='font-medium text-gray-900 dark:text-white'>Mistral</span> and <span className='font-medium text-gray-900 dark:text-white'>Langflow</span></p>
    </footer>
  )
}
