/*
 * 条目
 * @Params: { _jp, _cn, _image, _imageForce, _summary, _type,
 *            _collection, _rating,
 *            _aid, _wid, _hid }
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-03 16:44:05
 */
import { collectionStore, otaStore, subjectStore, userStore } from '@stores'
import { getTimestamp } from '@utils'
import { queue } from '@utils/fetch'
import Action from './action'
import { EXCLUDE_STATE } from './ds'

class ScreenSubject extends Action {
  /** 初始化 */
  init = async () => {
    // 是否需要更新数据
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60

    try {
      const state = (await this.getStorage(this.namespace)) || {}
      this.setState({
        ...state,
        ...EXCLUDE_STATE,
        _loaded: needFetch ? current : _loaded
      })

      // 装载条目云端缓存数据
      this.fetchSubjectFromOSS()
      if (needFetch) {
        // 手动刷新全局条目收藏状态
        collectionStore.fetchCollectionStatusQueue([this.subjectId])
        return this.onHeaderRefresh()
      }

      return true
    } catch (error) {
      this.setState({
        ...EXCLUDE_STATE,
        _loaded: needFetch ? current : _loaded
      })
      return true
    }
  }

  /** 访问私有 cdn, 加速未缓存条目首屏数据渲染 */
  onHeaderRefresh = async () => {
    // 因为有 cdn, 下面 2 个用户相关的接口可以提前
    if (!this.state.subject._loaded) this.fetchSubjectFormCDN()

    // 用户每集收看进度
    this.fetchCollection()

    // 用户收藏状态
    userStore.fetchUserProgress(this.subjectId)

    // API 条目信息
    const data = await this.fetchSubject()
    queue([
      () => this.fetchOTA(), // 装载第三方找条目数据
      () => this.fetchThirdParty(data), // 装载第三方额外数据
      () => this.fetchAnitabi(),
      () => this.fetchTrackComments(),
      () => this.fetchSubjectComments(true), // 吐槽
      () => this.fetchSubjectFormHTML(), // 条目 API 没有的网页额外数据
      () => this.fetchEpsData(), // 单集播放源
      () => this.rendered(), // 有时候没有触发成功, 强制触发

      // 对集数大于 1000 的条目, 旧 API 并不会返回大于 1000 章节的信息, 暂时到新的 API 里取
      () => {
        if (this.subject.eps?.length >= 1000) {
          return subjectStore.fetchSubjectEpV2(this.subjectId)
        }

        return true
      }
    ])

    if (this.subject.eps?.length >= 1000) {
      subjectStore.fetchSubjectEpV2(this.subjectId)
    }

    // 敏感条目不再返回数据, 而旧接口 staff 也错乱, 主动请求网页的 staff 数据
    // @ts-expect-error
    if (data?.code === 404) this.fetchPersons()

    return true
  }

  /** 装载第三方找条目数据 */
  fetchOTA = () => {
    if (this.type === '动画') {
      if (this.animeInfo?.i) otaStore.fetchAnime(this.animeInfo.i)
      return
    }

    if (this.type === '游戏') {
      if (this.gameInfo?.i) otaStore.fetchGame(this.gameInfo.i)
      return
    }
  }
}

export default ScreenSubject
