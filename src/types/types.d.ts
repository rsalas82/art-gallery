export interface User {
  gender: string
  name: Name
  location: Location
  email: string
  login: Login
  dob: BirthDate
  registered: BirthDate
  phone: string
  cell: string
  id: UserID
  picture: UserPicture
  nat: string
}

export interface FlatUser {
  name: string
  id: string
  image: string
  address: string
  username: string
  age: string
  gender: string
  email: string
  postcode: string
  city: string
  country: string
}

export interface BirthDate {
  date: string
  age: number
}

export interface UserID {
  name: string
  value: string
}

export interface Location {
  street: Street
  city: string
  state: string
  country: string
  postcode: number
  coordinates: Coordinates
  timezone: Timezone
}

export interface Coordinates {
  latitude: string
  longitude: string
}

export interface Street {
  number: number
  name: string
}

export interface Timezone {
  offset: string
  description: string
}

export interface Login {
  uuid: string
  username: string
  password: string
  salt: string
  md5: string
  sha1: string
  sha256: string
}

export interface Name {
  title: string
  first: string
  last: string
}

export interface UserPicture {
  large: string
  medium: string
  thumbnail: string
}
