/*
 * @Author: czy0729
 * @Date: 2022-11-08 05:37:15
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-11-08 05:37:15
 */
import { _ } from '@stores'

const sectionWidth = Math.floor((_.window.width - _.wind * 2 - _._wind) / 2)
const sectionHeight = Math.min(sectionWidth / 2.6, _.device(88, 112))

export const memoStyles = _.memoStyles(() => ({
  container: {
    marginRight: _._wind,
    marginBottom: _.md,
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  },
  block: {
    width: sectionWidth,
    height: sectionHeight,
    paddingLeft: 20,
    backgroundColor: _.select(_.colorTinygrailBg, _.colorTinygrailBorder)
  },
  icon: {
    position: 'absolute',
    top: '50%',
    right: -10,
    marginTop: -24,
    color: _.colorTinygrailIcon,
    opacity: 0.24
  }
}))
