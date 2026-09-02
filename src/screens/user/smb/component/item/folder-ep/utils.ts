/*
 * @Author: czy0729
 * @Date: 2023-11-17 15:10:59
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-02 12:33:17
 */
import aniep from '@utils/thirdParty/aniep'

/** 缓存搜索过的结果 */
const cacheMap = new Map<string, [number, string]>()

const KEYWORDS_MAP = {
  nced: 'ed',
  ncop: 'op',
  ova: 'ova',
  oad: 'oad',
  '[ed': 'ed',
  ' ed': 'ed',
  '[op': 'op',
  ' op ': 'op',
  ' sp': 'sp',
  '[sp': 'sp',
  '[mov': 'mov',
  ' pv': 'pv',
  '[pv': 'pv',
  ' cm': 'cm',
  '[cm': 'cm',
  ' menu': 'mn',
  '[menu': 'mn',
  recap: 're'
} as const

/** 文件名猜测章节 */
export function getEp(input: string) {
  if (!input) return [null, '']

  const name = input.toLocaleLowerCase().replace(' end ', '')
  if (cacheMap.has(name)) return cacheMap.get(name)

  const ep = aniep(name) as number

  let type = ''
  for (const keyword of Object.keys(KEYWORDS_MAP) as (keyof typeof KEYWORDS_MAP)[]) {
    if (name.includes(keyword)) {
      type = KEYWORDS_MAP[keyword]
      break
    }
  }

  const result: [number, string] = [ep, type]
  cacheMap.set(name, result)
  return result
}
