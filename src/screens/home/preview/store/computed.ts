/*
 * @Author: czy0729
 * @Date: 2024-09-07 01:38:06
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-21 12:00:00
 *
 * 派生: 页面命名空间、路由透传的预览图与请求头、最终展示的图片列表
 */
import { computed } from 'mobx'
import { cnjp } from '@utils'
import { HOST } from '@constants'
import State from './state'
import { NAMESPACE } from './ds'

export default class Computed extends State {
  /** 本地化 */
  save = () => {
    return this.saveStorage(this.namespace)
  }

  /** 条目 id */
  @computed get subjectId() {
    return this.params.subjectId
  }

  /** 页面唯一命名空间 */
  @computed get namespace() {
    return `${NAMESPACE}|${this.subjectId}` as const
  }

  /** 条目名称 */
  @computed get name() {
    return cnjp(this.params?.cn, this.params?.jp) || ''
  }

  /** 路由透传的预览图 (参数为 JSON 字符串, 非法值丢弃) */
  @computed get data(): string[] {
    try {
      const { _images } = this.params
      if (!_images) return []

      const data = JSON.parse(_images) as unknown
      if (!Array.isArray(data)) return []

      return data.filter((item): item is string => typeof item === 'string')
    } catch {}

    return []
  }

  /** 路由透传的请求头 (参数为 JSON 字符串, 只保留合法的 Referer) */
  @computed get headers(): {
    Referer?: string
  } {
    try {
      const { _headers } = this.params
      if (!_headers) return {}

      const headers = JSON.parse(_headers) as unknown
      if (!headers || typeof headers !== 'object' || Array.isArray(headers)) return {}

      const { Referer } = headers as { Referer?: unknown }
      return typeof Referer === 'string' ? { Referer } : {}
    } catch {}

    return {}
  }

  /** 实际使用的请求头 (路由透传的优先) */
  @computed get displayHeaders(): {
    Referer?: string
  } {
    return this.headers?.Referer ? this.headers : this.state.epsThumbsHeader
  }

  /** 是否为豆瓣剧照 (需要按 /public 后缀去重), 与 displayHeaders 同源 */
  @computed get isDouban() {
    return !!this.displayHeaders?.Referer?.includes('douban')
  }

  /** 展示的预览图: 路由透传图优先, 豆瓣场景与云端剧照按 /public 后缀去重合并 */
  @computed get images(): string[] {
    const { epsThumbs = [] } = this.state
    const data = this.data
    const images = data.length ? [...data] : [...epsThumbs]

    if (!this.isDouban) return images

    epsThumbs.forEach(item => {
      const ext = item.split(/public/)?.[1]
      if (ext && !images.some(target => target.includes(ext))) {
        images.push(item)
      }
    })

    return images
  }

  /** 图片查看器数据 (去掉缩放后缀) */
  @computed get viewerData() {
    const headers = this.displayHeaders
    return this.images.map(url => ({
      url: url.split('@')?.[0],
      headers
    }))
  }

  /** 地址 */
  @computed get url() {
    return `${HOST}/preview/${this.subjectId}`
  }

  @computed get hm() {
    return [this.url, 'Preview'] as const
  }
}
