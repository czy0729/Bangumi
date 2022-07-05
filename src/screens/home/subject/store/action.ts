/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:38:04
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-07-05 23:16:48
 */
import { collectionStore, calendarStore, systemStore, userStore } from '@stores'
import {
  appNavigate,
  asc,
  cnjp,
  copy,
  getBangumiUrl,
  getCoverMedium,
  open
} from '@utils'
import { t, baiduTranslate } from '@utils/fetch'
import { feedback, info, showActionSheet, loading } from '@utils/ui'
import { find as findAnime } from '@utils/subject/anime'
import { s2t } from '@utils/thirdParty/cn-char'
import { SITES, MODEL_EP_STATUS } from '@constants'
import {
  SITE_AGEFANS,
  SITE_MANHUADB,
  SITE_RRYS,
  SITE_WK8,
  SITE_XUNBO
} from '@constants/site'
import i18n from '@constants/i18n'
import { EpStatus, Id, Navigation, RatingStatus } from '@types'
import { OriginItem, replaceOriginUrl } from '../../../user/origin-setting/utils'
import Fetch from './fetch'
import { NAMESPACE } from './ds'

export default class Action extends Fetch {
  /** 显示收藏管理 */
  showManageModel = () => {
    t('条目.显示收藏管理', {
      subjectId: this.subjectId
    })

    this.setState({
      visible: true
    })
  }

  /** 隐藏管理进度信息弹窗 */
  closeManageModal = () => {
    this.setState({
      visible: false
    })
  }

  /** 章节倒序 */
  toggleReverseEps = () => {
    t('条目.章节倒序', {
      subjectId: this.subjectId
    })

    const { epsReverse } = this.state
    this.setState({
      epsReverse: !epsReverse
    })
    this.setStorage(undefined, undefined, this.namespace)
  }

  /** 吐槽倒序 */
  toggleReverseComments = () => {
    t('条目.吐槽倒序', {
      subjectId: this.subjectId
    })

    const { _reverse } = this.subjectComments
    this.fetchSubjectComments(true, !_reverse)
  }

  /** 书籍章节输入框改变 */
  changeText = (name: string, text: string) => {
    t('条目.书籍章节输入框改变', {
      subjectId: this.subjectId
    })

    try {
      this.setState({
        [name]: String(text)
      })
    } catch (error) {
      console.error(NAMESPACE, 'changeText', error)
    }
  }

  /** 动漫源头选择 */
  onlinePlaySelected = async (key: string) => {
    try {
      t('条目.搜索源', {
        type: key,
        subjectId: this.subjectId,
        subjectType: this.type
      })

      let url: string

      // AGE动漫，有自维护id数据，优先匹配
      if (key === 'AGE动漫') {
        const { _aid } = this.params
        if (_aid || findAnime(this.subjectId).ageId) {
          url = `${SITE_AGEFANS()}/detail/${_aid || findAnime(this.subjectId).ageId}`
        }
      }

      // 匹配用户自定义源头
      if (!url) {
        const find = this.onlineOrigins.find(
          (item: OriginItem) => item.name === key
        ) as OriginItem
        if (find) {
          if (key === '萌番组' && find.id) {
            copy(this.cn || this.jp)
            info('已复制条目名')
            setTimeout(() => {
              open(find.url)
            }, 1600)
            return
          }

          url = replaceOriginUrl(find.url, {
            CN: this.cn || this.jp,
            JP: this.jp || this.cn,
            ID: this.subjectId
          })
        }
      }

      // 旧匹配逻辑
      if (!url) {
        const { bangumiInfo } = this.state
        const { sites = [] } = bangumiInfo
        let item
        switch (key) {
          case 'AGE动漫':
            url = `${SITE_AGEFANS()}/search?query=${encodeURIComponent(
              this.cn || this.jp
            )}&page=1`
            break

          case 'Anime1':
            url = `https://anime1.me/?s=${encodeURIComponent(s2t(this.cn || this.jp))}`
            break

          case '迅播动漫':
            url = `${SITE_XUNBO()}/search.php?searchword=${encodeURIComponent(
              this.cn || this.jp
            )}`
            break

          case '奇奇动漫':
            url = `https://www.qiqidongman.com/vod-search-wd-${encodeURIComponent(
              this.cn || this.jp
            )}.html`
            break

          case 'Hanime1':
            url = `https://hanime1.me/search?query=${encodeURIComponent(
              this.jp || this.cn
            )}`
            break

          case '人人影视':
            url = `${SITE_RRYS()}/search?keyword=${encodeURIComponent(
              this.cn || this.jp
            )}&type=resource`
            break

          default:
            item = sites.find(item => item.site === key)
            if (item) url = getBangumiUrl(item)
            break
        }
      }

      if (url) {
        copy(url)
        info('已复制地址')
        setTimeout(() => {
          open(url)
        }, 1600)
      }
    } catch (error) {
      console.error(NAMESPACE, 'onlinePlaySelected', error)
    }
  }

