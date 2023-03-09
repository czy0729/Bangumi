/*
 * Bilibili 搜索逻辑
 * @Author: czy0729
 * @Date: 2022-08-03 11:20:54
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-06 13:09:15
 */
import { similar } from '../utils'
import { xhrCustom } from '../fetch'
import { HTMLDecode } from '../html'
import { t2s } from '../thirdParty/cn-char'

/** 搜索页 */
const HTML_SEARCH = (q: string) => {
  return `https://search.bilibili.com/all?keyword=${q}`
}

/** 去除部分干扰匹配的文字 */
const REG_FIXED =
  /ORIGINAL|SOUNDTRACK|SOUNDTRACKS|SOUND|TRACKS|TRACK|OST|CD|オリジナルサウンドトラック|剧场版|音乐集|游戏|原声集/g

/** 搜索 */
export async function search(q: string, artist: string) {
  let _q = q
  if (_q.length <= 10 && artist && artist.length <= 6) _q += ` ${artist}`

  const { _response } = await xhrCustom({
    url: HTML_SEARCH(_q)
  })

  try {
    let data: any

    // eslint-disable-next-line no-eval
    eval(
      _response
        .split('<script>')[1]
        .split('</script>')[0]
        .split(';(function()')[0]
        .replace('window.__INITIAL_STATE__=', 'data=')
    )

    const target = data.flow[data.flow.fields[0]].result
    const index = target.findIndex(item => item.result_type === 'video')
    if (index !== -1) {
      const SIMILAR_RATE = 0.7
      const _q = t2s(q.toLocaleUpperCase()).replace(REG_FIXED, '').trim()

      return target[index].data
        .map(item => ({
          title: HTMLDecode(
            item.title.replace(/<em class="keyword">|<\/em>/g, '') || ''
          ),
          cover: item.pic.indexOf('http') === 0 ? item.pic : `https:${item.pic}`,
          href: `https://m.bilibili.com/video/${item.bvid}`
        }))
        .filter((item: { title: string }) => {
          const title = item.title.toLocaleUpperCase().replace(REG_FIXED, '').trim()

          if (similar(title, _q) >= SIMILAR_RATE || title.includes(_q)) {
            return true
          }

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
        .filter((item, index: number) => index <= 6)
      // .sort((a, b) => desc(b.like || 0, a.like || 0))
    }
  } catch (ex) {
    console.error(ex)
    return []
  }

  return []
}
