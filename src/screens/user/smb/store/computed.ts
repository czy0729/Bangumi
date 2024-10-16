/*
 * @Author: czy0729
 * @Date: 2024-09-05 15:11:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-10-16 06:17:57
 */
import { computed } from 'mobx'
import { collectionStore, smbStore, subjectStore, userStore } from '@stores'
import { SMB } from '@stores/smb/types'
import { fixedSubjectInfo } from '@utils'
import { WEB } from '@constants'
import { InferArray, SubjectId } from '@types'
import { LIMIT, REG_AIRDATE } from '../ds'
import { SubjectOSS } from '../types'
import { fixedUrl } from '../utils'
import State from './state'

export default class Computed extends State {
  /** 因为性能, 列表没有参与反应, 自己维护了一个值用于监控更新 */
  @computed get refreshKey() {
    const { uuid, sort, tags, subjectTags, page, filter, refreshKey, configs } = this.state
    const { layoutList } = configs
    return JSON.stringify({
      uuid,
      sort,
      tags,
      subjectTags,
      page,
      filter,
      refreshKey,
      layoutList
    })
  }

  /** SMB 服务列表 */
  @computed get data() {
    return smbStore.data
  }

  /** 是否登录 (api) */
  @computed get isLogin() {
    return userStore.isLogin
  }

  /** 当前的 SMB 文件夹 */
  @computed get current() {
    const { uuid } = this.state
    return this.data.find(item => item.smb.uuid === uuid) as InferArray<SMB>
  }

  /** 当前的 SMB 文件夹匹配到的所有条目 id */
  @computed get subjectIds() {
    const ids: SubjectId[] = []
    if (this.current?.list) {
      this.current.list.forEach(item => {
        item.ids.forEach(id => {
          if (!ids.includes(id)) ids.push(id)
        })
      })
    }

    return ids
  }

  /** SMB 数据 */
  @computed get smbs() {
    return this.data.map(item => {
      let name = item.smb.name
      if (!name) name = `${item.smb.ip}${item.smb.port ? ':' : ''}${item.smb.port}`
      return {
        uuid: item.smb.uuid,
        name
      }
    })
  }

  /** 当前分页数据 */
  @computed get pageList() {
    const { page } = this.state
    if (!page) return []

    return this.memoList.slice((page - 1) * LIMIT, page * LIMIT)
  }

  /** 扩展刮削词 */
  @computed get extendsJA(): Record<string, SubjectId> {
    try {
      const { value } = this.state.extendsJA
      const data = {}
      value
        .split('\n')
        .filter(item => !!item)
        .map(item => item.trim())
        .forEach(item => {
          try {
            let [key, value]: any[] = item.split(',')
            key = (key || '').trim()
            value = Number((value || '').trim())
            if (key && value) {
              data[key.toLocaleLowerCase()] = value
            }
          } catch (error) {}
        })
      return data
    } catch (error) {
      return {}
    }
  }

  /** 条目接口数据 */
  subjectV2(subjectId: SubjectId) {
    return computed(() => {
      if (WEB) return this.subjectOSS(subjectId)

      return subjectStore.subjectV2(subjectId) || this.subjectOSS(subjectId)
    }).get()
  }

  /** 条目云端快照 */
  subjectOSS(id: SubjectId) {
    return computed(() => this.state.subjects[`subject_${id}`] || ({} as SubjectOSS)).get()
  }

  /** 条目收藏状态 */
  collection(subjectId: SubjectId) {
    return computed(() => collectionStore.collection(subjectId)).get()
  }

  /** 猜测发售日 */
  airDate(subjectId: SubjectId) {
    return computed(() => {
      const subject = this.subjectV2(subjectId)
      if (subject?._loaded && subject?.date && subject.date !== '0000-00-00') {
        return subject.date
      }

      const subjectFormHTML = subjectStore.subjectFormHTML(subjectId)
      if (subjectFormHTML?._loaded && typeof subjectFormHTML?.info === 'string') {
        const match = fixedSubjectInfo(subjectFormHTML.info).match(REG_AIRDATE)
        return match?.[2] || ''
      }

      return ''
    }).get()
  }

  /** 构造目标链接 */
  url = (
    sharedFolder: string = '',
    folderPath: string = '',
    folderName: string = '',
    fileName: string = '',
    urlTemplate?: string
  ) => {
    return computed(() => {
      try {
        if (!this.current) return ''

        /** smb://[USERNAME]:[PASSWORD]@[IP]/[PATH]/[FILE] */
        const { smb } = this.current
        const path = []
        if (sharedFolder) path.push(sharedFolder)
        if (folderPath) path.push(folderPath)
        if (folderName) path.push(folderName)

        const url = (urlTemplate || smb.url || '[PATH]/[FILE]')
          .replace(/\[USERNAME\]/g, smb.username)
          .replace(/\[PASSWORD\]/g, smb.password)
          .replace(/\[IP\]/g, smb.port ? `${smb.ip}:${smb.port}` : smb.ip)
          .replace(/\[PATH\]/g, path.join('/'))
          .replace(/\[FILE\]/g, fileName)
        return fixedUrl(url)
      } catch (error) {
        return ''
      }
    }).get()
  }

  /** 文件夹是否显示文件全名列表, 若从来没操作过, 返回 null */
  isFiles = (folderName: string) => {
    return computed<boolean | null>(() => {
      const { files } = this.state
      if (!(folderName in files)) return null
      return !!files[folderName]
    }).get()
  }

  /** 文件夹是否展开, 若从来没操作过, 返回 null */
  isExpanded = (folderName: string) => {
    return computed(() => {
      const { expands } = this.state
      if (!(folderName in expands)) return null
      return !!expands[folderName]
    }).get()
  }

  /** 是否折叠展开文件夹列表, 若从来没操作过, 返回 null */
  isFoldersExpanded = (folderName: string) => {
    return computed(() => {
      const { foldersExpands } = this.state
      if (!(folderName in foldersExpands)) return null
      return !!foldersExpands[folderName]
    }).get()
  }

  /** 事件类型 */
  @computed get eventType() {
    return WEB ? 'directory' : this.state.webDAV ? 'webDAV' : 'smb'
  }
}
