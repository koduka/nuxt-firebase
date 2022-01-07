import * as functions from "firebase-functions";
import { Change, EventContext } from "firebase-functions";
import { DocumentSnapshot } from "firebase-functions/v1/firestore";

export const createdPayment = functions.firestore.document('payments').onWrite((change: Change<DocumentSnapshot>, context: EventContext) => {
})
