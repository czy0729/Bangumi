/*
 * @Author: czy0729
 * @Date: 2026-06-20 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-06-21 10:00:00
 */
export type LogType = 'host' | 'api' | 'lain' | 'proxy' | 'dns' | 'cache' | 'connect'

export type TypeFilter = {
  key: string
  label: string
}

export type Props = {
  title: string
  logs: {
    time: number
    level: string
    type?: string
    message: string
  }[]
  showFilters?: boolean
  typeFilters?: readonly TypeFilter[]
}
