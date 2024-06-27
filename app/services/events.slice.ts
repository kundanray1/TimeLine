import { createSlice, Draft, PayloadAction } from "@reduxjs/toolkit"

interface IInitialState {

    events: Record<string, string>;


}

const initialState: IInitialState = {
     events : {
       
   
        1718493120000: "down",
        1718514720000: "up",
        1718526000000: "down",
        1718537400000: "up",
        1718548800000: "down",
        1718560200000: "up",
        1718571600000: "down",
        1718581600000: "up",
      }
      




}

export const eventSlice = createSlice({
    name: "event",
    initialState,
    reducers: {
        setEventsData: (
            state: Draft<IInitialState>,
            action: PayloadAction<Pick<IInitialState, "events">>,
        ) => {
            state.events = action.payload?.events
        },

    },
})

export const {
    setEventsData,

} = eventSlice.actions

export default eventSlice.reducer
