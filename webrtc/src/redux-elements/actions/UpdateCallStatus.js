//  action creator for updating any property of the callStatus state slice

// eslint-disable-next-line import/no-anonymous-default-export
export default (props, value) => {
    return {
        type: "UPDATE_CALL_STATUS",
        payload: {props, value}
    }
}