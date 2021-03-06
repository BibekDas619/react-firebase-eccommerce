import React from 'react'
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import CollectionOverviewContainer from '../../components/collections-overview/collections-overview.container'
import CollectionPageContainer from '../Collection/collection.container'
import { createStructuredSelector } from 'reselect'
import { selectIsCollectionFetching, selectIsCollectionLoaded } from '../../redux/shop/shop.selectors'


import { fetchCollectionsStart } from '../../redux/shop/shop.actions'


class ShopPage extends React.Component {


  componentDidMount() {
    const { fetchCollectionsStart } = this.props
    fetchCollectionsStart()
  }


  render() {
    const { match } = this.props
    return (
      <div className='shop-page'>
        <Route exact path={`${match.path}`} component={CollectionOverviewContainer} />
        <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
      </div>
    )
  }

}



const mapDispatchToProps = dispatch => ({
  fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})


export default connect(null, mapDispatchToProps)(ShopPage)
