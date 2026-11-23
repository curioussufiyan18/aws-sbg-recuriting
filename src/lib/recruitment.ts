import { z } from "zod";

export const recruitmentYear = "2026–27";
export const roles = [
  { name: "Community Lead", tag: "THE CONNECTOR", description: "Bring people together. Set the direction and build a community where everyone belongs.", icon: "community" },
  { name: "Technical Lead", tag: "THE BUILDER", description: "Turn curiosity into code. Lead cloud workshops, projects, and hands-on learning.", icon: "technical" },
  { name: "Events Lead", tag: "THE MAKER", description: "Make things happen. Shape memorable meetups, hackathons, and campus experiences.", icon: "events" },
  { name: "Design Lead", tag: "THE CREATIVE", description: "Give our ideas an identity. Create visuals, stories, and experiences that stand out.", icon: "design" },
  { name: "Outreach Lead", tag: "THE VOICE", description: "Start conversations. Connect with students and share what our community is building.", icon: "outreach" },
] as const;
export const roleNames = ["Community Lead", "Technical Lead", "Events Lead", "Design Lead", "Outreach Lead"] as const;
export const years = ["1st year", "2nd year", "3rd year", "4th year", "Postgraduate", "Research scholar"] as const;
export const applicationSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name.").max(100),
  email: z.string().trim().email("Please enter a valid email.").max(255).transform(value => value.toLowerCase()),
  course: z.string().trim().min(2, "Please enter your course or department.").max(100),
  year: z.enum(years),
  role: z.enum(roleNames),
  motivation: z.string().trim().min(30, "Tell us a little more — at least 30 characters.").max(2000),
  consent: z.literal(true, { errorMap: () => ({ message: "Please agree before submitting." }) }),
});