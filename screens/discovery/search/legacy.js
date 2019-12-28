/*
 * @Author: czy0729
 * @Date: 2019-12-28 13:37:53
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-12-28 13:47:06
 */
import React from 'react'
import PropTypes from 'prop-types'
import { StyleSheet } from 'react-native'
import { Button } from '@components'
import { Popover } from '@screens/_'
import { observer } from '@utils/decorators'
import { MODEL_SEARCH_CAT, MODEL_SEARCH_LEGACY } from '@constants/model'

function Legacy(props, { $ }) {
  const { cat, legacy } = $.state
  if (MODEL_SEARCH_CAT.getLabel(cat) === '人物') {
    return null
  }

  return (
    <Popover
      data={MODEL_SEARCH_LEGACY.data.map(item => item.label)}
      onSelect={$.onLegacySelect}
    >
      <Button style={styles.btn} styleText={styles.text} size='sm'>
        {MODEL_SEARCH_LEGACY.getLabel(legacy)}
      </Button>
    </Popover>
  )
}

Legacy.contextTypes = {
  $: PropTypes.object
}

export default observer(Legacy)

const styles = StyleSheet.create({
  btn: {
    width: 68,
    height: 34,
    paddingRight: 4,
    borderTopLeftRadius: 0,
    borderBottomLeftRadius: 0,
    borderTopRightRadius: 34,
    borderBottomRightRadius: 34
  },
  text: {
    width: 68
  }
})
