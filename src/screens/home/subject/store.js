/*
 * 条目
 * @Params: { _ningMoeId, _jp, _cn, _image, _summary }
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-06-25 16:06:22
 */
import { observable, computed } from 'mobx'
import bangumiData from 'bangumi-data'
import {
  _,
  subjectStore,
  discoveryStore,
  userStore,
  collectionStore,
  systemStore
} from '@stores'
import { open, getTimestamp } from '@utils'
import { HTMLDecode } from '@utils/html'
import { t, xhrCustom, queue, baiduTranslate } from '@utils/fetch'
import {
  appNavigate,
  findSubjectCn,
  getBangumiUrl,
  getCoverMedium
} from '@utils/app'
import store from '@utils/store'
import { info, showActionSheet } from '@utils/ui'
import { HOST, HOST_NING_MOE, URL_DEFAULT_AVATAR } from '@constants'
import { CDN_EPS } from '@constants/cdn'
import { MODEL_SUBJECT_TYPE, MODEL_EP_STATUS } from '@constants/model'
import { NINGMOE_ID } from '@constants/online'

export const imageWidth = _.isPad ? 152 : 120
export const imageHeight = imageWidth * 1.33

const namespace = 'ScreenSubject'
const sites = ['bilibili', 'qq', 'iqiyi', 'acfun', 'youku']
const initRating = {
  count: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0, 10: 0 },
  score: '',
  total: ''
}
const sitesDS = [
  'bilibili',
  'iqiyi',
  'pptv',
  'youku',
  'acfun',
  'nicovideo',
  'qq',
  'mgtv'
]
const excludeState = {
  visible: false, // 是否显示管理模态框
  showHeaderTitle: false,

  chap: '', // 书籍章
  vol: '', // 卷
  translateResult: [], // 翻译缓存
  discTranslateResult: [] // 曲目名字翻译缓存
}

export default class ScreenSubject extends store {
  state = observable({
    ...excludeState,
    epsReverse: false, // 章节是否倒序
    watchedEps: '', // 普通条目章节
    filterEps: 0, // 筛选章节的开头
    bangumiInfo: {
      sites: [], // 动画在线地址
      type: '' // 动画类型
    },

    // 播放源
    epsData: {
      _loaded: false
    },
    _loaded: false
  })

  init = async () => {
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - _loaded > 60

    try {
      const state = await this.getStorage(undefined, this.namespace)
      this.setState({
        ...state,
        ...excludeState,
        _loaded: needFetch ? current : _loaded
      })

      if (needFetch) {
        return this.onHeaderRefresh()
      }
      return true
    } catch (error) {
      this.setState({
        ...excludeState,
        _loaded: needFetch ? current : _loaded
      })
      return true
    }
  }

