/*
 * @Author: czy0729
 * @Date: 2026-06-20 10:00:00
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-15 22:53:00
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    marginTop: _.md,
    backgroundColor: '#1e1e1e',
    borderTopRightRadius: _.radiusSm,
    borderTopLeftRadius: _.radiusSm,
    overflow: 'hidden'
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 6,
    backgroundColor: '#2d2d2d',
    borderBottomWidth: 1,
    borderBottomColor: '#404040'
  },
  filters: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  filterBtn: {
    paddingHorizontal: 6,
    paddingVertical: 2,
    marginLeft: 4,
    borderRadius: 3,
    backgroundColor: '#404040'
  },
  filterBtnActive: {
    backgroundColor: '#555'
  },
  content: {
    paddingHorizontal: 10,
    paddingVertical: 6
  },
  empty: {
    minHeight: 40,
    alignItems: 'center',
    justifyContent: 'center'
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    paddingVertical: _.sm,
    borderBottomWidth: _.hairlineWidth,
    borderBottomColor: 'rgba(255, 255, 255, 0.16)'
  },
  rowLast: {
    borderBottomWidth: 0
  },
  time: {
    color: '#666',
    fontFamily: 'monospace',
    marginRight: 6,
    minWidth: 48
  },
  level: {
    fontFamily: 'monospace',
    marginRight: 4,
    fontWeight: 'bold',
    minWidth: 12
  },
  message: {
    color: '#d4d4d4',
    fontFamily: 'monospace',
    flex: 1,
    opacity: 0.92
  }
})
