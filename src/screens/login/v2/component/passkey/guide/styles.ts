/*
 * @Date: 2026-11-01
 *
 * 与主题设置一致的 info 入口及三图占位布局
 */
import { _ } from '@stores'

export const memoStyles = _.memoStyles(() => ({
  icon: {
    paddingHorizontal: _.sm
  },
  images: {
    marginTop: _.md,
    marginBottom: _.sm
  },
  slot: {
    flex: 1,
    aspectRatio: 9 / 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
    borderColor: _.colorBorder,
    borderRadius: _.radiusSm,
    backgroundColor: _.select(_.colorBg, _.colorPlain)
  },
  gap: {
    marginRight: _.sm
  }
}))
