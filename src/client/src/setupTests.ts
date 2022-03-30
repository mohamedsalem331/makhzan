import { createMatchMedia } from './__mocks__/MatchMedia';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { mswServer } from './__test__/utils/msw-server';

beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth)
    mswServer.listen()
});
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close());