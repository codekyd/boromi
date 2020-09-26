/*
 *  --------------------------------------------------------------------------
 *                             External Dependencies
 *  --------------------------------------------------------------------------
 */
import React from "react";
import PropTypes from "prop-types"
/*
 *  --------------------------------------------------------------------------
 *                             Internal Dependencies
 *  --------------------------------------------------------------------------
 */
import Header from "./Header";
import Footer from "./Footer";

const Layout = ({children}) => {
	return(
		<>
			<Header/>
			<main>
				{children}
			</main>
			<Footer/>
		</>
	)
}
Layout.propTypes = {
	children: PropTypes.array.isRequired
};
export default  Layout;