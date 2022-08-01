/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:04:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-01 22:37:25
 */
import { observable, computed, toJS } from 'mobx'
import { smbStore, subjectStore, collectionStore, userStore } from '@stores'
import { getTimestamp, sleep, desc } from '@utils'
import store from '@utils/store'
import { queue } from '@utils/fetch'
import { info, confirm } from '@utils/ui'
import { MODEL_SUBJECT_TYPE } from '@constants/model'
import { smbList, dictOrder } from './utils'

export const ACTIONS_SORT = ['日期', '评分', '评分人数', '目录修改时间']
export const ACTIONS_SMB = ['扫描', '编辑', '复制配置新建', '删除']

const namespace = 'ScreenSmb'
const excludeState = {
  data: [],
  loading: false,
  tags: [],
  expand: false,

  // form
  visible: false,
  id: '',
  name: '',
  ip: '',
  port: '',
  username: '',
  password: '',
  sharedFolder: '',
  workGroup: '',
  path: '',
  url: 'smb://[USERNAME]:[PASSWORD]@[IP]/[PATH]/[FILE]'
}

export default class ScreenSmb extends store {
  state = observable({
    uuid: '',
    sort: ACTIONS_SORT[0],
    filter: '',
    ...excludeState,
    _loaded: false
  })

  init = async () => {
    const state = (await this.getStorage(undefined, namespace)) || {}
    this.setState({
      ...state,
      ...excludeState,
      _loaded: true
    })
  }

