/*
 * @Author: czy0729
 * @Date: 2026-11-01 23:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 04:06:00
 *
 * 条目编辑 / 排序状态机
 */
import { useCallback, useRef, useState } from 'react'
import { discoveryStore } from '@stores'
import { confirm, feedback, info } from '@utils'
import {
  decodeContent,
  fixedOrder,
  getBottomOrder,
  getFormhash,
  getNextOrder,
  getPrevOrder,
  getTopOrder
} from '../utils'

import type { Id } from '@types'
import type {
  HandleOrder,
  HandleSort,
  HandleSubjectControl,
  HandleSubjectEdit,
  HandleSubmit,
  HandleToggle,
  TextareaRef
} from '../types'
import type { UseSubjectEditorOptions } from './types'

/**
 * 条目编辑 / 排序状态机
 *
 * @param id 条目 Id, 添加 / 移出条目的目标
 * @param options 依赖注入: 授权码 / 目录详情读取 / 详情刷新 / 埋点
 */
export function useSubjectEditor({
  id,
  getUsableFormhash,
  catalogDetail,
  syncFormhash,
  track
}: UseSubjectEditorOptions) {
  /** 正在编辑的条目 id, 0 为非编辑态 */
  const [edit, setEdit] = useState<Id>(0)
  const [content, setContent] = useState('')
  const [order, setOrder] = useState<string | number>('0')

  const textareaRef = useRef<TextareaRef | null>(null)
  const forwardRef = useCallback((ref: TextareaRef | null) => {
    textareaRef.current = ref
  }, [])

  /** 编辑条目 */
  const onSubjectEdit = useCallback<HandleSubjectEdit>(item => {
    if (item) {
      setEdit(item.id)
      setContent(decodeContent(item.comment))
      setOrder(item.order || '0')

      setTimeout(() => {
        try {
          if (typeof textareaRef.current?.textAreaRef?.focus === 'function') {
            textareaRef.current.textAreaRef.focus()
          }
        } catch {}
      }, 160)
      return
    }

    setEdit(0)
    setContent('')
    setOrder('0')
  }, [])

  /** 改变条目内容 */
  const onChangeContent = useCallback((value: string) => {
    setContent(value)
  }, [])

  /** 添加 / 移出条目 */
  const onToggle = useCallback<HandleToggle>(
    (item, detail, isIn) => {
      if (!isIn) {
        discoveryStore.doCatalogAddRelate(
          {
            catalogId: item.id,
            subjectId: id,
            formhash: getUsableFormhash()
          },
          () => {
            info('已添加到此目录')
            feedback()
            syncFormhash(item.id, true)
            track('onToggle:in')
          },
          // 无论如何都刷新: 请求失败也同步一次目录详情, 不让界面停留在旧数据
          () => syncFormhash(item.id, true)
        )
        return
      }

      const find = detail.list.find(i => i.id == id)
      if (!find || !find.erase) {
        info('目录信息有误, 暂不能把该条目移出目录, 请重新进入页面')
        return
      }

      confirm('移出会同时删除目录评价, 确定?', () => {
        discoveryStore.doCatalogDeleteRelate(
          {
            erase: find.erase
          },
          () => {
            info('已移出此目录')
            feedback()
            syncFormhash(item.id, true)
            track('onToggle:out')
          },
          // 与添加一致: 失败也强制刷新, 保证目录信息最终与服务器一致
          () => syncFormhash(item.id, true)
        )
      })
    },
    [getUsableFormhash, syncFormhash, id, track]
  )

  /** 改变条目排序值 */
  const onOrder = useCallback<HandleOrder>(value => {
    if (!value) {
      setOrder('')
      return
    }

    const next = Number(value)
    if (Number.isNaN(next)) return

    setOrder(next == 0 ? '' : next)
  }, [])

  /** 直接提交条目顺序 */
  const onSort = useCallback<HandleSort>(
    (item, nextOrder, pItem) => {
      const formhash = getFormhash(item.erase)
      if (!formhash) {
        info('目录信息有误, 暂不能修改条目, 请重新进入页面')
        return
      }

      discoveryStore.doCatalogModifySubject(
        {
          modify: item.modify,
          formhash,
          content: decodeContent(item.comment),
          order: nextOrder || '0'
        },
        () => {
          feedback()
          syncFormhash(pItem.id, true)
        }
      )
    },
    [syncFormhash]
  )

  /** 提交条目修改 */
  const onSubmit = useCallback<HandleSubmit>(
    (item, pItem) => {
      const formhash = getFormhash(item.erase)
      if (!formhash) {
        info('目录信息有误, 暂不能修改条目, 请重新进入页面')
        return
      }

      discoveryStore.doCatalogModifySubject(
        {
          modify: item.modify,
          formhash,
          content: content || '',
          order: String(order || '0')
        },
        () => {
          feedback()
          syncFormhash(pItem.id, true)
          onSubjectEdit()
          track('onSubmit:subject')
        }
      )
    },
    [content, syncFormhash, onSubjectEdit, order, track]
  )

  /** 条目更多菜单 (置顶 / 上移 / 下移 / 置底 / 修改 / 移出) */
  const onSubjectControl = useCallback<HandleSubjectControl>(
    (name, item, pItem) => {
      const detail = catalogDetail(pItem.id)
      const current = fixedOrder(item.order)
      const orders = detail.list.map(i => fixedOrder(i.order))

      switch (name) {
        case '置顶':
          onSort(item, getTopOrder(orders), pItem)
          track('onSubjectControl:top')
          break

        case '上移':
          onSort(item, getPrevOrder(orders, current), pItem)
          track('onSubjectControl:up')
          break

        case '下移':
          onSort(item, getNextOrder(orders, current), pItem)
          track('onSubjectControl:down')
          break

        case '置底':
          onSort(item, getBottomOrder(orders), pItem)
          track('onSubjectControl:bottom')
          break

        case '修改':
          onSubjectEdit(item)
          track('onSubjectControl:edit')
          break

        case '移出':
          confirm('确定移出目录?', () => {
            discoveryStore.doCatalogDeleteRelate(
              {
                erase: item.erase
              },
              () => {
                info('已移出此目录')
                feedback()
                syncFormhash(pItem.id, true)
                track('onSubjectControl:remove')
              }
            )
          })
          break

        default:
          break
      }
    },
    [catalogDetail, onSort, onSubjectEdit, syncFormhash, track]
  )

  return {
    /** 正在编辑的条目 id, 0 为非编辑态 */
    edit,

    /** 条目编辑内容 */
    content,

    /** 条目编辑排序值 */
    order,

    /** 条目编辑输入框 ref, 供 Subjects 挂载 */
    forwardRef,

    /** 添加 / 移出条目 */
    onToggle,

    /** 编辑条目 */
    onSubjectEdit,

    /** 改变条目内容 */
    onChangeContent,

    /** 改变条目排序值 */
    onOrder,

    /** 直接提交条目顺序 */
    onSort,

    /** 提交条目修改 */
    onSubmit,

    /** 条目更多菜单 */
    onSubjectControl
  }
}
