/*
 * @Author: czy0729
 * @Date: 2022-07-09 16:33:47
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-12-18 21:46:26
 */
import { _ } from '@stores'

const LABEL_WIDTH = _.r(48)
const INPUT_WIDTH = _.r(120)

export const memoStyles = _.memoStyles(() => ({
  container: {
    height: _.r(120),
    paddingHorizontal: _.wind,
    marginTop: _.lg
  },
  label: {
    width: LABEL_WIDTH
  },
  input: {
    width: INPUT_WIDTH,
    height: _.device(34, 48),
    marginLeft: _.sm
  },
  inputRaw: {
    height: _.r(34),
    paddingVertical: 0,
    paddingHorizontal: _.sm + 2,
    color: _.colorSub,
    fontWeight: '800',
    ..._.device(_.fontSize13, _.fontSize15)
  },
  total: {
    position: 'absolute',
    zIndex: 100,
    top: _.device(8, 10),
    right: _.r(12)
  },
  btn: {
    width: _.r(56),
    height: _.device(32, 48)
  },
  btnPlus: {
    marginLeft: _.sm,
    width: _.r(40),
    height: _.device(34, 48)
  },
  btnText: _.device(_.fontSize13, _.fontSize18),
  progressWrap: {
    width: INPUT_WIDTH,
    marginBottom: 4
  },
  progress: {
    backgroundColor: 'transparent',
    borderRadius: 4
  },
  bar: {
    backgroundColor: 'transparent',
    borderBottomColor: _.colorPrimary,
    borderBottomWidth: 4,
    borderRadius: 4
  }
}))
