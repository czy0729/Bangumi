/*
 * @Author: czy0729
 * @Date: 2024-09-05 15:31:01
 * @Last Modified by: czy0729
 * @Last Modified time: 2024-09-05 15:32:44
 */
import { toJS } from 'mobx'
import { discoveryStore, smbStore, userStore } from '@stores'
import { alert, confirm, getTimestamp, info } from '@utils'
import Crypto from '@utils/crypto'
import { queue, t } from '@utils/fetch'
import { get, update } from '@utils/kv'
import { IOS, WEB } from '@constants'
import i18n from '@constants/i18n'
import { Navigation } from '@types'
import {
  ACTION_CLOSE_DIRECTORY,
  ACTION_CONNECT,
  ACTION_COPY_AND_CREATE,
  ACTION_COPY_AND_CREATE_FOLDER,
  ACTION_DELETE,
  ACTION_EDIT,
  ACTION_OPEN_DIRECTORY,
  LIMIT
} from '../ds'
import { Sort } from '../types'
import { smbList, webDAVList } from '../utils'
import Fetch from './fetch'
import { EXCLUDE_STATE, STATE } from './ds'

export default class Action extends Fetch {
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
      type: this.eventType
    })
  }

  /** 文件夹上传扫描 */
  connectWebDirectory = async () => {
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
      type: this.eventType
    })
    this.memoDirectory = []

    setTimeout(() => {
      this.setState({
        refreshKey: this.state.refreshKey + 1
      })
    }, 0)
  }

  /** 展开表单 */
  onShow = () => {
    this.setState({
      visible: true
    })

    t('SMB.显示表单', {
      type: this.eventType
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

    t('SMB.编辑', {
      type: this.eventType
    })
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
    const { id, name, ip, port, username, password, sharedFolder, workGroup, path, url, webDAV } =
      this.state

    if (WEB) {
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

      t('SMB.新增', {
        type: this.eventType
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

      t('SMB.保存', {
        type: this.eventType
      })
    }
    this.save()

    if (WEB) {
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
  onSwitch = (_title: string, index?: number) => {
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
    this.cacheSubjectTags()
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

  /** 选择条目标签 */
  onSelectSubjectTag = (title: string) => {
    const { subjectTags } = this.state
    this.setState({
      subjectTags: title ? (subjectTags.includes(title) ? [] : [title]) : [],
      _page: '1',
      page: 1
    })
    this.cacheList()
    this.save()

    t('SMB.选择条目标签', {
      title
    })
  }

  /** 排序 */
  onSelectSort = (title: Sort) => {
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
      confirm(`以 ${this.current?.smb?.name} 为名字, 用当前筛选的条目来创建用户目录, 确定?`, () => {
        this.doCreateCatalog(navigation)
      })
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

    if (WEB) this.fetchCollectionsWeb()

    t('SMB.上一页')
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

    if (WEB) this.fetchCollectionsWeb()

    t('SMB.下一页')
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

    if (WEB) this.fetchCollectionsWeb()

    t('SMB.页码跳转')
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

    t(value ? 'SMB.展开文件夹' : 'SMB.收起文件夹')
  }

  /** 展开当前页面所有文件夹 */
  onOpenCurrentPage = () => {
    const expands = {}
    this.pageList.forEach(item => {
      expands[item.name] = true
      item?.merge?.forEach(i => {
        expands[i.name] = true
      })
    })
    this.setState({
      expands
    })
    this.save()

    t('SMB.展开本页文件夹')
  }

  /** 关闭当前页面所有文件夹 */
  onCloseCurrentPage = () => {
    const expands = {}
    this.pageList.forEach(item => {
      expands[item.name] = false
      item?.merge?.forEach(i => {
        expands[i.name] = false
      })
    })
    this.setState({
      expands
    })
    this.save()

    t('SMB.收起本页文件夹')
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

    t('SMB.筛选', {
      value
    })
  }

  /** 展开通用配置表单 */
  onShowConfig = () => {
    this.setState({
      configVisible: true
    })

    t('SMB.显示配置', {
      type: this.eventType
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
    const value = !this.state.configs[key]
    this.setState({
      configs: {
        [key]: value
      }
    })
    this.save()

    t('SMB.切换配置', {
      key,
      value
    })
  }

  /** 切换通用配置列数 */
  onSwitchLayoutGridNums = (label: string) => {
    this.setState({
      configs: {
        layoutGridNums: Number(label) as 3 | 2 | 4
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

    t('SMB.显示文件夹弹窗', {
      subjectId: folders.subjectId
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

  /** 展开扩展刮削词表单 */
  onShowExtendsJA = () => {
    this.setState({
      extendsJAVisible: true
    })

    t('SMB.显示刮削词表单', {
      type: this.eventType
    })
  }

  /** 关闭扩展刮削词表单 */
  onCloseExtendsJA = () => {
    this.setState({
      extendsJAVisible: false
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
      (_response, request) => {
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
