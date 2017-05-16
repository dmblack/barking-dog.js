import React from 'react';
import TestUtils from 'react-addons-test-utils';
import DogbarkItem from './DogbarkItem';
import DogbarkTextInput from './DogbarkTextInput';

function setup(editing = false) {
  const props = {
    dogbark: {
      id: 0,
      text: 'Use Redux',
      completed: false
    },
    editDogbark: jasmine.createSpy(),
    deleteDogbark: jasmine.createSpy(),
    completeDogbark: jasmine.createSpy()
  };

  const renderer = TestUtils.createRenderer();

  renderer.render(
    <DogbarkItem {...props}/>
  );

  let output = renderer.getRenderOutput();

  if (editing) {
    const label = output.props.children.props.children[1];
    label.props.onDoubleClick({});
    output = renderer.getRenderOutput();
  }

  return {
    props,
    output,
    renderer
  };
}

describe('components', () => {
  describe('DogbarkItem', () => {
    it('initial render', () => {
      const {output} = setup();

      expect(output.type).toBe('li');
      expect(output.props.className).toBe('');

      const div = output.props.children;

      expect(div.type).toBe('div');
      expect(div.props.className).toBe('view');

      const [input, label, button] = div.props.children;

      expect(input.type).toBe('input');
      expect(input.props.checked).toBe(false);

      expect(label.type).toBe('label');
      expect(label.props.children).toBe('Use Redux');

      expect(button.type).toBe('button');
      expect(button.props.className).toBe('destroy');
    });

    it('input onChange should call completeDogbark', () => {
      const {output, props} = setup();
      const input = output.props.children.props.children[0];
      input.props.onChange({});
      expect(props.completeDogbark).toHaveBeenCalledWith(0);
    });

    it('button onClick should call deleteDogbark', () => {
      const {output, props} = setup();
      const button = output.props.children.props.children[2];
      button.props.onClick({});
      expect(props.deleteDogbark).toHaveBeenCalledWith(0);
    });

    it('label onDoubleClick should put component in edit state', () => {
      const {output, renderer} = setup();
      const label = output.props.children.props.children[1];
      label.props.onDoubleClick({});
      const updated = renderer.getRenderOutput();
      expect(updated.type).toBe('li');
      expect(updated.props.className).toBe('editing');
    });

    it('edit state render', () => {
      const {output} = setup(true);

      expect(output.type).toBe('li');
      expect(output.props.className).toBe('editing');

      const input = output.props.children;
      expect(input.type).toBe(DogbarkTextInput);
      expect(input.props.text).toBe('Use Redux');
      expect(input.props.editing).toBe(true);
    });

    it('DogbarkTextInput onSave should call editDogbark', () => {
      const {output, props} = setup(true);
      output.props.children.props.onSave('Use Redux');
      expect(props.editDogbark).toHaveBeenCalledWith(0, 'Use Redux');
    });

    it('DogbarkTextInput onSave should call deleteDogbark if text is empty', () => {
      const {output, props} = setup(true);
      output.props.children.props.onSave('');
      expect(props.deleteDogbark).toHaveBeenCalledWith(0);
    });

    it('DogbarkTextInput onSave should exit component from edit state', () => {
      const {output, renderer} = setup(true);
      output.props.children.props.onSave('Use Redux');
      const updated = renderer.getRenderOutput();
      expect(updated.type).toBe('li');
      expect(updated.props.className).toBe('');
    });
  });
});
