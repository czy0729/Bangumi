/*
 * @Author: czy0729
 * @Date: 2026-07-07 17:00:18
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 00:32:40
 */
import { _ } from '@stores'
import { fontSize } from '@styles'

export const styles = _.create({
  headerTitle: {
    paddingRight: 64
  },
  headerTitleText: {
    paddingRight: 48,
    ...fontSize(15),
    letterSpacing: -0.5
  }
})
