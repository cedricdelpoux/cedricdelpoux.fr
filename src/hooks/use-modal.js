import {useState} from "react"

import useEscape from "./use-escape"

const useModal = () => {
  const [isOpen, setIsOpen] = useState(false)

  function openModal() {
    setIsOpen(true)
  }

  function closeModal() {
    setIsOpen(false)
  }

  useEscape(closeModal)

  return {
    isModalOpen: isOpen,
    openModal,
    closeModal,
  }
}

export default useModal
