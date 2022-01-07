import { SendGridClient } from '@/sendgrid';
import * as functions from 'firebase-functions';
import { EventContext } from 'firebase-functions';
import { QueryDocumentSnapshot } from 'firebase-functions/v1/firestore';

export const onCreate = functions.firestore.document('contacts').onCreate(async (snapshot: QueryDocumentSnapshot, context: EventContext) => {
  const data = snapshot.data()
  const client = new SendGridClient()
  await client.sendText({
    to: data.to,
    from: data.from,
    subject: data.subject,
    text: data.text
  })
})