  onHeaderRefresh = async () => {
    /**
     * 访问私有cdn, 加速未缓存条目首屏数据渲染
     * 因为有cdn, 下面2个用户相关的接口可以提前
     */
    this.fetchSubjectFormCDN()
    this.fetchCollection() // 用户每集收看进度
    userStore.fetchUserProgress(this.subjectId) // 用户收藏状态

    // API条目信息
    const res = this.fetchSubject()
    const data = await res

    // bangumi-data数据扩展
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
    const name = data.name_cn || data.name
    if (this.type === '动画') {
      const { _ningMoeId = NINGMOE_ID[name] } = this.params
      if (_ningMoeId) {
        discoveryStore.fetchNingMoeDetail({
          id: _ningMoeId,
          bgmId: this.subjectId
        })
      } else {
        // 柠萌瞬间有时候条目名会有差异, 比如bgm叫炎炎消防队, 柠萌就叫炎炎之消防队
        discoveryStore.fetchNingMoeDetailBySearch({
          keyword: name
        })
      }
    }

    queue([
      // () => userStore.fetchUserProgress(this.subjectId), // 用户收藏状态
      // () => subjectStore.fetchSubjectEp(this.subjectId), // [废弃] 跟条目API重复
      // () => this.fetchCollection(), // 用户每集收看进度
      () => this.fetchSubjectComments(true), // 吐槽
      () => this.fetchSubjectFormHTML(), // 条目API没有的网页额外数据
      () => this.fetchEpsData() // 单集播放源
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
    const { watchedEps, book } = await res
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
    if (!setting.cdn || _loaded) {
      return true
    }
    return subjectStore.fetchSubjectFormCDN(this.subjectId)
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
        const { _response } = await xhrCustom({
          url: CDN_EPS(this.subjectId)
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

  @computed get filterDefault() {
    const { filterDefault } = systemStore.setting
    return filterDefault
  }

  /**
   * bgm链接
   */
  @computed get url() {
    return `${HOST}/subject/${this.subjectId}`
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
   * 条目CDN自维护数据
   */
  @computed get subjectFormCDN() {
    return subjectStore.subjectFormCDN(this.subjectId)
  }

  /**
   * 章节信息
   */
  // @computed get subjectEp() {
  //   return subjectStore.subjectEp(this.subjectId)
  // }

  /**
   * 条目留言
   * 筛选逻辑
   *  - 主动设置屏蔽默认头像用户相关信息
   *  - 限制用户群体 (iOS的游客和审核员) 强制屏蔽默认头像用户
   */
  @computed get subjectComments() {
    const subjectComments = subjectStore.subjectComments(this.subjectId)
    if (this.filterDefault || userStore.isLimit) {
      return {
        ...subjectComments,
        list: subjectComments.list.filter(
          item => !item.avatar.includes(URL_DEFAULT_AVATAR)
        )
      }
    }
    return subjectComments
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
    const { _loaded, type } = this.subject
    if (!_loaded) {
      return ''
    }
    return MODEL_SUBJECT_TYPE.getTitle(type)
  }

  // Ep偏移
  @computed get ningMoeEpOffset() {
    const { eps = [] } = this.subject
    return (
      eps.filter(item => item.type === 0).sort((a, b) => a.sort - b.sort)[0]
        .sort - 1
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

  @computed get isLimit() {
    return userStore.isLimit
  }

  @computed get hideScore() {
    return systemStore.setting.hideScore
  }

  @computed get onlineOrigins() {
    const { bangumiInfo } = this.state
    const { sites = [] } = bangumiInfo
    const _data = []
    if (this.ningMoeDetail.id) {
      _data.push('柠萌瞬间')
    }

    const data = [
      ..._data,
      ...sites
        .filter(item => sitesDS.includes(item.site))
        .map(item => item.site)
    ]
    if (['动画', '三次元'].includes(this.type)) {
      data.push('AGE动漫')
      data.push('迅播动漫')
    }
    return data
  }

  /**
   * 是否PS游戏, 跳转psnine查看奖杯
   */
  @computed get isPS() {
    return (
      this.type === '游戏' &&
      (this.info.includes('PS4') ||
        this.info.includes('PS3') ||
        this.info.includes('PS5'))
    )
  }

  /**
   * 筛选章节构造数据, 每100章节一个选项
   */
  @computed get filterEpsData() {
    const data = ['从 1 起']
    if (this.eps.length < 100) {
      return data
    }

    const count = parseInt(this.eps.length / 100)
    for (let i = 1; i <= count; i += 1) {
      data.push(`从 ${i * 100} 开始`)
    }
    return data
  }

  // -------------------- get: cdn fallback --------------------
  @computed get coverPlaceholder() {
    const { _image } = this.params
    return _image || this.subjectFormCDN.image || this.subject.images.medium
  }

  @computed get jp() {
    const { _jp } = this.params
    return HTMLDecode(this.subject.name || _jp || this.subjectFormCDN.name)
  }

  @computed get cn() {
    const { _cn } = this.params
    return HTMLDecode(
      this.subject.name_cn || _cn || findSubjectCn(this.jp, this.subjectId)
    )
  }

  @computed get subjectType() {
    if (this.subject._loaded) {
      return this.subject.type
    }
    return this.subjectFormCDN.type
  }

  @computed get rating() {
    if (this.subject._loaded) {
      return {
        ...initRating,
        ...this.subject.rating
      }
    }
    if (this.subjectFormCDN._loaded) {
      return {
        ...initRating,
        ...this.subjectFormCDN.rating
      }
    }
    return initRating
  }

  @computed get lock() {
    if (this.subjectFormHTML._loaded) {
      return this.subjectFormHTML.lock
    }
    return this.subjectFormCDN.lock
  }

  @computed get subjectCollection() {
    if (this.subject._loaded) {
      return this.subject.collection || {}
    }
    return this.subjectFormCDN.collection || {}
  }

  @computed get eps() {
    if (this.subject._loaded) {
      return this.subject.eps || []
    }
    return this.subjectFormCDN.eps || []
  }

  /**
   * 经过计算后传递到<Eps>的data
   */
  @computed get toEps() {
    const { epsReverse, filterEps } = this.state
    if (filterEps) {
      const eps = this.eps.filter((item, index) => index >= filterEps)
      return epsReverse ? eps.reverse() : eps
    }

    return epsReverse ? this.eps.reverse() : this.eps
  }

  @computed get disc() {
    if (this.subjectFormHTML._loaded) {
      return this.subjectFormHTML.disc || []
    }
    return this.subjectFormCDN.disc || []
  }

  @computed get summary() {
    if (this.subject._loaded) {
      return this.subject.summary
    }
    const { _summary = '' } = this.params
    return this.subjectFormCDN.summary || _summary
  }

  @computed get tags() {
    if (this.subjectFormHTML._loaded) {
      return this.subjectFormHTML.tags || []
    }
    return this.subjectFormCDN.tags || []
  }

  @computed get info() {
    if (this.subjectFormHTML._loaded) {
      return this.subjectFormHTML.info
    }
    return this.subjectFormCDN.info
  }

  @computed get crt() {
    if (this.subject._loaded) {
      const { crt } = this.subject
      return (crt || []).map(
        ({
          id,
          images = {},
          name,
          name_cn: nameCn,
          role_name: roleName,
          actors = []
        }) => ({
          id,
          image: images.grid,
          _image: images.medium,
          name: nameCn || name,
          nameJP: name,
          desc: (actors[0] && actors[0].name) || roleName
        })
      )
    }
    return this.subjectFormCDN.crt || []
  }

  @computed get staff() {
    if (this.subject._loaded) {
      const { staff } = this.subject
      return (staff || []).map(
        ({ id, images = {}, name, name_cn: nameCn, jobs = [] }) => ({
          id,
          image: images.grid,
          _image: images.medium,
          name: nameCn || name,
          nameJP: name,
          desc: jobs[0]
        })
      )
    }
    return this.subjectFormCDN.staff || []
  }

  @computed get relations() {
    if (this.subject._loaded) {
      return (this.subjectFormHTML.relations || []).map(
        ({ id, image, title, type }) => ({
          id,
          image,
          name: title,
          desc: type
        })
      )
    }
    return (this.subjectFormCDN.relations || []).map(item => ({
      id: item.id,
      image: item.image,
      name: item.title,
      desc: item.type
    }))
  }

  @computed get comic() {
    if (this.subject._loaded) {
      return this.subjectFormHTML.comic || []
    }
    return this.subjectFormCDN.comic || []
  }

  @computed get like() {
    if (this.subject._loaded) {
      return this.subjectFormHTML.like || []
    }
    return this.subjectFormCDN.like || []
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
   * 吐槽倒序
   */
  toggleReverseComments = () => {
    t('条目.吐槽倒序', {
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

    try {
      this.setState({
        [name]: String(text)
      })
    } catch (error) {
      warn(namespace, 'changeText', error)
    }
  }

  /**
   * 在线源头选择
   * @params {*} key
   */
  onlinePlaySelected = key => {
    t('条目.搜索源', {
      type: key,
      subjectId: this.subjectId,
      subjectType: this.type
    })

    try {
      const { bangumiInfo } = this.state
      const { sites = [] } = bangumiInfo
      let item
      switch (key) {
        case '柠萌瞬间':
          open(
            `${HOST_NING_MOE}/detail?line=1&eps=1&from=bangumi&bangumi_id=${this.ningMoeDetail.id}`
          )
          break
        case 'AGE动漫':
          open(
            `https://www.agefans.tv/search?query=${encodeURIComponent(
              this.cn
            )}&page=1`
          )
          break
        case '迅播动漫':
          open(
            `https://dm.xbdm.net/search.php?searchword=${encodeURIComponent(
              this.cn
            )}`
          )
          break
        default:
          item = sites.find(item => item.site === key)
          if (item) {
            const url = getBangumiUrl(item)
            open(url)
          }
          break
      }
    } catch (error) {
      warn(namespace, 'onlinePlaySelected', error)
    }
  }

  /**
   * 前往PSNINE查看游戏奖杯
   */
  toPSNINE = () => {
    t('条目.查看奖杯', {
      subjectId: this.subjectId
    })

    open(
      `https://psnine.com/psngame?title=${encodeURIComponent(
        this.cn || this.jp
      )}`
    )
  }

  /**
   * 设置章节筛选
   */
  updateFilterEps = key => {
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

  updateShowHeaderTitle = showHeaderTitle => {
    this.setState({
      showHeaderTitle
    })
  }

  // -------------------- action --------------------
  /**
   * 章节菜单操作
   */
  doEpsSelect = async (value, item, navigation) => {
    try {
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
            t('条目.章节菜单操作', {
              title: this.onlinePlayActionSheetData[index],
              subjectId: this.subjectId
            })

            const isSp = item.type === 1
            let url

            if (this.onlinePlayActionSheetData[index] === '柠萌瞬间') {
              // @notice 像一拳超人第二季这种 要处理EP偏移
              if (isSp) {
                url = `${HOST_NING_MOE}/detail?line=1&eps=1&bangumi_id=${this.ningMoeDetail.id}`
              } else {
                url = `${HOST_NING_MOE}/detail?line=1&eps=${
                  item.sort - this.ningMoeEpOffset
                }&bangumi_id=${this.ningMoeDetail.id}`
              }
            } else {
              // @todo 逻辑比较复杂, 暂时不处理EP偏移
              const { epsData } = this.state
              const { eps = [] } = this.subject
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
          const { eps = [] } = this.subject
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
    } catch (error) {
      warn(namespace, 'doEpsSelect', error)
    }
  }

  /**
   * 管理收藏
   */
  doUpdateCollection = async values => {
    t('条目.管理收藏', {
      subjectId: this.subjectId
    })

    try {
      await collectionStore.doUpdateCollection(values)
      collectionStore.fetchCollection(this.subjectId)
      this.closeManageModal()
    } catch (error) {
      warn(namespace, 'doUpdateCollection', error)
    }
  }

  /**
   * 更新书籍下一个章节
   */
  doUpdateNext = async name => {
    t('条目.更新书籍下一个章节', {
      subjectId: this.subjectId
    })

    try {
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
    } catch (error) {
      warn(namespace, 'doUpdateNext', error)
    }
  }

  /**
   * 更新书籍章节
   */
  doUpdateBookEp = async () => {
    t('条目.更新书籍章节', {
      subjectId: this.subjectId
    })

    try {
      const { chap, vol } = this.state
      await collectionStore.doUpdateBookEp({
        subjectId: this.subjectId,
        chap,
        vol
      })
      info('更新成功')
    } catch (error) {
      warn(namespace, 'doUpdateBookEp', error)
    }
  }

  /**
   * 输入框更新章节
   */
  doUpdateSubjectEp = async () => {
    const { watchedEps } = this.state
    t('条目.输入框更新章节', {
      subjectId: this.subjectId
    })

    try {
      collectionStore.doUpdateSubjectEp(
        {
          subjectId: this.subjectId,
          watchedEps
        },
        async () => {
          userStore.fetchUserCollection()
          userStore.fetchUserProgress(this.subjectId)
          this.fetchSubjectFormHTML()
          this.setStorage(undefined, undefined, this.namespace)
          info('更新成功')
        }
      )
    } catch (error) {
      warn(namespace, 'doUpdateSubjectEp', error)
    }
  }

  /**
   * 章节按钮长按
   */
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
      userStore.fetchUserCollection()
      userStore.fetchUserProgress(this.subjectId)
    } catch (error) {
      warn(namespace, 'doEpsLongPress', error)
    }
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

    try {
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
    } catch (error) {
      warn(namespace, 'doEraseCollection', error)
    }
  }

  /**
   * 翻译简介
   */
  doTranslate = async () => {
    if (this.state.translateResult.length) {
      return
    }

    t('条目.翻译简介', {
      subjectId: this.subjectId
    })

    try {
      const response = await baiduTranslate(this.summary)
      const { trans_result: translateResult } = JSON.parse(response)
      if (Array.isArray(translateResult)) {
        this.setState({
          translateResult
        })
        info('翻译成功')
        return
      }
      info('翻译失败, 请重试')
    } catch (error) {
      info('翻译失败, 请重试')
    }
  }

  /**
   * 翻译曲目
   */
  doDiscTranslate = async () => {
    if (this.state.discTranslateResult.length) {
      return
    }

    t('条目.翻译曲目', {
      subjectId: this.subjectId
    })

    const discTitle = []
    this.disc.forEach(item => {
      item.disc.forEach((i, index) => {
        discTitle.push(i.title.replace(`${index + 1} `, ''))
      })
    })

    try {
      const response = await baiduTranslate(discTitle.join('\n'))
      const { trans_result: discTranslateResult } = JSON.parse(response)
      if (Array.isArray(discTranslateResult)) {
        this.setState({
          discTranslateResult
        })
        info('翻译成功')
        return
      }
      info('翻译失败, 请重试')
    } catch (error) {
      info('翻译失败, 请重试')
    }
  }
}
