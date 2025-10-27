/*
 * @Author: czy0729
 * @Date: 2024-09-08 17:41:51
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-08 17:46:04
 */
export type Props = {
  item: string
  index: number
  thumbs: {
    url: string
    headers?: {
      Referer?: string
    }
  }[]
  epsThumbsHeader: {
    Referer?: string
  }
}
