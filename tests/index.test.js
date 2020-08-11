const { assert } = require('chai');

/* global assert, setup, suite, test */
require('aframe');
require('../index.js');
var entityFactory = require('./helpers').entityFactory;

suite('gltf-part-reset-from-so component', function () {
  var component;
  var el;
  setup(function (done) {
    el = entityFactory();
    el.addEventListener('componentinitialized', function (evt) {
      if (evt.detail.name !== 'gltf-part-reset-from-so') { return; }
      component = el.components['gltf-part-reset-from-so'];
      done();
    });
    el.setAttribute('gltf-part-reset-from-so', {});
  });

  suite('foo property', function () {
    test('test can run', function () {
      assert.equal(1, 1);
    });
    test('check if only 1 component loaded on element to make sure some rational DOM logic applies', function () {
      console.log(el.attributes.length);
      assert.equal(el.attributes.length, 1);
    });
  });
});
