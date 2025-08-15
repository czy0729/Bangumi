/*
 * @Author: czy0729
 * @Date: 2022-08-03 11:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-03-23 19:53:27
 */
import { HOST_AC_SEARCH } from '@constants/cdn'
import { xhrCustom } from '../fetch'
import { cheerio, htmlMatch } from '../html'
import { t2s } from '../thirdParty/cn-char'
import { similar } from '../utils'

/** 搜索页 */
const HTML_SEARCH = (q: string) => {
  return `${HOST_AC_SEARCH}/all?keyword=${q}`
}

/** 去除部分干扰匹配的文字 */
const REG_FIXED =
  /ORIGINAL|SOUNDTRACK|SOUNDTRACKS|SOUND|TRACKS|TRACK|OST|CD|オリジナルサウンドトラック|剧场版|音乐集|游戏|原声集/g

/** 搜索 */
export async function search(q: string, artist: string) {
  let _q = q
  if (_q.length <= 10 && artist && artist.length <= 6) _q += ` ${artist}`

  const { _response } = await xhrCustom({
    url: HTML_SEARCH(encodeURIComponent(_q))
  })

  try {
    const SIMILAR_RATE = 0.7
    const _q = t2s(q.toLocaleUpperCase()).replace(REG_FIXED, '').trim()
    return (
      cheerio(htmlMatch(_response, '<div class="search-content', '<div id="biliMainFooter"'))(
        '.bili-video-card'
      )
        .map((_index: number, element: any) => {
          const $row = cheerio(element)
          return {
            result_type: 'video',
            title: $row.find('h3').text().trim(),
            cover: `https:${$row.find('picture img').attr('src') || ''}`,
            href: `https:${$row.find('a').attr('href') || ''}`
          }
        })
        .get() as {
        result_type: 'video'
        title: string
        cover: string
        href: string
      }[]
    )
      .filter(item => {
        const title = item.title.toLocaleUpperCase().replace(REG_FIXED, '').trim()
        if (similar(title, _q) >= SIMILAR_RATE || title.includes(_q)) return true

        if (_q.includes('/')) {
          const splits = _q.split('/')
          if (splits.some(item => title.includes(item))) return true
        }

        if (_q.includes('／')) {
          const splits = _q.split('／')
          if (splits.some(item => title.includes(item))) return true
        }

        return false
      })
      .filter((_item, index: number) => index <= 6)
  } catch (ex) {
    console.error(ex)
  }

  return []
}
