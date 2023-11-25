/*
 * @Author: czy0729
 * @Date: 2022-03-28 22:04:24
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-11-25 20:31:55
 */
import { observable, computed, toJS } from 'mobx'
import {
  collectionStore,
  discoveryStore,
  smbStore,
  subjectStore,
  userStore
} from '@stores'
import { SMB } from '@stores/smb/types'
import { alert, cnjp, confirm, desc, getTimestamp, info, pick, sleep } from '@utils'
import store from '@utils/store'
import { queue, t } from '@utils/fetch'
import { get, gets, update } from '@utils/kv'
import Crypto from '@utils/crypto'
import { IOS, MODEL_SUBJECT_TYPE, STORYBOOK } from '@constants'
import i18n from '@constants/i18n'
import { InferArray, Navigation, SubjectId, SubjectTypeCn } from '@types'
import { fixedUrl, smbList, webDAVList } from './utils'
import {
  NAMESPACE,
  STATE,
  EXCLUDE_STATE,
  DICT_ORDER,
  LIMIT,
  ACTION_CONNECT,
  ACTION_EDIT,
  ACTION_COPY_AND_CREATE,
  ACTION_COPY_AND_CREATE_FOLDER,
  ACTION_DELETE,
  ACTION_OPEN_DIRECTORY,
  ACTION_CLOSE_DIRECTORY,
  REG_AIRDATE
} from './ds'
import { ListItem, MergeListItem, SMBListItem, SubjectOSS } from './types'

export default class ScreenSmb extends store {
  state = observable(STATE)

  init = async () => {
    const state = (await this.getStorage(NAMESPACE)) || {}
    const extraState: Partial<typeof EXCLUDE_STATE> = {}
    if (STORYBOOK) extraState.tags = state.tags || EXCLUDE_STATE.tags

    this.setState({
      ...state,
      ...EXCLUDE_STATE,
      ...extraState,
      _loaded: false
    })

    await smbStore.init('data')
    await subjectStore.initSubjectV2(this.subjectIds)
    await collectionStore.init('collection')
    this.cacheList()
    this.setState({
      _loaded: true
    })
  }

  save = () => {
    this.setStorage(NAMESPACE)
  }

  /** 临时存放读取的文件夹结构列表 */
  memoDirectory: SMBListItem[] = []

  /** 临时存放当前应该显示的管理列表 */
  memoList: ListItem[] = []

  /** 临时存放当前管理列表的标签 */
  memoTags: string[] = []

  // -------------------- fetch --------------------
  /** 更新数据 */
  cacheList = () => {
    this.memoList = this.mergeList()
    this.cacheTags()
  }

  /** 更新标签数据 */
  cacheTags = () => {
    this.memoTags = this.tagsActions()
  }

