/*
 * @Author: czy0729
 * @Date: 2023-11-08 21:06:43
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:32:16
 */
import { _ } from '@stores'
import { STORYBOOK_GRID, STORYBOOK_WIDTH } from '@constants'

export const styles = _.create({
  scrollView: {
    ...(STORYBOOK_GRID
      ? {
          width: STORYBOOK_WIDTH + 4,
          height: '96vh',
          borderWidth: 2,
          borderColor: 'rgba(255, 255, 255, 0.64)',
          borderRadius: 16
        }
      : {
          width: STORYBOOK_WIDTH,
          height: '100vh'
        }),
    // eslint-disable-next-line bangumi/forbid-computed-in-create
    backgroundColor: _.colorPlain,
    overflow: 'hidden',
    // @ts-ignore
    overflowY: 'hidden'
  },
  wind: {
    paddingHorizontal: _.wind
  },
  space: {
    paddingVertical: _.md
  }
})
