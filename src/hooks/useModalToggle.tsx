import { useState } from 'react'

const useModalToggle = (initialShow = false) => {
  const [show, setShow] = useState(initialShow)

  const toggleShow = () => {
    setShow(!show)
  }
  return { show, toggleShow }
}

export default useModalToggle
