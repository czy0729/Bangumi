/*
 * @Author: czy0729
 * @Date: 2024-01-22 09:19:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-03-16 06:46:36
 */
import { _ } from '@stores'

export const styles = _.create({
  inputContainer: {
    height: 40,
    paddingVertical: 0,
    paddingRight: 20,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  input: {
    height: 'auto',
    paddingVertical: 11
  },
  more: {
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  notice: {
    marginHorizontal: 0,
    marginBottom: _.md
  }
})
