import { useDispatch, useSelector } from "react-redux";
import updateCallStatus from "../redux-elements/actions/UpdateCallStatus";


const HangupButton = () => {
  const dispatch = useDispatch();
  const callStatus = useSelector((state) => state.callStatus);

  const hangupCall = () => {
    dispatch(updateCallStatus("current", "complete"));
  };


  // the dispatch above will make the callStatus.current == complete
  if (callStatus.current === "complete") {
    console.log("after dispatch");
    return <></>;
  }

  return (
    <button onClick={hangupCall} className="btn btn-danger hang-up">
      Hang Up
    </button>
  );
};

export default HangupButton;
