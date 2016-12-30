const chai            		= require('chai');
const expect          		= require('chai').expect;
var lib						= require('./lib');

describe('Testing generate url function', function () {
	it('1. should generate url with query fields', function (done) {
		var strSubUrl	= 'word.json/happy/relatedWords';
		var objQuery	= new Object();
		objQuery.relationshipTypes	= 'antonym';
		objQuery.limitPerRelationshipType = 10;

		var strUrl = lib.generateUrl(strSubUrl, objQuery);
		expect(strUrl).to.equal('http://api.wordnik.com:80/v4/word.json/happy/relatedWords?relationshipTypes=antonym&limitPerRelationshipType=10&api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5');
		done()
	});

	it('2. should generate url without query fields', function (done) {
		var strSubUrl	= 'word.json/happy/relatedWords';

		var strUrl = lib.generateUrl(strSubUrl);
		expect(strUrl).to.equal('http://api.wordnik.com:80/v4/word.json/happy/relatedWords?api_key=a2a73e7b926c924fad7001ca3111acd55af2ffabf50eb4ae5');
		done();
	});

});

describe('Testing makeRequest function', function () {
	this.timeout(10000);

	it('1. should make request and get response', function (done) {
		var strSubUrl	= 'word.json/happy/relatedWords';
		var objQuery	= new Object();
		objQuery.relationshipTypes	= 'antonym';
		objQuery.limitPerRelationshipType = 10;

		var strUrl = lib.generateUrl(strSubUrl, objQuery);
		lib.makeRequest(strUrl).then(function (objResponse) {
			expect(objResponse[0].words).to.include.members([ 'unhappy', 'sad' ]);
			done();
		})
	});

});

describe('Testing getSynonyms function', function () {
	this.timeout(10000);

	it('1. should make request and get response', function (done) {

		lib.getSynonyms('happy').then(function (arrSynonyms) {
			expect(arrSynonyms).to.include.members([
											      "lucky",
											      "fortunate",
											      "successful",
											      "prosperous",
											      "contented",
											      "joyous",
											      "dexterous",
											      "ready",
											      "apt",
											      "felicitous"
											    ]);
			done();
		})
	});

});

describe('Testing getAntonyms function', function () {
	this.timeout(10000);

	it('1. should make request and get response', function (done) {

		lib.getAntonyms('happy').then(function (arrAntonyms) {
			expect(arrAntonyms).to.include.members([ 'unhappy', 'sad' ]);
			done();
		})
	});

});


describe('Testing getDefinition function', function () {
	this.timeout(10000);

	it('1. should make request and get response', function (done) {

		lib.getDefinitions('happy').then(function (arrDefinitions) {
			expect(arrDefinitions).to.have.length.of.at.least(1);
			done();
		})
	});

});

describe('Testing getExamples function', function () {
	this.timeout(10000);

	it('1. should make request and get response', function (done) {

		lib.getExamples('happy').then(function (arrExamples) {
			expect(arrExamples).to.have.length.of.at.least(1);
			done();
		})
	});

});
