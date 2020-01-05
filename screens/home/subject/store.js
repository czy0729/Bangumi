/*
 * 条目
 * @Params: { _ningMoeId, _jp, _cn, _image, _summary }
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-01-05 18:03:19
 */
import { observable, computed } from 'mobx'
import bangumiData from 'bangumi-data'
import {
  subjectStore,
  discoveryStore,
  userStore,
  collectionStore,
  systemStore
} from '@stores'
import { open, getTimestamp } from '@utils'
import { t, xhrCustom, queue } from '@utils/fetch'
import { appNavigate, getBangumiUrl, getCoverMedium } from '@utils/app'
import store from '@utils/store'
import { info, showActionSheet } from '@utils/ui'
import { IOS, USERID_TOURIST, USERID_IOS_AUTH, HOST_NING_MOE } from '@constants'
import { MODEL_SUBJECT_TYPE, MODEL_EP_STATUS } from '@constants/model'
import { NINGMOE_DATA } from '@constants/online'

const namespace = 'ScreenSubject'
const sites = ['bilibili', 'qq', 'iqiyi', 'acfun', 'youku']

export default class ScreenSubject extends store {
  state = observable({
    visible: false, // 是否显示管理模态框
    epsReverse: false, // 章节是否倒序
    chap: '', // 书籍
    vol: '',
    bangumiInfo: {
      sites: [], // 动画在线地址
      type: '' // 动画类型
    },

    // 播放源
    epsData: {
      _loaded: false
    },
    _loaded: true
  })

  init = async () => {
    const state = await this.getStorage(undefined, this.namespace)
    this.setState({
      ...state,
      visible: false,
      chap: '',
      vol: '',
      _loaded: true
    })

    const res = this.fetchSubject()
    const data = await res
    const item = bangumiData.items.find(item => item.title === data.name)
    if (item) {
      this.setState({
        bangumiInfo: {
          sites: item.sites,
          type: item.type
        }
      })
    }

    // 获取其他源头eps在线地址
    if (this.type === '动画') {
      const { _ningMoeId } = this.params
      if (_ningMoeId) {
        discoveryStore.fetchNingMoeDetail({
          id: _ningMoeId,
          bgmId: this.subjectId
        })
      } else {
        // 柠萌瞬间有时候条目名会有差异, 比如bgm叫炎炎消防队, 柠萌就叫炎炎之消防队
        const name = data.name_cn || data.name
        discoveryStore.fetchNingMoeDetailBySearch({
          keyword: NINGMOE_DATA[name] ? NINGMOE_DATA[name] : name
        })
      }
    }

    queue([
      () => this.fetchCollection(),
      () => userStore.fetchUserProgress(this.subjectId),
      () => subjectStore.fetchSubjectEp(this.subjectId),
      () => this.fetchSubjectFormHTML(),
      () => this.fetchEpsData(),
      () => this.fetchSubjectComments(true)
    ])
    return res
  }

  // -------------------- fetch --------------------
  /**
   * 条目信息
   */
  fetchSubject = () => subjectStore.fetchSubject(this.subjectId)

  /**
   * 网页的条目信息,
   * 书籍只有网页端有数据源, 需要初始值
   */
  fetchSubjectFormHTML = async () => {
    const res = subjectStore.fetchSubjectFormHTML(this.subjectId)
    const { book } = await res
    this.setState({
      chap: book.chap || '0',
      vol: book.vol || '0'
    })
    return res
  }

  /**
   * 用户收藏信息
   */
  fetchCollection = () => collectionStore.fetchCollection(this.subjectId)

  /**
   * 条目留言
   */
  fetchSubjectComments = (refresh, reverse) =>
    subjectStore.fetchSubjectComments(
      { subjectId: this.subjectId },
      refresh,
      reverse
    )

  /**
   * 获取单集播放源
   */
  fetchEpsData = async () => {
    if (this.type === '动画') {
      try {
        /**
         * 旧源头
         * https://raw.githubusercontent.com/ekibun/bangumi_onair/master
         */
        const { _response } = await xhrCustom({
          url: `https://cdn.jsdelivr.net/gh/ekibun/bangumi_onair@latest/onair/${parseInt(
            parseInt(this.subjectId) / 1000
          )}/${this.subjectId}.json`
        })

        const epsData = {
          _loaded: getTimestamp()
        }
        sites.forEach(item => (epsData[item] = {}))
        JSON.parse(_response).eps.forEach((item, index) => {
          item.sites.forEach(i => {
            if (sites.includes(i.site)) {
              epsData[i.site][index] = i.url
            }
          })
        })
        this.setState({
          epsData
        })
        this.setStorage(undefined, undefined, this.namespace)
      } catch (error) {
        warn(namespace, 'fetchEpsData', error)
      }
    }
  }

