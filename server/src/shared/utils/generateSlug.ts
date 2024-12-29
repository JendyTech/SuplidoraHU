export const generateSlug = (title: string) => {
  const charMap: Record<string, string> = {
    á: 'a',
    à: 'a',
    ã: 'a',
    â: 'a',
    ä: 'a',
    é: 'e',
    è: 'e',
    ê: 'e',
    ë: 'e',
    í: 'i',
    ì: 'i',
    î: 'i',
    ï: 'i',
    ó: 'o',
    ò: 'o',
    õ: 'o',
    ô: 'o',
    ö: 'o',
    ú: 'u',
    ù: 'u',
    û: 'u',
    ü: 'u',
    ý: 'y',
    ÿ: 'y',
    ñ: 'n',
    ç: 'c',
    æ: 'ae',
    œ: 'oe',
    ß: 'ss',
    '@': 'at',
    $: 's',
    '&': 'and',
    '%': 'percent',
    '\\+': 'plus',
  }

  return title
    .toLowerCase()
    .replace(
      new RegExp(Object.keys(charMap).join('|'), 'g'),
      (char) => charMap[char] || char,
    )
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .replace(/-+/g, '-')
}

