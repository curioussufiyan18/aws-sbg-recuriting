import { describe, expect, it } from "vitest";
import { applicationSchema, roles, recruitmentYear } from "@/lib/recruitment";

const valid = { name: "Test Builder", email: "builder@example.com", course: "Computer Science", year: "2nd year", role: "Technical Lead", motivation: "I would love to lead hands-on cloud workshops and support fellow students.", consent: true };
describe("Recruitment rules", () => {
  it("offers exactly five core team positions", () => { expect(roles).toHaveLength(5); });
  it("recruits for the 2026–27 team", () => { expect(recruitmentYear).toBe("2026–27"); });
  it("accepts the confirmed five positions", () => { expect(roles.map(role => role.name)).toEqual(["Community Lead", "Technical Lead", "Events Lead", "Design Lead", "Outreach Lead"]); });
  it("rejects applications for other roles", () => { expect(applicationSchema.safeParse({ ...valid, role: "President" }).success).toBe(false); });
  it("requires consent to submit personal information", () => { expect(applicationSchema.safeParse({ ...valid, consent: false }).success).toBe(false); });
  it("validates email and motivation", () => { expect(applicationSchema.safeParse(valid).success).toBe(true); expect(applicationSchema.safeParse({ ...valid, email: "invalid" }).success).toBe(false); expect(applicationSchema.safeParse({ ...valid, motivation: "Short" }).success).toBe(false); });
});