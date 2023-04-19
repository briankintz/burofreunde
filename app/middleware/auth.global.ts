import { useAuthUser } from "~~/composables/state";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authUser = useAuthUser();

  // Wait for Firebase to asynchronously load an already authenticated user from local storage
  // After that, the initial value of 'undefined' will be <AuthUser | null>
  while (authUser.value === undefined) {
    await new Promise((r) => setTimeout(r, 10));
  }

  const signedIn = !!authUser.value;
  const goingToLogin = to.path === "/login";

  if (!signedIn && !goingToLogin) {
    return navigateTo("/login");
  }

  if (signedIn && goingToLogin) {
    return navigateTo("/");
  }
});
