/*
 * @Author: czy0729
 * @Date: 2026-09-16 01:30:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-09-16 01:30:00
 *
 * react-ios-corners 类型声明 (Web 平台使用, 根工程未安装此包)
 *  - 只声明项目实际用到的 API, 避免 any 兜底掩盖字段误用
 *  - 消费方: components/squircle/index.web.tsx (web 端的仿 iOS 平滑圆角)
 */
declare module 'react-ios-corners' {
  import type { ReactElement, ReactNode } from 'react'

  type SquircleProps = {
    /** 圆角大小 */
    radius: number

    /** 圆润度: 越大越方, 越小越接近圆弧 */
    ratio?: number

    /** 内容 */
    children?: ReactNode
  }

  export function Squircle(props: SquircleProps): ReactElement
}
