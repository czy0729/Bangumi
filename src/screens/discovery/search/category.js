/*
 * @Author: czy0729
 * @Date: 2019-05-16 01:46:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2021-07-05 01:54:04
 */
import React from 'react'
import { Button, Heatmap } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { MODEL_SEARCH_CAT } from '@constants/model'

const data = MODEL_SEARCH_CAT.data.map(item => item.label)

function Category(props, { $ }) {
  const { cat } = $.state
  return (
    <Popover style={styles.touch} data={data} onSelect={$.onSelect}>
      <Button
        style={styles.btn}
        styleText={styles.text}
        size='sm'
        type='ghostMain'
      >
        {MODEL_SEARCH_CAT.getLabel(cat)}
      </Button>
      <Heatmap id='搜索.切换类型' />
    </Popover>
  )
}

export default obc(Category)

const styles = _.create({
  touch: {
    borderTopLeftRadius: 34 * _.ratio,
    borderBottomLeftRadius: 34 * _.ratio,
    overflow: 'hidden'
  },
  btn: {
    width: 68 * _.ratio,
    height: 34 * _.ratio,
    paddingLeft: 4 * _.ratio,
    borderTopRightRadius: 0,
    borderBottomRightRadius: 0,
    borderTopLeftRadius: 34 * _.ratio,
    borderBottomLeftRadius: 34 * _.ratio
  },
  text: {
    width: 68 * _.ratio
  }
})
