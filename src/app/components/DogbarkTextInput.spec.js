import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DogbarkTextInput from './DogbarkTextInput';

function setup(propOverrides) {
  const props = Object.assign({
    onSave: jasmine.createSpy(),
    text: 'Use Redux',
    placeholder: 'What needs to be done?',
    editing: false,
    newDogbark: false
  }, propOverrides);

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <DogbarkTextInput {...props}/>
  );

  let output = renderer.getRenderOutput();

  output = renderer.getRenderOutput();

  return {
    props,
    output,
    renderer
  };
}

describe('components', () => {
  describe('DogbarkTextInput', () => {
    it('should render correctly', () => {
      const {output} = setup();
      expect(output.props.placeholder).toEqual('What needs to be done?');
      expect(output.props.value).toEqual('Use Redux');
      expect(output.props.className).toEqual('');
    });

    it('should render correctly when editing=true', () => {
      const {output} = setup({editing: true});
      expect(output.props.className).toEqual('edit');
    });

    it('should render correctly when newDogbark=true', () => {
      const {output} = setup({newDogbark: true});
      expect(output.props.className).toEqual('new-dogbark');
    });

    it('should update value on change', () => {
      const {output, renderer} = setup();
      output.props.onChange({target: {value: 'Use Radox'}});
      const updated = renderer.getRenderOutput();
      expect(updated.props.value).toEqual('Use Radox');
    });

    it('should call onSave on return key press', () => {
      const {output, props} = setup();
      output.props.onKeyDown({which: 13, target: {value: 'Use Redux'}});
      expect(props.onSave).toHaveBeenCalledWith('Use Redux');
    });

    it('should reset state on return key press if newDogbark', () => {
      const {output, renderer} = setup({newDogbark: true});
      output.props.onKeyDown({which: 13, target: {value: 'Use Redux'}});
      const updated = renderer.getRenderOutput();
      expect(updated.props.value).toEqual('');
    });

    it('should call onSave on blur', () => {
      const {output, props} = setup();
      output.props.onBlur({target: {value: 'Use Redux'}});
      expect(props.onSave).toHaveBeenCalledWith('Use Redux');
    });

    it('shouldnt call onSave on blur if newDogbark', () => {
      const {output, props} = setup({newDogbark: true});
      output.props.onBlur({target: {value: 'Use Redux'}});
      expect(props.onSave.calls.count()).toBe(0);
    });
  });
});
