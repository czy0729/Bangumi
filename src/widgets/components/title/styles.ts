/*
 * @Author: czy0729
 * @Date: 2023-05-23 19:51:07
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-23 20:39:31
 */
import { TITLE_HEIGHT, WIND } from '../../ds'

export const styles = {
  title: {
    justifyContent: 'center',
    width: 'match_parent',
    height: TITLE_HEIGHT,
    paddingTop: 8,
    paddingLeft: WIND,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  titleText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.88)'
  }
} as const
