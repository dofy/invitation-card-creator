import { createContext, useContext, useState } from 'react'

type DataType = {
  uuid:string
  title: string
  message: string
  showMessage: boolean
  setUUID: (uuid: string) => void
  setTitle: (title: string) => void
  setMessage: (message: string) => void
  setShowMessage: (show: boolean) => void
}

const DefaultData: DataType = {
  uuid: '',
  title: '',
  message: '',
  showMessage: false,
  setUUID: () => {},
  setTitle: () => {},
  setMessage: () => {},
  setShowMessage: () => {},
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
  const [title, setTitle] = useState<string>(DefaultData.title)
  const [message, setMessage] = useState<string>(DefaultData.message)
  const [showMessage, setShowMessage] = useState<boolean>(
    DefaultData.showMessage
  )

  return (
    <DataContext.Provider
      value={{
        uuid,
        title,
        message,
        showMessage,
        setUUID,
        setTitle,
        setMessage,
        setShowMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
