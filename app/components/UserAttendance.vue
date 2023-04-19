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

    <ButtonPrimary>
      <i class="fa-solid fa-hand-wave mr-2"></i>
      Ja, ich bin da!
    </ButtonPrimary>

    <ButtonPrimaryOutline>
      <i class="fa-solid fa-cake-slice mr-2"></i>
      Ich bringe Kuchen mit!
    </ButtonPrimaryOutline>

    <div>
      <label aria-hidden="true" for="message" class="hidden">Nachricht</label>
      <textarea
        rows="2"
        name="message"
        id="message"
        placeholder="z.B. nur vormittags / gerne auswärts essen / ..."
        class="block w-full rounded-xl dark:bg-slate-600 border-0 py-1.5 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 dark:placeholder:text-slate-300 focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-teal-500"
      />
    </div>
  </div>
</template>

<script setup lang="ts"></script>
