/*
 * @Author: czy0729
 * @Date: 2025-08-09 04:04:21
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-01-14 09:22:56
 */
import type { GetRouteParams, RouteWebBrowser } from '@types'

export type Params = GetRouteParams<RouteWebBrowser>

export type Props = {
  route: {
    params: Params
  }
}
