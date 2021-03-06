/*
 * @Author: czy0729
 * @Date: 2019-12-28 13:37:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-05 01:54:50
 */
import React from 'react'
import { Button, Heatmap } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SEARCH_CAT, MODEL_SEARCH_LEGACY } from '@constants/model'

const data = MODEL_SEARCH_LEGACY.data.map(item => item.label)

function Legacy(props, { $ }) {
  const { cat, legacy } = $.state
  if (['人物', '用户'].includes(MODEL_SEARCH_CAT.getLabel(cat))) {
    return null
  }

  const styles = memoStyles()
  return (
    <Popover style={styles.touch} data={data} onSelect={$.onLegacySelect}>
      <Button
        style={styles.btn}
        styleText={styles.text}
        type='ghostPlain'
        size='sm'
      >
        {MODEL_SEARCH_LEGACY.getLabel(legacy)}
      </Button>
      <Heatmap id='搜索.切换细分类型' />
    </Popover>
  )
}

export default obc(Legacy)

const memoStyles = _.memoStyles(_ => ({
  touch: {
    borderTopRightRadius: 34 * _.ratio,
    borderBottomRightRadius: 34 * _.ratio,
    overflow: 'hidden'
  },
  btn: {
    width: 68 * _.ratio,
    height: 34 * _.ratio,
    paddingRight: 4 * _.ratio,
    borderWidth: _.select(_.hairlineWidth, 0),
    borderLeftWidth: 0,
    borderColor: _.colorBorder,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 34 * _.ratio,
    borderBottomRightRadius: 34 * _.ratio
  },
  text: {
    width: 68 * _.ratio
  }
}))
