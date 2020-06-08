/*
 * @Author: czy0729
 * @Date: 2019-12-28 13:37:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-05-13 18:35:46
 */
import React from 'react'
import PropTypes from 'prop-types'
import { Button } from '@components'
import { Popover } from '@screens/_'
import { _ } from '@stores'
import { observer } from '@utils/decorators'
import { MODEL_SEARCH_CAT, MODEL_SEARCH_LEGACY } from '@constants/model'

const data = MODEL_SEARCH_LEGACY.data.map(item => item.label)

function Legacy(props, { $ }) {
  const { cat, legacy } = $.state
  if (MODEL_SEARCH_CAT.getLabel(cat) === '人物') {
    return null
  }

  const styles = memoStyles()
  return (
    <Popover data={data} onSelect={$.onLegacySelect}>
      <Button
        style={styles.btn}
        styleText={styles.text}
        type='ghostPlain'
        size='sm'
      >
        {MODEL_SEARCH_LEGACY.getLabel(legacy)}
      </Button>
    </Popover>
  )
}

Legacy.contextTypes = {
  $: PropTypes.object
}

export default observer(Legacy)

const memoStyles = _.memoStyles(_ => ({
  btn: {
    width: 68,
    height: 34,
    paddingRight: 4,
    borderWidth: _.select(_.hairlineWidth, 0),
    borderLeftWidth: 0,
    borderColor: _.colorBorder,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 34,
    borderBottomRightRadius: 34
  },
  text: {
    width: 68
  }
}))
