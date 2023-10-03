import { adaptUserList } from '../adapters/users'
import { FlatUser, User } from '../types/types'

export async function getUsers(name: string): Promise<FlatUser[]> {
  return fetch(`${process.env.EXPO_PUBLIC_API_URL}?results=20&seed=art-gallery`, {
    method: 'GET',
  })
    .then(response => response.json())
    .then(({ results }) => {
      const users: FlatUser[] = results.map((user: User) => adaptUserList(user))
      return Promise.resolve(
        name === ''
          ? users
          : users.filter(user => {
              return user.name.toLocaleLowerCase().includes(name.toLocaleLowerCase())
            }),
      )
    })
}
