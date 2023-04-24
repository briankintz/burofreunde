import { initializeApp } from "firebase/app";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";
import {
  connectAuthEmulator,
  getAuth,
  onAuthStateChanged,
  useDeviceLanguage,
} from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";
import { connectFunctionsEmulator, getFunctions } from "firebase/functions";
import { initializePerformance } from "firebase/performance";
import { connectStorageEmulator, getStorage } from "firebase/storage";
import { useAuthUser } from "~~/composables/state";

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  const app = initializeApp(config.public.firebase);

  const auth = getAuth(app);
  useDeviceLanguage(auth);
  onAuthStateChanged(auth, (user) => {
    const authUser = useAuthUser();

    if (user) {
      authUser.value = {
        uid: user.uid,
        displayName: user.displayName || "Unbekannt",
        email: user.email || "Unbekannt",
        photoURL: user.photoURL || "",
      };
    } else {
      authUser.value = null;
    }
  });

  const firestore = getFirestore(app);
  const functions = getFunctions(app, "europe-west3");
  const storage = getStorage();

  if (config.public.useFirebaseEmulators) {
    connectAuthEmulator(auth, "http://localhost:9099", {
      disableWarnings: true,
    });
    connectFirestoreEmulator(firestore, "localhost", 8080);
    connectFunctionsEmulator(functions, "localhost", 5001);
    connectStorageEmulator(storage, "localhost", 9199);
  }

  if (config.public.production) {
    const provider = new ReCaptchaV3Provider(config.public.recaptcha3SiteKey);
    initializeAppCheck(undefined, {
      provider,
      isTokenAutoRefreshEnabled: true,
    });

    initializePerformance(app);
  }

  return {
    provide: {
      firebase: app,
      auth,
      firestore,
      functions,
      storage,
    },
  };
});
