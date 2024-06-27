import { colors, spacing } from 'app/theme';
import React, { useCallback, useState, memo } from 'react';
import { View, FlatList, ListRenderItem, ViewStyle } from 'react-native';
import { Text } from '../Text';

interface EventGraphProps {
  eventData: Record<string, string>;
}

interface DisplayItem {
  hour: string;
  event?: string;
  hasVerticalLine?: boolean;
}

const EventGraph: React.FC<EventGraphProps> = ({eventData}) => {
  // const eventData = useSelector((state: RootState) => state.event.events);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const pageSize = 20;

  const hours = Array.from({ length: 24 }, (_, i) => ({
    hour: i.toString().padStart(2, '0'),  // Format the hour as a two-digit string
    event: 'down',
    hasVerticalLine: false,
  }));

  const eventItems = Object.keys(eventData).map(timestamp => ({
    timestamp,
    event: eventData[timestamp],
  }));

console.log(eventItems,'event item')




//   const generateDisplayItems = (events: { timestamp: string, event: string }[]): DisplayItem[] => {
//     const displayItems: DisplayItem[] = [...hours];


    
//     events.forEach((eventItem, _index) => {
//       const eventHour = new Date(parseInt(eventItem.timestamp)).getHours();
//       displayItems[eventHour].event = eventItem.event;})

//     for (let i = 1; i < displayItems.length; i++) {
//       if (!displayItems[i].event) {
//         displayItems[i].event = displayItems[i - 1].event;
//         displayItems[i].hasVerticalLine = false;
//       }
//     }

//     events.forEach((eventItem, index) => {
//       const eventHour = new Date(parseInt(eventItem.timestamp)).getHours();
//       displayItems[eventHour].event = eventItem.event;

//  if(index>0){
//         const previousEvent = events[index - 1];
//         const previousHour = new Date(parseInt(previousEvent.timestamp)).getHours();
//         console.log(previousEvent.event , eventItem.event ,index,'condition')



//         if ((previousEvent.event === 'up' && eventItem.event === 'down') ||
//           (previousEvent.event === 'down' && eventItem.event === 'up')) {
       
//             displayItems[previousHour].event = eventItem.event;
//           displayItems[previousHour].hasVerticalLine = true;
//           console.log(  displayItems[previousHour],index,'indexing last item')

//         }}




      
//     });



//     return displayItems;
//   };

  

const generateDisplayItems = (events: { timestamp: string; event: string }[]): DisplayItem[] => {
  const displayItems: DisplayItem[] = [...hours];

  // Loop through each hour
  for (let hour = 0; hour < displayItems.length; hour++) {
    const currentHour = displayItems[hour];
    let previousEvent = events.find(event => {
      const previousHour = new Date(parseInt(event.timestamp)).getHours();
      return previousHour === hour - 1;
    });

    // Check for events matching the current hour
    events.forEach(eventItem => {
      const eventHour = new Date(parseInt(eventItem.timestamp)).getHours();
      if (eventHour === hour) {
        currentHour.event = eventItem.event;

console.log(displayItems[hour-1],eventItem,currentHour,'##########')

        // Check for vertical line if this event creates a state change
        if (((displayItems[hour-1].event === 'up' && eventItem.event === 'down') || (displayItems[hour-1].event  === 'down' && eventItem.event === 'up'))) {
        if(displayItems[hour-1].event === 'up')
        {  displayItems[hour-1].hasVerticalLine = true;}
        else{
          displayItems[hour].hasVerticalLine = true;
        }
        }
        previousEvent = eventItem; // Update previousEvent for next iteration
      }
    });

    // Check for missing events (inherit from previous hour)
    if (hour > 0 && !currentHour.event) {
      currentHour.event = displayItems[hour - 1].event;
    }
  }

  return displayItems;
};

  const displayItems = generateDisplayItems(eventItems);

  const renderItem: ListRenderItem<DisplayItem> = ({ item }) => {
    console.log(item, 'items')
    return (
      <View style={$colContainer}>
        <View style={$hoursContainer}>
          <Text>{item.hour}</Text>
        </View>
        <View style={[$event, $up]}>
          <View style={$upContainer}>
            <View style={$highlight} />
            <View style={$centerDashStyle} />
            {/* {item.event === 'up' && <Text>{item.event}</Text>} */}

          </View>
        </View>
        <View style={[$event, $down]}>
          <View style={$downContainer}>
            <View style={$highlight} />
            <View style={$centerDashStyle} />
            {/* {item.event === 'down' && <Text>{item.event}</Text>} */}
          </View>
        </View>
        <View style={item.event === 'up' ? $upLine : $downLine} />
        {item.hasVerticalLine && (
          <View style={[item.event === 'up' && $verticalUpLine, item.event === 'down' && $verticalDownLine]} />
        )}
        {displayItems[parseInt(item.hour)-1]?.event==='down'&&displayItems[parseInt(item.hour)]?.event==='up'&&displayItems[parseInt(item.hour)+1]?.event==='down'&&<View style={$supportLineLeft}/>}
        {displayItems[parseInt(item.hour)-1]?.event==='up'&&displayItems[parseInt(item.hour)]?.event==='down'&&displayItems[parseInt(item.hour)+1]?.event==='up'&&<View style={$supportLineRight}/>}

      </View>
    )
  };

  const keyExtractor = useCallback((item: DisplayItem, index: number) => `${item.hour}-${index}`, []);
  const getItemLayout = useCallback((_item: ArrayLike<DisplayItem> | null | undefined, index: number) => ({
    length: 100,
    offset: 100 * index,
    index,
  }), []);
  const handleEndReached = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <View style={$container}>
      <View style={$labelContainer}>
        <View style={{ height: spacing.lg }} />
        <View style={[$upContainer, { paddingHorizontal: spacing.sm }]}>
          <Text text='R' preset="subheading" />
        </View>
        <View style={[$downContainer, { paddingHorizontal: spacing.sm }]}>
          <Text text='W' preset="subheading" />
        </View>
      </View>
      <FlatList
        data={displayItems.slice(0, (currentPage + 1) * pageSize)}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        horizontal
        pagingEnabled
        onEndReached={handleEndReached}
        getItemLayout={getItemLayout}
        removeClippedSubviews
      />
    </View>
  );
};

