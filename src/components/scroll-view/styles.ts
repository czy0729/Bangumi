/*
 * @Author: czy0729
 * @Date: 2023-04-09 10:48:34
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-04-09 10:54:51
 */
import { _ } from '@stores'
import { STORYBOOK_HEIGHT } from '@constants'

export const styles = _.create({
  storybook: {
    height: STORYBOOK_HEIGHT,
    maxHeight: '96%',
    paddingTop: _.md,
    marginTop: 0,
    marginBottom: 0
  }
})
