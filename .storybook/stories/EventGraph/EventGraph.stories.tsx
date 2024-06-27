import React from 'react';
import  EventGraph  from '../../../app/components/EventGraph/EventGraph';

export default {
  title: 'EventGraph',
  component: EventGraph,
};

const Template = (args) => <EventGraph {...args} />;

export const Basic = Template.bind({});
Basic.args = {
  eventData: {
    '10': 'up',
    '12': 'down',
    '15': 'up',
  },
};

export const WithVerticalLines = Template.bind({});
WithVerticalLines.args = {
  eventData: {
    '10': 'up',
    '12': 'down',
    '13': 'up',
    '15': 'down',
  },
};