import { describe, expect, it } from "vitest";
import { validateContact } from "../contact";

const valid = {
  lastName: "Doe",
  firstName: "Jane",
  company: "Acme",
  jobTitle: "CDO",
  phone: "+33 6 12 34 56 78",
  email: "jane@acme.com",
  comment: "We want a demo.",
  consent: true,
};

describe("validateContact", () => {
  it("accepts a complete submission", () => expect(validateContact(valid)).toEqual({}));
  it("requires every field and consent", () => {
    const e = validateContact({});
    expect(Object.keys(e).sort()).toEqual(
      ["comment", "company", "consent", "email", "firstName", "jobTitle", "lastName", "phone"].sort(),
    );
  });
  it("rejects malformed email and phone with language-neutral codes", () => {
    const e = validateContact({ ...valid, email: "nope", phone: "abc" });
    expect(e).toEqual({ email: "invalid", phone: "invalid" });
  });
  it("flags overly long values", () => {
    expect(validateContact({ ...valid, comment: "x".repeat(4001) }).comment).toBe("too_long");
  });
});
