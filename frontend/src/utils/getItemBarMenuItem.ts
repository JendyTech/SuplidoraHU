import { ItemMenu } from '@interfaces/TopBar'

export const getItemBarMenuItem = (pathname: string, array: ItemMenu[]) => {
  for (const element of array) {
    if (match(pathname, element.url)) {
      return element
    }
  }


  return null
}

const match = (pathname: string, url: string) => {
  if (!url.includes(':')) {
    return pathname === url
  }

  const regex = new RegExp('^' + url.replace(/:\w+/g, '[^/]+') + '$')
  return regex.test(pathname)
}