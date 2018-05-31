/**
 * Specs for chigai's test api
 *
 * @example
 *
 * const regression = require("chigai-api");
 * let result;
 * result = await regression(uriStatic);
 * if (result === false) {
 * 	throw new Error()
 * }
 *
 * @example
 *
 *
 * @copyright 2017 Martin Krause <github@mkrause.info> (http://martinkr.github.io)
 * @license MIT license: https://opensource.org/licenses/MIT
 *
 * @author Martin Krause <github@mkrause.info>
 */

/* eslint-env mocha */

const path = require("path");
const fs = require("fs-extra-plus");
const proxyquire = require("proxyquire");

const thisModulePath = "main";
const thisModule = require("./../../app/" + thisModulePath);

const port = 3000;
const server = require("chigai-mock-server");
let testServer;

const uriDynamic = `http://localhost:${port}/random`;
const uriStatic = `http://localhost:${port}/static`;


describe(`The module \"chigai-api\"`, () => {

	after(() => {
		// await fs.emptyDir(path.join("./", "screenshots"));
	});

	afterEach((done) => {
		testServer.close();
		done();
	});

	beforeEach(async () => {
		try {
			await fs.emptyDir(path.join("./", "screenshots"));
		} catch (error) {
			throw new Error(error);
		}
		testServer = server.listen(port);
	});

	describe("should provide an API for regression testing. It:", () => {

		it("should throw if theres no argument for uri", (async () => {
			try {
				await thisModule(null);
			} catch (error) {
				error.should.be.an.instanceof(Error);
				return true;
			}
			throw new Error("should throw");
		}));

		it("should return \"true\" if there's only an uri and no options", (async () => {
			let result;
			result = await thisModule(uriStatic);
			result.should.be.ok;
		}));

		it("should return \"true\" if there's an uri and options", (async () => {
			let result;
			result = await thisModule(uriStatic, {
				"threshold": 0.01
			});
			result.should.be.ok;
		}));

		it("should return \"true\" if there's no reference item", (async () => {
			let result;
			result = await thisModule(uriStatic, {
				"threshold": 0.01
			});
			result.should.be.ok;
		}));

		it("should return \"true\" if the regression item is the same as the reference item", (async () => {
			let result;
			result = await thisModule(uriStatic, {
				"path": "../myscreenshots"
			});
			result = await thisModule(uriStatic, {
				"path": "../myscreenshots"
			});
			result.should.be.ok;
		}));

		it("should return \"false\" if the regression item is not the same as the reference item", (async () => {
			let result;
			result = await thisModule(uriDynamic);
			// lower threshold for random mock
			result = await thisModule(uriDynamic, {
				"threshold": 0.01
			});
			result.should.not.be.ok;
		}));


	});

	describe("should call the \"core\"-package ", () => {

		let thisModuleProxied;
		// create stubs for spying on them
		let stubModule = {
			"regression": (uri, options) => new Promise((resolve, reject) => {
				resolve(true);
			}),
			"reference": (uri, options) => new Promise((resolve, reject) => {
				resolve(true);
			})
		};

		let spyCoreRegression = sinon.spy(stubModule, "regression");
		let spyCoreReference = sinon.spy(stubModule, "reference");

		before(() => {


			// mock dependencies
			thisModuleProxied = proxyquire("./../../app/" + thisModulePath, {
				"chigai-core": {
					"regression": spyCoreRegression,
					"reference": spyCoreReference
				}
			});
		});

		beforeEach(() => {
			spyCoreRegression.resetHistory();
			spyCoreReference.resetHistory();
		});

		it("should pass the URI as the first parameters", (async () => {
			let result;
			result = await thisModuleProxied(uriDynamic);
			spyCoreRegression.should.have.been.calledWith("http://localhost:3000/random", {})
		}));

		it("should pass the URI as the first, and the \"vw\" as \"vw\"-property in the object as the second parameter", (async () => {
			let result;
			result = await thisModuleProxied(uriDynamic, {
				"vw": 500
			});
			spyCoreRegression.should.have.been.calledWith("http://localhost:3000/random", {
				"vw": 500
			})
		}));

		it("should pass the URI as the first, and the \"vh\" as \"vh\"-property in the object as the second parameter", (async () => {
			let result;
			result = await thisModuleProxied(uriDynamic, {
				"vh": 500
			});
			spyCoreRegression.should.have.been.calledWith("http://localhost:3000/random", {
				"vh": 500
			})
		}));

		it("should pass the URI as the first, and the \"wait\" as \"wait\"-property in the object as the second parameter", (async () => {
			let result;
			result = await thisModuleProxied(uriDynamic, {
				"wait": 500
			});
			spyCoreRegression.should.have.been.calledWith("http://localhost:3000/random", {
				"wait": 500
			})
		}));

		it("should pass the URI as the first, and the \"wait\" as \"wait\"-property in the object as the second parameter", (async () => {
			let result;
			result = await thisModuleProxied(uriDynamic, {
				"wait": 500
			});
			spyCoreRegression.should.have.been.calledWith("http://localhost:3000/random", {
				"wait": 500
			})
		}));

		it("should pass the URI as the first, and the \"threshold\" as \"threshold\"-property in the object as the second parameter", (async () => {
			let result;
			result = await thisModuleProxied(uriDynamic, {
				"threshold": 500
			});
			spyCoreRegression.should.have.been.calledWith("http://localhost:3000/random", {
				"threshold": 500
			})
		}));

	});


});