  /** 漫画源头选择 */
  onlineComicSelected = (key: string) => {
    try {
      t('条目.搜索源', {
        type: key,
        subjectId: this.subjectId,
        subjectType: this.type
      })

      let url: string

      // 匹配用户自定义源头
      const find = this.onlineComicOrigins.find(item => item.name === key)
      if (find) {
        url = replaceOriginUrl(find.url, {
          CN: this.cn || this.jp,
          JP: this.jp || this.cn,
          ID: this.subjectId
        })
      }

      if (url) {
        copy(url)
        info('已复制地址')
        setTimeout(() => {
          open(url)
        }, 1600)
      }
    } catch (error) {
      console.error(NAMESPACE, 'onlineComicSelected', error)
    }
  }

  /** 音乐源头选择 */
  onlineDiscSelected = (key: string) => {
    try {
      t('条目.搜索源', {
        type: key,
        subjectId: this.subjectId,
        subjectType: this.type
      })

      let url: string

      // 匹配用户自定义源头
      const find = this.onlineDiscOrigins.find(item => item.name === key)
      if (find) {
        url = replaceOriginUrl(find.url, {
          CN: this.cn || this.jp,
          JP: this.jp || this.cn,
          ID: this.subjectId
        })
      }

      if (url) {
        copy(url)
        info('已复制地址')
        setTimeout(() => {
          open(url)
        }, 1600)
      }
    } catch (error) {
      console.error(NAMESPACE, 'onlineDiscSelected', error)
    }
  }

  /** 游戏源头选择 */
  onlineGameSelected = (key: string) => {
    try {
      t('条目.搜索源', {
        type: key,
        subjectId: this.subjectId,
        subjectType: this.type
      })

      let url: string

      // 匹配用户自定义源头
      const find = this.onlineGameOrigins.find(item => item.name === key)
      if (find) {
        url = replaceOriginUrl(find.url, {
          CN: this.cn || this.jp,
          JP: this.jp || this.cn,
          ID: this.subjectId
        })
      }

      if (url) {
        copy(url)
        info('已复制地址')
        setTimeout(() => {
          open(url)
        }, 1600)
      }
    } catch (error) {
      console.error(NAMESPACE, 'onlineGameSelected', error)
    }
  }

  /** 去漫画DB */
  toManhuadb = () => {
    const { mangaId } = this.source || {}
    t('条目.阅读漫画', {
      subjectId: this.subjectId,
      mid: mangaId
    })

    const url = `${SITE_MANHUADB()}/manhua/${mangaId}`
    copy(url)
    info('已复制地址')

    setTimeout(() => {
      open(url)
    }, 1600)
  }

  /** 去文库8 */
  toWenku8 = () => {
    const { wenkuId } = this.source || {}
    t('条目.阅读轻小说', {
      subjectId: this.subjectId,
      wid: wenkuId
    })

    const url = `${SITE_WK8()}/novel/${Math.floor(wenkuId / 1000)}/${wenkuId}/index.htm`
    copy(url)
    info('已复制地址')

    setTimeout(() => {
      open(url)
    }, 1600)
  }

