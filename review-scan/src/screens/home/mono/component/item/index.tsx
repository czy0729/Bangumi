/*
 * @Author: czy0729
 * @Date: 2022-03-15 02:19:41
 * @Last Modified by: czy0729
 * @Last Modified time: 2025-04-13 19:35:38
 */
import React from 'react'
import { InView, ItemPost } from '@_'
import { _ } from '@stores'
import { ob } from '@utils/decorators'
import { useNavigation } from '@utils/hooks'
import { COMPONENT, EVENT, ITEM_HEIGHT } from './ds'
import { memoStyles } from './styles'

function Item({ item, index }) {
  const navigation = useNavigation()
  const styles = memoStyles()
  return (
    <InView y={_.window.height * 1.5 + ITEM_HEIGHT * (index + 1)}>
      <ItemPost
        navigation={navigation}
        contentStyle={styles.contentStyle}
        extraStyle={styles.extraStyle}
        index={index}
        event={EVENT}
        matchLink={false}
        expandNums={2}
        {...item}
      />
    </InView>
  )
}

export default ob(Item, COMPONENT)
