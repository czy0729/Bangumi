/*
 * @Author: czy0729
 * @Date: 2022-12-06 05:47:56
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-12-13 12:32:30
 */
export const NAMESPACE = 'ScreenActions'

export const LIMIT = 100

export const EXCLUDE_STATE = {
  progress: {
    fetching: false,
    message: '',
    current: 0,
    total: 0
  }
}

export const CSV_HEADS = [
  'ID',
  '封面',
  '网址',
  '类型',
  '中文',
  '日文',
  '放送',
  '排名',
  '评分',
  '话数',
  '看到',
  '状态',
  '标签',
  '我的评价',
  '我的简评',
  '更新时间'
] as const
