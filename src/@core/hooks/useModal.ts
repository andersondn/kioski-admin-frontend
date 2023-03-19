import { useState } from 'react'

interface UseModal {
  isShowing: boolean
  open: (item: any) => void
  close: () => void
  selected: any
}

const useModal = <T>() => {
  // store which has been selected
  const [selected, setSelected] = useState<T | null>()
  const [isShowing, setIsShowing] = useState<boolean>(false)

  const open = (item: T) => {
    setSelected(item)
    setIsShowing(true)
  }

  const close = () => {
    setSelected(null)
    setIsShowing(false)
  }

  return {
    isShowing,
    open,
    close,
    selected
  }
}

export default useModal
