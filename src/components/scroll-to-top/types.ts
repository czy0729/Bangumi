/*
 * @Author: czy0729
 * @Date: 2022-08-31 15:18:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-08-31 15:19:22
 */
export type Props = {
  /** 页面是否处于焦点状态 */
  isFocused?: boolean

  /** 滚动到指定偏移量，对应 ScrollView.scrollTo */
  scrollTo?: (params: { x?: number; y?: number; animated?: boolean }) => void

  /** 滚动到指定索引，对应 FlatList.scrollToIndex */
  scrollToIndex?: (params: { animated?: boolean; index: number; viewOffset?: number }) => void

  /** 滚动到 SectionList 指定位置 */
  scrollToLocation?: (params: {
    animated?: boolean
    itemIndex: number
    sectionIndex: number
    viewOffset?: number
    viewPosition?: number
  }) => void

  /** 自定义点击回调，设置后将覆盖默认滚动行为 */
  onPress?: () => void
}
