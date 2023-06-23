import { expect } from "@jest/globals";
import { parseLocalTime } from "./parseLocalTime";

describe("parseLocalTime", function () {
  it('should convert "HH:mm" time to "HH:mm:ss"', function () {
    expect(parseLocalTime("22:33")).toEqual("22:33:00");
    expect(parseLocalTime("2:59")).toEqual("02:59:00");
    expect(parseLocalTime("0:00")).toEqual("00:00:00");
    expect(parseLocalTime("00:00")).toEqual("00:00:00");
  });
});
