export const environment = {
  production: true,
  useFirebaseEmulators: false,
  version: process.env.GITHUB_SHA ?? "unbekannt",
  firebase: {
    apiKey: "AIzaSyAH-Pxztgknf1CpeA-xgDgKW1jbCoMnxWA",
    authDomain: "burofreunde.de",
    projectId: "burofreunde",
    storageBucket: "burofreunde.appspot.com",
    messagingSenderId: "763572478521",
    appId: "1:763572478521:web:b11c396aee59a934c9e3e8",
  },
  recaptcha3SiteKey: "6LcVq54lAAAAAOdu2mUsoyJq9KFqqsRzblJRMJ-t",
};
