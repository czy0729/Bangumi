/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-05-11 19:55:20
 */
import bangumiData from '@assets/json/thirdParty/bangumiData.min.json'
import { collectionStore, subjectStore, systemStore, monoStore } from '@stores'
import { getTimestamp, similar } from '@utils'
import { HTMLDecode, HTMLTrim, cheerio } from '@utils/html'
import { xhrCustom } from '@utils/fetch'
import { getBangumiUrl, unzipBangumiData } from '@utils/app'
import { SITES } from '@constants'
import { CDN_EPS } from '@constants/cdn'
import Computed from './computed'
import { NAMESPACE } from './ds'

export default class Fetch extends Computed {
  /**
   * 条目信息
   */
  fetchSubject = () => {
    return subjectStore.fetchSubject(this.subjectId)
  }

  /**
   * 网页的条目信息,
   * 书籍只有网页端有数据源, 需要初始值
   */
  fetchSubjectFormHTML = async () => {
    const res = subjectStore.fetchSubjectFormHTML(this.subjectId)
    const data = await res

    const { watchedEps, book } = data
    this.setState({
      watchedEps: watchedEps || '0',
      chap: book.chap || '0',
      vol: book.vol || '0'
    })
    return res
  }

  /**
   * 私有CDN的条目信息
   */
  fetchSubjectFormCDN = async () => {
    const { setting } = systemStore
    const { _loaded } = this.subjectFormHTML
    if (!setting.cdn || _loaded) return true
    return subjectStore.fetchSubjectFormCDN(this.subjectId)
  }

  /**
   * 装载第三方数据
   */
  fetchThirdParty = async data => {
    const item = bangumiData.find(
      item =>
        item.id == this.subjectId ||
        item.j === HTMLDecode(data.name) ||
        item.c === HTMLDecode(data.name)
    )

    if (item) {
      const _item = unzipBangumiData(item)
      this.setState({
        bangumiInfo: {
          sites: _item.sites,
          type: _item.type
        }
      })

      setTimeout(() => {
        this.fetchEpsThumbs(_item)
      }, 0)
    }

    if ((!item && this.type === '动画') || this.type === '三次元') {
      this.fetchEpsThumbsFromDouban(this.cn, this.jp)
    }
  }

  /**
   * 用户收藏信息
   */
  fetchCollection = () => {
    return collectionStore.fetchCollection(this.subjectId)
  }

  /**
   * 条目留言
   */
  fetchSubjectComments = (refresh, reverse) => {
    return subjectStore.fetchSubjectComments(
      {
        subjectId: this.subjectId
      },
      refresh,
      reverse
    )
  }

  /**
   * 获取单集播放源
   */
  fetchEpsData = async () => {
    if (this.type === '动画') {
      try {
        const { _response } = await xhrCustom({
          url: CDN_EPS(this.subjectId)
        })

        const epsData = {
          _loaded: getTimestamp()
        }
        SITES.forEach(item => (epsData[item] = {}))
        JSON.parse(_response).eps.forEach((item, index) => {
          item.sites.forEach(i => {
            if (SITES.includes(i.site)) {
              epsData[i.site][index] = i.url
            }
          })
        })
        this.setState({
          epsData
        })
        this.setStorage(undefined, undefined, this.namespace)
      } catch (error) {
        warn(NAMESPACE, 'fetchEpsData', error)
      }
    }
  }

