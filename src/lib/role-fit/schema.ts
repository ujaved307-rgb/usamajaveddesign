import { z } from "zod";

export const RoleFitResultSchema = z.object({
  matchScore: z
    .number()
    .int()
    .min(0)
    .max(100)
    .describe(
      "Honest estimate (0-100) of how well the candidate's real, documented background matches this specific job description. Do not default to a flattering number — a genuinely poor fit should score low."
    ),
  headline: z
    .string()
    .describe("One short, specific sentence (under 12 words) summarizing the overall fit."),
  strengths: z
    .array(z.string())
    .min(1)
    .max(5)
    .describe(
      "1-5 short bullet points (under 20 words each), each tied directly to something the job description actually asked for (a specific skill, responsibility, or qualification it named), paired with SPECIFIC, REAL evidence from the candidate's background that meets it — e.g. 'JD wants X — he's done Y'. Prioritize the JD's own stated requirements over generic strengths that aren't things this JD asked for. Never invent experience that isn't in the provided background."
    ),
  gaps: z
    .array(z.string())
    .max(4)
    .describe(
      "0-4 short, honest bullet points naming real gaps or mismatches versus this specific role. Frame each one constructively — as something to ramp up on or discuss in conversation — rather than as a blunt deficiency, without softening it into something false. Empty array only if there are genuinely none — don't manufacture a gap just to seem balanced."
    ),
  message: z
    .string()
    .describe(
      "A warm, first-person note (2-4 sentences) written AS Usama Javed, addressed to the recruiter/hiring manager who submitted the job description — honest about the result, inviting a conversation. Never fabricate claims not supported by the background provided."
    ),
});

export type RoleFitResult = z.infer<typeof RoleFitResultSchema>;
