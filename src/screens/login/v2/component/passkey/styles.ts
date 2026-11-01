/*
 * @Date: 2026-11-01
 *
 * 说明入口独立放在按钮右侧, 不占用主按钮宽度
 */
import { _ } from '@stores'

export const styles = _.create({
  row: {
    position: 'relative'
  },
  info: {
    position: 'absolute',
    left: '100%',
    top: 0,
    bottom: 0,
    justifyContent: 'center'
  }
})
