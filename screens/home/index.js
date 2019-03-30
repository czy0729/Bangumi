/*
 * @Author: czy0729
 * @Date: 2019-03-13 08:34:37
 * @Last Modified by: czy0729
 * @Last Modified time: 2019-03-27 23:37:48
 */
import React from 'react'
import PropTypes from 'prop-types'
import { observer } from 'mobx-react'
import { Loading } from '@components'
import inject from '@utils/inject'
import { ManageModal } from '@screens/_'
import Login from './login'
import List from './list'
import Store from './store'

class Home extends React.Component {
  static navigationOptions = {
    header: null
  }

  static contextTypes = {
    $: PropTypes.object
  }

  componentDidMount() {
    const { $ } = this.context
    $.mounted()
  }

  render() {
    const { $ } = this.context
    if (!$.isLogin) {
      return <Login />
    }

    const { loading } = $.state.index
    if (loading) {
      return <Loading />
    }

    const { visible, subjectId } = $.state.index
    const { name, name_cn: nameCn } = $.subject(subjectId)
    return (
      <>
        <List />
        <ManageModal
          visible={visible}
          subjectId={subjectId}
          title={nameCn}
          desc={name}
          onSubmit={$.doUpdateCollection}
          onClose={$.closeManageModal}
        />
      </>
    )
  }
}

export default inject(Store)(observer(Home))
