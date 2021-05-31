import './collection-overview.styles.scss'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import CollectionPreview from '../preview-collection-component/preview-collection-component'
import { selectCollectionsForPreview } from '../../redux/shop/shop.selectors'

const CollectionOverview = ({ collections }) => (
    <div className='collection-overview'>
        {
            collections.map(({ id, ...otherCollectionProps }) => {
                return <CollectionPreview key={id} {...otherCollectionProps} />

            })
        }
    </div>
)

const mapStateToProps = createStructuredSelector({
    collections: selectCollectionsForPreview
})

export default connect(mapStateToProps)(CollectionOverview)