  /** 前往 PSNINE 查看游戏奖杯 */
  toPSNINE = () => {
    t('条目.查看奖杯', {
      subjectId: this.subjectId
    })

    open(`https://psnine.com/psngame?title=${encodeURIComponent(this.cn || this.jp)}`)
  }

  /** 设置章节筛选 */
  updateFilterEps = (key: string) => {
    let filterEps = parseInt(key.match(/\d+/g)[0])
    if (filterEps === 1) filterEps = 0

    t('条目.设置章节筛选', {
      subjectId: this.subjectId,
      filterEps
    })

    this.setState({
      filterEps
    })
    this.setStorage(undefined, undefined, this.namespace)
  }

  /** 筛选分数 */
  filterScores = (label: string) => {
    t('条目.筛选分数', {
      subjectId: this.subjectId
    })

    this.setState({
      filterScores: label === '全部' ? [] : label.split('-')
    })
    this.setStorage(undefined, undefined, this.namespace)
  }

  /** 去用户评分页面 */
  toRating = (navigation: Navigation, from?: string, status?: RatingStatus) => {
    t('条目.跳转', {
      to: 'Rating',
      from,
      subjectId: this.subjectId,
      status
    })

    const { wish, collect, doing, on_hold: onHold, dropped } = this.subjectCollection
    navigation.push('Rating', {
      subjectId: this.subjectId,
      status,
      name: cnjp(this.cn, this.jp),
      wish,
      collect,
      doing,
      onHold,
      dropped
    })
  }

  /** 展开收起功能块 */
  switchBlock = (key: Parameters<typeof systemStore.switchSetting>[0]) => {
    t('条目.展开收起功能块', {
      key
    })

    systemStore.switchSetting(key)
  }

  /** 展开收起功能块 */
  hiddenBlock = (key: Parameters<typeof systemStore.switchSetting>[0]) => {
    t('条目.展开收起功能块', {
      key: `${key} | -1`
    })

    systemStore.setSetting(key, -1)
  }

  /** 用于延迟底部块渲染 (优化条目页面进入渲染时, 同时渲染过多块导致掉帧的问题) */
  rendered = () => {
    const { rendered } = this.state
    if (!rendered) {
      this.setState({
        rendered: true
      })
    }
  }

  /** 显示 / 关闭管理目录模态框 */
  toggleFolder = () => {
    if (!this.isLogin) {
      info(`请先${i18n.login()}`)
      return
    }

    const { folder } = this.state
    this.setState({
      folder: !folder
    })

    if (!folder) {
      t('条目.管理目录', {
        subjectId: this.subjectId
      })
    }
  }

  /** 自定义放送时间 */
  onSelectOnAir = (key: string, value: any) => {
    t('条目.自定义放送', {
      subjectId: this.subjectId
    })
    calendarStore.updateOnAirUser(this.subjectId, key, value)
  }

  /** 重置条目的自定义放送时间 */
  resetOnAirUser = () => {
    t('条目.重置放送', {
      subjectId: this.subjectId
    })
    calendarStore.resetOnAirUser(this.subjectId)
  }

