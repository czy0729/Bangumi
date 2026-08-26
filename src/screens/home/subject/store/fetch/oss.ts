/*
 * @Author: czy0729
 * @Date: 2022-05-11 19:33:22
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-26 21:47:08
 */
import { subjectStore } from '@stores'
import { getTimestamp, omit, postTask } from '@utils'
import { get, update } from '@utils/kv'
import { D1, D7 } from '@constants'
import Computed from '../computed'

import type { ResultData } from '@utils/kv/type'
import type { SubjectCommentValue, SubjectSnapshot, VideoItem } from '../../types'

/** 条目 OSS 预数据 (云端缓存下载与上传) */
export default class Oss extends Computed {
  /** 装载云端条目缓存数据 */
  fetchSubjectFromOSS = async () => {
    if (this.subjectFormHTML._loaded && (this.cn || this.jp)) return

    try {
      const data = await get<ResultData<SubjectSnapshot>>(`subject_${this.subjectId}`)

      // 云端没有数据存在, 本地计算后上传
      if (!data) {
        this.updateSubjectThirdParty()
        return
      }

      const { ts, ...subject } = data
      const now = getTimestamp()
      if (typeof subject === 'object' && !Array.isArray(subject)) {
        this.setState({
          subject: {
            ...subject,
            _loaded: now
          }
        })
      }

      if (now - ts >= D7) this.updateSubjectThirdParty()
    } catch {}
  }

  /** 装载云端条目留言缓存数据 */
  fetchCommentsFromOSS = async () => {
    // computed.subjectComments 在空列表分支会合成 _loaded, 不能作为是否已加载的判断依据
    if (subjectStore.subjectComments(this.subjectId)._loaded) return
    if (this.state.comments._loaded) return

    try {
      const data = await get<ResultData<SubjectCommentValue>>(`comments_${this.subjectId}`)

      // 云端没有数据存在, 本地计算后上传
      if (!data) {
        this.updateCommentsThirdParty()
        return
      }

      const { ts, ...comments } = data
      const now = getTimestamp()
      if (typeof comments === 'object') {
        this.setState({
          comments
        })
      }

      if (now - ts >= D1) this.updateCommentsThirdParty()
    } catch {}
  }

  /** 下载预数据 */
  getThirdParty = async () => {
    try {
      const data = await get<
        ResultData<{
          videos?: VideoItem[]
          epsThumbs?: string[]
          epsThumbsHeader?: { Referer?: string }
        }>
      >(`douban_${this.subjectId}`)
      if (!data) return true

      const { ts, videos = [], epsThumbs = [], epsThumbsHeader = {} } = data
      if (
        // 数量不够更新
        videos.length + epsThumbs.length <= 2 ||
        // 7 天更新一次
        getTimestamp() - ts >= D7
      ) {
        return true
      }

      this.setState({
        videos,
        epsThumbs,
        epsThumbsHeader
      })
      this.save()

      return false
    } catch {
      return true
    }
  }

  /** 上传条目预数据 */
  updateSubjectThirdParty = () => {
    postTask(() => {
      const { _loaded, formhash } = this.subjectFormHTML

      // formhash 是登录并且可操作条目的用户的必有值
      if (!_loaded || !formhash) return

      update(`subject_${this.subjectId}`, {
        ...omit(this.subjectFormHTML, [
          'type',
          'watchedEps',
          'friend',
          'who',
          'formhash',
          '_loaded'
        ]),
        id: this.subjectId,
        type: this.subject.type,
        name: this.jp,
        name_cn: this.cn,
        image: this.subject.images?.common,
        eps: this.eps,
        collection: this.subjectCollection,
        summary: this.summary,
        rating: this.rating,
        rank: this.subject.rank || '',
        character: this.crt,
        staff: this.staff,
        titleLabel: this.titleLabel
      })
    }, 10000)
  }

  /** 上传留言预数据 */
  updateCommentsThirdParty = () => {
    if (this.state.filterStatus !== '') return

    postTask(() => {
      const data = this.subjectComments

      // 不允许有自定义筛选过的数据同步到云端
      if (!data?.list?.length || !data?._loaded || data?.version || data?._reverse) {
        return false
      }

      update(`comments_${this.subjectId}`, {
        list: data.list.slice(0, 40),
        pagination: {
          page: 1,
          pageTotal: 1
        },
        _loaded: data._loaded,
        _reverse: false
      })
    }, 10000)
  }

  /** 上传预数据 */
  updateThirdParty = () => {
    postTask(() => {
      update(`douban_${this.subjectId}`, {
        videos: this.state.videos,
        epsThumbs: this.state.epsThumbs,
        epsThumbsHeader: this.state.epsThumbsHeader
      })
    }, 0)
  }
}
