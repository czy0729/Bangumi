/*
 * @Author: czy0729
 * @Date: 2023-11-08 21:48:50
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:31:46
 */
import { _ } from '@stores'
import { STORYBOOK_IFRAME, STORYBOOK_WIDTH } from '@constants'

const width = STORYBOOK_WIDTH + (STORYBOOK_IFRAME ? 4 : 0)

export const styles = _.create({
  view: {
    width,
    maxWidth: width
  },
  container: {
    paddingHorizontal: '8%'
  },
  wind: {
    // eslint-disable-next-line bangumi/forbid-computed-in-create
    paddingHorizontal: _.wind
  },
  space: {
    paddingVertical: _.md
  },
  radius: {
    width,
    maxWidth: width,
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  }
})
