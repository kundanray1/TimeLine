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
  

    "1718526000000": "up",
    "1718537400000": "down",
    "1718548800000": "up",
    "1718560200000": "down",
    "1718571600000": "up",
    "1718581600000": "down",
  },
};

// export const WithVerticalLines = Template.bind({});
// WithVerticalLines.args = {
//   eventData: {
//     '10': 'up',
//     '12': 'down',
//     '13': 'up',
//     '15': 'down',
//   },
// };