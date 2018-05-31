/**
 * Chigai API.
 * A simple interface for running modern
 * visual regression tests on your favourite testrunner.
 *
 * @returns an async function
 *
 * @example
 *
 * const regression = require("chigai-api");
 * let result;
 * result = await regression(uriStatic);
 * if (result === false) {
 * 	throw new Error("Failed visual regression testing");
 * }
 *
 *
 * @copyright 2017 Martin Krause <github@mkrause.info> (http://martinkr.github.io)
 * @license MIT license: https://opensource.org/licenses/MIT
 *
 * @author Martin Krause <github@mkrause.info>
 */

// imports
const chigaiCore = require("chigai-core");

/**
 * Facade for the visaul regression testing
 * with chigai-core.
 * @async
 * @param {String} uri the location to test
 * @param {Object} options the options, taken from chigai-core. currently "vw", "vh", "threshold", "wait"
 * @return {Boolean} false if the regression failes
 */
const _assert = async (uri, options) => {
	let result;
	try {
		result = await chigaiCore.regression(uri, options);
	} catch (error) {
		throw new Error(error);
	}

	if (Array.isArray(result) && result.length === 1 && result[0].screenshot === true && result[0].match === true) {
		return true;
	}

	// if (Array.isArray(result) && result.length === 1 && result[0].match === false) {
	return false;
	// }
};

/**
 * Facade for the visaul regression testing
 * with chigai-core. Returns true if there is no change,
 * false if the regression tests fails or throws an
 * error if there is an error.
 * @async
 * @param {String} uri the location to test
 * @param {Object} options the options, taken from chigai-core. currently "vw", "vh", "threshold", "wait"
 * @return {Boolean} false if the regression failes
 */
module.exports = async (uri, options = {}) => {
	let result = await _assert(uri, options);
	return result;
};