  // -------------------- action --------------------
  /** 章节菜单操作 */
  doEpsSelect = async (
    value: string,
    item: {
      url: any
      id: Id
      sort: number
      name: any
      name_cn: any
      duration: any
      airdate: any
      desc: any
      type: number
    },
    navigation?: Navigation
  ) => {
    try {
      // iOS是本集讨论, 安卓是(+N)...
      if (value.includes('本集讨论') || value.includes('(+')) {
        t('条目.章节菜单操作', {
          title: '本集讨论',
          subjectId: this.subjectId
        })

        // 数据占位
        appNavigate(
          item.url || `/ep/${item.id}`,
          navigation,
          {
            _title: `ep${item.sort}.${item.name || item.name_cn}`,
            _group: this.subject.name || this.subject.name_cn,
            _groupThumb: getCoverMedium((this.subject.images || {}).medium),
            _desc: `时长:${item.duration} / 首播:${item.airdate}<br />${(
              item.desc || ''
            ).replace(/\r\n/g, '<br />')}`
          },
          {
            id: '条目.跳转',
            data: {
              from: '章节',
              subjectId: this.subjectId
            }
          }
        )
        return
      }

      if (value === '正版播放') {
        setTimeout(() => {
          showActionSheet(this.onlinePlayActionSheetData, index => {
            t('条目.章节菜单操作', {
              title: this.onlinePlayActionSheetData[index],
              subjectId: this.subjectId
            })

            const isSp = item.type === 1
            let url

            // @todo 逻辑比较复杂, 暂时不处理EP偏移
            const { epsData } = this.state
            const { eps = [] } = this.subject
            const site: any = this.onlinePlayActionSheetData[index]
            let epIndex: number
            if (SITES.includes(site)) {
              if (isSp) {
                url = getBangumiUrl({
                  id: item.id,
                  site
                })
              } else {
                epIndex = eps
                  .filter(item => item.type === 0)
                  .findIndex(i => i.id === item.id)
                url =
                  epsData[site][epIndex] ||
                  getBangumiUrl({
                    id: item.id,
                    site
                  })
              }
            }

            if (url) open(url)
          })
        }, 320)

        return
      }

      // 未收藏不能更改进度
      const { status = { name: '未收藏' } } = this.collection
      if (status.name !== '未收藏') {
        const status = MODEL_EP_STATUS.getValue<EpStatus>(value)
        if (status) {
          t('条目.章节菜单操作', {
            title: '更新收视进度',
            subjectId: this.subjectId,
            status
          })

          // 更新收视进度
          await userStore.doUpdateEpStatus({
            id: item.id,
            status
          })
          feedback()

          userStore.fetchUserCollection()
          userStore.fetchUserProgress(this.subjectId)
        }

        if (value === '看到') {
          t('条目.章节菜单操作', {
            title: '批量更新收视进度',
            subjectId: this.subjectId
          })

          /**
           * 批量更新收视进度
           * @issue 多季度非1开始的番不能直接使用sort, 需要把sp去除后使用当前item.sort查找index
           */
          const { eps = [] } = this.subject
          const sort = eps
            .filter(i => i.type === 0)
            .sort((a, b) => asc(a, b, item => item.sort || 0))
            .findIndex(i => i.sort === item.sort)

          let value
          if (sort === -1) {
            /**
             * @issue API bug, 多季度番剧使用item.sort不适用, 若item.sort > totalEps, 适用排序的index
             * @date 2022/02/12
             */
            const totalEps = Number(this.subjectFormHTML.totalEps)
            if (totalEps && item.sort >= totalEps) {
              value = sort + 1
            } else {
              value = item.sort
            }
          } else {
            value = sort + 1
          }

          await userStore.doUpdateSubjectWatched({
            subjectId: this.subjectId,
            sort: value
          })
          feedback()

          userStore.fetchUserCollection()
          userStore.fetchUserProgress(this.subjectId)
        }

        return
      }

      info('收藏了才能管理哦')
    } catch (error) {
      console.error(NAMESPACE, 'doEpsSelect', error)
    }
  }

  /** 管理收藏 */
  doUpdateCollection = async (
    values: Parameters<typeof collectionStore.doUpdateCollection>[0]
  ) => {
    t('条目.管理收藏', {
      subjectId: this.subjectId
    })

    try {
      await collectionStore.doUpdateCollection(values)
      feedback()

      collectionStore.fetchCollection(this.subjectId)
      this.closeManageModal()
    } catch (error) {
      console.error(NAMESPACE, 'doUpdateCollection', error)
    }
  }

  /**
   * 更新书籍下一个章节
   * @version 20220414 x18无效，待废弃，改用 doUpdateSubjectEp
   */
  doUpdateNext = async (name: string | number) => {
    t('条目.更新书籍下一个章节', {
      subjectId: this.subjectId
    })

    const { chap, vol } = this.state
    const next = String(parseInt(this.state[name] || 0) + 1)
    const query = {
      subjectId: this.subjectId,
      chap,
      vol,
      [name]: next
    }
    this.doUpdateEp({
      eps: query.chap,
      vol: query.vol
    })
  }