const $container: ViewStyle = {
  flexDirection: 'row',
  flexGrow: 10,
  paddingHorizontal: spacing.md,
  backgroundColor: colors.background,
};

const $event: ViewStyle = {
  flex: 1,
  height: 100,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
  borderColor: '#000',
  backgroundColor: colors.background,
};

const $up: ViewStyle = {
  height: '100%',
  alignSelf: 'flex-start',
  justifyContent: 'flex-start',
};

const $down: ViewStyle = {
  width: '100%',
  height: '100%',
  alignSelf: 'flex-end',
  justifyContent: 'flex-end',
};

const $upContainer: ViewStyle = {
  flex: 1,
  borderWidth: 0.5,
  borderColor: colors.border,
  alignItems: 'center',
  justifyContent: 'center',
};

const $downContainer: ViewStyle = {
  borderWidth: 0.5,
  flex: 1,
  borderColor: colors.border,
  alignItems: 'center',
  justifyContent: 'center',
};

const $highlight: ViewStyle = {
  minWidth: '100%',
  width: 50,
  alignItems: 'center',
  justifyContent: 'center',
  alignSelf: 'center',
};

const $upLine: ViewStyle = {
  position: 'absolute',
  top: '25%',
  left: 0,
  right: 0,
  height: 2,
  backgroundColor: '#5d80cd',
};

const $downLine: ViewStyle = {
  position: 'absolute',
  bottom: '25%',
  left: 0,
  right: 0,
  height: 2,
  backgroundColor: '#5d80cd',
};

const $verticalUpLine: ViewStyle = {
  position: 'absolute',
  top: '25%',
  minWidth: 1,
  right:0,
  borderLeftWidth: 1,
  borderRightWidth: 1,
  borderColor: '#5d80cd',
  height: '50%',
};

const $verticalDownLine: ViewStyle = {
  position: 'absolute',
  bottom: '25%',
  minWidth: 1,
  right:0,
  borderLeftWidth: 1,
  borderColor: '#5d80cd',
  borderRightWidth: 1,
  height: '50%',
};

const $centerDashStyle: ViewStyle = {
  width: 2,
  height: '60%',
  backgroundColor: colors.border,
  alignSelf: 'center',
  justifyContent: 'center',
  alignItems: 'center',
};

const $labelContainer: ViewStyle = {
  height: 300,
  borderColor: colors.border,
  justifyContent: 'space-between',
};



const $supportLineLeft:ViewStyle={
  position: 'absolute',
  bottom: '25%',
  minWidth: 1,
  left:0,
  // borderLeftWidth: 2,
  borderColor: '#5d80cd',
  borderRightWidth: 2,
  height: '50%',
}

const $supportLineRight:ViewStyle={
  position: 'absolute',
  bottom: '25%',
  minWidth: 1,
  left:0,
  // borderLeftWidth: 2,
  borderColor: '#5d80cd',
  borderRightWidth: 2,
  height: '50%',
}

const $colContainer:ViewStyle={ height: 300, width: 'auto' }

const $hoursContainer:ViewStyle={ height: spacing.lg, left: -10 }
export default memo(EventGraph);



