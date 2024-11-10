import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useLoading } from "../Loading";

describe("useLoading", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should start with loading true", () => {
    const { result } = renderHook(() => useLoading());
    expect(result.current.loading).toBe(true);
  });

  it("should set loading to false after 1500ms", () => {
    const { result } = renderHook(() => useLoading());

    act(() => {
      vi.advanceTimersByTime(1500);
    });

    expect(result.current.loading).toBe(false);
  });

  it("should have startLoading and stopLoading functions", () => {
    const { result } = renderHook(() => useLoading());

    expect(typeof result.current.startLoading).toBe("function");
    expect(typeof result.current.stopLoading).toBe("function");
  });
});
