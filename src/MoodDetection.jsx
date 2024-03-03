import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import * as faceapi from "face-api.js";
import WebPlayback from "./WebPlayback";

faceapi.env.monkeyPatch({
  Canvas: HTMLCanvasElement,
  Image: HTMLImageElement,
  ImageData: ImageData,
  Video: HTMLVideoElement,
  createCanvasElement: () => document.createElement("canvas"),
  createImageElement: () => document.createElement("img"),
});

export default function MoodDetection({emotion, setEmotion}) {
  const videoRef = useRef();

  useEffect(() => {
    startVideo();

    videoRef && loadModels();
  }, []);

  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      faceDetection();
    });
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((currentStream) => {
        videoRef.current.srcObject = currentStream;
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const faceDetection = async () => {
    setInterval(async () => {
      const detections = await faceapi
        .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
        .withFaceLandmarks()
        .withFaceExpressions();
      console.log(detections[0].expressions);

      let maxExpression = "";
      let maxProbability = -1;

      for (const expression in detections[0].expressions) {
        const probability = detections[0].expressions[expression];

        if (probability > maxProbability) {
          maxProbability = probability;
          maxExpression = expression;
        }
      }
      console.log(maxExpression);
      setEmotion(maxExpression);

      // Process or handle detections here
    }, 1000); // Adjust the interval (in milliseconds) as needed
  };

  return (
    <div className="flex flex-col h-screen">
      <div>
        <h1 className="flex justify-center text-inherit px-20 text-5xl">
          You are feeling <h1 className="font-bold ml-2">{emotion}</h1>{" "}
        </h1>
      </div>
      <div>
        <div>
          <video
            className="hidden"
            crossOrigin="anonymous"
            ref={videoRef}
            autoPlay
          ></video>
        </div>
      </div>
    </div>
  );
}
