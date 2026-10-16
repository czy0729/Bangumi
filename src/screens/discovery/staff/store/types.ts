/*
 * @Author: czy0729
 * @Date: 2026-10-16 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-16 00:00:00
 *
 * store 内部类型: 目录详情上传入参
 */
import type { CatalogDetail } from '@stores/discovery/types'
import type { Id, Loaded, Override } from '@types'

/** 目录详情上传入参 */
export type CatalogDetailUploadPayload = Override<
  CatalogDetail,
  {
    /** 目录 Id */
    id: Id

    /** 详情描述 */
    info?: string

    /** 详情是否已加载 */
    _loaded?: Loaded
  }
>
