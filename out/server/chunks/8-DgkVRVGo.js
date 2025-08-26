import { j as contactUs } from './mongoActions-EAD_oq8-.js';
import './Partners-CbwWoqw6.js';
import 'mongoose';

const actions = {
  contactus: async ({ request }, event) => {
    try {
      const rawData = Object.fromEntries(await request.formData());
      const body = rawData;
      console.log("body", body);
      await contactUs(body);
      return {
        type: "success",
        data: {
          message: "Contact details submitted successfully!"
        }
      };
    } catch (error) {
      console.error("Error creating contact:", error);
      return {
        type: "error",
        data: {
          error: "Error submitting your data. Please try again later!"
        }
      };
    }
  }
  // verifyemail: async ({ request }) => {
  //   const rawData = Object.fromEntries(await request.formData());
  //   // console.log(rawData, "rawData");
  //   const email = rawData.email;
  //   // console.log('Received email:', email);
  //   if (!email) {
  //     console.log('No email provided in the request.');
  //     return {
  //       status: 500,
  //       message: 'Please provide a valid email address',
  //       success: false,
  //       isEmailVerified: false
  //     };
  //   }
  //   try {
  //     const tokenVerificationRecord = await TokenVerification.findOne({ email });
  //     // console.log('TokenVerification record:', tokenVerificationRecord);
  //     if (tokenVerificationRecord && tokenVerificationRecord.isEmailVerified) {
  //       console.log('Email is already verified in TokenVerification.');
  //       return {
  //         status: 200,
  //         message: 'Email is already verified',
  //         success: true,
  //         isEmailVerified: true
  //       };
  //     }
  //     const user = await Profile.findOne({ email });
  //     // console.log('Profile record:', user);
  //     if (!user) {
  //       const result = await sendemailOtp(email);
  //       if (result) {
  //         return {
  //           status: 200,
  //           message: 'Verification email sent successfully. Please check your inbox.',
  //           success: true,
  //           isEmailVerified: false
  //         };
  //       } else {
  //         throw new Error('Email sending failed');
  //       }
  //     }
  //     if (!user.isEmailVerified) {
  //       const result = await sendemailOtp(email);
  //       if (result) {
  //         return {
  //           status: 200,
  //           message: 'Verification email sent successfully. Please check your inbox.',
  //           success: true,
  //           isEmailVerified: false
  //         };
  //       } else {
  //         throw new Error('Email sending failed');
  //       }
  //     }
  //     return {
  //       status: 200,
  //       message: 'User already exists and email is verified.',
  //       success: true,
  //       isEmailVerified: true
  //     };
  //   } catch (error) {
  //     return {
  //       status: 500,
  //       message: 'Verification mail could not be sent. Double-Check your email again',
  //       success: false,
  //       isEmailVerified: false
  //     };
  //   }
  // },
  // verifyOtpEmail: async ({ request }) => {
  //   const body = Object.fromEntries(await request.formData());
  //   console.log('verifyOtp body', body);
  //   const { email, enteredOtp } = body;
  //   try {
  //     if (!email || !enteredOtp) {
  //       return {
  //         status: 500,
  //         message: 'Please provide both email and OTP to verify.',
  //         success: false,
  //         isEmailVerified: false
  //       };
  //     }
  //     const verificationResult = await verifyemailOtp(email, enteredOtp);
  //     if (!verificationResult.success) {
  //       return {
  //         status: 500,
  //         message: verificationResult.message,
  //         success: false,
  //         isEmailVerified: false
  //       };
  //     } else {
  //       return {
  //         status: 200,
  //         message: verificationResult.message,
  //         success: true,
  //         isEmailVerified: true
  //       };
  //     }
  //   } catch (error) {
  //     //   console.error("Error in verifyOtp handler:", error);
  //     return {
  //       status: 500,
  //       message: 'An unexpected error occurred while verifying the OTP. Please try again later.',
  //       success: false,
  //       isEmailVerified: false
  //     };
  //   }
  // },
};

var _page_server = /*#__PURE__*/Object.freeze({
  __proto__: null,
  actions: actions
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-Cp0t6y6c.js')).default;
const server_id = "src/routes/contactus/+page.server.js";
const imports = ["_app/immutable/nodes/8.CuRd6gJQ.js","_app/immutable/chunks/1w2tVRpE.js","_app/immutable/chunks/IHki7fMi.js","_app/immutable/chunks/ITkS-TNF.js","_app/immutable/chunks/BtG5aEW1.js","_app/immutable/chunks/CzG5mwcR.js","_app/immutable/chunks/B5PH7vek.js","_app/immutable/chunks/BoqYbZC7.js","_app/immutable/chunks/B1gt4VIs.js"];
const stylesheets = ["_app/immutable/assets/Toaster.DQwrSZtH.css"];
const fonts = [];

export { component, fonts, imports, index, _page_server as server, server_id, stylesheets };
//# sourceMappingURL=8-DgkVRVGo.js.map