  // -------------------- get --------------------
  @computed get subjectId() {
    const { subjectId } = this.params
    return subjectId
  }

  /**
   * 命名空间
   */
  @computed get namespace() {
    return `${namespace}|${this.subjectId}`
  }

  /**
   * 是否登陆(token)
   */
  @computed get isLogin() {
    return userStore.isLogin
  }

  /**
   * 用户id
   */
  @computed get userId() {
    return userStore.userInfo.id
  }

  /**
   * 条目信息
   */
  @computed get subject() {
    return subjectStore.subject(this.subjectId)
  }

  /**
   * 柠萌瞬间ep数据
   */
  @computed get ningMoeDetail() {
    return discoveryStore.ningMoeDetail(this.subjectId)
  }

  /**
   * 条目信息(来自网页)
   */
  @computed get subjectFormHTML() {
    return subjectStore.subjectFormHTML(this.subjectId)
  }

  /**
   * 章节信息
   */
  @computed get subjectEp() {
    return subjectStore.subjectEp(this.subjectId)
  }

  /**
   * 条目留言
   */
  @computed get subjectComments() {
    return subjectStore.subjectComments(this.subjectId)
  }

  /**
   * 条目收藏信息
   */
  @computed get collection() {
    return collectionStore.collection(this.subjectId)
  }

  /**
   * 用户章节记录
   */
  @computed get userProgress() {
    return userStore.userProgress(this.subjectId)
  }

  /**
   * 条目类型中文
   */
  @computed get type() {
    const { _loaded, type: _type } = this.subject
    if (!_loaded) {
      return ''
    }
    return MODEL_SUBJECT_TYPE.getTitle(_type)
  }

  // Ep偏移
  @computed get ningMoeEpOffset() {
    return (
      this.subjectEp.eps
        .filter(item => item.type === 0)
        .sort((a, b) => a.sort - b.sort)[0].sort - 1
    )
  }

  /**
   * 章节在线播放源
   */
  @computed get onlinePlayActionSheetData() {
    const data = []
    if (this.ningMoeDetail.id) {
      data.push('柠萌瞬间')
    }

    const { epsData } = this.state
    sites.forEach(item => {
      if (epsData[item] && Object.keys(epsData[item]).length) {
        data.push(item)
      }
    })
    data.push('取消')

    return data
  }

  /**
   * 条目动作
   */
  @computed get action() {
    switch (this.type) {
      case '音乐':
        return '听'
      case '游戏':
        return '玩'
      default:
        return '看'
    }
  }

  /**
   * 应付iOS审核, iOS且不登陆、游客模式、提供给审核人员的userId不显示
   */
  @computed get showOnlinePlay() {
    if (!IOS) {
      return true
    }

    if (!this.isLogin) {
      return false
    }

    if (
      !this.userId ||
      this.userId == USERID_TOURIST ||
      this.userId == USERID_IOS_AUTH
    ) {
      return false
    }

    return true
  }

  @computed get hideScore() {
    return systemStore.setting.hideScore
  }

  // -------------------- page --------------------
  /**
   * 显示收藏管理
   */
  showManageModel = () => {
    t('条目.显示收藏管理', {
      subjectId: this.subjectId
    })

    this.setState({
      visible: true
    })
  }

  /**
   * 隐藏管理进度信息弹窗
   */
  closeManageModal = () =>
    this.setState({
      visible: false
    })

  /**
   * 章节倒序
   */
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

  /**
   * 吐槽箱倒序
   */
  toggleReverseComments = () => {
    t('条目.吐槽箱倒序', {
      subjectId: this.subjectId
    })

    const { _reverse } = this.subjectComments
    this.fetchSubjectComments(true, !_reverse)
  }

  /**
   * 书籍章节输入框改变
   * @params {*} name 字段
   * @params {*} text 文字
   */
  changeText = (name, text) => {
    t('条目.书籍章节输入框改变', {
      subjectId: this.subjectId
    })

    this.setState({
      [name]: String(text)
    })
  }

