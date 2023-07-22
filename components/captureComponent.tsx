import React, { useEffect, useRef, useState } from "react";
import fileUploaderToNFTStorage from "../utils/fileUploaderToNFTStorage";
import { Button } from "primereact/button";
import {
  FiMic,
  FiMicOff,
  FiVideo,
  FiVideoOff,
  FiDownload,
  FiCamera,
} from "react-icons/fi";
import { addVideo } from "../queries/Videos/createVideo";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

interface HTMLVideoElementWithCaptureStream extends HTMLVideoElement {
  captureStream(frameRate?: number): MediaStream;
}

const RecordingComponent: React.FC = () => {
  const previewRef = useRef<HTMLVideoElementWithCaptureStream>(null);
  const recordingRef = useRef<HTMLVideoElement>(null);
  const downloadButtonRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const logElementRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const auth = getAuth();
  const [user, setUsers] = useAuthState(auth);

  let recorder: MediaRecorder | null = null; // Add a variable for the recorder
  let data: Blob[] = []; // Move this outside to make it accessible to other functions

  useEffect(() => {
    console.log(user?.email);
  }, [user]);

  const log = (msg: string) => {
    if (logElementRef.current) {
      logElementRef.current.innerHTML += msg + "\n";
    }
  };

  const startRecording = (stream: MediaStream) => {
    data = []; // reset the data
    recorder = new MediaRecorder(stream);

    recorder.ondataavailable = (event) => {
      data.push(event.data);
    };

    recorder.start();
    log(recorder.state + "...");

    stream.getTracks().forEach((track) => {
      track.onended = () => {
        log("MediaStreamTrack has ended, stopping recording");
        if (recorder && recorder.state === "recording") {
          recorder.stop();
        }
      };
    });

    if (recorder) {
      recorder.onstop = () => {
        let recordedBlob = new Blob(data, { type: "video/webm" });
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
      };
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
    // First get the display media (video).
    navigator.mediaDevices
      .getDisplayMedia({ video: true })
      .then((videoStream) => {
        // Then get the user media (audio).
        return navigator.mediaDevices
          .getUserMedia({ audio: true })
          .then((audioStream) => {
            // Add the audio track to the video stream.
            videoStream.addTrack(audioStream.getAudioTracks()[0]);
            return videoStream;
          });
      })
      .then((stream) => {
        // Assign the combined stream to the preview video element.
        if (previewRef.current) {
          previewRef.current.srcObject = stream;
        }
        // Wait until the video is playing.
        return new Promise<void>((resolve) => {
          if (previewRef.current) {
            previewRef.current.onplaying = () => {
              resolve();
            };
          }
        });
      })
      .then(() => {
        // Start recording.
        if (previewRef.current) {
          startRecording(previewRef.current.captureStream());
        } else {
          throw new Error("Preview element is not available.");
        }
      })
      .catch(log);
  };

  const handleStopButtonClick = async () => {
    if (previewRef.current && previewRef.current.srcObject) {
      if (recorder && recorder.state === "recording") {
        recorder.stop();
      }
      let recordedBlob = new Blob(data, { type: "video/webm" });
      const url = await fileUploaderToNFTStorage(
        recordedBlob,
        user?.email + "-" + Date.now().toString(),
        ".webm",
        "video/webm",
        "Just a video"
      );
      console.log(user?.email);
      await addVideo(user?.email, url);
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
    }
  };

  const handleScreenshotClick = async () => {
    try {
      const displayMediaOptions = {
        video: {
          cursor: "always",
        },
        audio: false,
      };

      // Ask the user to select a screen to capture.
      const captureStream = await navigator.mediaDevices.getDisplayMedia(
        displayMediaOptions
      );
      const videoTrack = captureStream.getVideoTracks()[0];

      // Create a video element to play the capture stream.
      const video = document.createElement("video");
      video.srcObject = captureStream;
      video.onloadedmetadata = () => {
        video.play().then(() => {
          // Now that the video is playing, draw the frame on the canvas.
          if (canvasRef.current) {
            const canvas = canvasRef.current;
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            const ctx = canvas.getContext("2d");

            if (ctx) {
              ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
              const imageUrl = canvas.toDataURL("image/png");

              const a = document.createElement("a");
              a.href = imageUrl;
              a.download = "screenshot.png";
              setTimeout(() => {
                // This delay will give the desktop application time to become the active window.
                a.click();
              }, 500);
              document.body.appendChild(a);
              document.body.removeChild(a);
            }
          }
          // Stop the capture stream.
          videoTrack.stop();
        });
      };
    } catch (err) {
      console.error("Error: " + err);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        height: "80vh",
        backgroundColor: "#000",
        color: "#fff",
      }}
    >
      <video
        ref={previewRef}
        id="preview"
        autoPlay
        muted
        style={{ width: "100%", height: "calc(80vh - 100px)" }}
      ></video>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100px",
          backgroundColor: "#1a1a1a",
        }}
      >
        <Button
          icon={<FiCamera />} // replace with your camera icon
          className="p-button-rounded p-button-success"
          onClick={handleScreenshotClick}
          style={{ margin: "0 10px" }}
        />
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

        <Button
          icon={
            recorder && recorder.state === "recording" ? (
              <FiVideoOff />
            ) : (
              <FiVideo />
            )
          }
          className="p-button-rounded p-button-danger"
          onClick={
            recorder && recorder.state === "recording"
              ? handleStopButtonClick
              : handleStartButtonClick
          }
          style={{ margin: "0 10px" }}
        />
        <Button
          icon={isMuted ? <FiMicOff /> : <FiMic />}
          className="p-button-rounded p-button-warning"
          onClick={handleMuteButtonClick}
          style={{ margin: "0 10px" }}
        />
        <Button
          icon={<FiDownload />}
          className="p-button-rounded p-button-success"
          onClick={() => {
            downloadButtonRef.current?.click();
          }}
          style={{ margin: "0 10px" }}
        />
      </div>
      <a
        ref={downloadButtonRef}
        href=""
        download=""
        style={{ display: "none" }}
      >
        Download
      </a>
    </div>
  );
};

export default RecordingComponent;
