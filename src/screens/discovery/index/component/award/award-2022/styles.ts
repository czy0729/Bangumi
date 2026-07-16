/*
 * @Author: czy0729
 * @Date: 2023-01-22 06:05:28
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:24:17
 */
import { _ } from '@stores'

const height = _.device(128, 164)
const width = height * 2 + 16

export const styles = _.create({
  container: {
    height,
    marginRight: _.md
  },
  item2022: {
    width: _.device(128, 164) * 2 + 16,
    height: _.device(128, 164)
  },
  body: {
    width,
    height,
    backgroundColor: '#ffffff',
    opacity: 0.99
  }
})
