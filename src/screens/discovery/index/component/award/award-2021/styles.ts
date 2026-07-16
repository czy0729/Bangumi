/*
 * @Author: czy0729
 * @Date: 2022-09-09 22:31:08
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:24:27
 */
import { _ } from '@stores'

const height = _.device(128, 164)
const width = height * 2 + 16

export const styles = _.create({
  container: {
    height,
    marginRight: _.md
  },
  item2021: {
    width: _.device(128, 164) * 2 + 16,
    height: _.device(128, 164),
    backgroundColor: '#ebf3ec'
  },
  body: {
    width,
    height,
    backgroundColor: '#c4cfa1',
    opacity: 0.99
  }
})
