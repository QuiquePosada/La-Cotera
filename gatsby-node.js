const path = require('path')
// const { createFilePath } = require('gatsby-source-filesystem')

/**
 * creates the slug for each entry ?
 * @param {*} param0 
 */
// exports.onCreateNode = ({ node, getNode, actions }) => {
//     const { createNodeField } = actions
//     if(node.internal.type === `MarkdownRemark`) {
//         const slug = createFilePath({ node, getNode })
//         console.log("One slug was created!\t",slug)
//         createNodeField({
//             name: `slug`,
//             node,
//             value: slug,
//         })
//     }
// }

// exports.onCreatePage = ({ page, actions }) => {
//     console.log("all info on the page!\t",page.context)
// }

/**
 * creates pages for each slug found
 * @param {*} param0 
 */
exports.createPages = async ({ graphql, actions }) => {
    const { createPage } = actions
    const cowTemplatePath = path.resolve("src/templates/cow-detail.js")
    const result = await graphql(`
        {
            cows: allContentfulVaca {
                edges {
                    node {
                        name
                        node_locale
                        id
                    }
                }
            }
        }
    `)
    
    if (result.errors) {
        result.errors.forEach(element => console.log(`HEY! There was an error with : '${element.toString()}'`))
        return Promise.reject(result.errors)
    }

    result.data.cows.edges.forEach((item) => {
        const locale = item.node.node_locale
        const slug = `/${locale === "es-MX" ? "" : "en/"}cows/${item.node.name.replace(/\s/g, '_').toLowerCase()}/` // removes all white space in name, replaces with '_', then converts item to lowercase as better practice
        // console.log("name for slug :\t",slug)
        createPage({
            path: slug,
            component: cowTemplatePath,
            context: {
                slug, // prevents issues with locale management
                langKey: locale === "es-MX" ? "es" : "en",
                id: item.node.id,
                locale
            }
        })
    })
}