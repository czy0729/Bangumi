/*
 * @Author: czy0729
 * @Date: 2026-11-01 23:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 14:00:00
 *
 * 目录管理弹窗的主 hook: 编排目录列表排序 / 目录表单 / 条目编辑 / 展开收起四个状态机
 */
import { useCallback, useEffect, useRef } from 'react'
import { collectionStore, discoveryStore, usersStore } from '@stores'
import { confirm, feedback, info } from '@utils'
import { queue, t } from '@utils/fetch'
import { FROZEN_FN } from '@constants'
import {
  deleteCatalog as requestDeleteCatalog,
  fetchCatalogDetail as requestCatalogDetail,
  fetchCatalogs as requestCatalogs,
  usableFormhash
} from '../utils'
import { useBackClose } from './useBackClose'
import { useCatalogForm } from './useCatalogForm'
import { useExpand } from './useExpand'
import { useOpenedModal } from './useOpenedModal'
import { useSort } from './useSort'
import { useSubjectEditor } from './useSubjectEditor'

import type { EventData } from '@utils/track/type'
import type { CatalogDetail } from '@stores/discovery/types'
import type { Id } from '@types'
import type { HandleChange, HandleControl } from '../types'
import type { UseFolderManageModalOptions } from './types'

let loaded = false

/** 主 hook 返回的视图模型 */
export type UseFolderManageModalReturn = ReturnType<typeof useFolderManageModal>

/**
 * 目录管理弹窗的状态与动作
 *
 * @param id 条目 Id, 目录增删与条目增删的目标
 * @param defaultExpand 打开时默认展开的目录 Id
 * @param defaultEditItem 打开时默认进入编辑的条目
 * @param visible 是否显示
 * @param onClose 关闭回调
 */
