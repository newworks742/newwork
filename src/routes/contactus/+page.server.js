import { contactUs } from "$lib/server/mongoActions.js";
// import Data from "$lib/server/models/Data.js";
// import Profile from '$lib/server/models/Profile.js';
// import TokenVerification from '../../lib/server/models/TokenVerification';
// import { verifyemailOtp, sendemailOtp } from '$lib/server/mongoActions.js';
// import { APP_URL } from '$env/static/private';
// import { Digitoad } from '$env/static/public';
// import sendemail from '$lib/data/sendemail.json';
// import { sendNotificationEmail, sendEmailToUser } from '$lib/server/emailNotification.js';
// import { sanitizeFormData } from '$lib/utils/sanitize.js';
export const actions = {

  contactus: async ({ request }, event) => {
    try {
      const rawData = Object.fromEntries(await request.formData());
      const body = rawData;
      console.log("body", body);
      await contactUs(body);
      // async function getClientIP() {
      //   const response = await fetch('https://api.ipify.org?format=json');
      //   const data = await response.json();
      //   return data.ip;
      // }
      // const ipAddress = await getClientIP();
      // const updatedBodyWithIP = { ...body, ipAddress };

      // let emailContent = sendemail.emailTemplatecontact
      //   .replaceAll('{{Digitoad}}', Digitoad)
      //   .replaceAll('{{APP_URL}}', APP_URL)
      //   .replaceAll('{{name}}', body?.name || '')
      //   .replaceAll('{{email}}', body.email || '')
      //   .replaceAll('{{country}}', body.country || '')
      //   .replaceAll('{{phone}}', body.phone || '')
      //   .replaceAll('{{subject}}', body.subject || '')
      //   .replaceAll('{{message}}', body.message || '')
      //   .replaceAll('{{ipAddress}}', ipAddress);
      // try {
      //   await sendNotificationEmail(
      //     `New Contact Inquiry – ${Digitoad}`,
      //     emailContent
      //   );
      // } catch (error) {
      //   console.error('Error sending notification email to the team:', error);
      // }

      // let userEmailContent = sendemail.emailTemplatecontactuser
      //   .replaceAll('{{Digitoad}}', Digitoad)
      //   .replaceAll('{{APP_URL}}', APP_URL)
      //   .replaceAll('{{name}}', body.name || '')
      //   .replaceAll('{{email}}', body.email || '')
      //   .replaceAll('{{country}}', body.country || '')
      //   .replaceAll('{{phone}}', body.phone || '')
      //   .replaceAll('{{subject}}', body.subject || '')
      //   .replaceAll('{{message}}', body.message || '')

      // try {
      //   await sendEmailToUser(
      //     `Your Contact Inquiry Confirmation - ${Digitoad}`,
      //     userEmailContent,
      //     body.email
      //   );
      // } catch (error) {
      //   console.error('Error sending confirmation email to the user:', error);
      // }

      return {
        type: "success",
        data: {
          message: "Contact details submitted successfully!",
        },
      };
    } catch (error) {
      console.error("Error creating contact:", error);
      return {
        type: "error",
        data: {
          error: "Error submitting your data. Please try again later!",
        },
      };
    }
  },


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

// export const load = async ({ locals }) => {
//   if (!locals.user) {
//     // console.log('No authenticated user found');
//     return null;
//   }

//   const authedUser = { id: locals.user.userId };
//   // console.log(authedUser, "authedUser");
//   const userProfile = await Pub.findOne({ userId: authedUser.id });
//   // console.log(userProfile, "userProfile");
//   if (!userProfile) {
//     // console.log('User profile not found');
//     return null;
//   }
//   const finalResult = JSON.parse(JSON.stringify({ profile: userProfile }));
//   // console.log(finalResult, "finalResult");

//   return finalResult;
// };
