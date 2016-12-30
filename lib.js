const Promise					= require('bluebird');
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

var extractText	= function (objData) {
	return objData.text;
}

/**
* finds synonyms of a given word
* @param {String} strWord The word
* @return {Array} array of synonyms
*/

exports.getSynonyms = function (strWord) {
	var strSubUrl	= 'word.json/' + strWord + '/relatedWords';
	var objQuery	= new Object();
	var strUrl;
	objQuery.relationshipTypes			= 'synonym';
	objQuery.limitPerRelationshipType 	= 10;
	strUrl	= generateUrl(strSubUrl, objQuery);
	return makeRequest(strUrl).then(function (objResponse) {
		return objResponse[0].words;
	})
};

/**
* finds antonym of a given word
* @param {String} strWord The word
* @return {Array} array of synonyms
*/

exports.getAntonyms = function (strWord) {
 	var strSubUrl	= 'word.json/' + strWord + '/relatedWords';
 	var objQuery	= new Object();
 	var strUrl;
 	objQuery.relationshipTypes			= 'antonym';
 	objQuery.limitPerRelationshipType 	= 10;
 	strUrl	= generateUrl(strSubUrl, objQuery);
 	return makeRequest(strUrl).then(function (objResponse) {
 		return objResponse[0].words;
 	});
};

/**
* finds definition of a given word
* @param {String} strWord The word
* @return {Array} array of synonyms
*/

exports.getDefinitions = function (strWord) {
	var strSubUrl	= 'word.json/' + strWord + '/definitions';
	var objQuery	= new Object();
	var strUrl;
	objQuery.limit			= 10;
	strUrl	= generateUrl(strSubUrl, objQuery);
	return makeRequest(strUrl).then(function (objResponse) {
		return objResponse.map(extractText)
	});
};

/**
* find examples for a given word
* @param {String} strWord The word
* @return {Array} array of synonyms
*/

exports.getExamples = function (strWord) {
	var strSubUrl	= 'word.json/' + strWord + '/examples';
	var objQuery	= new Object();
	var strUrl;
	objQuery.limit			= 10;
	strUrl	= generateUrl(strSubUrl, objQuery);
	return makeRequest(strUrl).then(function (objResponse) {
		return objResponse.examples.map(extractText)
	});
};

/**
* finds word of the day
* @param {String} strWord The word
* @return {Array} array of synonyms
*/

exports.getDateofTheDay = function () {
	var self		= this;
	var strSubUrl	= 'words.json/wordOfTheDay';
	var objQuery	= new Object();
	var strUrl;
	objQuery.limit			= 10;
	strUrl	= generateUrl(strSubUrl, objQuery);
	return makeRequest(strUrl)
		.then(self.populateDateOfTheDay);
};

exports.populateDateOfTheDay	= function (objData) {
	var self			= this;
	var prmGetSynonyms	= self.getSynonyms(objData.word);
	var prmGetAntonyms	= self.getAntonyms(objData.word);

	return Promise.all([prmGetSynonyms, prmGetAntonyms])
		.then(function (arrData) {
			var objResult		= new Object();
			objResult.word		= objData.word;
			objResult.note 		= objData.note;
			objResult.examples	= objData.examples.map(extractText);
			objResult.synonyms	= arrData[0];
			objResult.antonyms	= arrData[1];
			return objResult;
		})

}
this.getDateofTheDay().then(console.log);
exports.generateUrl	= generateUrl;
exports.makeRequest	= makeRequest;
