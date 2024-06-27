import { observer } from "mobx-react-lite"
import React, { FC } from "react"
import {  ViewStyle } from "react-native"


import { AppStackScreenProps } from "../../navigators"
import {  spacing } from "../../theme"
import { Screen } from "app/components"
import EventGraph from "app/components/EventGraph/EventGraph"
import { useSelector } from "react-redux"
import { RootState } from "app/services/root"



interface WelcomeScreenProps extends AppStackScreenProps<"Welcome"> {}

export const WelcomeScreen: FC<WelcomeScreenProps> = observer(function WelcomeScreen(
) {


  // const {
  //   data: MessageData,
  //   isLoading: _isMessageLoading,
  //   refetch: refetchMessageData,
  //   isRefetching: isRefetchingMessageData,
  // } = useQuery({
  //   queryKey: [QueryKey.TODO_ITEMS],
  //   queryFn: async () => {const res= await ExampleService.getTodos()
  //     return res
  //   },
  //   initialData:[]

  // })
  const eventData = useSelector((state: RootState) => state.event.events);

  return (
    <Screen style={$container} safeAreaEdges={['top']} preset="fixed">
<EventGraph eventData={eventData}/>
    </Screen>
  )
})

const $container: ViewStyle = {
  flex: 1,
  // backgroundColor: colors.background,
  paddingHorizontal:spacing.sm
}

