/*
 * @Author: czy0729
 * @Date: 2021-02-03 22:46:44
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-02-05 15:12:26
 */
import { observable, computed } from 'mobx'
import { Portal } from '@ant-design/react-native'
import Toast from '@components/@/ant-design/toast'
import { collectionStore } from '@stores'
import store from '@utils/store'
import { getBangumiUrl, unzipBangumiData } from '@utils/app'
import { xhrCustom, HTMLTrim, queue } from '@utils/fetch'
import { guess } from '@utils/anime'
import bangumiData from '@constants/json/thirdParty/bangumiData.min.json'

const namespace = 'ScreenGuess'

export default class ScreenGuess extends store {
  state = observable({
    list: [],
    page: 1,
    show: false,
    eps: {}
  })

  init = async () => {
    const state = await this.getStorage(undefined, namespace)
    this.setState({
      ...state
    })

    const { list } = this.state
    if (!list.length) {
      this.getList()
    } else {
      this.setState({
        show: true
      })
    }
  }

  // -------------------- get --------------------
  @computed get userCollectionsMap() {
    return collectionStore.userCollectionsMap
  }

  @computed get list() {
    const { page, list } = this.state
    return list.slice((page - 1) * 16, page * 16)
  }

  // -------------------- page --------------------
  getList = async () => {
    const toastId = Toast.loading('根据收藏分析中...', 0, () => {
      if (toastId) Portal.remove(toastId)
    })
    await collectionStore.fetchUserCollectionsQueue(true)
    if (toastId) Portal.remove(toastId)

    const list = guess(this.userCollectionsMap)
    this.setState({
      show: true,
      list,
      page: 1
    })
    this.setStorage(undefined, undefined, namespace)

    this.queueFetchEpsThumbs()
  }

  prev = () => {
    const { page } = this.state
    if (page === 1) {
      return
    }

    this.setState({
      show: false,
      page: page - 1
    })
    this.queueFetchEpsThumbs()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 80)
  }

  next = () => {
    const { page } = this.state

    this.setState({
      show: false,
      page: page + 1
    })
    this.queueFetchEpsThumbs()

    setTimeout(() => {
      this.setState({
        show: true
      })
      this.setStorage(undefined, undefined, namespace)
    }, 80)
  }

  onChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    if (Number.isNaN(parseInt(text))) {
      return
    }

    this.setState({
      page: parseInt(text)
    })
  }

  queueFetchEpsThumbs = () => {
    const { list } = this.state
    queue(list.map(item => () => this.fetchEpsThumbs(item.id)))
  }

  /**
   * 获取章节的缩略图
   */
  fetchEpsThumbs = async subjectId => {
    const { eps } = this.state
    if (eps[subjectId]) {
      return true
    }

    try {
      const item = bangumiData.find(item => item.id == subjectId)
      let bangumiInfo
      let bilibiliSite
      let youkuSite
      let iqiyiSite

      if (item) {
        const _item = unzipBangumiData(item)
        bangumiInfo = {
          sites: _item.sites,
          type: _item.type
        }

        bilibiliSite =
          bangumiInfo?.sites?.find(item => item.site === 'bilibili') || null
        if (!bilibiliSite) {
          youkuSite =
            bangumiInfo?.sites?.find(item => item.site === 'youku') || null
        }
        if (!youkuSite) {
          iqiyiSite =
            bangumiInfo?.sites?.find(item => item.site === 'iqiyi') || null
        }
      }

      if (bilibiliSite) {
        const url = getBangumiUrl(bilibiliSite)
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
              eps: {
                ...this.state.eps,
                [subjectId]: {
                  epsThumbs: Array.from(
                    new Set(
                      result.main_section.episodes.map(
                        item => `${item.cover}@192w_120h_1c.jpg`
                      )
                    )
                  ),
                  epsThumbsHeader: {
                    Referer: 'https://www.bilibili.com/'
                  }
                }
              }
            })
            this.setStorage(undefined, undefined, this.namespace)
            return true
          }
        }
      }

      if (youkuSite) {
        const url = getBangumiUrl(youkuSite)
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
            eps: {
              ...this.state.eps,
              [subjectId]: {
                epsThumbs: Array.from(
                  new Set(
                    (
                      decodeURIComponent(_response)
                        .replace(/\\\/>/g, '/>')
                        .replace(/(\\"|"\\)/g, '"')
                        .match(/<img.+?src=('|")?([^'"]+)('|")?(?:\s+|>)/gim) ||
                      []
                    )
                      .map(item => {
                        const match = item.match(/src="(.+?)"/)
                        if (match) {
                          return match[1].replace(/\\\//g, '/')
                        }
                        return ''
                      })
                      .filter(item => !!item)
                  )
                ),
                epsThumbsHeader: {
                  Referer: 'https://list.youku.com/'
                }
              }
            }
          })
          this.setStorage(undefined, undefined, this.namespace)
          return true
        }
      }

      if (iqiyiSite) {
        const url = getBangumiUrl(this.iqiyiSite)
        const { _response } = await xhrCustom({
          url
        })

        const match = HTMLTrim(_response, true).match(/data-jpg-img="(.+?)"/g)
        if (match) {
          this.setState({
            eps: {
              ...this.state.eps,
              [subjectId]: {
                epsThumbs: Array.from(
                  new Set(
                    match
                      .map(
                        item =>
                          `https:${item.replace(/(data-jpg-img="|")/g, '')}`
                      )
                      .filter((item, index) => !!index)
                  )
                ),
                epsThumbsHeader: {
                  Referer: 'https://www.iqiyi.com/'
                }
              }
            }
          })
          this.setStorage(undefined, undefined, this.namespace)
          return true
        }
      }

      this.setState({
        eps: {
          ...this.state.eps,
          [subjectId]: null
        }
      })
      return false
    } catch (error) {
      warn('Guess', 'fetchEpsThumbs', error)
      return false
    }
  }
}
