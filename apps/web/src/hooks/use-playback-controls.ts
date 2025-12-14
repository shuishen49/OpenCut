import { useEffect, useCallback } from "react";
import { usePlaybackStore } from "@/stores/playback-store";
import { useTimelineStore } from "@/stores/timeline-store";
import { toast } from "sonner";

export const usePlaybackControls = () => {
  const { isPlaying, currentTime, play, pause, seek } = usePlaybackStore();

  const {
    selectedElements,
    tracks,
    splitSelected,
    splitAndKeepLeft,
    splitAndKeepRight,
    separateAudio,
  } = useTimelineStore();

  const handleSplitSelectedElement = useCallback(() => {
    if (selectedElements.length !== 1) {
      toast.error("请选择恰好一个元素进行分割");
      return;
    }

    const { trackId, elementId } = selectedElements[0];
    const track = tracks.find((t) => t.id === trackId);
    const element = track?.elements.find((e) => e.id === elementId);

    if (!element) return;

    const effectiveStart = element.startTime;
    const effectiveEnd =
      element.startTime +
      (element.duration - element.trimStart - element.trimEnd);

    if (currentTime <= effectiveStart || currentTime >= effectiveEnd) {
      toast.error("播放头必须在选中的元素内");
      return;
    }

    splitSelected(currentTime, trackId, elementId);
  }, [selectedElements, tracks, currentTime, splitSelected]);

  const handleSplitAndKeepLeftCallback = useCallback(() => {
    if (selectedElements.length !== 1) {
      toast.error("请选择恰好一个元素");
      return;
    }

    const { trackId, elementId } = selectedElements[0];
    const track = tracks.find((t) => t.id === trackId);
    const element = track?.elements.find((e) => e.id === elementId);

    if (!element) return;

    const effectiveStart = element.startTime;
    const effectiveEnd =
      element.startTime +
      (element.duration - element.trimStart - element.trimEnd);

    if (currentTime <= effectiveStart || currentTime >= effectiveEnd) {
      toast.error("播放头必须在选中的元素内");
      return;
    }

    splitAndKeepLeft(trackId, elementId, currentTime);
  }, [selectedElements, tracks, currentTime, splitAndKeepLeft]);

  const handleSplitAndKeepRightCallback = useCallback(() => {
    if (selectedElements.length !== 1) {
      toast.error("请选择恰好一个元素");
      return;
    }

    const { trackId, elementId } = selectedElements[0];
    const track = tracks.find((t) => t.id === trackId);
    const element = track?.elements.find((e) => e.id === elementId);

    if (!element) return;

    const effectiveStart = element.startTime;
    const effectiveEnd =
      element.startTime +
      (element.duration - element.trimStart - element.trimEnd);

    if (currentTime <= effectiveStart || currentTime >= effectiveEnd) {
      toast.error("播放头必须在选中的元素内");
      return;
    }

    splitAndKeepRight(trackId, elementId, currentTime);
  }, [selectedElements, tracks, currentTime, splitAndKeepRight]);

  const handleSeparateAudioCallback = useCallback(() => {
    if (selectedElements.length !== 1) {
      toast.error("请选择恰好一个媒体元素以分离音频");
      return;
    }

    const { trackId, elementId } = selectedElements[0];
    const track = tracks.find((t) => t.id === trackId);

    if (!track || track.type !== "media") {
      toast.error("请选择一个媒体元素以分离音频");
      return;
    }

    separateAudio(trackId, elementId);
  }, [selectedElements, tracks, separateAudio]);
};
