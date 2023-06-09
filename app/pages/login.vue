<template>
  <Head>
    <Title>Bürofreunde - Login</Title>
  </Head>
  <main
    class="min-w-full min-h-screen flex items-center justify-center bg-cover bg-center bg-splash"
  >
    <div
      class="p-10 bg-slate-50 rounded-2xl flex flex-col items-center shadow-xl shadow-slate-900/70"
    >
      <div
        class="max-w-sm flex flex-col gap-4 text-center md:text-lg text-base"
      >
        <Logo class="mb-4 logo-light" />
        <form class="flex flex-col gap-8" @submit.prevent="emailLogin($event)">
          <div class="-space-y-px">
            <label for="email" class="sr-only">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              autocomplete="email"
              required
              class="relative block w-full rounded-none rounded-t-xl border-0 bg-transparent py-3 text-slate-700 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-teal-500"
              placeholder="Emailadresse"
            />
            <label for="password" class="sr-only">Passwort</label>
            <input
              id="password"
              name="password"
              type="password"
              autocomplete="current-password"
              required
              class="relative block w-full rounded-none rounded-b-xl border-0 bg-transparent py-3 text-slate-700 ring-1 ring-inset ring-slate-300 placeholder:text-slate-400 focus:z-10 focus:ring-2 focus:ring-inset focus:ring-teal-500"
              placeholder="Passwort"
            />
          </div>
          <ButtonPrimary type="submit"
            ><i class="fa-solid fa-envelope mr-3"></i>Mit Emailadresse
            anmelden</ButtonPrimary
          >
        </form>
        <ButtonSecondary @click="microsoftLogin()"
          ><i class="fa-brands fa-microsoft mr-3"></i> Mit Microsoft
          anmelden</ButtonSecondary
        >
        <p v-if="errorMessage" class="mt-4 text-rose-500 md:text-base text-sm">
          {{ errorMessage }}
        </p>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import { FirebaseError } from "@firebase/util";
import {
  getRedirectResult,
  signInWithEmailAndPassword,
  signInWithRedirect,
  OAuthProvider,
} from "firebase/auth";

const { $auth } = useNuxtApp();

const errorMessage = ref("");

try {
  await getRedirectResult($auth);
  await navigateTo("/");
} catch (error) {
  handle(error);
}

async function microsoftLogin() {
  const provider = new OAuthProvider("microsoft.com");

  return signInWithRedirect($auth, provider);
}

async function emailLogin(event: Event) {
  const form = event.target as HTMLFormElement;

  const { email, password } = Object.fromEntries(new FormData(form));

  form.reset();

  try {
    await signInWithEmailAndPassword(
      $auth,
      email.toString(),
      password.toString()
    );

    return navigateTo("/");
  } catch (error) {
    handle(error);
  }
}

function handle(error: any) {
  console.log({ error });

  if (error instanceof FirebaseError) {
    switch (error.code) {
      case "auth/user-not-found":
      case "auth/wrong-password":
        errorMessage.value = "Emailadresse oder Passwort falsch!";
        break;
      case "auth/internal-error":
        errorMessage.value = "Emaildomäne nicht erlaubt!";
        break;
      default:
        errorMessage.value = `Anmeldung fehlgeschlagen!`;
    }
  } else {
    errorMessage.value = "Anmeldung fehlgeschlagen!";
  }
}
</script>

