/*
 * @Author: czy0729
 * @Date: 2022-09-24 22:02:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-09-24 22:03:06
 */
import { HENTAI_TAGS } from '@utils/subject/hentai'

export function getType(state: any = {}, index: number): 'main' | undefined {
  const { chara, job, body, content } = state?.query
  const value = HENTAI_TAGS[index]
  return chara === value || job === value || body === value || content === value
    ? 'main'
    : undefined
}
