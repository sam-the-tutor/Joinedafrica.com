import { describe, test, expect } from 'vitest';
import { sort } from "./util"
import { unSortedChatMessage, sortedChatMessage } from './mockData';

describe("sort", () => {
    test("sort messages by date and time in ascending order", () => {
        expect(sort(unSortedChatMessage)).toEqual(sortedChatMessage);
    });
})