// used as a good practice/reminder for future projects (this one only needs one set of keys)
module.exports = {
    SPACE_ID: process.env.SPACE_ID,
    CONTENTFUL_DELIVERY_API: process.env.CONTENTFUL_DELIVERY_API,
    CONTENTFUL_PREVIEW: process.env.CONTENTFUL_PREVIEW,
    CONTENTFUL_PERSONAL_ACCESS_TOKEN: process.env.CONTENTFUL_PERSONAL_ACCESS_TOKEN,
    GATSBY_MAPBOX_TOKEN: process.env.GATSBY_MAPBOX_TOKEN, // GATSBY_ is used for exposing env variables in the browser, but hiding the api key
}