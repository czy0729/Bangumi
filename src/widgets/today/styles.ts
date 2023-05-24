/*
 * @Author: czy0729
 * @Date: 2023-05-23 12:00:09
 * @Last Modified by: czy0729
 * @Last Modified time: 2023-05-23 20:30:36
 */
import {
  LIST_HEIGHT,
  SIDE_WIDTH,
  SPACE,
  WIDGET_HEIGHT,
  WIDGET_WIDTH,
  WIND
} from '../ds'

const PADDING = 8

export const styles = {
  container: {
    flexDirection: 'column',
    width: 'match_parent',
    height: WIDGET_HEIGHT,
    backgroundColor: '#121212',
    borderRadius: 16
  },
  list: {
    flexDirection: 'row',
    width: 'wrap_content',
    height: LIST_HEIGHT,
    paddingBottom: SPACE
  },
  side: {
    width: SIDE_WIDTH,
    height: LIST_HEIGHT
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: (WIDGET_WIDTH - SIDE_WIDTH) / 2,
    height: (LIST_HEIGHT - SPACE) / 3,
    paddingLeft: WIND
  },
  body: {
    paddingLeft: PADDING
  },
  name: {
    width: 'wrap_content',
    fontSize: 11,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.88)'
  },
  time: {
    marginTop: 2,
    fontSize: 8,
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 0.56)'
  }
} as const
