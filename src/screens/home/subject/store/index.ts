/*
 * 条目
 * @Params: { _jp, _cn, _image, _imageForce, _summary, _type,
 *            _collection, _rating,
 *            _aid, _wid, _hid }
 * @Author: czy0729
 * @Date: 2019-03-22 08:49:20
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-06-23 04:37:45
 */
import { userStore } from '@stores'
import { getTimestamp } from '@utils'
import { queue } from '@utils/fetch'
import Action from './action'
import { EXCLUDE_STATE } from './ds'

class ScreenSubject extends Action {
  /**
   * 初始化
   */
  init = async () => {
    // 是否需要更新数据
    const { _loaded } = this.state
    const current = getTimestamp()
    const needFetch = !_loaded || current - Number(_loaded) > 60

    try {
      const state = (await this.getStorage(undefined, this.namespace)) || {}
      this.setState({
        ...state,
        ...EXCLUDE_STATE,
        _loaded: needFetch ? current : _loaded
      })

      if (needFetch) return this.onHeaderRefresh()

      return true
    } catch (error) {
      console.error('Subject', 'init', error)

      this.setState({
        ...EXCLUDE_STATE,
        _loaded: needFetch ? current : _loaded
      })
      return true
    }
  }

  /**
   * 访问私有cdn, 加速未缓存条目首屏数据渲染
   */
  onHeaderRefresh = async () => {
    // 因为有cdn, 下面2个用户相关的接口可以提前
    this.fetchSubjectFormCDN()
    this.fetchCollection() // 用户每集收看进度
    userStore.fetchUserProgress(this.subjectId) // 用户收藏状态

    // API条目信息
    const data = await this.fetchSubject()
    queue([
      () => this.fetchThirdParty(data), // bangumi-data 数据扩展
      () => this.fetchSubjectComments(true), // 吐槽
      () => this.fetchSubjectFormHTML(), // 条目API没有的网页额外数据
      () => this.fetchEpsData(), // 单集播放源
      () => this.rendered() // 有时候没有触发成功, 强制触发
    ])

    // 敏感条目不再返回数据, 而旧接口staff也错乱, 主动请求网页的staff数据
    if (data?.code === 404) {
      this.fetchPersons()
    }

    return data
  }
}

export default ScreenSubject
