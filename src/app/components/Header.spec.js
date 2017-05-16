import React from 'react';
import TestUtils from 'react-addons-test-utils';
import Header from './Header';
import DogbarkTextInput from './DogbarkTextInput';

function setup() {
  const props = {
    addDogbark: jasmine.createSpy()
  };

  const renderer = TestUtils.createRenderer();
  renderer.render(<Header {...props}/>);
  const output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('components', () => {
  describe('Header', () => {
    it('should render correctly', () => {
      const {output} = setup();

      expect(output.type).toBe('header');
      expect(output.props.className).toBe('header');

      const [h1, input] = output.props.children;

      expect(h1.type).toBe('h1');
      expect(h1.props.children).toBe('dogbarks');

      expect(input.type).toBe(DogbarkTextInput);
      expect(input.props.newDogbark).toBe(true);
      expect(input.props.placeholder).toBe('What needs to be done?');
    });

    it('should call addDogbark if length of text is greater than 0', () => {
      const {output, props} = setup();
      const input = output.props.children[1];
      input.props.onSave('');
      expect(props.addDogbark.calls.count()).toBe(0);
      input.props.onSave('Use Redux');
      expect(props.addDogbark.calls.count()).toBe(1);
    });
  });
});
