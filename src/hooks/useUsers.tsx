import { useEffect, useState } from 'react'

import { getUsers } from '../services/users'
import { FlatUser } from '../types/types'

export const useUsers = (name: string) => {
  const [users, setUsers] = useState<FlatUser[]>([])
  useEffect(() => {
    getUsers(name)
      .then(items => {
        setUsers(items)
      })
      .catch(() => setUsers([]))
  }, [name])

  return users
}