<style>
.bg-splash {
  /* Generated with https://haikei.app/ */
  background-image: url("data:image/svg+xml;base64,PHN2ZyBpZD0idmlzdWFsIiB2aWV3Qm94PSIwIDAgOTAwIDY3NSIgd2lkdGg9IjkwMCIgaGVpZ2h0PSI2NzUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHZlcnNpb249IjEuMSI+PHJlY3Qgd2lkdGg9IjkwMCIgaGVpZ2h0PSI2NzUiIGZpbGw9IiMzMzQxNTUiPjwvcmVjdD48Zz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgxMyAzNTMpIj48cGF0aCBkPSJNNDguNiAtNjEuNEM2NC45IC00NC4zIDgxLjMgLTMwLjggOTIuNSAtMTBDMTAzLjcgMTAuOCAxMDkuNyAzOC44IDEwMS41IDYzLjdDOTMuMiA4OC42IDcwLjcgMTEwLjQgNDcuNiAxMDkuNkMyNC41IDEwOC44IDEgODUuNSAtMjEuMSA3MS41Qy00My4xIDU3LjYgLTYzLjYgNTMuMSAtODQuNSAzOC4zQy0xMDUuNCAyMy42IC0xMjYuOCAtMS4yIC0xMjIuNyAtMjEuMkMtMTE4LjYgLTQxLjEgLTg5LjIgLTU2LjEgLTY0LjUgLTcxLjdDLTM5LjggLTg3LjQgLTE5LjkgLTEwMy42IC0xLjkgLTEwMS40QzE2LjIgLTk5LjIgMzIuNCAtNzguNSA0OC42IC02MS40WiIgc3Ryb2tlPSIjMmRkNGJmIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjgiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoNTgzIDEzKSI+PHBhdGggZD0iTTQzIC01NS4yQzUxLjYgLTQ0IDUxLjUgLTI2LjYgNTQuNSAtOS43QzU3LjQgNy4zIDYzLjMgMjMuNiA1OC42IDM1LjhDNTMuOSA0OCAzOC42IDU2LjIgMjQgNTguMkM5LjMgNjAuMiAtNC44IDU2LjIgLTIwIDUyQy0zNS4yIDQ3LjggLTUxLjUgNDMuNSAtNTYuMiAzMy40Qy02MSAyMy4zIC01NC4yIDcuNSAtNDguOSAtNi4xQy00My41IC0xOS43IC0zOS42IC0zMS4xIC0zMS43IC00Mi40Qy0yMy44IC01My42IC0xMS45IC02NC43IDIuNyAtNjcuOUMxNy4yIC03MS4xIDM0LjQgLTY2LjMgNDMgLTU1LjJaIiBzdHJva2U9IiMyZGQ0YmYiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iOCI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSgzMjUgNTIxKSI+PHBhdGggZD0iTTI4LjEgLTMyLjlDMzcuNiAtMjUuNCA0Ny40IC0xNy44IDUxLjQgLTcuM0M1NS41IDMuMyA1My43IDE2LjYgNDYuMiAyNEMzOC44IDMxLjUgMjUuNyAzMi45IDEyLjQgNDAuNUMtMC44IDQ4LjEgLTE0LjEgNjEuOCAtMjcuNyA2Mi43Qy00MS4zIDYzLjYgLTU1LjEgNTEuNyAtNTYuNCAzOC4xQy01Ny44IDI0LjQgLTQ2LjcgOS4xIC00MC43IC00LjFDLTM0LjcgLTE3LjQgLTM0IC0yOC40IC0yOCAtMzYuNUMtMjIuMSAtNDQuNiAtMTEuMSAtNDkuNiAtMC45IC00OC42QzkuMyAtNDcuNSAxOC41IC00MC4zIDI4LjEgLTMyLjlaIiBzdHJva2U9IiMyZGQ0YmYiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iOCI+PC9wYXRoPjwvZz48ZyB0cmFuc2Zvcm09InRyYW5zbGF0ZSg3MzcgNTAzKSI+PHBhdGggZD0iTTQ5LjIgLTYwQzU2LjUgLTUyLjUgNTAgLTMwLjEgNTIuMiAtMTAuM0M1NC40IDkuNSA2NS4zIDI2LjggNjIuNSA0MC4zQzU5LjcgNTMuOCA0My4yIDYzLjcgMjUuMSA3MS4zQzcgNzkgLTEyLjkgODQuNCAtMzEuOCA4MC41Qy01MC44IDc2LjYgLTY5IDYzLjUgLTgwLjUgNDUuNUMtOTIgMjcuNiAtOTYuOCA0LjggLTkzLjcgLTE3LjNDLTkwLjcgLTM5LjMgLTc5LjggLTYwLjggLTYyLjkgLTY2LjZDLTQ2IC03Mi4zIC0yMyAtNjIuNSAtMSAtNjEuM0MyMSAtNjAuMSA0MS45IC02Ny41IDQ5LjIgLTYwWiIgc3Ryb2tlPSIjMmRkNGJmIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjgiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoMjM3IDExNikiPjxwYXRoIGQ9Ik02Mi4zIC03My44Qzc3LjIgLTYxLjcgODMuMyAtMzguNyA4Ny4xIC0xNS42QzkwLjggNy41IDkyLjIgMzAuOCA4MC42IDQyLjVDNjkgNTQuMSA0NC40IDU0LjIgMjQuNCA1Ny4yQzQuNSA2MC4yIC0xMC44IDY2IC0yMy43IDYyLjVDLTM2LjYgNTkgLTQ3LjEgNDYuMSAtNTUuMSAzMkMtNjMuMiAxNy44IC02OC44IDIuMyAtNzAuNSAtMTYuN0MtNzIuMiAtMzUuNyAtNzAgLTU4LjIgLTU3LjYgLTcwLjdDLTQ1LjIgLTgzLjIgLTIyLjYgLTg1LjYgMC41IC04Ni4zQzIzLjcgLTg2LjkgNDcuNCAtODUuOCA2Mi4zIC03My44WiIgc3Ryb2tlPSIjMmRkNGJmIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjgiPjwvcGF0aD48L2c+PGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoODY2IDE1OSkiPjxwYXRoIGQ9Ik00MCAtNDMuM0M1MiAtMzcuNiA2Mi4xIC0yNS4xIDYyLjQgLTEyLjZDNjIuNyAwIDUzLjMgMTIuNiA0NC41IDIzLjZDMzUuNyAzNC41IDI3LjUgNDMuNyAxOC4zIDQ0LjdDOS4xIDQ1LjYgLTEuMSAzOC4yIC0xMS4xIDMzLjNDLTIxLjEgMjguNSAtMzEgMjYgLTM4LjggMTkuMkMtNDYuNyAxMi4zIC01Mi40IDEgLTUwIC04LjJDLTQ3LjYgLTE3LjQgLTM3IC0yNC41IC0yNy40IC0zMC42Qy0xNy43IC0zNi43IC04LjggLTQxLjggMi42IC00NC45QzE0IC00OCAyOCAtNDkgNDAgLTQzLjNaIiBzdHJva2U9IiMyZGQ0YmYiIGZpbGw9Im5vbmUiIHN0cm9rZS13aWR0aD0iOCI+PC9wYXRoPjwvZz48L2c+PC9zdmc+");
}
</style>
