/*
 * @Author: czy0729
 * @Date: 2021-03-06 16:26:10
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-10-28 21:39:06
 */
import Crypto from '@utils/crypto'

export const defaultKey = 'recent'

export const defaultSort = '1/50'

export const paginationOnePage = {
  page: 1,
  pageTotal: 1
} as const

export const TEXT_TINYGRAIL_WARNING = Crypto.get(
  // eslint-disable-next-line max-len
  'U2FsdGVkX184ikUpqMz0T3UKk9y1mYZUsiVGdrjP2ODzmOn7aD+XFlQykgq/rGNRTUyTxmesYvct+CvL49dh/tDJ2FFTeSLXj5Awkpfyto+Fc9iQ1/U0T6jKX6Mpjys2UZ5EicrABKopEwILn5SsjFhhbidpyp7Wj5npcY6YORwn+Aw7W86fkwTrwi4eFNT8FJSpdTib3UKjZyrjAupTgdBEEwA6hMgKw26W4dyCNZE7a1Je13GePzW2WlBQ7FhS1Y8uZ9o3BrrdsljUlbS1KNlWbkey1xn0RTAYxPqhAY9bIcx4dyI/D+BvaTOHvL2i5b4CXpHkgaY2ioQkdgw/BAukwOeZ9IsLKJaaXqz+QpOeiq8gu0gRMxV5E6feBLzMRCClkES6I6pQ1Fk1RT7YG+AyLuldkEtvm8FBQKMAtY1RHtKo2QR4kPA6VfiZAGfsA45NLiuoLX8gTn+pxpF5fZslj87/0UEgk8wuF0U0dKM='
) as string
