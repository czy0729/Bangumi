/*
 * @Author: czy0729
 * @Date: 2025-08-09 04:04:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-09 18:00:00
 *
 * 页面参数
 */
import type { GetRouteParams, NavigationProps, Override, RouteWebBrowser } from '@types'

export type Params = GetRouteParams<RouteWebBrowser>

export type Props = Override<
  NavigationProps,
  {
    /** 路由 */
    route: Override<
      NonNullable<NavigationProps['route']>,
      {
        /** 页面参数 */
        params: Params
      }
    >
  }
>
