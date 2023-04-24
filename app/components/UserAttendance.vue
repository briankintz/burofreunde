<template>
  <div
    class="flex flex-col p-4 gap-4 border dark:border-2 dark:border-slate-300 sm:rounded-xl"
  >
    <div class="text-base md:text-lg">
      <h3 class="mb-2">Bist du (auch) da?</h3>
      <p class="mb-2">
        Klicke auf den Knopf um deinen Kollegen mitzuteilen, dass du an dem
        ausgewählten Tag im Büro bist!
      </p>
      <p>
        Optional kannst du auch eine kurze Nachricht dazuschreiben und/oder
        mitgebrachte Leckereien ankündigen.
      </p>
    </div>

    <ButtonPrimary v-if="!data" @click="toggleAttending()">
      <i class="fa-solid fa-hand-wave mr-2"></i>
      Ja, ich bin da!
    </ButtonPrimary>

    <ButtonSecondary v-else @click="toggleAttending()">
      <i class="fa-regular fa-calendar-xmark mr-2"></i>
      Ich bin doch nicht da
    </ButtonSecondary>

    <ButtonPrimaryOutline v-if="!data?.cake" @click="setCake(true)">
      <i class="fa-solid fa-cake-slice mr-2"></i>
      Ich bringe Kuchen mit!
    </ButtonPrimaryOutline>

    <ButtonSecondaryOutline v-else @click="setCake(false)">
      <i class="fa-kit fa-regular-cake-slice-slash mr-2"></i>
      Ich bringe nichts mit
    </ButtonSecondaryOutline>

    <div>
      <label aria-hidden="true" for="message" class="hidden">Nachricht</label>
      <textarea
        rows="2"
        name="message"
        id="message"
        :value="data?.message"
        @input="setMessage(($event.target as HTMLInputElement).value)"
        placeholder="z.B. nur vormittags / gerne auswärts essen / ..."
        class="block w-full rounded-xl dark:bg-slate-600 border-0 py-1.5 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-300 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Attendee } from "@burofreunde/types";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";

const { $firestore } = useNuxtApp();
const { debounce, toDate } = useUtilities();

const user = useAuthUser();
const date = useSelectedDate();
const attendance = useAttendance();

const data = computed(() =>
  attendance.value.find(
    (a) => a.date == date.value && a.userUID == user.value?.uid
  )
);

function toggleAttending() {
  if (!data.value) {
    return addDoc(collection($firestore, "attendance"), {
      timestamp: serverTimestamp(),
      userUID: user.value?.uid,
      name: user.value?.displayName,
      date: date.value,
      cake: false,
      ttl: new Date(toDate(date.value).valueOf() + 86400000),
    });
  } else {
    return deleteDoc(doc($firestore, data.value.path));
  }
}

function setCake(cake: boolean) {
  if (!data.value) return;

  return updateDoc(doc($firestore, data.value.path), {
    cake,
  });
}

const setMessage = debounce((message: string) => {
  if (!data.value) return;

  return updateDoc(doc($firestore, data.value.path), { message });
});
</script>
