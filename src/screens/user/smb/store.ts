/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:04:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-02-21 21:13:01
 */
import { observable, computed, toJS } from 'mobx'
import { smbStore, subjectStore, collectionStore, userStore } from '@stores'
import { SMB } from '@stores/smb/types'
import { getTimestamp, sleep, desc, info, confirm } from '@utils'
import store from '@utils/store'
import { queue } from '@utils/fetch'
import { MODEL_SUBJECT_TYPE } from '@constants'
import { InferArray, SubjectId, SubjectTypeCn } from '@types'
import { smbList } from './utils'
import { NAMESPACE, STATE, EXCLUDE_STATE, DICT_ORDER } from './ds'

export default class ScreenSmb extends store {
  state = observable(STATE)

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      _loaded: false
    })

    await queue(
      this.subjectIds.map(item => {
        return () => subjectStore.initSubjectV2(item)
      })
    )

    this.setState({
      _loaded: true
    })
  }

  // -------------------- fetch --------------------
  /** 扫描 */
  connectSmb = async () => {
    const { smb } = this.current
    const list = await smbList(smb)

    if (list.length) {
      const data = toJS(this.data)
      const { uuid } = this.state
      const index = data.findIndex(item => item.smb.uuid === uuid)

      if (index !== -1) {
        data[index].smb.loaded = getTimestamp()
        data[index].list = list
        smbStore.updateData(data)

        this.fetchSubjects()
        this.setStorage(NAMESPACE)
      }
    }
  }

  /** 批量请求条目信息 */
  fetchSubjects = async (refresh: boolean = false) => {
    const { loading } = this.state
    if (loading) return

    const now = getTimestamp()
    const subjectFetchs = []
    const collectionFetchs = []
    this.subjectIds.forEach((subjectId, index) => {
      const { _loaded } = this.subjectV2(subjectId)

      if (refresh || !_loaded || now - Number(_loaded) >= 60 * 60) {
        subjectFetchs.push(() => {
          if (!this.state.loading) return

          this.setState({
            loading: `${index + 1} / ${this.subjectIds.length}`
          })

          return subjectStore.fetchSubjectV2(subjectId)
        })

        if (this.isLogin) {
          const { _loaded } = this.collection(subjectId)
          if (refresh || !_loaded || now - Number(_loaded) >= 60 * 5) {
            collectionFetchs.push(() => {
              return collectionStore.fetchCollection(subjectId)
            })
          }
        }
      }
    })

    this.setState({
      loading: true
    })
    await queue(subjectFetchs, 1)

    this.setState({
      loading: false
    })
    queue(collectionFetchs)
  }

  /** 下拉刷新条目信息 */
  onHeaderRefresh = async () => {
    this.fetchSubjects()
    await sleep(400)
    return true
  }

  // -------------------- get --------------------
  @computed get data() {
    return smbStore.data
  }

  /** 是否登录 (api) */
  @computed get isLogin() {
    return userStore.isLogin
  }

  /** 当前的 SMB 目录 */
  @computed get current() {
    const { uuid } = this.state
    return this.data.find(item => item.smb.uuid === uuid) as InferArray<SMB>
  }

  /** 当前的 SMB 目录匹配到的所有条目 id */
  @computed get subjectIds() {
    const ids = []
    if (this.current?.list) {
      this.current.list.forEach(item => {
        ids.push(...item.ids)
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

  /** 条目 */
  subjectV2(subjectId: SubjectId) {
    return computed(() => subjectStore.subjectV2(subjectId)).get()
  }

  @computed get list() {
    const list = []
    if (this.current?.list) {
      this.current.list
        .sort((a, b) => {
          return desc(
            String(a.ids.length ? a.lastModified : ''),
            String(b.ids.length ? b.lastModified : '')
          )
        })
        .forEach(item => {
          if (item.ids.length) {
            item.ids.forEach(subjectId => {
              list.push({
                ...item,
                subjectId
              })
            })
          } else {
            list.push(item)
          }
        })
    }

    return list
  }

  @computed get sortList() {
    const { sort } = this.state
    if (sort === '评分') {
      return this.list.sort((a, b) => {
        const subjectA = this.subjectV2(a.subjectId || '')
        const subjectB = this.subjectV2(b.subjectId || '')
        return desc(
          Number(
            subjectA._loaded
              ? (subjectA?.rating?.score || 0) +
                  (subjectA?.rank ? 10000 - subjectA?.rank : -10000)
              : -9999
          ),
          Number(
            subjectB._loaded
              ? (subjectB?.rating?.score || 0) +
                  (subjectB?.rank ? 10000 - subjectB?.rank : -10000)
              : -9999
          )
        )
      })
    }

    if (sort === '评分人数') {
      return this.list.sort((a, b) => {
        return desc(
          Number(this.subjectV2(a.subjectId || '')?.rating?.total || 0),
          Number(this.subjectV2(b.subjectId || '')?.rating?.total || 0)
        )
      })
    }

    if (sort === '目录修改时间') {
      return this.list.sort((a, b) => {
        return desc(String(b.lastModified || ''), String(a.lastModified || ''))
      })
    }

    // 时间
    return this.list.sort((a, b) => {
      return desc(
        String(this.airDate(b.subjectId || '')),
        String(this.airDate(a.subjectId || ''))
      )
    })
  }

  @computed get filterList() {
    const { _loaded } = this.state
    if (!_loaded) return []

    const { tags } = this.state
    if (!tags.length) return this.sortList

    return this.sortList.filter(item => {
      const { subjectId } = item
      let flag: boolean
      if (tags.includes('条目')) {
        flag = !!subjectId
      } else if (tags.includes('文件夹')) {
        flag = !subjectId
      }

      if (!flag) {
        flag = item.tags.some(tag => tags.includes(tag))
      }

      // if (!flag) {
      //   const { tags: subjectTags } = this.subjectV2(subjectId)
      //   flag = subjectTags.some(item => item.name === tags[0])
      // }

      if (!flag) {
        const { type } = this.subjectV2(subjectId)
        const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
        flag = tags.includes(typeCn)
      }

      if (!flag) {
        flag = tags.includes(
          collectionStore.collectionStatus(subjectId) ||
            this.collection(subjectId)?.status?.name ||
            '未收藏'
        )
      }

      if (!flag && /\d{4}/.test(tags[0])) {
        const { date } = this.subjectV2(subjectId)
        flag = !!date && date.includes(tags[0])
      }

      return flag
    })
  }

  collection(subjectId: SubjectId) {
    return computed(() => collectionStore.collection(subjectId)).get()
  }

  @computed get tagsCount() {
    const data = {
      条目: 0,
      文件夹: 0
    }

    this.list.forEach(item => {
      const { subjectId } = item
      if (!subjectId) {
        data['文件夹'] += 1
      } else {
        data['条目'] += 1

        const { type, date } = this.subjectV2(subjectId)
        const typeCn = MODEL_SUBJECT_TYPE.getTitle<SubjectTypeCn>(type)
        if (typeCn) {
          if (!data[typeCn]) {
            data[typeCn] = 1
          } else {
            data[typeCn] += 1
          }
        }

        if (typeof date === 'string') {
          const year = date.match(/\d{4}/g)
          if (year?.[0]) {
            if (!data[year[0]]) {
              data[year[0]] = 1
            } else {
              data[year[0]] += 1
            }
          }
        }

        // tags.forEach(item => {
        //   if (
        //     ['动画', '漫画', '书籍', '音乐', '三次元', '条目', '未收藏'].includes(
        //       item.name
        //     )
        //   ) {
        //     return
        //   }

        //   if (!data[item.name]) {
        //     data[item.name] = 1
        //   } else {
        //     data[item.name] += 1
        //   }
        // })

        const { status = { name: '未收藏' } } = this.collection(subjectId)
        if (status.name) {
          if (!data[status.name]) {
            data[status.name] = 1
          } else {
            data[status.name] += 1
          }
        }

        item.tags.forEach(i => {
          if (!data[i]) {
            data[i] = 1
          } else {
            data[i] += 1
          }
        })
      }
    })

    return data
  }

  @computed get ACTIONS_TAGS() {
    return Object.keys(this.tagsCount).sort((a, b) =>
      desc(
        DICT_ORDER[a] || this.tagsCount[a] || 0,
        DICT_ORDER[b] || this.tagsCount[b] || 0
      )
    )
  }

  airDate(subjectId: SubjectId) {
    return computed(() => {
      const subject = this.subjectV2(subjectId)
      if (subject?._loaded && subject?.date && subject.date !== '0000-00-00') {
        return subject.date
      }

      const subjectFormHTML = subjectStore.subjectFormHTML(subjectId)
      if (subjectFormHTML?._loaded && typeof subjectFormHTML?.info) {
        const match = subjectFormHTML.info.match(
          /<li><span>(发售日|开始|开始时间|发行日期|连载时间|连载期间|连载日期|连载开始|発表期間|发表期间|発表号): <\/span>(.+?)<\/li>/
        )
        return match?.[2] || ''
      }

      return ''
    }).get()
  }

  url = (
    sharedFolder: string = '',
    folderPath: string = '',
    folderName: string = '',
    fileName: string = ''
  ) => {
    return computed(() => {
      try {
        if (!this.current) return ''

        // smb://[USERNAME]:[PASSWORD]@[IP]/[PATH]/[FILE]
        const { smb } = this.current
        const path = []
        if (sharedFolder) path.push(sharedFolder)
        if (folderPath) path.push(folderPath)
        if (folderName) path.push(folderName)
        return smb.url
          .replace(/\[USERNAME\]/g, smb.username)
          .replace(/\[PASSWORD\]/g, smb.password)
          .replace(/\[IP\]/g, smb.port ? `${smb.ip}:${smb.port}` : smb.ip)
          .replace(/\[PATH\]/g, path.join('/'))
          .replace(/\[FILE\]/g, fileName)
      } catch (error) {
        return ''
      }
    }).get()
  }

  // -------------------- page --------------------
  onShow = () => {
    this.setState({
      visible: true
    })
  }

  onClose = () => {
    this.setState({
      ...EXCLUDE_STATE
    })
  }

  onEdit = () => {
    if (!this.current) return

    const { smb } = this.current
    this.setState({
      visible: true,
      id: smb.uuid,
      name: smb.name || EXCLUDE_STATE.name,
      ip: smb.ip || EXCLUDE_STATE.ip,
      port: smb.port || EXCLUDE_STATE.port,
      username: smb.username || EXCLUDE_STATE.username,
      password: smb.password || EXCLUDE_STATE.password,
      sharedFolder: smb.sharedFolder || EXCLUDE_STATE.sharedFolder,
      workGroup: smb.workGroup || EXCLUDE_STATE.workGroup,
      path: smb.path || EXCLUDE_STATE.path,
      url: smb.url || EXCLUDE_STATE.url
    })
  }

  onCopy = () => {
    if (!this.current) return

    const { smb } = this.current
    this.setState({
      visible: true,
      id: '',
      name: '',
      ip: smb.ip || EXCLUDE_STATE.ip,
      port: smb.port || EXCLUDE_STATE.port,
      username: smb.username || EXCLUDE_STATE.username,
      password: smb.password || EXCLUDE_STATE.password,
      sharedFolder: smb.sharedFolder || EXCLUDE_STATE.sharedFolder,
      workGroup: smb.workGroup || EXCLUDE_STATE.workGroup,
      path: smb.path || EXCLUDE_STATE.path,
      url: smb.url || EXCLUDE_STATE.url
    })
  }

  onChange = (key: string, val: string) => {
    this.setState({
      [key]: val
    })
  }

  onSubmit = () => {
    const {
      id,
      name,
      ip,
      port,
      username,
      password,
      sharedFolder,
      workGroup,
      path,
      url
    } = this.state

    if (!ip || !username || !sharedFolder) {
      info('请填写所有必填项')
      return
    }

    const data = toJS(this.data)
    const index = data.findIndex(item => item.smb.uuid === id)

    // 新增
    if (index === -1) {
      const uuid = getTimestamp()
      smbStore.updateData([
        {
          smb: {
            uuid,
            name,
            ip,
            username,
            password,
            sharedFolder,
            path,
            port,
            workGroup,
            url: url || EXCLUDE_STATE.url
          },
          list: []
        },
        ...data
      ])
      this.setState({
        uuid,
        ...EXCLUDE_STATE
      })
    } else {
      data[index].smb.name = name
      data[index].smb.ip = ip
      data[index].smb.username = username
      data[index].smb.password = password
      data[index].smb.sharedFolder = sharedFolder
      data[index].smb.path = path
      data[index].smb.port = port
      data[index].smb.workGroup = workGroup
      data[index].smb.url = url || EXCLUDE_STATE.url
      smbStore.updateData(data)
      this.setState({
        ...EXCLUDE_STATE
      })
    }

    this.setStorage(NAMESPACE)
  }

  onDelete = () => {
    if (!this.current) return

    const { smb } = this.current
    const data = toJS(this.data).filter(item => item.smb.uuid !== smb.uuid)
    smbStore.updateData(data)
    this.setState({
      uuid: data?.[0]?.smb?.uuid || ''
    })

    this.setStorage(NAMESPACE)
  }

  onSwitch = (title: string, index?: number) => {
    const smb = this.smbs[index]
    this.setState({
      loading: false,
      uuid: smb.uuid
    })

    this.setStorage(NAMESPACE)
  }

  onToggleTags = () => {
    const { more } = this.state
    this.setState({
      more: !more
    })
    this.setStorage(NAMESPACE)
  }

  onSelectTag = (title: string) => {
    if (!title) return

    const { tags } = this.state
    this.setState({
      tags: tags.includes(title) ? [] : [title]
    })

    this.setStorage(NAMESPACE)
  }

  onSelectSort = (title: string) => {
    this.setState({
      sort: title
    })

    this.setStorage(NAMESPACE)
  }

  onSelectSMB = (title: string) => {
    if (title === '扫描') {
      this.connectSmb()
      return
    }

    if (title === '编辑') {
      this.onEdit()
      return
    }

    if (title === '复制配置新建') {
      this.onCopy()
      return
    }

    if (title === '删除') {
      confirm('删除后无法恢复，确定？', this.onDelete)
    }
  }
}
