/*
 * @Author: czy0729
 * @Date: 2026-11-01 23:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-01 23:00:00
 *
 * 目录创建 / 编辑表单状态机
 */
import { useCallback, useState } from 'react'
import { feedback, info } from '@utils'
import i18n from '@constants/i18n'
import {
  createCatalog as requestCreateCatalog,
  decodeContent,
  editCatalog as requestEditCatalog
} from '../utils'

import type { CatalogsItem } from '@stores/users/types'
import type { Id } from '@types'
import type { Privacy } from '../types'
import type { UseCatalogFormOptions } from './types'

/**
 * 目录创建 / 编辑表单状态机
 *
 * @param options 依赖注入: 授权码 / 列表与详情刷新 / 埋点
 */
export function useCatalogForm({
  fetchCatalogs,
  getUsableFormhash,
  syncFormhash,
  track
}: UseCatalogFormOptions) {
  /** 是否正在新建目录, 目录编辑 */
  const [create, setCreate] = useState<boolean | Id>(false)
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  /** 隐私设置, 与网页表单一致默认私密 */
  const [privacy, setPrivacy] = useState<Privacy>('1')

  /** 改变表单标题 */
  const onChangeTitle = useCallback((value: string) => {
    setTitle(value)
  }, [])

  /** 改变表单介绍 */
  const onChangeDesc = useCallback((value: string) => {
    setDesc(value)
  }, [])

  /** 改变隐私设置 */
  const onChangePrivacy = useCallback((value: Privacy) => {
    setPrivacy(value)
  }, [])

  /** 创建 / 取消创建目录 */
  const onCreate = useCallback(
    (isNew: boolean) => {
      if (isNew) {
        if (!getUsableFormhash()) {
          info(`授权信息有误, 无法操作, 请尝试重新${i18n.login()}`)
          return
        }

        setCreate(true)
        setPrivacy('1')
        return
      }

      setCreate(false)
      setTitle('')
      setDesc('')
      setPrivacy('1')
    },
    [getUsableFormhash]
  )

  /** 进入编辑目录表单 (带出当前标题与介绍) */
  const startEdit = useCallback(
    (item: Pick<CatalogsItem, 'id' | 'title' | 'isPrivate'>, content: string) => {
      setCreate(item.id)
      setTitle(item.title || '')
      setDesc(decodeContent(content))
      setPrivacy(item.isPrivate ? '1' : '0')
    },
    []
  )

  /** 提交创建 / 修改目录 */
  const onSubmitCatalog = useCallback(() => {
    if (!getUsableFormhash()) {
      info(`授权信息有误, 无法操作, 请尝试重新${i18n.login()}`)
      return
    }

    if (!title.length) {
      info('请填写目录标题')
      return
    }

    if (!desc.length) {
      info('请填写目录介绍')
      return
    }

    if (create === true) {
      requestCreateCatalog(
        { formhash: getUsableFormhash(), title, desc, privacy },
        () => {
          info('已创建目录')
          fetchCatalogs().catch(() => {})
          onCreate(false)
          feedback()
          track('onSubmitCatalog:create')
        }
      )
      return
    }

    if (create === false) return

    requestEditCatalog(
      { catalogId: create, formhash: getUsableFormhash(), title, desc, privacy },
      () => {
        syncFormhash(create, true)
        onCreate(false)
        feedback()
        track('onSubmitCatalog:edit')
      }
    )
  }, [
    create,
    desc,
    fetchCatalogs,
    getUsableFormhash,
    syncFormhash,
    onCreate,
    privacy,
    title,
    track
  ])

  return {
    /** 是否正在新建目录, 目录编辑 */
    create,

    /** 表单标题 */
    title,

    /** 表单介绍 */
    desc,

    /** 隐私设置 */
    privacy,

    /** 创建 / 取消创建目录 */
    onCreate,

    /** 提交创建 / 修改目录 */
    onSubmitCatalog,

    /** 进入编辑目录表单 (带出当前标题与介绍) */
    startEdit,

    /** 改变表单标题 */
    onChangeTitle,

    /** 改变表单介绍 */
    onChangeDesc,

    /** 改变隐私设置 */
    onChangePrivacy
  }
}
