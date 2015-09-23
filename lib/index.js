
//TODO: consider just using babel/modules by default and then using browserify for browser/UMD version

(function(plugin){
	if (typeof require === 'function'
		&& typeof exports === 'object'
		&& typeof module === 'object') {
		module.exports = plugin;
	} else if (typeof define === 'function' && define.amd) {
		define(function () {
			return plugin;
		});
	} else {
		/*eslint-disable no-undef */
		chai.use(plugin);
	}
}(function(chai, utils){
	var Assertion = chai.Assertion;

	utils.addMethod(Assertion.prototype, 'haveClass', function(value) {
		this.assert(
			this._obj.classes.contains(value),
			'expected Siren classes ' + this._obj.classes.toString() + ' to contain class "' + value + '"',
			'expected Siren classes ' + this._obj.classes.toString() + ' not to contain class "' + value + '"'
		);
	});

	//todo: need to add multiplicity checks for rels

	utils.addMethod(Assertion.prototype, 'haveLink', function(rel) {
		var rels = this._obj.links.map(function(link) { return link.rels; }).flatten(0);

		this.assert(
			rels.contains(rel),
			'expected Siren link rels ' + rels.toString() + ' to contain rel "' + rel + '"',
			'expected Siren link rels ' + rels.toString() + ' not to contain rel "' + rel + '"'
		);
	});

	utils.addMethod(Assertion.prototype, 'haveAction', function(actionName) {
		this.assert(
			this._obj.actions.has(actionName),
			'expected Siren action names ' + this._obj.actions.keys.toString() + ' to contain name "' + actionName + '"',
			'expected Siren action names ' + this._obj.actions.keys.toString() + ' not to contain name "' + actionName + '"'
		);
	});
}));
