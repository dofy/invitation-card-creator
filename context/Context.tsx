import { createContext, useContext, useState } from 'react'

type DataType = {
  title: string
  message: string
  showMessage: boolean
  setTitle: (title: string) => void
  setMessage: (message: string) => void
  setShowMessage: (show: boolean) => void
}

const DefaultData: DataType = {
  title: '',
  message: '',
  showMessage: false,
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
  const [title, setTitle] = useState<string>(DefaultData.title)
  const [message, setMessage] = useState<string>(DefaultData.message)
  const [showMessage, setShowMessage] = useState<boolean>(
    DefaultData.showMessage
  )

  return (
    <DataContext.Provider
      value={{
        title,
        message,
        showMessage,
        setTitle,
        setMessage,
        setShowMessage,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
