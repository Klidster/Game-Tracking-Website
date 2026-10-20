const loginTab =
  document.getElementById("login-tab");

const signupTab =
  document.getElementById("signup-tab");

const authForm =
  document.getElementById("auth-form");

const authSubmit =
  document.getElementById("auth-submit");

const authMessage =
  document.getElementById("auth-message");


let authMode = "login";



// SWITCH TO LOGIN

loginTab.addEventListener(
  "click",
  () => {

    authMode = "login";

    loginTab.classList.add("active");

    signupTab.classList.remove("active");

    authSubmit.textContent = "Login";

    authMessage.textContent = "";

  }
);



// SWITCH TO SIGN UP

signupTab.addEventListener(
  "click",
  () => {

    authMode = "signup";

    signupTab.classList.add("active");

    loginTab.classList.remove("active");

    authSubmit.textContent = "Create Account";

    authMessage.textContent = "";

  }
);



// AUTH FORM

authForm.addEventListener(
  "submit",
  async (event) => {

    event.preventDefault();


    const email =
      document
        .getElementById("email")
        .value
        .trim();


    const password =
      document
        .getElementById("password")
        .value;


    authMessage.textContent = "";


    try {


      if (authMode === "signup") {


        const {
          data,
          error
        } =
          await supabaseClient
            .auth
            .signUp({

              email,
              password

            });


        if (error) {

          throw error;

        }


        if (data.session) {

          window.location.href =
            "index.html";

        } else {

          authMessage.textContent =
            "Account created. Check your email to confirm your account.";

        }


      } else {


        const {
          data,
          error
        } =
          await supabaseClient
            .auth
            .signInWithPassword({

              email,
              password

            });


        if (error) {

          throw error;

        }


        window.location.href =
          "index.html";

      }


    } catch (error) {

      console.error(error);

      authMessage.textContent =
        error.message;

    }

  }
);