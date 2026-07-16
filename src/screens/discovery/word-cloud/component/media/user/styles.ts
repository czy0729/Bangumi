/*
 * @Author: czy0729
 * @Date: 2024-11-01 23:25:15
 * @Last Modified by: czy0729
 * @Last Modified time: 2026-07-16 22:07:38
 */
import { _ } from '@stores'

export const styles = _.create({
  container: {
    padding: _.sm,
    marginTop: _.xs,
    marginBottom: _.sm,
    backgroundColor: _.ios('transparent', 'rgba(0, 0, 0, 0.32)'),
    borderWidth: _.hairlineWidth,
    borderColor: 'rgba(255, 255, 255, 0.16)',
    borderRadius: _.radiusMd,
    overflow: 'hidden'
  },
  body: {
    height: 60,
    paddingTop: 3,
    paddingBottom: 2,
    marginLeft: 12
  },
  opacity: {
    opacity: 0.64
  }
})
