/*
 * @Author: czy0729
 * @Date: 2026-10-29 00:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-10-29 00:00:00
 */
import { _ } from '@stores'

export const styles = _.create({
  // iOS 的 HoldItem 展开时会对目标视图做变换, 外层 overflow: hidden 会让圆角在动画中重绘
  // 圆角统一由 Button 自己裁剪
  touch: {
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40
  },
  btn: {
    width: _.r(84),
    height: 40,
    paddingLeft: _.r(4),
    // 与输入框同底色, 拼接成一整块
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderTopLeftRadius: 40,
    borderBottomLeftRadius: 40,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0
  },
  text: {
    width: _.r(84)
  }
})
