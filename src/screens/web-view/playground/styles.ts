/*
 * @Author: czy0729
 * @Date: 2026-11-08 12:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-11-24 15:30:00
 *
 * 表情格子: 5 列, 图标容器按字号留出固定占位
 * 输入框: 用例的标签与自定义样式
 */
import { _ } from '@stores'
import { SIZE } from './ds'

export const memoStyles = _.memoStyles(() => ({
  section: {
    marginBottom: _.lg
  },
  title: {
    marginBottom: _.sm
  },
  case: {
    marginBottom: _.md,
    alignSelf: 'stretch'
  },
  label: {
    marginBottom: _.xs
  },
  customInput: {
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: _.colorMain,
    borderRadius: _.radiusXs
  },
  customContainer: {
    paddingHorizontal: 4,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: _.colorSub,
    borderRadius: _.radiusXs
  },
  item: {
    alignItems: 'center',
    width: '20%',
    paddingVertical: _.xs
  },
  icon: {
    width: SIZE.normal,
    height: SIZE.normal
  },
  iconLarge: {
    width: SIZE.large,
    height: SIZE.large
  }
}))
