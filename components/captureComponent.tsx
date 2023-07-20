import React, { useRef, useState } from "react";
import fileUploaderToNFTStorage from "../utils/fileUploaderToNFTStorage";
import { Button } from "primereact/button";

interface HTMLVideoElementWithCaptureStream extends HTMLVideoElement {
  captureStream(frameRate?: number): MediaStream;
}

const RecordingComponent: React.FC = () => {
  const previewRef = useRef<HTMLVideoElementWithCaptureStream>(null);
  const recordingRef = useRef<HTMLVideoElement>(null);
  const downloadButtonRef = useRef<HTMLAnchorElement>(null);
  const logElementRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [recordingTimeMS] = useState(10000);

  const log = (msg: string) => {
    if (logElementRef.current) {
      logElementRef.current.innerHTML += msg + "\n";
    }
  };

  const wait = (delayInMS: number) => {
    return new Promise<void>((resolve) => setTimeout(resolve, delayInMS));
  };

  const startRecording = (stream: MediaStream, lengthInMS: number) => {
    let recorder = new MediaRecorder(stream);
    let data: Blob[] = [];

    recorder.ondataavailable = (event) => data.push(event.data);
    recorder.start();
    log(recorder.state + " for " + lengthInMS / 1000 + " seconds...");

    let stopped = new Promise<void>((resolve, reject) => {
      recorder.onstop = (event) => resolve();
      recorder.onerror = (event) => reject(event.name);
    });

    let recorded = wait(lengthInMS).then(() => {
      if (recorder.state === "recording") {
        recorder.stop();
      }
    });

    return Promise.all([stopped, recorded]).then(() => data);
  };

  const stop = (stream: MediaStream | MediaStreamTrack) => {
    if (stream instanceof MediaStream) {
      stream.getTracks().forEach((track) => track.stop());
    } else {
      stream.stop();
    }
  };

  const handleMuteButtonClick = () => {
    if (previewRef.current && previewRef.current.srcObject) {
      const stream: MediaStream = previewRef.current.srcObject as MediaStream;
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const handleStartButtonClick = () => {
    navigator.mediaDevices
      .getDisplayMedia({ video: true, audio: true })
      .then((stream) => {
        if (previewRef.current) {
          previewRef.current.srcObject = stream;
        }
        return new Promise<void>((resolve) => {
          if (previewRef.current) {
            previewRef.current.onplaying = resolve;
          }
        });
      })
      .then(() => {
        if (previewRef.current) {
          return startRecording(
            previewRef.current.captureStream(),
            recordingTimeMS
          );
        } else {
          return Promise.reject("Preview element is not available.");
        }
      })
      .then((recordedChunks) => {
        let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        const url = fileUploaderToNFTStorage(
          recordedBlob,
          Date.now().toString(),
          ".webm",
          "video/webm",
          "Just a video"
        );
        if (recordingRef.current) {
          recordingRef.current.src = URL.createObjectURL(recordedBlob);
        }
        if (downloadButtonRef.current) {
          downloadButtonRef.current.href = recordingRef.current?.src || "";
          downloadButtonRef.current.download = "RecordedVideo.webm";
        }

        log(
          `Successfully recorded ${recordedBlob.size} bytes of ${recordedBlob.type} media.`
        );
      })
      .catch(log);
  };

  const handleStopButtonClick = () => {
    if (previewRef.current && previewRef.current.srcObject) {
      stop(previewRef.current.srcObject);
    }
  };

  return (
    <div>
      <video ref={previewRef} id="preview" autoPlay></video>
      <video ref={recordingRef} id="recording"></video>
      <Button label="Start" onClick={handleStartButtonClick}></Button>
      <Button
        label="Stop"
        id="stopButton"
        onClick={handleStopButtonClick}
      ></Button>
      <Button
        label={isMuted ? "Unmute" : "Mute"}
        id="muteButton"
        onClick={handleMuteButtonClick}
      ></Button>
      <a ref={downloadButtonRef} href="" download="">
        Download
      </a>
      <div ref={logElementRef} id="log"></div>
    </div>
  );
};

export default RecordingComponent;
