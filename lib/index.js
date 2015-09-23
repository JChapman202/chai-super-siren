
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

	utils.addMethod(Assertion.prototype, 'haveProperty', function(propertyName) {
		this.assert(
			this._obj.properties.has(propertyName),
			'expected Siren to have property #{exp}, but actually had #{act}',
			'expected Siren to not have property #{exp}, but it had #{act}',
			propertyName,
			this._obj.properties.keySeq().toJS()
		);
	});

	utils.addMethod(Assertion.prototype, 'haveClass', function(className) {
		this.assert(
			this._obj.classes.contains(className),
			'expected Siren to have class #{exp}, but actually had #{act}',
			'expected Siren to not have class #{exp}, but it had #{act}',
			className,
			this._obj.classes.toJS()
		);
	});

	//todo: need to add multiplicity checks for rels

	utils.addMethod(Assertion.prototype, 'haveLink', function(rel) {
		var rels = this._obj.links.map(function(link) { return link.rels; }).flatten(0);

		this.assert(
			rels.contains(rel),
			'expected Siren to have a link with rel #{exp}, but actually had #{act}',
			'expected Siren not to have a link with rel #{exp}, but it had #{act}',
			rel,
			rels.toJS()
		);
	});

	utils.addMethod(Assertion.prototype, 'haveAction', function(actionName) {
		this.assert(
			this._obj.actions.has(actionName),
			'expected Siren to have action named #{exp}, but actually had #{act} method names',
			'expected Siren not to have action named #{exp}, but it had #{act} method names',
			actionName,
			this._obj.actions.keySeq().toJS()
		);
	});
}));