  /**
   * 更新书籍章节
   * @version 20220414 x18无效，待废弃，改用doUpdateEp
   */
  doUpdateBookEp = async () => {
    t('条目.更新书籍章节', {
      subjectId: this.subjectId
    })

    const { chap, vol } = this.state
    this.doUpdateEp({
      eps: chap,
      vol
    })
  }

  /**
   * 输入框更新章节
   * @version 20220414 x18无效，待废弃，改用doUpdateEp
   */
  doUpdateSubjectEp = async () => {
    t('条目.输入框更新章节', {
      subjectId: this.subjectId
    })

    const { watchedEps } = this.state
    this.doUpdateEp({
      eps: watchedEps
    })
  }

  /** 章节更新统一入口 */
  doUpdateEp = async ({ eps, vol }: { eps?: any; vol?: any }) => {
    try {
      collectionStore.doUpdateSubjectEp(
        {
          subjectId: this.subjectId,
          watchedEps: eps,
          watchedVols: vol
        },
        async () => {
          feedback()

          userStore.fetchUserCollection()
          userStore.fetchUserProgress(this.subjectId)
          this.fetchSubjectFormHTML()
          this.setStorage(undefined, undefined, this.namespace)
          info('更新成功')
        }
      )
    } catch (error) {
      console.error(NAMESPACE, 'doUpdateEp', error)
    }
  }

  /** 章节按钮长按 */
  doEpsLongPress = async ({ id }) => {
    t('条目.章节按钮长按', {
      subjectId: this.subjectId
    })

    try {
      const userProgress = this.userProgress
      let status
      if (userProgress[id]) {
        // 已观看 -> 撤销
        status = MODEL_EP_STATUS.getValue('撤销')
      } else {
        // 未观看 -> 看过
        status = MODEL_EP_STATUS.getValue('看过')
      }

      await userStore.doUpdateEpStatus({
        id,
        status
      })
      feedback()

      userStore.fetchUserCollection()
      userStore.fetchUserProgress(this.subjectId)
    } catch (error) {
      console.error(NAMESPACE, 'doEpsLongPress', error)
    }
  }

  /** 删除收藏 */
  doEraseCollection = async () => {
    const { formhash } = this.subjectFormHTML
    if (!formhash) return

    t('条目.删除收藏', {
      subjectId: this.subjectId
    })

    try {
      await userStore.doEraseCollection(
        {
          subjectId: this.subjectId,
          formhash
        },
        () => {}, // 因为删除后是302, 使用fail去触发
        () => {
          feedback()
          info('删除收藏成功')

          this.fetchCollection()
          userStore.fetchUserCollection()
        }
      )
    } catch (error) {
      console.error(NAMESPACE, 'doEraseCollection', error)
    }
  }

  /** 翻译简介 */
  doTranslate = async () => {
    if (this.state.translateResult.length) return

    t('条目.翻译简介', {
      subjectId: this.subjectId
    })

    let hide
    try {
      hide = loading('请求中...')
      const response = await baiduTranslate(this.summary)
      hide()

      const { trans_result: translateResult } = JSON.parse(response)
      if (Array.isArray(translateResult)) {
        this.setState({
          translateResult
        })
        // info('翻译成功')
        return
      }
      info('翻译失败, 请重试')
    } catch (error) {
      if (hide) hide()
      info('翻译失败, 请重试')
    }
  }

  /** 翻译曲目 */
  doDiscTranslate = async () => {
    if (this.state.discTranslateResult.length) return

    t('条目.翻译曲目', {
      subjectId: this.subjectId
    })

    const discTitle = []
    this.disc.forEach(item => {
      item.disc.forEach((i, index) => {
        discTitle.push(i.title.replace(`${index + 1} `, ''))
      })
    })

    let hide
    try {
      hide = loading('请求中...')
      const response = await baiduTranslate(discTitle.join('\n'))
      hide()

      const { trans_result: discTranslateResult } = JSON.parse(response)
      if (Array.isArray(discTranslateResult)) {
        this.setState({
          discTranslateResult
        })
        return
      }
      info('翻译失败, 请重试')
    } catch (error) {
      if (hide) hide()
      info('翻译失败, 请重试')
    }
  }
}
