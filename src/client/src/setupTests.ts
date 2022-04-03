import { createMatchMedia } from './__mocks__/MatchMedia';
import '@testing-library/jest-dom/extend-expect';
import '@testing-library/jest-dom';
import { mswServer } from './__test__/TestHelpers/msw-server';




beforeAll(() => {
    window.matchMedia = createMatchMedia(window.innerWidth)
    mswServer.listen({
        onUnhandledRequest(req) {
            console.error(
                'Found an unhandled %s request to %s',
                req.method,
                req.url.href,
            )
        },
    })

});
afterEach(() => mswServer.resetHandlers());
afterAll(() => mswServer.close())