  // -------------------- action --------------------
  /**
   * 章节菜单操作
   */
  doEpsSelect = async (value, item, navigation) => {
    // iOS是本集讨论, 安卓是(+N)...
    if (value.includes('本集讨论') || value.includes('(+')) {
      t('条目.章节菜单操作', {
        title: '本集讨论',
        subjectId: this.subjectId
      })

      // 数据占位
      appNavigate(
        item.url,
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

    if (value === '在线播放') {
      t('条目.章节菜单操作', {
        title: '在线播放',
        subjectId: this.subjectId
      })

      // @todo 查找视频数据源地址
      // const find = this.ningMoeDetail.eps.find(i => i.sort === item.sort)
      // if (find && find.bakUrl) {
      //   const realUrl = await discoveryStore.fetchNingMoeRealYunUrl({
      //     url: find.bakUrl
      //   })
      //   if (realUrl) {
      //     navigation.push('Video', {
      //       url: realUrl
      //     })
      //     return
      //   }
      // }

      setTimeout(() => {
        showActionSheet(this.onlinePlayActionSheetData, index => {
          const isSp = item.type === 1
          let url

          if (this.onlinePlayActionSheetData[index] === '柠萌瞬间') {
            // @notice 像一拳超人第二季这种 要处理EP偏移
            if (isSp) {
              url = `${HOST_NING_MOE}/detail?line=1&eps=1&bangumi_id=${this.ningMoeDetail.id}`
            } else {
              url = `${HOST_NING_MOE}/detail?line=1&eps=${item.sort -
                this.ningMoeEpOffset}&bangumi_id=${this.ningMoeDetail.id}`
            }
          } else {
            // @todo 逻辑比较复杂, 暂时不处理EP偏移
            const { epsData } = this.state
            const { eps } = this.subjectEp
            const site = this.onlinePlayActionSheetData[index]
            let epIndex
            if (sites.includes(site)) {
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
          }

          if (url) {
            open(url)
          }
        })
      }, 320)

      return
    }

    // 未收藏不能更改进度
    const { status = { name: '未收藏' } } = this.collection
    if (status.name !== '未收藏') {
      const status = MODEL_EP_STATUS.getValue(value)
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
        const { eps = [] } = this.subjectEp
        const sort = eps
          .filter(i => i.type === 0)
          .sort((a, b) => (a.sort || 0) - (b.sort || 0))
          .findIndex(i => i.sort === item.sort)
        await userStore.doUpdateSubjectWatched({
          subjectId: this.subjectId,
          sort: sort === -1 ? item.sort : sort + 1
        })
        userStore.fetchUserCollection()
        userStore.fetchUserProgress(this.subjectId)
      }

      return
    }

    info('收藏了才能管理哦')
  }

  /**
   * 管理收藏
   */
  doUpdateCollection = async values => {
    t('条目.管理收藏', {
      subjectId: this.subjectId
    })

    await collectionStore.doUpdateCollection(values)
    collectionStore.fetchCollection(this.subjectId)
    this.closeManageModal()
  }

  /**
   * 更新书籍下一个章节
   */
  doUpdateNext = async name => {
    t('条目.更新书籍下一个章节', {
      subjectId: this.subjectId
    })

    const { chap, vol } = this.state

    // eslint-disable-next-line react/no-access-state-in-setstate
    const next = String(parseInt(this.state[name] || 0) + 1)
    await collectionStore.doUpdateBookEp({
      subjectId: this.subjectId,
      chap,
      vol,
      [name]: next
    })

    this.setState({
      [name]: next
    })
    info('更新成功')
  }

  /**
   * 更新书籍章节
   */
  doUpdateBookEp = async () => {
    t('条目.更新书籍章节', {
      subjectId: this.subjectId
    })

    const { chap, vol } = this.state
    await collectionStore.doUpdateBookEp({
      subjectId: this.subjectId,
      chap,
      vol
    })
    info('更新成功')
  }

  /**
   * 章节按钮长按
   */
  doEpsLongPress = async ({ id }) => {
    t('条目.章节按钮长按', {
      subjectId: this.subjectId
    })

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
    userStore.fetchUserCollection()
    userStore.fetchUserProgress(this.subjectId)
  }

  /**
   * 删除收藏
   */
  doEraseCollection = async () => {
    const { formhash } = this.subjectFormHTML
    if (!formhash) {
      return
    }

    t('条目.删除收藏', {
      subjectId: this.subjectId
    })

    await userStore.doEraseCollection(
      {
        subjectId: this.subjectId,
        formhash
      },
      () => {}, // 因为删除后是302, 使用fail去触发
      () => {
        info('删除收藏成功')
        this.fetchCollection()
        userStore.fetchUserCollection()
      }
    )
  }
}
