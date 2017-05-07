import { Grid, Row, Col } from 'react-bootstrap';
import Masonry from 'react-masonry-component';
import Brick from '../../components/Brick';
import PaginationElement from 'components/PaginationElement';
import { getContent } from 'actions/story-actions';
import { StoryContent, mapStateToProps, mapDispatchToProps } from './Masonry';

const props = {
  storyPages: 2,
  storyPage: 1,
  stories: [{
    _id: 'id',
    title: 'title',
    image: 'image',
    body: `Ita sunt excepteur`,
    created_at: '1494008621746',
    postedBy: {
      firstName: 'first name',
      lastName: 'last name'
    }
  }],
  getContent: Function.prototype
}

test('StoryContent should be a section with a cs-stories id tag', () => {
  const component = shallow(<StoryContent {...props}/>)
  expect(component).toHaveTagName('section');
  expect(component).toHaveProp('id', 'cs-stories');
});

test('StoryContent should have a bootstrap grid', () => {
  const component = shallow(<StoryContent {...props}/>)
  const gridComponent = component.find(Grid);
  const rowComponent = gridComponent.children();
  const colComponent = rowComponent.children();

  expect(gridComponent.length).toEqual(1);
  expect(rowComponent.length).toEqual(1);
  expect(colComponent.length).toEqual(1);

  expect(colComponent).toHaveProp('lg', 10);
  expect(colComponent).toHaveProp('lgOffset', 1);
});

test('StoryContent should have a masonry component', () => {
  const component = shallow(<StoryContent {...props}/>)
  expect(component.find(Masonry)).toBePresent();
});

test('StoryContent\'s Masonry should only have Bricks', () => {
  const component = shallow(<StoryContent {...props}/>)
  const masonryComponent = component.find(Masonry);
  const bricksNum = masonryComponent.children(Brick).length;
  const masonryChildrenNum = masonryComponent.children().length;
  expect(bricksNum).toEqual(masonryChildrenNum);
});

test('StoryContent\'s Masonry should have as many Bricks as stories', () => {
  const component = shallow(<StoryContent {...props}/>)
  const bricksNum = component.find(Masonry).children(Brick).length;
  expect(bricksNum).toEqual(props.stories.length);
});

test('StoryContent should have a PaginationElement', () => {
  const component = shallow(<StoryContent {...props}/>)
  const pagination = component.children(PaginationElement);
  const expectedProps = { items: props.storyPages, page: props.storyPage }

  expect(pagination).toBePresent();
  expect(pagination.props()).toMatchObject(expectedProps);
});

test('StoryContent should ask for the content before it mounts', () => {
  const sandbox = sinon.sandbox.create();
  const propsWithSpy = { ...props, getContent: sandbox.spy() }
  const container = mount(<StoryContent {...propsWithSpy} />);
  expect(propsWithSpy.getContent.calledOnce).toBe(true);

  sandbox.restore();
});

test('StoryContent\'s mapStateToProps should provide the story data', () => {
  const mockState = {
    content: {
      current: {
        page: 1,
        pages: 2,
        stories: props.stories
      }
    }
  };

  expect(props).toMatchObject(mapStateToProps(mockState));
});

test('StoryContent\'s mapDispatchToProps should dispatch getContent', () => {
  const sandbox = sinon.sandbox.create();
  const mockDispatch = sandbox.spy();
  const dispatchObj = mapDispatchToProps(mockDispatch);
  dispatchObj.getContent();

  expect(mockDispatch.calledOnce).toBe(true);
  areFns(mockDispatch.args[0][0], getContent());

  sandbox.restore();
})
