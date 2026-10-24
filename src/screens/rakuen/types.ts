/*
 * @Author: czy0729
 * @Date: 2026-10-24 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-24 10:00:00
 *
 * 超展开频道共用类型: 回复列表渲染与滚动回调
 */
import type { ReactElement } from 'react'
import type { ListViewProps } from '@components'
import type { CommentsItemWithSub } from '@stores/rakuen/types'
import type { RenderItem } from '@types'

/** 渲染回复列表项 */
export type HandleRenderItem = (args: RenderItem<CommentsItemWithSub>) => ReactElement | null

/** 滚动失败后尝试使用保守的方法再次滚动 */
export type HandleScrollToIndexFailed = ListViewProps<CommentsItemWithSub>['onScrollToIndexFailed']