export function useFolderManageModal({
  id = 0,
  defaultExpand = 0,
  defaultEditItem = null,
  visible = false,
  onClose = FROZEN_FN
}: UseFolderManageModalOptions) {
  /** 从目录详情里解析到的授权码 (全局登录态之外的补充) */
  const formhashRef = useRef('')
  const getUsableFormhash = useCallback(() => usableFormhash(formhashRef.current), [])

  /** 写操作过的目录 Id, 重新展开时对它们强制刷新一次详情 */
  const dirtyRef = useRef<Set<Id>>(new Set())

  /** 目录详情 (带上目录 id, 供子组件直接使用) */
  const catalogDetail = useCallback((catalogId: Id): CatalogDetail & { id: Id } => {
    return {
      ...discoveryStore.catalogDetail(catalogId),
      id: catalogId
    }
  }, [])

  /** 批量获取目录中已收藏条目的最新状态 */
  const fetchCollectStatusQueue = useCallback(
    (catalogId: Id) => {
      const { list: subjects } = catalogDetail(catalogId)
      if (subjects.length) {
        const subjectIds = subjects.filter(item => item.isCollect).map(item => item.id)
        if (subjectIds.length) collectionStore.fetchCollectionStatusQueue(subjectIds)
      }
    },
    [catalogDetail]
  )

  /** track */
  const track = useCallback(
    (value: string, other: EventData = {}) => {
      t('其他.管理目录', {
        subjectId: id,
        value,
        ...other
      })
    },
    [id]
  )

  /** 请求目录详情, 并缓存解析到的授权码 */
  const fetchDetail = useCallback(async (catalogId: Id, refresh: boolean) => {
    const formhash = await requestCatalogDetail(catalogId, refresh)
    if (formhash) formhashRef.current = formhash

    return true
  }, [])

  /** 请求目录详情, 并缓存解析到的授权码; 写操作后的强制刷新会标记目录待展开再刷新 */
  const syncFormhash = useCallback(
    async (catalogId: Id, refresh: boolean) => {
      if (refresh) dirtyRef.current.add(catalogId)

      return fetchDetail(catalogId, refresh)
    },
    [fetchDetail]
  )

  const { list, sortType, sortOrder, updateList, onSortType } = useSort()

  /** 请求目录列表 */
  const fetchCatalogs = useCallback(async () => {
    await requestCatalogs()

    updateList()
    const { list: catalogs } = usersStore.catalogs()
    queue(catalogs.map(item => () => fetchDetail(item.id, !loaded)))
    loaded = true

    return true
  }, [fetchDetail, updateList])

  const {
    create,
    title,
    desc,
    privacy,
    onCreate,
    onSubmitCatalog,
    startEdit,
    onChangeTitle,
    onChangeDesc,
    onChangePrivacy
  } = useCatalogForm({
    fetchCatalogs,
    getUsableFormhash,
    syncFormhash,
    track
  })

  const {
    content,
    edit,
    forwardRef,
    order,
    onToggle,
    onChangeContent,
    onOrder,
    onSubmit,
    onSubjectControl,
    onSubjectEdit
  } = useSubjectEditor({
    id,
    getUsableFormhash,
    catalogDetail,
    syncFormhash,
    track
  })

  const { expand, setExpand, onExpand } = useExpand({
    dirtyRef,
    onSubjectEdit,
    fetchCollectStatusQueue,
    syncFormhash
  })

  /** 目录更多菜单 */
  const onControl = useCallback<HandleControl>(
    (name, item) => {
      switch (name) {
        case '修改':
          startEdit(item, catalogDetail(item.id).content)
          break

        case '删除':
          confirm(
            `删除目录[${item.title}], 操作将抹掉所有关联数据以及用户留言, 是否要继续?`,
            () => {
              requestDeleteCatalog({ catalogId: item.id, formhash: getUsableFormhash() }, () => {
                info('已删除此目录')
                feedback()
                fetchCatalogs().catch(() => {})
                track('onControl:delete')
              })
            }
          )
          break

        default:
          break
      }
    },
    [catalogDetail, fetchCatalogs, getUsableFormhash, startEdit, track]
  )

  /** 改变文字 (标题 / 介绍 / 隐私 / 条目内容), 分发给对应状态机 */
  const onChange = useCallback<HandleChange>(
    (value, key = 'content') => {
      if (key === 'title') onChangeTitle(value)
      else if (key === 'desc') onChangeDesc(value)
      else if (key === 'privacy') onChangePrivacy(value === '1' ? '1' : '0')
      else onChangeContent(value)
    },
    [onChangeContent, onChangeDesc, onChangePrivacy, onChangeTitle]
  )

  /** 初始展开项的最新收藏状态 (只跑一次) */
  useEffect(() => {
    if (defaultExpand) fetchCollectStatusQueue(defaultExpand)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  /** 安卓返回键: 打开时先关弹窗 */
  useBackClose({ visible, onClose })

  useOpenedModal({
    visible,
    fetchCatalogs,
    setExpand,
    onSubjectEdit,
    defaultExpand,
    defaultEditItem,
    // 打开时会全量刷新详情, 上次打开期间遗留的脏标记一并作废
    onOpened: () => dirtyRef.current.clear()
  })

  return {
    /** 展开的目录 id 列表 */
    expand,

    /** 按当前排序规则缓存的目录列表 */
    list,

    /** 是否正在新建目录, 目录编辑 */
    create,

    /** 正在编辑的条目 id, 0 为非编辑态 */
    edit,

    /** 表单标题 */
    title,

    /** 表单介绍 */
    desc,

    /** 隐私设置 */
    privacy,

    /** 条目编辑内容 */
    content,

    /** 条目编辑排序值 */
    order,

    /** 工具栏排序字段 */
    sortType,

    /** 工具栏升 / 降序 */
    sortOrder,

    /** 条目编辑输入框 ref, 供 Subjects 挂载 */
    forwardRef,

    /** 目录详情 (带上目录 id, 供子组件直接使用) */
    catalogDetail,

    /** 改变文字 (标题 / 介绍 / 条目内容) */
    onChange,

    /** 展开 / 收起目录 */
    onExpand,

    /** 添加 / 移出条目 */
    onToggle,

    /** 目录更多菜单 */
    onControl,

    /** 创建 / 取消创建目录 */
    onCreate,

    /** 提交创建 / 修改目录 */
    onSubmitCatalog,

    /** 编辑条目 */
    onSubjectEdit,

    /** 条目更多菜单 */
    onSubjectControl,

    /** 改变条目排序值 */
    onOrder,

    /** 提交条目修改 */
    onSubmit,

    /** 工具栏排序 */
    onSortType
  }
}
