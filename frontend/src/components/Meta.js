import { Helmet } from 'react-helmet'

import React from 'react'

const Meta = ({ title, description, keywords }) => {
    return (
        <div>
            <Helmet>
            <title>{title}</title>
            <meta name='description' content={description}/>
            <meta name='keywords' content={keywords}/>
            </Helmet>
        </div>
    )
}

Meta.defaultProps = {
    title: 'EShop',
    description: 'Your Favorite Electronic Store',
    keywords: 'electronics'
}

export default Meta


