// eslint-disable-next-line import/no-anonymous-default-export
export default (who, stream, peerConnection) => {
  return {
    type: "ADD_STREAM",
    payload: {
      who,
      stream,
      peerConnection, // for local, undefined
    },
  };
};
