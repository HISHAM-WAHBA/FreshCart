import { useRef, useState } from "react";
import { Link, useNavigate } from "react-router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCircleCheck,
  faEnvelopeCircleCheck,
  faShieldHalved,
} from "@fortawesome/free-solid-svg-icons";
import { useFormik } from "formik";
import * as yup from "yup";
import { toast } from "react-toastify";

import {
  sendDataToForgetPassword,
  sendDataToVerfiyCode,
} from "../../Services/auth-service";
import PageMetaData from "../../Components/PageMetaData/PageMetaData";

export default function VerifyEmail() {
  const [step, setStep] = useState("email");
  const [sending, setSending] = useState(false);
  const [error, setError] = useState(null);
  const inputRefs = useRef([]);
  const navigate = useNavigate();

  const emailForm = useFormik({
    initialValues: { email: "" },
    validationSchema: yup.object({
      email: yup
        .string()
        .required("Email is required")
        .email("Enter a valid email"),
    }),
    onSubmit: async ({ email }) => {
      try {
        setSending(true);
        setError(null);
        const response = await sendDataToForgetPassword(email);
        if (response.success) {
          localStorage.setItem("resetEmail", email);
          toast.success("Verification code sent to your email");
          setStep("code");
        }
      } catch (err) {
        setError(err.message || "Could not send the code. Try again.");
      } finally {
        setSending(false);
      }
    },
  });

  const [code, setCode] = useState(["", "", "", "", "", ""]);

  async function verifyCode() {
    const fullCode = code.join("");
    if (fullCode.length < 6 || code.includes("")) {
      toast.error("Please enter all 6 digits");
      return;
    }
    try {
      setSending(true);
      setError(null);
      const response = await sendDataToVerfiyCode(fullCode);
      if (response.success) {
        toast.success("Email verified successfully");
        setStep("done");
        setTimeout(() => navigate("/ResetPassword"), 2000);
      }
    } catch (err) {
      setError(err.message || "Invalid code");
      toast.error(err.message || "Invalid code");
    } finally {
      setSending(false);
    }
  }

  return (
    <>
      <PageMetaData title="Verify Email | MartCart" />
      <main className="page-enter min-h-[75vh] flex items-center justify-center bg-gray-50 px-4 py-12">
        <div className="w-full max-w-lg">
          <div className="relative overflow-hidden rounded-3xl bg-white shadow-xl border border-gray-100 p-6 sm:p-10">
            <div className="absolute -right-16 -top-16 size-48 rounded-full bg-primary-100/60 blur-2xl" />

            <div className="relative text-center">
              <div className="size-16 mx-auto rounded-2xl bg-primary-50 text-primary-600 flex items-center justify-center text-2xl mb-5">
                <FontAwesomeIcon
                  icon={step === "done" ? faCircleCheck : faEnvelopeCircleCheck}
                />
              </div>

              {step === "email" && (
                <>
                  <h1 className="text-2xl font-bold">Verify your email</h1>
                  <p className="text-gray-500 mt-2 mb-8 text-sm">
                    Enter the email linked to your account and we'll send you a
                    one-time verification code.
                  </p>

                  <form
                    onSubmit={emailForm.handleSubmit}
                    className="text-start space-y-4"
                  >
                    <div>
                      <label htmlFor="email" className="text-sm font-medium">
                        Email address
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="form-control mt-1"
                        placeholder="you@example.com"
                        value={emailForm.values.email}
                        onChange={emailForm.handleChange}
                        onBlur={emailForm.handleBlur}
                      />
                      {emailForm.touched.email && emailForm.errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          *{emailForm.errors.email}
                        </p>
                      )}
                    </div>

                    {error && <p className="text-red-500 text-sm">*{error}</p>}

                    <button
                      type="submit"
                      disabled={sending}
                      className="btn w-full bg-primary-600 text-white hover:bg-primary-700"
                    >
                      {sending ? "Sending..." : "Send verification code"}
                    </button>
                  </form>
                </>
              )}

              {step === "code" && (
                <>
                  <h1 className="text-2xl font-bold">Enter the code</h1>
                  <p className="text-gray-500 mt-2 text-sm">
                    We sent a 6-digit code to{" "}
                    <span className="text-primary-700 font-medium">
                      {localStorage.getItem("resetEmail")}
                    </span>
                  </p>

                  <div className="flex justify-center gap-2 sm:gap-3 my-8">
                    {code.map((digit, i) => (
                      <input
                        key={i}
                        ref={(el) => (inputRefs.current[i] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => {
                          const value = e.target.value.replace(/\D/g, "");
                          if (!value) return;
                          const next = [...code];
                          next[i] = value;
                          setCode(next);
                          if (i < 5) inputRefs.current[i + 1]?.focus();
                        }}
                        onKeyDown={(e) => {
                          if (e.key === "Backspace" && !code[i] && i > 0) {
                            inputRefs.current[i - 1]?.focus();
                          }
                        }}
                        className="size-11 sm:size-13 text-center text-xl border-2 border-gray-200 rounded-xl focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition"
                      />
                    ))}
                  </div>

                  {error && <p className="text-red-500 text-sm mb-3">*{error}</p>}

                  <button
                    onClick={verifyCode}
                    disabled={sending}
                    className="btn w-full bg-primary-600 text-white hover:bg-primary-700"
                  >
                    <FontAwesomeIcon icon={faShieldHalved} />
                    {sending ? "Verifying..." : "Verify email"}
                  </button>

                  <button
                    onClick={() => setStep("email")}
                    className="mt-4 text-sm text-primary-600 hover:underline"
                  >
                    <FontAwesomeIcon icon={faArrowLeft} className="me-1" />
                    Use a different email
                  </button>
                </>
              )}

              {step === "done" && (
                <>
                  <h1 className="text-2xl font-bold text-primary-700">
                    You're all set!
                  </h1>
                  <p className="text-gray-500 mt-2 mb-6 text-sm">
                    Your email has been verified. Redirecting you to reset your
                    password...
                  </p>
                  <div className="size-14 mx-auto rounded-full bg-primary-100 flex items-center justify-center text-primary-600 text-2xl animate-pulse">
                    <FontAwesomeIcon icon={faCircleCheck} />
                  </div>
                </>
              )}
            </div>
          </div>

          <p className="text-center text-sm text-gray-500 mt-5">
            Remembered it?{" "}
            <Link to="/Login" className="text-primary-600 hover:underline">
              Back to sign in
            </Link>
          </p>
        </div>
      </main>
    </>
  );
}
