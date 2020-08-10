/* global assert, setup, suite, test */
require('aframe');
require('../index.js');
var entityFactory = require('./helpers').entityFactory;

suite('part-center component', function () {
  var component;
  var el;
  console.log('this is happening *****');
  setup(function (done) {
    el = entityFactory();
    el.addEventListener('componentinitialized', function (evt) {
      if (evt.detail.name !== 'part-center') { return; }
      component = el.components['part-center'];
      done();
    });
    el.setAttribute('part-center', {});
  });

  suite('foo property', function () {
    test('is good', function () {
      assert.equal(1, 1);
    });
  });
});
