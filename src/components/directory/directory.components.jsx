import React, { useState } from "react"
import { createStructuredSelector } from 'reselect'
import { selectDirectorySections } from '../../redux/directory/directory.selectors'
import './directory.styles.scss';
import MenuItem from "../menu-items/menu-item.components"
import directoryReducer from '../../redux/directory/directory.reducer'
import { connect } from 'react-redux'
const Directory = ({ sections }) => {

  return (
    <div className="directory-menu">
      {sections.map((item) => {
        return <MenuItem key={item.id} title={item.title} imageUrl={item.imageUrl} size={item.size} linkUrl={item.linkUrl} />
      })}
    </div>
  )
}


const mapStateToProps = createStructuredSelector({
  sections: selectDirectorySections
})

export default connect(mapStateToProps)(Directory)