import { Link } from 'react-router';
import { Col } from 'react-bootstrap';
import moment from 'moment';

import Brick from './Brick';

let component;

const props = {
  data: {
    _id: 'id',
    title: 'title',
    image: 'image',
    body: `Ita sunt excepteur, eram aut nam culpa commodo, laborum praetermissum ut
    iudicem, e irure deserunt praesentibus ut est an sempiternum de ab aut dolore
    iudicem, iis summis domesticarum do magna ingeniis instituendarum. Sed do summis
    deserunt, qui magna commodo vidisse ut e minim appellat firmissimum ubi nulla
    nescius si cernantur. Singulis tamen commodo constias, quorum incurreret
    domesticarum. Se ubi quorum sunt aute a nam veniam dolor sunt ingeniis eu ut
    aliquip familiaritatem, e occaecat philosophari iis aut non quorum ingeniis, est
    noster minim in nescius, aute possumus mentitum, consequat veniam nam mentitum
    praetermissum.Quibusdam dolore litteris pariatur. Velit ut et enim litteris id
    officia aliqua summis ex sint. Aliqua admodum ullamco, legam voluptate qui
    mandaremus.`,
    created_at: '1494008621746',
    postedBy: {
      firstName: 'first name',
      lastName: 'last name'
    }
  }
};

beforeEach(() => {
  component = shallow(<Brick {...props} />);
});

test('Brick should be a bootstrap Col', () => {
  const expectedColProps = {
    xs: 11,
    sm: 6,
    lg: 4,
    className: 'grid-item'
  };

  expect(component.type()).toEqual(Col);
  expect(component.props()).toMatchObject(expectedColProps);
});

test('Brick should contain a Link to the article', () => {
  const expectedPath = `/full/${props.data._id}`;
  expect(component.find(Link).prop('to')).toEqual(expectedPath);
});

test('Brick Link should contain an img', () => {
  const expectedImgPath = props.data.image;
  const image = component.find(Link).find('img');
  expect(image.length).toEqual(1);
  expect(image.prop('src')).toEqual(expectedImgPath);
});

test('Brick Link should contain an h3 title', () => {
  const title = component.find(Link).find('h3');
  expect(title.text()).toEqual(props.data.title);
});

test('Brick Link should contain the author\'s name and time of publishing', () => {
  const { created_at, postedBy: { firstName, lastName } } = props.data;
  const expectedTime = moment(created_at, "YYYY-MM-DD").format('LL');
  const expectedText = `Posted on ${expectedTime} by ${firstName} ${lastName}`;
  const text = component.find(Link).find('.card-info').text();
  expect(text).toEqual(expectedText);
});

test('Brick Link should contain the truncated body of the article', () => {
  const body = component.find(Link).find('.card-description').text();
  expect(body.length).toEqual(403);
  expect(body.slice(0, 400)).toMatch(props.data.body.slice(0, 400));
})