  // -------------------- fetch --------------------
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
        this.setStorage(undefined, undefined, namespace)
      }
    }
  }

  fetchSubjects = async refresh => {
    const { loading } = this.state
    if (loading) return

    const fetchs = []
    const now = getTimestamp()
    this.subjectIds.forEach((subjectId, index) => {
      const { _loaded } = this.subject(subjectId)

      if (refresh || !_loaded || now - _loaded >= 60 * 60) {
        fetchs.push(async () => {
          if (!this.state.loading) return

          this.setState({
            loading: `${index + 1} / ${this.subjectIds.length}`
          })

          await sleep(40)
          if (this.isLogin) await collectionStore.fetchCollection(subjectId)
          const data = await subjectStore.fetchSubject(subjectId)
          if (data?.air_date === '0000-00-00') {
            await subjectStore.fetchSubjectFormHTML(subjectId)
          }

          return data
        })
      }
    })

    this.setState({
      loading: true
    })
    await queue(fetchs, 1)
    this.setState({
      loading: false
    })
  }

  onHeaderRefresh = async () => {
    this.fetchSubjects()
    await sleep(400)
    return true
  }

  // -------------------- get --------------------
  @computed get data() {
    return smbStore.data
  }

  @computed get isLogin() {
    return userStore.isLogin
  }

  @computed get current() {
    const { uuid } = this.state
    return this.data.find(item => item.smb.uuid === uuid)
  }

  @computed get subjectIds() {
    const ids = []
    if (this.current?.list) {
      this.current.list.forEach(item => {
        ids.push(...item.ids)
      })
    }

    return ids
  }

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

  subject(subjectId) {
    return computed(() => subjectStore.subject(subjectId)).get()
  }

  @computed get list() {
    const list = []
    if (this.current?.list) {
      this.current.list
        .sort((a, b) =>
          desc(a.ids.length ? a.lastModified : '', b.ids.length ? b.lastModified : '')
        )
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
        const subjectA = this.subject(a.subjectId || '')
        const subjectB = this.subject(b.subjectId || '')
        return desc(
          subjectA._loaded
            ? (subjectA?.rating?.score || 0) +
                (subjectA?.rank ? 10000 - subjectA?.rank : -10000)
            : -9999,
          subjectB._loaded
            ? (subjectB?.rating?.score || 0) +
                (subjectB?.rank ? 10000 - subjectB?.rank : -10000)
            : -9999
        )
      })
    }

    if (sort === '评分人数') {
      return this.list.sort((a, b) => {
        return desc(
          this.subject(a.subjectId || '')?.rating?.total || 0,
          this.subject(b.subjectId || '')?.rating?.total || 0
        )
      })
    }

    if (sort === '目录修改时间') {
      return this.list.sort((a, b) => {
        return String(b.lastModified || '').localeCompare(String(a.lastModified || ''))
      })
    }

    // 时间
    return this.list.sort((a, b) => {
      return String(this.airDate(b.subjectId || 0)).localeCompare(
        this.airDate(a.subjectId || 0)
      )
    })
  }

  @computed get filterList() {
    const { tags } = this.state
    if (!tags.length) return this.sortList

    return this.sortList.filter(item => {
      const { subjectId } = item
      let flag
      if (tags.includes('条目')) {
        flag = !!subjectId
      } else if (tags.includes('文件夹')) {
        flag = !subjectId
      }

      if (!flag) {
        flag = item.tags.some(tag => tags.includes(tag))
      }

      if (!flag) {
        const { type } = this.subject(subjectId)
        const typeCn = MODEL_SUBJECT_TYPE.getTitle(type)
        flag = tags.includes(typeCn)
      }

      if (!flag) {
        const { status = { name: '未收藏' } } = this.collection(subjectId)
        flag = tags.includes(status.name)
      }

      return flag
    })
  }

  collection(subjectId) {
    return computed(() => collectionStore.collection(subjectId)).get()
  }

  @computed get tagsCount() {
    const tags = {
      条目: 0,
      文件夹: 0
    }

    this.list.forEach(item => {
      const { subjectId } = item
      if (!subjectId) {
        tags['文件夹'] += 1
      } else {
        tags['条目'] += 1

        const { type } = this.subject(subjectId)
        const typeCn = MODEL_SUBJECT_TYPE.getTitle(type)
        if (typeCn) {
          if (!tags[typeCn]) {
            tags[typeCn] = 1
          } else {
            tags[typeCn] += 1
          }
        }

        const { status = { name: '未收藏' } } = this.collection(subjectId)
        if (status.name) {
          if (!tags[status.name]) {
            tags[status.name] = 1
          } else {
            tags[status.name] += 1
          }
        }

        item.tags.forEach(i => {
          if (!tags[i]) {
            tags[i] = 1
          } else {
            tags[i] += 1
          }
        })
      }
    })

    return tags
  }

  @computed get ACTIONS_TAGS() {
    return Object.keys(this.tagsCount).sort((a, b) =>
      desc(dictOrder[a] || 0, dictOrder[b] || 0)
    )
  }

  airDate(subjectId) {
    return computed(() => {
      const subject = this.subject(subjectId)
      if (subject?._loaded && subject?.air_date && subject.air_date !== '0000-00-00')
        return subject.air_date

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

  url = (sharedFolder = '', folderPath = '', folderName = '', fileName = '') => {
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
      ...excludeState
    })
  }

  onEdit = () => {
    if (!this.current) return

    const { smb } = this.current
    this.setState({
      visible: true,
      id: smb.uuid,
      name: smb.name || excludeState.name,
      ip: smb.ip || excludeState.ip,
      port: smb.port || excludeState.port,
      username: smb.username || excludeState.username,
      password: smb.password || excludeState.password,
      sharedFolder: smb.sharedFolder || excludeState.sharedFolder,
      workGroup: smb.workGroup || excludeState.workGroup,
      path: smb.path || excludeState.path,
      url: smb.url || excludeState.url
    })
  }

  onCopy = () => {
    if (!this.current) return

    const { smb } = this.current
    this.setState({
      visible: true,
      id: '',
      name: '',
      ip: smb.ip || excludeState.ip,
      port: smb.port || excludeState.port,
      username: smb.username || excludeState.username,
      password: smb.password || excludeState.password,
      sharedFolder: smb.sharedFolder || excludeState.sharedFolder,
      workGroup: smb.workGroup || excludeState.workGroup,
      path: smb.path || excludeState.path,
      url: smb.url || excludeState.url
    })
  }

  onChange = (key, val) => {
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
            url: url || excludeState.url
          },
          list: []
        },
        ...data
      ])
      this.setState({
        uuid,
        ...excludeState
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
      data[index].smb.url = url || excludeState.url
      smbStore.updateData(data)
      this.setState({
        ...excludeState
      })
    }

    this.setStorage(undefined, undefined, namespace)
  }

  onDelete = () => {
    if (!this.current) return

    const { smb } = this.current
    const data = toJS(this.data).filter(item => item.smb.uuid !== smb.uuid)
    smbStore.updateData(data)
    this.setState({
      uuid: data?.[0]?.smb?.uuid || ''
    })

    this.setStorage(undefined, undefined, namespace)
  }

  onSwitch = (title, index) => {
    const smb = this.smbs[index]
    this.setState({
      loading: false,
      uuid: smb.uuid
    })

    this.setStorage(undefined, undefined, namespace)
  }

  onSelectTag = title => {
    if (!title) return

    const { tags } = this.state
    this.setState({
      tags: tags.includes(title) ? [] : [title]
    })

    this.setStorage(undefined, undefined, namespace)
  }

  onSelectSort = title => {
    this.setState({
      sort: title
    })

    this.setStorage(undefined, undefined, namespace)
  }

  onSelectSMB = title => {
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
