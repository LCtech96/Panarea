'use client'

import { useState } from 'react'
import ThemeToggle from './ThemeToggle'

export default function Navbar() {
  const [showReviewModal, setShowReviewModal] = useState(false)
  const [showDisclaimerModal, setShowDisclaimerModal] = useState(false)

  const handleReviewClick = () => {
    setShowReviewModal(true)
  }

  const closeReviewModal = () => {
    setShowReviewModal(false)
  }

  const handleDisclaimerClick = () => {
    setShowDisclaimerModal(true)
  }

  const closeDisclaimerModal = () => {
    setShowDisclaimerModal(false)
  }

  return (
    <>
      <nav className="fixed bottom-0 left-0 right-0 md:top-0 md:bottom-auto z-50 bg-white shadow-lg md:shadow-md dark:bg-gray-800 dark:text-white border-t md:border-t-0 md:border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-around items-center h-16 md:h-20">
            {/* Menù Button */}
            <button
              onClick={handleDisclaimerClick}
              className="flex flex-col items-center justify-center px-3 py-2 text-sm md:text-base font-medium text-gray-700 hover:text-orange-600 transition-colors dark:text-gray-200 dark:hover:text-orange-500"
            >
              <svg
                className="w-6 h-6 md:w-7 md:h-7 mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <span className="text-xs md:text-sm">Menù</span>
            </button>

            {/* Chi Siamo Button */}
            <button
              onClick={handleDisclaimerClick}
              className="flex flex-col items-center justify-center px-3 py-2 text-sm md:text-base font-medium text-gray-700 hover:text-orange-600 transition-colors dark:text-gray-200 dark:hover:text-orange-500"
            >
              <svg
                className="w-6 h-6 md:w-7 md:h-7 mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-xs md:text-sm">Chi Siamo</span>
            </button>

            {/* Google Reviews Button - Central */}
            <button
              onClick={handleReviewClick}
              className="flex flex-col items-center justify-center px-3 py-2 text-sm md:text-base font-medium text-gray-700 hover:text-orange-600 transition-colors dark:text-gray-200 dark:hover:text-orange-500"
            >
              <svg
                className="w-6 h-6 md:w-7 md:h-7 mb-1"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
              <span className="text-xs md:text-sm">Recensioni</span>
            </button>

            {/* Asporto Button */}
            <button
              onClick={handleDisclaimerClick}
              className="flex flex-col items-center justify-center px-3 py-2 text-sm md:text-base font-medium text-gray-700 hover:text-orange-600 transition-colors dark:text-gray-200 dark:hover:text-orange-500"
            >
              <svg
                className="w-6 h-6 md:w-7 md:h-7 mb-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-xs md:text-sm">Asporto</span>
            </button>
            
            {/* Theme Toggle */}
            <div className="flex items-center">
              <ThemeToggle />
            </div>
          </div>
        </div>
      </nav>

      {/* Disclaimer Modal */}
      {showDisclaimerModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full overflow-hidden flex flex-col dark:bg-gray-900 dark:text-white">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Info</h2>
              <button
                onClick={closeDisclaimerModal}
                className="text-gray-500 hover:text-gray-700 text-2xl dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>
            <div className="p-6">
              <p className="text-gray-700 text-center text-lg dark:text-gray-300">
                Stiamo lavorando per aggiungere tutte queste funzionalità
              </p>
            </div>
            <div className="p-4 border-t dark:border-gray-700">
              <button
                onClick={closeDisclaimerModal}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-lg transition-colors font-semibold"
              >
                Chiudi
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Google Reviews Modal */}
      {showReviewModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col dark:bg-gray-900 dark:text-white">
            <div className="flex justify-between items-center p-4 border-b dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">Lascia una Recensione</h2>
              <button
                onClick={closeReviewModal}
                className="text-gray-500 hover:text-gray-700 text-2xl dark:text-gray-400 dark:hover:text-gray-200"
              >
                ×
              </button>
            </div>
            <div className="flex-1 overflow-hidden p-6">
              <div className="h-full flex flex-col items-center justify-center space-y-4">
                <p className="text-gray-700 text-center mb-4 dark:text-gray-300">
                  Clicca sul pulsante qui sotto per lasciare una recensione su Google
                </p>
                <a
                  href="https://share.google/1syh5aJu6nf3sKz7g"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full transition-colors inline-flex items-center gap-2"
                >
                  <svg
                    className="w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                  Lascia una Recensione su Google
                </a>
                <p className="text-sm text-gray-500 text-center mt-4 dark:text-gray-400">
                  Si aprirà una nuova finestra con la pagina delle recensioni Google
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

