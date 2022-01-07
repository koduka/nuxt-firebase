import * as admin from 'firebase-admin';
import 'firebase-functions';
export * as contactJob from './jobs/contact';
export * as paymentJob from './jobs/payment';

admin.initializeApp()
