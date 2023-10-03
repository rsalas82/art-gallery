import { FlatUser, User } from '../types/types'

export function adaptUserList(user: User): FlatUser {
  return {
    image: user.picture.thumbnail,
    name: `${user.name.first} ${user.name.last}`,
    username: user.login.username,
    id: user.id.value,
    address: `${user.location.street.number} ${user.location.street.name}`,
    postcode: user.location.street.number.toString(),
    city: user.location.city,
    country: user.location.country,
    age: user.dob.age.toString(),
    gender: user.gender,
    email: user.email,
  }
}
