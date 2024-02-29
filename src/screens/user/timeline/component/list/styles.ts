/*
 * @Author: czy0729
 * @Date: 2022-08-20 15:51:14
 * @Last Modified by:   czy0729
 * @Last Modified time: 2022-08-20 15:51:14
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  container: {
    paddingLeft: _.r(32),
    marginRight: _.wind,
    marginLeft: _.wind - _._wind
  },
  line: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 1,
    height: '100%',
    marginLeft: _.r(-12),
    backgroundColor: _.select(_.colorBorder, 'rgb(57, 57, 59)'),
    transform: [
      {
        translateX: _.r(-0.5)
      }
    ]
  },
  lineBottom: {
    position: 'absolute',
    zIndex: 1,
    top: '50%',
    left: 0,
    width: 1,
    height: '100%',
    marginLeft: _.r(-12),
    backgroundColor: _.select(_.colorBorder, 'rgb(57, 57, 59)'),
    transform: [
      {
        translateX: _.r(-0.5)
      }
    ]
  },
  nodeYear: {
    position: 'absolute',
    zIndex: 2,
    top: '50%',
    left: 0,
    width: _.r(4),
    height: _.r(4),
    marginTop: _.r(-2),
    marginLeft: _.r(-12),
    backgroundColor: _.colorTitle,
    borderRadius: _.r(2),
    transform: [
      {
        translateX: _.r(-2)
      }
    ]
  },
  nodeMonth: {
    position: 'absolute',
    zIndex: 2,
    top: _.r(22),
    left: 0,
    width: _.r(8),
    height: _.r(8),
    marginTop: _.r(-4),
    marginLeft: _.r(-4),
    backgroundColor: _.colorPlain,
    borderWidth: 1,
    borderColor: _.select(_.colorBorder, 'rgb(57, 57, 59)'),
    borderRadius: _.r(4),
    transform: [
      {
        translateX: _.r(-12)
      }
    ]
  },
  block: {
    paddingTop: 4,
    paddingHorizontal: _.md,
    paddingBottom: 10,
    marginBottom: _.md,
    backgroundColor: _.select(_.colorMainLight, _.colorBg),
    borderWidth: 1,
    borderColor: _.select(_.colorMain, 'rgba(254, 138, 149, 0.5)'),
    borderRadius: _.radiusSm,
    overflow: 'hidden'
  }
}))
