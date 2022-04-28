/*
 * @Author: czy0729
 * @Date: 2020-06-02 22:05:46
 * @Last Modified by: czy0729
 * @Last Modified time: 2022-04-28 18:06:58
 */
import React from 'react'
import { Heatmap } from '@components'
import { LogoHeader, IconTabsHeader } from '@_'
import { _ } from '@stores'
import { obc } from '@utils/decorators'
import { t } from '@utils/fetch'
import { info } from '@utils/ui'
import i18n from '@constants/i18n'

function Header(props, { $, navigation }) {
  return (
    <LogoHeader
      right={
        <IconTabsHeader
          style={styles.icon}
          name='md-add'
          onPress={() => {
            if (!$.isWebLogin) {
              info(`请先${i18n.login()}`)
              return
            }

            t('时间胶囊.新吐槽')

            navigation.push('Say', {
              onNavigationCallback: $.fetchTimeline
            })
          }}
        >
          <Heatmap id='时间胶囊.新吐槽' />
        </IconTabsHeader>
      }
    />
  )
}

export default obc(Header)

const styles = _.create({
  icon: {
    marginRight: _.xs,
    marginBottom: 0,
    borderRadius: 40,
    overflow: 'hidden'
  }
})
