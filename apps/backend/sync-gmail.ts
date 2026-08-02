import cron from 'node-cron';
import { prisma } from './db';
import { corsair } from './corsair';

async function syncGmailForUser(userId: string) {
  const tenant = corsair.withTenant(userId);

  const { threads } = await tenant.gmail.api.threads.list({ maxResults: 20 });

  for (const stub of threads ?? []) {
    if (!stub.id) continue;

    const full = await tenant.gmail.api.threads.get({ id: stub.id });
    if (!full.messages?.length) continue;

    const lastMessage = full.messages[full.messages.length - 1];
    const subjectHeader = full.messages[0]?.payload?.headers?.find(
      (h) => h.name === 'Subject'
    );

    if(!lastMessage) throw new Error("Message should not be empty.")

    const thread = await prisma.thread.upsert({
      where: { userId_gmailThreadId: { userId, gmailThreadId: full.id! } },
      update: {
        lastMessageAt: new Date(lastMessage.internalDate ?? Date.now()),
        snippet: lastMessage.snippet ?? undefined,
      },
      create: {
        userId,
        gmailThreadId: full.id!,
        subject: subjectHeader?.value ?? '(no subject)',
        snippet: lastMessage.snippet ?? undefined,
        lastMessageAt: new Date(lastMessage.internalDate ?? Date.now()),
      },
    });

    for (const msg of full.messages) {
      if (!msg.id) continue;

      const from = msg.payload?.headers?.find((h) => h.name === 'From');
      const to = msg.payload?.headers?.find((h) => h.name === 'To');

      await prisma.message.upsert({
        where: { threadId_gmailMessageId: { threadId: thread.id, gmailMessageId: msg.id } },
        update: {},
        create: {
          threadId: thread.id,
          gmailMessageId: msg.id,
          fromName: from?.value ?? '',
          fromEmail: from?.value ?? '',
          toEmail: to?.value ?? null,
          bodySnippet: msg.snippet ?? undefined,
          sentAt: new Date(msg.internalDate ?? Date.now()),
        },
      });
    }
  }

  await prisma.integration.update({
    where: { userId_provider: { userId, provider: 'GMAIL' } },
    data: { lastSyncedAt: new Date() },
  });
}

export function startGmailPolling() {
  cron.schedule('*/2 * * * *', async () => {
    const connected = await prisma.integration.findMany({
      where: { provider: 'GMAIL', status: 'CONNECTED' },
    });

    for (const { userId } of connected) {
      try {
        await syncGmailForUser(userId);
      } catch (err) {
        console.error(`Gmail sync failed for user ${userId}:`, err);
      }
    }
  });
}