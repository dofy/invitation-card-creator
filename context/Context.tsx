import { createContext, useContext, useState } from 'react'

type DataType = {
  uuid: string
  show: boolean
  title: string
  message: string
  setUUID: (uuid: string) => void
  showMessage: (title: string, message: string) => void
  hideMessage: () => void
}

const DefaultData: DataType = {
  uuid: '',
  show: false,
  title: '',
  message: '',
  setUUID: () => {},
  showMessage: () => {},
  hideMessage: () => {},
}

const DataContext = createContext<DataType>(DefaultData)

export function useData() {
  return useContext(DataContext)
}

type Props = {
  children: React.ReactNode
}

export function DataProvider({ children }: Props) {
  const [uuid, setUUID] = useState<string>(DefaultData.uuid)
  const [show, setShow] = useState<boolean>(DefaultData.show)
  const [title, setTitle] = useState<string>(DefaultData.title)
  const [message, setMessage] = useState<string>(DefaultData.message)

  const showMessage = (title: string, message: string) => {
    setTitle(title)
    setMessage(message)
    setShow(true)
  }

  const hideMessage = () => {
    setShow(false)
  }

  return (
    <DataContext.Provider
      value={{
        uuid,
        show,
        title,
        message,
        setUUID,
        showMessage,
        hideMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
