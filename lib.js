const request 					= require('request-promise');
const GET 						= 'GET';
const WORD_NIK_API_KEY			= 'a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5';
const BASE_URL					= 'http://api.wordnik.com:80/v4/';

var makeRequest	= function (strUrl) {
	var objOptions		= new Object();
	objOptions.uri		= strUrl;
	objOptions.method	= GET;
	objOptions.json		= true;

	return request(objOptions);
}
