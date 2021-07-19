import React, { useState } from 'react'
import { Link } from 'gatsby'
import Grid from '@material-ui/core/Grid'
import { GatsbyImage } from 'gatsby-plugin-image'
import ReactPaginate from 'react-paginate'
import './styles/gridContainer.css'

/**
 * This is a component used for reusability when displaying cows
 * Receives data from each cow to display and arranges data in a grid of 3 cols, paginates on a given # of cows per page
 * @data {*} data to display and paginate 
 * @requiresPagination {*} boolean value for paginating data
 * @itemsPerPage {*} total items per pagination page
 * @returns a container for data of cows
 */
const CowContainer = ({ data, langSlug="/", requiresPagination, itemsPerPage=18 }) => {
    const [currentPage, setCurrentPage] = useState(0)
    const totalPages = Math.ceil(data.length / itemsPerPage)
    const offset = currentPage * itemsPerPage
    const currentPageData = data.slice(offset,offset+itemsPerPage)
    const handlePageClick = ({ selected: selectedPage }) => {
        setCurrentPage(selectedPage)
        // document.getElementById("startingPoint").scrollIntoView({behavior: 'smooth'})
        window.scrollTo(0,200)
    }

    return(
        <div id="startingPoint" style={{ padding: 20 }}>
            {
                requiresPagination ?
                    <div>
                        <Grid container spacing={5}>
                            {currentPageData.map((cow) => (
                                <Grid item xs={12} sm={6} md={4}>
                                    {/* <GatsbyImage image={cow.src} alt={cow.alt} style={{ borderRadius: '5px'}} imgStyle={{ borderRadius: '5px'}} /> */}
                                    {/* <GatsbyImage image={cow.node.image.gatsbyImageData} alt={cow.alt} style={{ borderRadius: '5px'}} imgStyle={{ borderRadius: '5px'}} /> */}
                                    <Link className="link" to={`${langSlug}${cow.node.name.replace(/\s/g, '_').toLowerCase()}/`}>
                                        <GatsbyImage image={cow.node.image.gatsbyImageData} alt={cow.node.name} imgStyle={{ borderRadius: '5px'}} />
                                        <div>
                                            <h6 style={{ margin: 0, color: '#A6635D', fontFamily: 'Montserrat' }}>{cow.node.sire}</h6>
                                            <h5 style={{ margin: 0, fontFamily: 'Montserrat', color: '#403E3D', fontSize: '1.5em' }}>{cow.node.name}</h5>
                                        </div>
                                    </Link>
                                </Grid>
                            ))}
                        </Grid>
                         {
                            data.length > itemsPerPage ?
                                <ReactPaginate
                                    previousLabel="←" nextLabel="→"
                                    pageCount={totalPages}
                                    onPageChange={handlePageClick}
                                    containerClassName="pagination"
                                    previousLinkClassName="pagination__link"
                                    nextLinkClassName="pagination__link"
                                    disabledClassName="pagination__link__disabled"
                                    activeClassName="pagination__link__active"
                                />
                            :
                                null
                        }
                    </div>
                :
                    <Grid container spacing={5}>
                        {data.map((cow) => (
                            <Grid item xs={12} sm={6} md={4}>
                                {/* <GatsbyImage image={cow.src} alt={cow.alt} style={{ borderRadius: '5px'}} imgStyle={{ borderRadius: '5px'}} /> */}
                                {/* <StaticImage src="../images/cows.jpg" alt={cow.alt} style={{ borderRadius: '5px'}} imgStyle={{ borderRadius: '5px'}} /> */}
                                <Link className="link" to={`${langSlug}/${cow.node.name.replace(/\s/g, '_').toLowerCase()}/`}>
                                    <GatsbyImage image={cow.node.image.gatsbyImageData} alt={cow.node.name} imgStyle={{ borderRadius: '5px'}} />
                                    <div>
                                        <h6 style={{ margin: 0, color: '#A6635D', fontFamily: 'Montserrat' }}>{cow.node.sire}</h6>
                                        <h5 style={{ margin: 0, fontFamily: 'Montserrat', color: '#403E3D', fontSize: '1.5em' }}>{cow.node.name}</h5>
                                    </div>
                                </Link>
                            </Grid>
                        ))}
                    </Grid>
            }
        </div>
    )

}

// CowContainer.defaultProps = {
//     initialValues: {
//         pagination: false,
//     }
// }

export default CowContainer