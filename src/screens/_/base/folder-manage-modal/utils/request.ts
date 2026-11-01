/*
 * @Author: czy0729
 * @Date: 2026-11-02 14:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-02 14:00:00
 *
 * 目录数据请求与写操作 (无内部状态, 授权码由调用方持有)
 */
import { discoveryStore, usersStore, userStore } from '@stores'
import { getTimestamp, info } from '@utils'
import i18n from '@constants/i18n'
import { getFormhash } from './order'

import type { Id } from '@types'

/** 可用的授权码: 调用方缓存的优先, 其次全局登录态 */
export function usableFormhash(formhash?: string) {
  return formhash || userStore.formhash
}

/** 请求自己创建的目录列表 (目录分页较麻烦, 暂时只补第二页) */
export async function fetchCatalogs() {
  const { pagination } = await usersStore.fetchCatalogs({ isCollect: false }, true)
  if (pagination.pageTotal > 1) await usersStore.fetchCatalogs({ isCollect: false })

  return usersStore.catalogs()
}

/**
 * 请求目录详情
 *
 * @param id 目录 Id
 * @param refresh 是否强制刷新 (默认 300ms 内复用结果)
 * @returns 从详情删除链接解析出的授权码, 没有则为空串
 */
export async function fetchCatalogDetail(id: Id, refresh: boolean = false) {
  if (!refresh) {
    const { _loaded } = discoveryStore.catalogDetail(id)
    if (_loaded && getTimestamp() - Number(_loaded) <= 300) return ''
  }

  await discoveryStore.fetchCatalogDetail(id)

  const { list } = discoveryStore.catalogDetail(id)
  return (list?.length && getFormhash(list[0].erase)) || ''
}

/** 新建目录 */
export function createCatalog(
  params: { formhash?: string; title?: string; desc?: string; privacy?: string | number },
  success?: () => void
) {
  const formhash = usableFormhash(params.formhash)
  if (!checkFormhash(formhash)) return false

  discoveryStore.doCatalogCreate(
    {
      formhash,
      title: params.title || '',
      desc: params.desc || '',
      privacy: params.privacy
    },
    success
  )

  return true
}

/** 修改目录 */
export function editCatalog(
  params: {
    catalogId: Id
    formhash?: string
    title?: string
    desc?: string
    privacy?: string | number
  },
  success?: () => void
) {
  const formhash = usableFormhash(params.formhash)
  if (!checkFormhash(formhash)) return false

  discoveryStore.doCatalogEdit(
    {
      catalogId: params.catalogId,
      formhash,
      title: params.title || '',
      desc: params.desc || '',
      privacy: params.privacy
    },
    success
  )

  return true
}

/** 删除目录 */
export function deleteCatalog(params: { catalogId: Id; formhash?: string }, success?: () => void) {
  const formhash = usableFormhash(params.formhash)
  if (!checkFormhash(formhash)) return false

  discoveryStore.doCatalogDelete(
    {
      catalogId: params.catalogId,
      formhash
    },
    success
  )

  return true
}

/** 授权码缺失时统一提示 */
function checkFormhash(formhash: string) {
  if (formhash) return true

  info(`授权信息有误, 无法操作, 请尝试重新${i18n.login()}`)
  return false
}
