import { useState } from 'react'

const useModalToggle = (initialShow = false) => {
  const [show, setShow] = useState(initialShow)

  const toggleShow = (value?: boolean) => {
    setShow(value ?? !show)
  }
  return { show, toggleShow }
}

export default useModalToggle
