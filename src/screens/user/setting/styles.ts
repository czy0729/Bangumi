/*
 * @Author: czy0729
 * @Date: 2022-01-21 16:35:16
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-15 22:51:55
 */
import { _ } from '@stores'
import { WEB } from '@constants'

export default _.create({
  switch: {
    marginRight: -4,
    transform: [
      {
        scale: _.device(0.75, 1)
      }
    ]
  },
  segmentedControl: {
    height: _.r(32),
    width: _.r(172)
  },
  test: {
    marginTop: -8
  },
  acSearch: {
    paddingLeft: _._wind,
    marginTop: _.sm,
    marginBottom: _.md
  },
  closePopablePlaceholder: {
    width: '100%',
    height: 160
  },
  sub: {
    marginLeft: 24
  },

  /**
   * 页面内容容器
   *  - 顶部与头部留空
   *  - 底部用页面通用的 bottom (与云同步设置等页面一致), 避免内容被底栏遮挡
   * */
  container: {
    paddingTop: _.sm,
    paddingBottom: _.bottom
  },

  /** 与单行 ITEM (如版本) 对齐: 高度 = 上下 padding 12 × 2 + 行图标高 17, 文字同 ITEM 标题字号 */
  input: {
    height: 41,
    paddingVertical: 0,
    paddingHorizontal: _._wind,
    // eslint-disable-next-line bangumi/forbid-computed-in-create
    ...(WEB ? _.fontSize13 : _.fontSize14),
    borderWidth: 0,
    backgroundColor: 'transparent'
  },
  input2: {
    height: 44,
    paddingVertical: 0,
    paddingHorizontal: 17,
    // eslint-disable-next-line bangumi/forbid-computed-in-create
    ..._.fontSize14,
    borderWidth: 0
  }
})
