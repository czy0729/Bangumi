/*
 * @Author: czy0729
 * @Date: 2022-06-14 19:50:25
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-08-31 12:00:00
 *
 * 本地分页长列表的类型定义
 */
import type { ListViewInstance, ListViewProps } from '@components'
import type { Override, Ref } from '@types'

/** 分页列表主组件属性, 基于 ListView 属性扩展 */
export type Props<ItemT = unknown> = Override<
  ListViewProps<ItemT>,
  {
    /** 全量数据, 组件内部按 limit 切片逐页渲染 */
    data: ItemT[] | readonly ItemT[]

    /** 链接 ListView ref */
    forwardRef?: Ref<ListViewInstance> | ((ref: ListViewInstance) => void)

    /** 一页渲染个数 (网页端因为页面滚动状态不能保存, 强制为 100) */
    limit?: number

    /** 下一页回调 (本地翻页后触发; 挂载与数据更新时也会以当前可见切片触发一次) */
    onPage?: (nextPageData: ItemT[], nextPage: number) => void

    /** 下下一页回调 (用于提前加载) */
    onNextPage?: (nextPageData: ItemT[]) => void
  }
>

/** 托管分页的列表数据结构 (与 ListView 的 ListEmpty 约定一致, 避开 ListArray 泛型延迟条件类型) */
export type ListState<ItemT> = {
  /** 当前已放出的条目 (第 1 页到当前页的累积切片) */
  list: ItemT[]

  /** 当前页码与总页数 */
  pagination: {
    page: number
    pageTotal: number
  }

  /** 加载完成时间戳, false 表示尚未加载 */
  _loaded: number | false
}

/** 本地分页 hook 参数 */
export type UsePaginationOptions<ItemT> = Pick<
  Props<ItemT>,
  'data' | 'limit' | 'onPage' | 'onNextPage' | 'onFooterRefresh'
>

/** 本地分页 hook 返回值 */
export type UsePaginationResult<ItemT> = {
  /** 托管后的列表数据 */
  list: ListState<ItemT>

  /** 上滑加载回调 (本地翻页 + 旁路预取, 再接力调用方的网络分页) */
  onFooterRefresh: () => Promise<void>
}
