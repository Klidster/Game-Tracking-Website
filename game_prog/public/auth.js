const loginTab = document.getElementById("login-tab");
const signupTab = document.getElementById("signup-tab");

const authForm = document.getElementById("auth-form");
const authSubmit = document.getElementById("auth-submit");
const authMessage = document.getElementById("auth-message");

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");

let mode = "login";


// SWITCH BETWEEN LOGIN AND SIGNUP

function setMode(newMode) {

  mode = newMode;

  loginTab.classList.toggle("active", mode === "login");
  signupTab.classList.toggle("active", mode === "signup");

  authSubmit.textContent =
    mode === "login" ? "Login" : "Sign Up";

  authMessage.textContent = "";

  passwordInput.autocomplete =
    mode === "login" ? "current-password" : "new-password";

}


loginTab.addEventListener("click", () => {

  setMode("login");

});


signupTab.addEventListener("click", () => {

  setMode("signup");

});


// DISPLAY AUTHENTICATION MESSAGE

function showMessage(message, isError = false) {

  authMessage.textContent = message;

  authMessage.style.color =
    isError ? "#dc3545" : "#198754";

}


// CHECK EXISTING SESSION

async function checkSession() {

  const { data, error } =
    await supabaseClient.auth.getSession();

  if (!error && data.session) {

    window.location.href = "dashboard.html";

  }

}


// HANDLE LOGIN AND SIGNUP

authForm.addEventListener("submit", async (event) => {

  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  authMessage.textContent = "";

  authSubmit.disabled = true;
  loginTab.disabled = true;
  signupTab.disabled = true;

  authSubmit.textContent =
    mode === "login" ? "Logging in..." : "Signing up...";

  try {

    if (mode === "signup") {

      const { data, error } =
        await supabaseClient.auth.signUp({

          email,
          password,

          options: {

            emailRedirectTo:
              `${window.location.origin}/dashboard.html`

          }

        });

      if (error) {

        showMessage(error.message, true);
        return;

      }

      if (data.session) {

        window.location.href = "dashboard.html";
        return;

      }

      showMessage(
        "Check your email to confirm your account."
      );

      authForm.reset();

    } else {

      const { error } =
        await supabaseClient.auth.signInWithPassword({

          email,
          password

        });

      if (error) {

        showMessage(error.message, true);
        return;

      }

      window.location.href = "dashboard.html";

    }

  } catch (error) {

    showMessage(
      "Something went wrong. Please try again.",
      true
    );

    console.error(error);

  } finally {

    authSubmit.disabled = false;
    loginTab.disabled = false;
    signupTab.disabled = false;

    authSubmit.textContent =
      mode === "login" ? "Login" : "Sign Up";

  }

});


// CHECK URL FOR SIGNUP MODE

const params = new URLSearchParams(
  window.location.search
);

if (params.get("mode") === "signup") {

  setMode("signup");

} else {

  setMode("login");

}


// INITIALISE

checkSession();