  /**
   * 获取章节的缩略图
   */
  fetchEpsThumbs = async bangumiData => {
    if (this.state.epsThumbs.length) return

    try {
      // bilibili
      try {
        if (this.bilibiliSite.id) {
          const url = getBangumiUrl(this.bilibiliSite)
          const { _response } = await xhrCustom({
            url
          })
          const match = _response.match(/"season_id":(\d+)/)
          if (match) {
            const seasonId = match[1]
            const { _response } = await xhrCustom({
              url: `https://api.bilibili.com/pgc/web/season/section?season_id=${seasonId}`
            })
            const { message, result } = JSON.parse(_response)
            if (message === 'success' && result?.main_section?.episodes) {
              this.setState({
                epsThumbs: Array.from(
                  new Set(
                    result.main_section.episodes.map(
                      item =>
                        `${item.cover.replace('http://', 'https://')}@192w_120h_1c.jpg`
                    )
                  )
                ),
                epsThumbsHeader: {
                  Referer: 'https://www.bilibili.com/'
                }
              })
              this.setStorage(undefined, undefined, this.namespace)
            }
          }
        }
      } catch (error) {
        //
      }

      // 优酷
      try {
        if (!this.state.epsThumbs.length && this.youkuSite.id) {
          const url = getBangumiUrl(this.youkuSite)
          const { _response } = await xhrCustom({
            url
          })
          const match = _response.match(/showid:"(\d+)"/)
          if (match) {
            const showid = match[1]
            const { _response } = await xhrCustom({
              url: `https://list.youku.com/show/module?id=${showid}&tab=point&callback=jQuery`
            })
            this.setState({
              epsThumbs: Array.from(
                new Set(
                  (
                    decodeURIComponent(_response)
                      .replace(/\\\/>/g, '/>')
                      .replace(/(\\"|"\\)/g, '"')
                      .match(/<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim) || []
                  )
                    .map(item => {
                      const match = item.match(/src="(.+?)"/)
                      if (match) {
                        return match[1]
                          .replace(/\\\//g, '/')
                          .replace('http://', 'https://')
                      }
                      return ''
                    })
                    .filter(item => !!item)
                )
              ),
              epsThumbsHeader: {
                Referer: 'https://list.youku.com/'
              }
            })
            this.setStorage(undefined, undefined, this.namespace)
          }
        }
      } catch (error) {
        //
      }

      // 爱奇艺
      try {
        if (!this.state.epsThumbs.length && this.iqiyiSite.id) {
          const url = getBangumiUrl(this.iqiyiSite)
          const { _response } = await xhrCustom({
            url
          })

          const match = HTMLTrim(_response, true).match(/data-jpg-img="(.+?)"/g)
          if (match) {
            this.setState({
              epsThumbs: Array.from(
                new Set(
                  match
                    .map(item => `https:${item.replace(/(data-jpg-img="|")/g, '')}`)
                    .filter((item, index) => !!index)
                )
              ),
              epsThumbsHeader: {
                Referer: 'https://www.iqiyi.com/'
              }
            })
            this.setStorage(undefined, undefined, this.namespace)
          }
        }
      } catch (error) {
        //
      }

      // qq网站没有截屏, 不找

      // 尝试从douban找
      if (!this.state.epsThumbs.length) {
        const cn = bangumiData?.titleTranslate?.['zh-Hans']?.[0]
        const jp = bangumiData.title
        this.fetchEpsThumbsFromDouban(cn, jp)
      }
    } catch (error) {
      warn('Subject', 'fetchEpsThumbs', error)
    }
  }

  /**
   * 从donban匹配条目, 并获取官方剧照信息
   */
  fetchEpsThumbsFromDouban = async (cn, jp) => {
    if (this.x18 || this.state.epsThumbs.length) return

    const q = cn || jp
    if (q) {
      let doubanId

      // 搜索
      const { _response } = await xhrCustom({
        url: `https://www.douban.com/search?cat=1002&q=${q}`
      })

      const $ = cheerio(_response)
      $('.result .content').each((index, element) => {
        if (doubanId) return

        const $row = cheerio(element)
        const $a = $row.find('h3 a')
        const _cn = $a.text().trim()
        if (similar(_cn, q) < 0.8) {
          const cast = $row.find('.subject-cast').text().trim()
          if (!cast.includes('原名:')) return

          const _jp = cast.split(' / ')[0].replace('原名:', '')
          if (similar(_jp, jp || cn) < 0.8) return
        }

        const match = $a.attr('onclick').match(/sid: (\d+)/)
        if (match && match[1]) {
          doubanId = match[1]
        }
      })

      if (doubanId) {
        // type=o 官方剧照, type=a 剧照
        let type = 'o'
        let _response

        // 获取条目剧照
        const data = await xhrCustom({
          url: `https://movie.douban.com/subject/${doubanId}/photos?type=S&start=0&sortby=time&size=a&subtype=${type}`
        })
        _response = data._response

        // 当官方剧照少于12张, 再次请求使用所有剧照
        const { length } = cheerio(_response)('.cover img')
        if (length > 0 && length < 12) {
          type = 'a'
          const data = await xhrCustom({
            url: `https://movie.douban.com/subject/${doubanId}/photos?type=S&start=0&sortby=time&size=a&subtype=${type}`
          })
          _response = data._response
        }

        // 判断是否有分页
        const match = _response.match(/<span class="count">\(共(\d+)张\)<\/span>/)
        const count = match ? Number(match[1]) : 0
        const start = count >= 100 ? count - 50 : count >= 30 ? count - 30 : 0

        // 由于剧照是根据时间从新到旧排序的, 需要获取较后面的数据, 以免剧透
        if (start) {
          const data = await xhrCustom({
            url: `https://movie.douban.com/subject/${doubanId}/photos?type=S&start=${start}&sortby=time&size=a&subtype=${type}`
          })
          _response = data._response
        }

        const $ = cheerio(_response)
        this.setState({
          epsThumbs: (
            $('.cover img')
              .map((index, element) => {
                const $row = cheerio(element)
                return $row.attr('src').replace('http://', 'https://')
              })
              .get() || []
          ).reverse(),
          epsThumbsHeader: {
            Referer: `https://movie.douban.com/subject/${doubanId}`
          }
        })
        this.setStorage(undefined, undefined, this.namespace)
      }
    }
  }

  /**
   * staff数据
   */
  fetchPersons = () => {
    return monoStore.fetchPersons({
      subjectId: this.subjectId
    })
  }
}
