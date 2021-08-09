/*
 * @Author: czy0729
 * @Date: 2021-08-10 00:36:55
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-08-10 01:25:15
 */
import { _ } from '@stores'
import { pick } from '@utils'

export const defaultProps = {
  // stores
  isPad: _.isPad,
  sm: _.sm,

  // props
  style: {},
  subjectId: 0, // 条目Id
  layoutWidth: 0, // 容器宽度, 存在此值则不计算onLayout, 加速渲染
  marginRight: 0, // 容器右侧的margin值
  numbersOfLine: 8, // 1行多少个, 为了美观, 通过计算按钮占满1行, iPad会忽略
  lines: 4, // 最大显示多少行
  pagination: false, // 是否分页, 1页4行按钮, 不分页显示1页, 分页会显示Carousel
  canPlay: false, // 有播放源
  login: false, // 是否已登陆
  advance: false, // 详情页模式, 显示SP和更多的操作按钮
  eps: [], // 章节数据
  userProgress: {}, // 用户收藏记录
  grid: false,
  onSelect: Function.prototype, // 操作选择 (value, item, subjectId) => void
  onLongPress: Function.prototype // 按钮长按 (item) => void
}

export const buttonDefaultProps = {
  // stores
  styles: {},
  isPad: _.isPad,
  heatMap: false,

  // props
  props: {
    width: 0,
    margin: 0,
    ...pick(defaultProps, [
      'subjectId',
      'numbersOfLine',
      'canPlay',
      'login',
      'advance',
      'userProgress',
      'onSelect',
      'onLongPress'
    ])
  },
  item: {},
  eps: [],
  isSp: false,
  num: 0
}
