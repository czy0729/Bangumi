/*
 * @Author: czy0729
 * @Date: 2020-04-21 10:28:11
 * @Last Modified by: czy0729
 * @Last Modified time: 2020-04-21 10:30:04
 */
import React from 'react'
import { IconTabsHeader, IconTinygrail } from '@screens/_'
import { observer } from '@utils/decorators'
import { t } from '@utils/fetch'

function HeaderRight({ navigation }) {
  return (
    <>
      <IconTinygrail
        navigation={navigation}
        event={{
          id: '首页.跳转'
        }}
      />
      <IconTabsHeader
        name='search'
        position='right'
        onPress={() => {
          t('首页.跳转', {
            to: 'Search'
          })
          navigation.push('Search')
        }}
      />
    </>
  )
}

export default observer(HeaderRight)
