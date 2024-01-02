// utility function that fetches all available devices, both audio and video

const getDevices = () => {
  return new Promise(async (resolve, reject) => {
    const devices = await navigator.mediaDevices.enumerateDevices();
    console.log(devices);
    const videoDevices = devices.filter((d) => d.kind === "videoinput");
    const audioInputDevices = devices.filter((d) => d.kind === "audioinput");
    const audioOutputDevices = devices.filter((d) => d.kind === "audiooutput");


    resolve({
        videoDevices, audioInputDevices, audioOutputDevices
    })
  });
};

export default getDevices;
