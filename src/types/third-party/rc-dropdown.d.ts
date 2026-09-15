/*
 * @Author: czy0729
 * @Date: 2026-09-15 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-15 06:00:30
 *
 * rc-dropdown 类型声明 (Web 平台使用, 根工程未安装此包)
 *  - 只声明项目实际用到的 API, 避免 any 兜底掩盖字段误用
 */
declare module 'rc-dropdown' {
  import type { ReactElement, ReactNode } from 'react'

  /** 触发方式 */
  type DropdownTrigger = 'click' | 'hover' | 'contextMenu'

  type DropdownProps = {
    /** 是否受控显示 */
    visible?: boolean

    /** 触发方式 */
    trigger?: DropdownTrigger[]

    /** 浮层内容 */
    overlay: ReactElement

    /** 浮层显示状态变更 */
    onVisibleChange?: (visible: boolean) => void

    /** 浮层挂载容器 (查询不到时返回 null, 表示挂载到默认位置) */
    getPopupContainer?: (triggerNode?: Element) => Element | null

    /** 触发元素 */
    children?: ReactNode
  }

  function Dropdown(props: DropdownProps): ReactElement

  export default Dropdown
}
