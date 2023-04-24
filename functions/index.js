const functions = require("firebase-functions");

exports.beforeSignIn = functions.auth.user().beforeSignIn((user, context) => {
  const ALLOWED_DOMAINS = ["teqwerk.de", "gapteq.com", "qunis.de"];

  if (
    !user.email ||
    !ALLOWED_DOMAINS.find((d) => user.email.indexOf(`@${d}`) !== -1)
  ) {
    throw new functions.auth.HttpsError(
      "invalid-argument",
      `Unauthorized email "${user.email}"`
    );
  }
});
