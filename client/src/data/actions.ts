// This line is important for the action to be executed on the server
"use server";

import { z } from "zod";
import { subscribeService } from "./services";

const subscribeSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address",
    }),
});


export async function subscribeAction(prevState: any, formData: FormData) {
    console.log("Our first server action");
    const email = formData.get("email");
    const validatedFields = subscribeSchema.safeParse({
        email: formData.get("email"),
    });

    if (!validatedFields.success) {

        console.dir(validatedFields.error.flatten().fieldErrors, { depth: null })

        return {
            ...prevState,
            zodErrors: validatedFields.error.flatten().fieldErrors,
            strapiErrors: null,
        };
    }

    const responseData = await subscribeService(validatedFields.data.email);

    if (!responseData) {
        return {
            ...prevState,
            strapiErrors: null,
            zodErrors: null,
            errorMessage: "Oops! An error occurred. Please try again later.",
        };
    }

    if (responseData.error) {
        return {
            ...prevState,
            strapiErrors: responseData.error,
            zodErrors: null,
            errorMessage: "Failed to subscribe.",
        };
    }

    return {
        ...prevState,
        strapiErrors: null,
        zodErrors: null,
        successMessage: "You have successfully subscribed!",
    }
}