  /** 批量请求条目和收藏 */
  fetchInfos = async (refresh: boolean = false) => {
    if (STORYBOOK) return this.fetchInfosWeb()

    const { loading } = this.state
    if (loading) return

    const now = getTimestamp()
    const subjectFetchs = []
    const collectionFetchs = []
    this.subjectIds.forEach((subjectId, index) => {
      const subjectV2 = this.subjectV2(subjectId)
      if (
        refresh ||
        !subjectV2.id ||
        !subjectV2._loaded ||
        now - Number(subjectV2._loaded) >= 60 * 60
      ) {
        subjectFetchs.push(async () => {
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

    t('SMB.请求条目', {
      length: subjectFetchs.length
    })
    await queue(subjectFetchs, 1)

    this.setState({
      loading: false
    })
    return queue(collectionFetchs)
  }

  /** 批量请求条目和收藏 (网页版) */
  fetchInfosWeb = async () => {
    const { loading } = this.state
    if (loading) return

    const { subjects } = this.state
    const now = getTimestamp()
    const fetchIds = []
    this.subjectIds.forEach(id => {
      // maybe nsfw
      if (!this.subjectV2(id).id) {
        const { _loaded } = subjects[id] || {}
        if (!_loaded || now - Number(_loaded) >= 60 * 60 * 24) {
          const { _loaded } = this.subjectOSS(id)
          if (!_loaded || now - Number(_loaded) >= 60 * 60 * 24) {
            fetchIds.push(`subject_${id}`)
          }
        }
      }
    })
    if (!fetchIds.length) return true

    this.setState({
      loading: true
    })
    try {
      const picker = [
        'id',
        'name',
        'name_cn',
        'image',
        'rank',
        'rating',
        'totalEps',
        'info',
        'type'
      ]
      const data = await gets(fetchIds, picker)
      Object.entries(data).forEach(([key, item]) => {
        try {
          data[key] = pick(item, picker)

          data[key].jp = data[key].name
          delete data[key].name

          data[key].cn = data[key].name_cn
          delete data[key].name_cn

          data[key].eps = Number(data[key].totalEps) || ''
          delete data[key].totalEps

          if (data[key].info) {
            data[key].date = data[key].info.match(REG_AIRDATE)?.[2] || ''
          }
          delete data[key].info

          data[key]._loaded = getTimestamp()
        } catch (error) {}
      })

      this.setState({
        subjects: data
      })
      this.save()
    } catch (error) {}

    this.setState({
      loading: false
    })
    return true
  }

  /** smb 扫描 */
  connectSmb = async () => {
    const { smb } = this.current
    const list = await (IOS || smb.webDAV ? webDAVList(smb) : smbList(smb))
    if (list.length) {
      const data = toJS(this.data)
      const { uuid } = this.state
      const index = data.findIndex(item => item.smb.uuid === uuid)

      if (index !== -1) {
        data[index].smb.loaded = getTimestamp()
        data[index].list = list
        smbStore.updateData(data)

        await this.fetchInfos()
        this.setState({
          ...EXCLUDE_STATE,
          _page: '1',
          page: 1
        })
        this.cacheList()
        this.save()
      }
    }

    t('SMB.扫描', {
      length: list.length,
      webDAV: smb.webDAV
    })
  }

  /** 文件夹上传扫描 */
  connectWebDirectory = async () => {
    const { smb } = this.current
    const list = this.memoDirectory
    if (list.length) {
      const data = toJS(this.data)
      const { uuid } = this.state
      const index = data.findIndex(item => item.smb.uuid === uuid)

      if (index !== -1) {
        data[index].smb.loaded = getTimestamp()
        data[index].list = list
        smbStore.updateData(data)

        await this.fetchInfos()
        this.setState({
          ...EXCLUDE_STATE,
          _filter: '',
          filter: '',
          _page: '1',
          page: 1
        })
        this.cacheList()
        this.save()
      }
    }

    t('SMB.扫描', {
      length: list.length,
      webDAV: smb.webDAV
    })
    this.memoDirectory = []

    setTimeout(() => {
      this.setState({
        refreshKey: this.state.refreshKey + 1
      })
    }, 0)
  }

  /** 下拉刷新条目信息 */
  onHeaderRefresh = async () => {
    await this.fetchInfos()
    this.cacheList()
    await sleep(400)
    return true
  }

  // -------------------- get --------------------
  /** 因为性能, 列表没有参与反应, 自己维护了一个值用于监控更新 */
  @computed get refreshKey() {
    const { uuid, sort, tags, page, filter, refreshKey, configs } = this.state
    const { layoutList } = configs
    return JSON.stringify({
      uuid,
      sort,
      tags,
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
    const ids = []
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

  /** 条目接口数据 */
  subjectV2(subjectId: SubjectId) {
    return computed(() => {
      if (STORYBOOK) return this.subjectOSS(subjectId)

      return subjectStore.subjectV2(subjectId)
    }).get()
  }

  /** 条目云端快照 */
  subjectOSS(id: SubjectId) {
    return computed(
      () => this.state.subjects[`subject_${id}`] || ({} as SubjectOSS)
    ).get()
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
        const match = subjectFormHTML.info.match(REG_AIRDATE)
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

  // -------------------- page --------------------
  /** [1] 获取基础列表 */
  list = () => {
    const list: ListItem[] = []
    if (this.current?.list?.length) {
      this.current.list
        .slice()
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
            list.push({
              ...item,
              subjectId: 0
            })
          }
        })
    }

    return list
  }

  /** [2] 基于 [1] 进行排序 */
  sortList = () => {
    const { sort } = this.state
    if (sort === '评分') {
      return this.list()
        .slice()
        .sort((a, b) => {
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
      return this.list()
        .slice()
        .sort((a, b) => {
          return desc(
            Number(this.subjectV2(a.subjectId || '')?.rating?.total || 0),
            Number(this.subjectV2(b.subjectId || '')?.rating?.total || 0)
          )
        })
    }

    if (sort === '名称') {
      return this.list()
        .slice()
        .sort((a, b) => {
          const subjectA = this.subjectV2(a.subjectId || '')
          const subjectB = this.subjectV2(b.subjectId || '')
          const nameA = cnjp(subjectA.cn, subjectA.jp) || ''
          const nameB = cnjp(subjectB.cn, subjectB.jp) || ''
          return nameA.localeCompare(nameB)
        })
    }

    if (sort === '文件夹修改时间') {
      return this.list().sort((a, b) => {
        return desc(String(b.lastModified || ''), String(a.lastModified || ''))
      })
    }

    // 时间
    return this.list()
      .slice()
      .sort((a, b) => {
        return desc(
          String(this.airDate(b.subjectId || '')),
          String(this.airDate(a.subjectId || ''))
        )
      })
  }

  /** [3] 基于 [2] 进行标签筛选 */
  tagList = () => {
    const { tags } = this.state
    if (!tags.length) return this.sortList()

    return this.sortList().filter(item => {
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
          collectionStore.collect(subjectId) ||
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

  /** [4] 基于 [3] 进行搜索 */
  filterList = () => {
    const { filter } = this.state
    if (!filter) return this.tagList()

    return this.tagList().filter(item => {
      // 文件夹
      if (!item.subjectId) return item.name.includes(filter)

      const { cn = '', jp = '' } = this.subjectV2(item.subjectId)
      return cn.includes(filter) || jp.includes(filter)
    })
  }

  /** [5] 基于 [4] 合并同条目项 */
  mergeList = () => {
    const indexMap: Record<SubjectId, number> = {}
    const list: MergeListItem[] = []
    this.filterList().forEach(item => {
      const { subjectId } = item
      if (!subjectId || !(subjectId in indexMap)) {
        list.push(item)
        indexMap[subjectId] = list.length - 1
        return
      }

      // 使用新的 merge 归并同类项
      const index = indexMap[subjectId]
      if (list[index].merge) {
        list[index].merge.push(item)
      } else {
        list[index] = {
          ...list[index],
          merge: [item]
        }
      }
    })
    return list
  }

  /** 统计标签数目 */
  tagsCount = () => {
    const data: Record<string, number> = {
      条目: 0,
      文件夹: 0
    }

    this.list().forEach(item => {
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
          const year = date.slice(0, 4)
          if (year) {
            if (!data[year]) {
              data[year] = 1
            } else {
              data[year] += 1
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

  /** 对标签进行排序 */
  tagsActions = () => {
    // const { tags, more } = this.state
    const tagsCount = this.tagsCount()
    return (
      Object.keys(tagsCount)
        // .filter(item => (more ? true : tagsCount[item] >= 10 || tags.includes(item)))
        .sort((a, b) =>
          desc(DICT_ORDER[a] || tagsCount[a] || 0, DICT_ORDER[b] || tagsCount[b] || 0)
        )
    )
  }

  /** 展开表单 */
  onShow = () => {
    this.setState({
      visible: true
    })
  }

  /** 关闭表单 */
  onClose = () => {
    this.setState({
      ...EXCLUDE_STATE
    })
    this.memoDirectory = []
  }

  /** 展开当前服务编辑表单 */
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
      url: smb.url || EXCLUDE_STATE.url,
      webDAV: smb.webDAV
    })

    t('SMB.编辑')
  }

  /** 复制当前服务配置并新建一个服务 */
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
      url: smb.url || EXCLUDE_STATE.url,
      webDAV: IOS ? true : smb.webDAV
    })

    t('SMB.复制')
  }

  /** 表单编辑 */
  onChange = (key: string, val: any) => {
    this.setState({
      [key]: val
    })
  }

  /** 新增服务或者编辑当前服务 */
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
      url,
      webDAV
    } = this.state

    if (STORYBOOK) {
      // if (!sharedFolder) {
      //   info('请填写路径，如 D:')
      //   return
      // }
    } else {
      if (!ip || !username || !sharedFolder) {
        info('请填写所有必填项')
        return
      }
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
            url: url || EXCLUDE_STATE.url,
            webDAV: IOS ? true : webDAV
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
      data[index].smb.webDAV = IOS ? true : webDAV
      smbStore.updateData(data)
      this.setState({
        ...EXCLUDE_STATE
      })
    }

    this.save()
    t('SMB.保存', {
      create: index === -1
    })

    if (STORYBOOK) {
      setTimeout(() => {
        this.connectWebDirectory()
      }, 1000)
    }
  }

  /** 删除当前服务 */
  onDelete = () => {
    if (!this.current) return

    const { smb } = this.current
    const data = toJS(this.data).filter(item => item.smb.uuid !== smb.uuid)
    smbStore.updateData(data)
    this.setState({
      uuid: data?.[0]?.smb?.uuid || '',
      ...EXCLUDE_STATE,
      _page: '1',
      page: 1
    })
    this.cacheList()
    this.save()

    t('SMB.删除')
  }

  /** 切换不同服务 */
  onSwitch = (title: string, index?: number) => {
    this.setState({
      _filter: '',
      filter: '',
      _page: '1',
      page: 1
    })

    const smb = this.smbs[index]
    this.setState({
      loading: false,
      uuid: smb.uuid
    })
    this.cacheList()
    this.save()

    t('SMB.切换')
  }

  /** @deprecated */
  onToggleTags = () => {
    const { more } = this.state
    this.setState({
      more: !more
    })
    this.cacheTags()
    this.save()

    t('SMB.更多标签')
  }

  /** 选择标签 */
  onSelectTag = (title: string) => {
    const { tags } = this.state
    this.setState({
      tags: title ? (tags.includes(title) ? [] : [title]) : [],
      _page: '1',
      page: 1
    })
    this.cacheList()
    this.save()

    t('SMB.选择标签', {
      title
    })
  }

  /** 排序 */
  onSelectSort = (title: string) => {
    this.setState({
      sort: title,
      _page: '1',
      page: 1
    })
    this.cacheList()
    this.save()

    t('SMB.排序', {
      title
    })
  }

  /** 当前服务菜单选择 */
  onSelectSMB = (title: string, navigation?: Navigation) => {
    if (title === ACTION_CONNECT) {
      this.connectSmb()
      return
    }

    if (title === ACTION_EDIT) {
      this.onEdit()
      return
    }

    if (title === ACTION_COPY_AND_CREATE) {
      this.onCopy()
      return
    }

    if (title === ACTION_COPY_AND_CREATE_FOLDER) {
      confirm(
        `以 ${this.current?.smb?.name} 为名字, 用当前筛选的条目来创建用户目录, 确定?`,
        () => {
          this.doCreateCatalog(navigation)
        }
      )
      return
    }

    if (title === ACTION_DELETE) {
      confirm('删除后无法恢复，确定？', this.onDelete)
      return
    }

    if (title === ACTION_OPEN_DIRECTORY) {
      this.onOpenCurrentPage()
      return
    }

    if (title === ACTION_CLOSE_DIRECTORY) {
      this.onCloseCurrentPage()
      return
    }
  }

  /** 上一页 */
  onPrev = () => {
    const { page } = this.state
    if (page === 1) {
      info('已经是第一页了')
      return
    }

    const value = page - 1
    this.setState({
      _page: String(value),
      page: value
    })
    this.save()
  }

  /** 下一页 */
  onNext = () => {
    const { page } = this.state
    if (page >= Math.ceil(this.memoList.length / LIMIT)) {
      info('已经是最后一页了')
      return
    }

    const value = page + 1
    this.setState({
      _page: String(value),
      page: value
    })
    this.save()
  }

  /** 分页中间输入框文字改变 */
  onPaginationInputChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      _page: text
    })
  }

  /** 分页中间输入框提交 */
  onPaginationInputSubmit = () => {
    const { _page } = this.state
    let value = Number(_page) || 1
    const max = Math.ceil(this.memoList.length / LIMIT) || 1
    if (value >= max) {
      info(`最大 ${max} 页`)
      value = max
    }

    this.setState({
      _page: String(value),
      page: value
    })
    this.save()
  }

  /** 文件夹切换显示类型 */
  onFile = (folderName: string) => {
    const { files } = this.state
    const value = !files[folderName]
    this.setState({
      files: {
        [folderName]: value
      }
    })
    this.save()
  }

  /** 文件夹展开收起 */
  onExpand = (folderName: string) => {
    const { expands } = this.state
    const value = !expands[folderName]
    this.setState({
      expands: {
        [folderName]: value
      }
    })
    this.save()
  }

  /** 展开当前页面所有文件夹 */
  onOpenCurrentPage = () => {
    const expands = {}
    this.pageList.forEach(item => {
      expands[item.name] = true
    })
    this.setState({
      expands
    })
    this.save()
  }

  /** 关闭当前页面所有文件夹 */
  onCloseCurrentPage = () => {
    const expands = {}
    this.pageList.forEach(item => {
      expands[item.name] = false
    })
    this.setState({
      expands
    })
    this.save()
  }

  /** 筛选输入框文字改变 */
  onFilterInputChange = ({ nativeEvent }) => {
    const { text } = nativeEvent
    this.setState({
      _filter: text
    })

    if (text.trim() === '') {
      this.setState({
        _filter: '',
        filter: '',
        _page: '1',
        page: 1
      })
      this.cacheList()
      this.save()
    }
  }

  /** 筛选输入框提交 */
  onFilterInputSubmit = () => {
    const { _filter } = this.state
    const value = _filter.trim()
    this.setState({
      _filter: value,
      filter: value,
      _page: '1',
      page: 1
    })
    this.cacheList()
    this.save()
  }

  /** 展开通用配置表单 */
  onShowConfig = () => {
    this.setState({
      configVisible: true
    })
  }

  /** 关闭通用配置表单 */
  onCloseConfig = () => {
    this.setState({
      configVisible: false
    })
  }

  /** 切换通用配置 */
  onSwitchConfig = (key: keyof typeof STATE.configs) => {
    this.setState({
      configs: {
        [key]: !this.state.configs[key]
      }
    })
    this.save()
  }

  /** 切换通用配置列数 */
  onSwitchLayoutGridNums = (label: string) => {
    this.setState({
      configs: {
        layoutGridNums: Number(label)
      }
    })
    this.save()
  }

  /** 切换是否自动刮削 */
  onSwitchAutoJA = () => {
    this.setState({
      autoJA: !this.state.autoJA
    })
    this.save()
  }

  /** 显示文件夹结构弹窗 */
  onShowModalFolders = (folders: Omit<typeof EXCLUDE_STATE.folders, 'visible'>) => {
    this.setState({
      folders: {
        ...folders,
        visible: true
      }
    })
  }

  /** 关闭文件夹结构弹窗 */
  onCloseModalFolders = () => {
    this.setState({
      folders: {
        visible: false
      }
    })
  }

  /** 当一个条目下关联到过多文件夹时, 折叠展开文件夹列表 */
  onFoldersExpand = (folderName: string) => {
    const { foldersExpands } = this.state
    const value = !foldersExpands[folderName]
    this.setState({
      foldersExpands: {
        [folderName]: value
      }
    })
    this.save()
  }

  // -------------------- action --------------------
  /** 上传配置 */
  upload = () => {
    const { myUserId } = userStore
    if (!myUserId) {
      info(`需要先${i18n.login()}`)
      return
    }

    confirm(
      `会将所有本地配置加密后上传到云，以便丢失的时候同步回来。若想清空云端数据，可以将本地的所有配置删除后再次上传。确定？`,
      () => {
        let configs = []
        try {
          configs = this.data.map(item => ({
            list: [],
            smb: item.smb
          }))
          update(`smb_${myUserId}`, Crypto.set(configs))
        } catch (error) {
          info('上传失败，请重试或联系作者')
        }
      }
    )
  }

  /** 下载配置 */
  download = () => {
    const { myUserId } = userStore
    if (!myUserId) {
      info(`需要先${i18n.login()}`)
      return
    }

    confirm(
      `同步后会将云端配置数据覆盖掉本地所有配置数据，并会清空现有扫描列表，确定？`,
      async () => {
        try {
          const data = await get(`smb_${myUserId}`)
          const configs = Crypto.get(data)
          if (Array.isArray(configs) && configs.length) {
            smbStore.replaceData(configs)

            const { uuid } = configs?.[0]?.smb
            this.setState({
              uuid
            })
            this.save()

            info('已覆盖')
            return
          }
        } catch (error) {}

        alert('下载失败，可能没有数据或者数据格式出错')
      }
    )
  }

  /** 创建用户目录 */
  doCreateCatalog = async (navigation: Navigation) => {
    const { formhash } = userStore
    if (!formhash) {
      info(`文件夹创建失败, 请检查${i18n.login()}状态`)
      return
    }

    const { loading } = this.state
    if (loading) {
      info('正在获取数据中, 请待完成后再试')
      return
    }

    // 创建用户目录
    discoveryStore.doCatalogCreate(
      {
        formhash,
        title: this.current?.smb?.name || '文件夹',
        desc: `由 Bangumi for ${IOS ? 'iOS' : 'android'} SMB 功能自动创建`
      },
      (response, request) => {
        if (request && request.responseURL) {
          const match = request.responseURL.match(/\d+/g)
          if (match && match[0]) {
            info('创建成功, 开始导入条目数据...')

            setTimeout(async () => {
              const list = this.memoList
              const catalogId = match[0]
              const subjectIds = []
              list.forEach(item => {
                if (item.subjectId && !subjectIds.includes(item.subjectId)) {
                  subjectIds.push(item.subjectId)
                }
              })

              // 添加条目数据
              await queue(
                subjectIds.map((subjectId, index) => {
                  return () =>
                    new Promise<void>(resolve => {
                      info(`${index + 1} / ${subjectIds.length}`)
                      discoveryStore.doCatalogAddRelate(
                        {
                          catalogId,
                          subjectId,
                          formhash,
                          noConsole: true
                        },
                        () => {
                          resolve()
                        }
                      )
                    })
                }),
                1
              )

              // 跳转到创建后的文件夹
              navigation.push('CatalogDetail', {
                catalogId
              })
              info('已完成')
            }, 400)
          } else {
            info(`文件夹创建失败, 请检查${i18n.login()}状态`)
          }
        }
      }
    )

    t('SMB.创建目录', {
      length: this.filterList.length
    })
  }
}
