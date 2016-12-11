const request 					= require('request-promise');
const GET 						= 'GET';
const WORD_NIK_API_KEY			= 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
const BASE_URL					= 'http://api.wordnik.com:80/v4/';


/**
 * makes http request to provided utl
 * @param {String} strUrl Url of the endpoint
 * @return {Object} response object
 */
var makeRequest	= function (strUrl) {
	var objOptions		= new Object();
	objOptions.uri		= strUrl;
	objOptions.method	= GET;
	objOptions.json		= true;

	return request(objOptions);
}

/**
 * genrates and encodes url from query options
 * @param {String} strSubUrl suburl of the functionality
 * @param {Object} objOptions query options
 * @return {String} the encode url
 */
var generateUrl	= function (strSubUrl, objOptions) {
	var arrFields;

	if(!objOptions){
		objOptions	= new Object()
	}
	objOptions.api_key = WORD_NIK_API_KEY;
	arrFields	= Object.keys(objOptions);
	arrFields.forEach(function (strField, index) {
		if(index == 0){
			strSubUrl += '?'+ strField + '=' + objOptions[strField];
		}
		else {
			strSubUrl += '&'+ strField + '=' + objOptions[strField];
		}
	})
	return BASE_URL + encodeURI(strSubUrl)
}

exports.generateUrl	= generateUrl;
exports.makeRequest	= makeRequest;
