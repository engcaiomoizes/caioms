import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import nodemailer from "nodemailer";

// Confguração do transportador SMTP
const transporter = nodemailer.createTransport({
    host: import.meta.env.SMTP_HOST,
    port: Number(import.meta.env.SMTP_PORT),
    secure: true,
    auth: {
        user: import.meta.env.SMTP_USER,
        pass: import.meta.env.SMTP_PASS,
    },
});

export const server = {
    contact: defineAction({
        accept: 'form',
        input: z.object({
            name: z.string().min(2),
            email: z.string().email(),
            message: z.string().max(256),
        }),
        handler: async (input) => {
            try {
                await transporter.sendMail({
                    from: `"${input.name}" <${import.meta.env.SMTP_USER}>`,
                    to: import.meta.env.SMTP_USER,
                    replyTo: input.email,
                    subject: `💼 Contato Portfólio: ${input.name}`,
                    text: input.message,
                    html: `
                        <div style="font-family: sans-serif; line-height: 1.5; color: #333;">
                            <h2>Nova mensagem de contato</h2>
                            <p><strong>Nome:</strong> ${input.name}</p>
                            <p><strong>E-mail:</strong> ${input.email}</p>
                            <hr />
                            <p><strong>Mensagem:</strong></p>
                            <p style="white-space: pre-wrap;">${input.message}</p>
                        </div>
                    `,
                });

                return { success: true };
            } catch (err) {
                console.error("Erro Nodemailer:", err);
                throw new Error("Não foi possível enviar o e-mail no momento.");
            }
        },
    }),
};