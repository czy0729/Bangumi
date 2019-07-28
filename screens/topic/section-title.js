/*
 * @Author: czy0729
 * @Date: 2019-07-28 02:00:26
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-07-28 02:03:56
 */
import React from 'react'
import { StyleSheet } from 'react-native'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Text } from '@components'
import {
  SectionTitle as CompSectionTitle,
  IconTouchable,
  IconReverse
} from '@screens/_'
import _ from '@styles'

const SectionTitle = (props, { $ }) => {
  const { _list = [], _reverse } = $.comments
  const { filterMe } = $.state
  return (
    <CompSectionTitle
      style={[styles.title, _.mt.lg, _.mb.md]}
      right={
        <>
          {!!$.myUserId && (
            <IconTouchable
              name='me'
              color={filterMe ? _.colorMain : _.colorIcon}
              onPress={$.toggleFilterMe}
            />
          )}
          <IconReverse
            style={styles.sort}
            color={_reverse ? _.colorMain : _.colorIcon}
            onPress={$.toggleReverseComments}
          />
        </>
      }
    >
      吐槽箱{' '}
      {_list.length != 0 && (
        <Text size={12} type='sub' lineHeight={24}>
          ({_list.length}
          {_list.length == 100 && '+'})
        </Text>
      )}
    </CompSectionTitle>
  )
}

SectionTitle.contextTypes = {
  $: PropTypes.object
}

export default observer(SectionTitle)

const styles = StyleSheet.create({
  title: {
    paddingHorizontal: _.wind
  },
  sort: {
    marginRight: -_.sm
  }
})
