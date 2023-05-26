export function isServer() {
  return typeof window === 'undefined'
}

export const isLoggedIn = () => {
  const accessToken = sessionStorage.getItem('accessToken')
  if (accessToken) {
    return true
  }
  return false
}

export const findGender = (value, list) => {
  if (value) {
    return Array.isArray(list) && list.find((item) => item?.defineKey === value)?.defineName
  } else {
    return '---'
  }
}

// const event = new Map()
// const eventObj = [
//   {
//     id: '1',
//     start: '2023-02-05',
//     end: '2023-02-30',
//     title: 'full time',
//   },
// ]
export const calendarDataGenerator = () => {}
