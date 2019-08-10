/*
 * 条目
 * params { _id, _jp, _cn, _image }
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-08-10 20:45:20
 */
import { observable, computed } from 'mobx'
import bangumiData from 'bangumi-data'
import {
  subjectStore,
  discoveryStore,
  userStore,
  collectionStore
} from '@stores'
import { open, getTimestamp } from '@utils'
import { xhrCustom, queue } from '@utils/fetch'
import { appNavigate, getBangumiUrl } from '@utils/app'
import store from '@utils/store'
import { info, showActionSheet } from '@utils/ui'
import { NING_MOE_HOST } from '@constants'
import { MODEL_SUBJECT_TYPE, MODEL_EP_STATUS } from '@constants/model'

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

    const { subjectId } = this.params
    const res = subjectStore.fetchSubject(subjectId)
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
        await discoveryStore.fetchNingMoeDetail({
          id: _ningMoeId,
          bgmId: subjectId
        })
      } else {
        await discoveryStore.fetchNingMoeDetailBySearch({
          keyword: data.name_cn || data.name
        })
      }
    }

    queue([
      () => subjectStore.fetchSubjectEp(subjectId),
      () => collectionStore.fetchCollection(subjectId),
      () => userStore.fetchUserProgress(subjectId),
      async () => {
        const res = subjectStore.fetchSubjectFormHTML(subjectId)
        const { book } = await res
        this.setState({
          chap: book.chap || '0',
          vol: book.vol || '0'
        })
        return res
      },
      () => this.fetchEpsData(),
      () => this.fetchSubjectComments(true)
    ])
    return res
  }

  // -------------------- fetch --------------------
  /**
   * 条目留言
   */
  fetchSubjectComments = (refresh, reverse) => {
    const { subjectId } = this.params
    return subjectStore.fetchSubjectComments({ subjectId }, refresh, reverse)
  }

  /**
   * 获取单集播放源
   * https://github.com/ekibun/bangumi_onair/blob/master/onair/100/100444.json
   */
  fetchEpsData = async () => {
    if (this.type === '动画') {
      try {
        const { subjectId } = this.params
        const { _response } = await xhrCustom({
          url: `https://raw.githubusercontent.com/ekibun/bangumi_onair/master/onair/${parseInt(
            parseInt(subjectId) / 1000
          )}/${subjectId}.json`
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
        // do nothing
      }
    }
  }

  // -------------------- get --------------------
  /**
   * 命名空间
   */
  @computed get namespace() {
    const { subjectId } = this.params
    return `${namespace}|${subjectId}`
  }

  /**
   * 是否登录(token)
   */
  @computed get isLogin() {
    return userStore.isLogin
  }

  /**
   * 条目信息
   */
  @computed get subject() {
    const { subjectId } = this.params
    return subjectStore.subject(subjectId)
  }

  /**
   * 柠萌瞬间ep数据
   */
  @computed get ningMoeDetail() {
    const { subjectId } = this.params
    return discoveryStore.ningMoeDetail(subjectId)
  }

  /**
   * 条目信息(来自网页)
   */
  @computed get subjectFormHTML() {
    const { subjectId } = this.params
    return subjectStore.subjectFormHTML(subjectId)
  }

  /**
   * 章节信息
   */
  @computed get subjectEp() {
    const { subjectId } = this.params
    return subjectStore.subjectEp(subjectId)
  }

  /**
   * 条目留言
   */
  @computed get subjectComments() {
    const { subjectId } = this.params
    return subjectStore.subjectComments(subjectId)
  }

  /**
   * 条目收藏信息
   */
  @computed get collection() {
    const { subjectId } = this.params
    return collectionStore.collection(subjectId)
  }

  /**
   * 用户章节记录
   */
  @computed get userProgress() {
    const { subjectId } = this.params
    return userStore.userProgress(subjectId)
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

  // -------------------- page --------------------
  /**
   * 显示管理进度信息弹窗
   */
  showManageModel = () => {
    this.setState({
      visible: true
    })
  }

  /**
   * 隐藏管理进度信息弹窗
   */
  closeManageModal = () => {
    this.setState({
      visible: false
    })
  }

  /**
   * 章节倒序
   */
  toggleReverseEps = () => {
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
    const { _reverse } = this.subjectComments
    this.fetchSubjectComments(true, !_reverse)
  }

  /**
   * 书籍章节输入框改变
   * @params {*} name 字段
   * @params {*} text 文字
   */
  changeText = (name, text) => {
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
      appNavigate(item.url, navigation)
      return
    }

    if (value === '在线播放') {
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
              url = `${NING_MOE_HOST}/bangumi/${this.ningMoeDetail.id}/home`
            } else {
              url = `${NING_MOE_HOST}/bangumi/detail/${
                this.ningMoeDetail.id
              }/${item.sort - this.ningMoeEpOffset}/home`
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
        // 更新收视进度
        await userStore.doUpdateEpStatus({
          id: item.id,
          status
        })
        userStore.fetchUserCollection()
        userStore.fetchUserProgress()
      }

      if (value === '看到') {
        const { subjectId } = this.params

        // 批量更新收视进度
        await userStore.doUpdateSubjectWatched({
          subjectId,
          sort: item.sort
        })
        userStore.fetchUserCollection()
        userStore.fetchUserProgress()
      }
      return
    }

    info('收藏了才能管理哦')
  }

  /**
   * 管理收藏
   */
  doUpdateCollection = async values => {
    const { subjectId } = this.params
    await collectionStore.doUpdateCollection(values)
    collectionStore.fetchCollection(subjectId)
    this.closeManageModal()
  }

  /**
   * 更新书籍下一个章节
   */
  doUpdateNext = async name => {
    const { subjectId } = this.params
    const { chap, vol } = this.state

    // eslint-disable-next-line react/no-access-state-in-setstate
    const next = String(parseInt(this.state[name] || 0) + 1)
    await collectionStore.doUpdateBookEp({
      subjectId,
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
    const { chap, vol } = this.state
    const { subjectId } = this.params
    await collectionStore.doUpdateBookEp({
      subjectId,
      chap,
      vol
    })
    info('更新成功')
  }
}
