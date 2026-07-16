import { createCorsair } from 'corsair';
import { gmail } from '@corsair-dev/gmail';
import { googlecalendar } from '@corsair-dev/googlecalendar';

export const corsair = createCorsair({
    kek: process.env.CORSAIR_KEK!,
    hub: {
        projectApiKey: process.env.CORSAIR_DEV_API_KEY!,
        signingSecret: process.env.CORSAIR_DEV_SIGNING_SECRET!,
    },
    plugins: [
        gmail(), googlecalendar()
    ],
});