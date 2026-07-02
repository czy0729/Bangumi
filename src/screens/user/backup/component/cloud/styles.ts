/*
 * @Author: czy0729
 * @Date: 2022-12-07 14:31:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-03 02:27:33
 */
import { _ } from '@stores'

export const styles = _.create({
  cloud: {
    paddingRight: _.wind - _.sm,
    paddingLeft: _.wind,
    marginBottom: _.sm
  },
  btns: {
    gap: _.sm,
    marginTop: _.xs,
    marginBottom: _.sm,
    marginLeft: -2
  },
  btn: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: _.select(_.colorBg, _._colorDarkModeLevel1),
    borderRadius: 8
  },
  head: {
    marginRight: _.sm,
    marginBottom: _.sm
  }
})
