import chai from 'chai';
import chaiSuperSiren from '../lib/index';

import Siren from 'super-siren';
import Chance from 'chance';
var chance = new Chance();

chai.use(chaiSuperSiren);
var expect = chai.expect;

describe('Assertions', () => {
	describe('Class assertions', () => {
		describe('Given that a Siren instance has a class', () => {
			var cls = chance.string();
			var siren;

			beforeEach(() => {
				siren = Siren.empty.updateIn(['classes'], classes => classes.add(cls));
			});

			it('Should pass when asserting that the siren instance has that class', () => {
				expect(siren).to.haveClass(cls);
			});

			it('Should fail when asserting that the siren instance does not have that class', () => {
				expect(() => expect(siren).to.not.haveClass(cls)).to.throw;
			});
		});
	});

	describe('Link assertions', () => {
		describe('Given that a Siren instance has a link with a rel', () => {
			var rel = chance.string();
			var siren;

			beforeEach(() => {
				siren = Siren.empty.updateIn(['links'], links => links.add(new Siren.Link([rel], chance.url())));
			});

			it('Should pass when asserting that the siren instance has a link with that rel', () => {
				expect(siren).to.haveLink(rel);
			});

			it('Should not pass when asserting that the siren instance does not have a link with that rel', () => {
				expect(() => expect(siren).to.not.haveLink(rel)).to.throw;
			});
		});
	});

	describe('Action assertions', () => {
		describe('Given that a Siren instance has an action with a name', () => {
			var name = chance.string();
			var siren;

			beforeEach(() => {
				siren = Siren.empty.updateIn(['actions'], actions => actions.set(name, new Siren.Action({name: name})));
			});

			it('Should pass when asserting that the siren instance has an action with that name', () => {
				expect(siren).to.haveAction(name);
			});

			it('Should not pass when asserting that the siren instance does not have an action with that name', () => {
				expect(() => expect(siren).to.haveAction(name)).to.throw;
			});
		});
	});
});
