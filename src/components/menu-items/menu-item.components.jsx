import React from "react"
import { Link } from "react-router-dom"
import './menu-item.styles.scss'
const MenuItem = (props) => {

    return (
        <div className={`${props.size} menu-item`}>

            <div
                className='background-image'
                style={{ backgroundImage: `url(${props.imageUrl})` }}
            />

            <div className="content">
                <h1 className="title">
                    <Link to={props.linkUrl}>
                        {props.title.toUpperCase()}
                    </Link>
                </h1>
                <span className="subtitle">SHOP NOW</span>
            </div>

        </div>

    )
}

export default MenuItem