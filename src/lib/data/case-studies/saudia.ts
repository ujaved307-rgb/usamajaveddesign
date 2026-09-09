import type { CaseStudy } from "@/lib/types";

export const saudia: CaseStudy = {
  slug: "saudiaairlines",
  title: "Redesigning the Flight Booking & Add-ons Experience",
  shortTitle: "Saudia Airlines",
  client: "Saudia Airlines",
  year: "2022",
  category: ["Aviation", "E-commerce"],
  role: "UX Research & Design",
  scope: "End-to-end booking + ancillary purchase journey, microsite",
  platform: "Web booking platform",
  cardTagline: "Redesigning the Flight Booking & Add-ons Experience for Saudia Airlines",
  hook: "Two research tracks, one national carrier: how do you make booking effortless without cheapening a premium brand?",
  heroImage: "https://framerusercontent.com/images/52ZBEjVhsuLQah3sAu4gUWdit8.jpg",
  impact: [
    { value: "25%", label: "faster booking completion" },
    { value: "20%", label: "increase in task success rate" },
    { value: "15%", label: "improvement in customer satisfaction" },
  ],
  sections: [
    {
      id: "snapshot",
      kicker: "01 — Snapshot",
      blocks: [
        {
          type: "paragraph",
          text: "Saudia Airlines is the national carrier of Saudi Arabia and one of the region's largest airlines, flying to over 90 destinations worldwide. Established in 1945 and a member of the SkyTeam alliance, it represents the Kingdom's hospitality and innovation in aviation.",
        },
        {
          type: "list",
          items: [
            "Role — usability research, experience design, high-fidelity flows, microsite concept",
            "Scope — end-to-end flight booking journey + ancillary add-ons",
          ],
        },
      ],
    },
    {
      id: "challenge",
      kicker: "02 — The Challenge",
      blocks: [
        {
          type: "paragraph",
          text: "Saudia aimed to modernize its digital booking experience while maintaining its premium brand positioning.",
        },
        {
          type: "list",
          items: [
            "Complex and lengthy booking journeys",
            "Confusing add-ons and pricing structures",
            "Inconsistent user experience across touchpoints",
            "Lack of clarity during key decision-making steps",
          ],
        },
        {
          type: "statement",
          text: "The goal: simplify booking, improve add-ons clarity, and create a seamless end-to-end travel experience.",
        },
        { type: "image", src: "https://framerusercontent.com/images/FhnCcMCBIntqnXQSJqKQsqbmZ3U.jpg", alt: "Saudia Airlines existing booking experience", wide: true },
      ],
    },
    {
      id: "approach",
      kicker: "03 — Approach",
      heading: "Two focused research tracks",
      blocks: [
        {
          type: "paragraph",
          text: "Flight Booking Experience (research-driven) — detailed usability testing on the existing booking flow to identify friction points, drop-offs and usability gaps, analyzing user behavior and decision patterns. Results were captured in a confidential findings document.",
        },
        {
          type: "gallery",
          images: [
            { src: "https://framerusercontent.com/images/ALOPudF6clyoLp3DUvlvo7Wfw.png", alt: "Usability testing session on Saudia's booking flow" },
            { src: "https://framerusercontent.com/images/AkNoXNqBqe0WacNR5aY9fwaNg.png", alt: "Usability testing findings on the booking journey" },
          ],
        },
        {
          type: "paragraph",
          text: "Add-ons Experience (guerilla testing) — quick, real-world guerilla usability sessions observing how users interact with extras such as seats, baggage and meals, and identifying confusion around pricing, selection and value perception.",
        },
        {
          type: "gallery",
          images: [
            { src: "https://framerusercontent.com/images/vBqJFaHx2BFtyRAo0dlSydwUA.png", alt: "Guerilla usability testing on the add-ons flow" },
            { src: "https://framerusercontent.com/images/57GUkXUiTEiGI4XLI4MUOMAbdQ.png", alt: "Guerilla testing findings on add-ons pricing clarity" },
          ],
        },
      ],
    },
    {
      id: "insights",
      kicker: "04 — Key Insights",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "42%", label: "of users found the booking flow intuitive (baseline)" },
            { value: "51%", label: "of users found add-ons pricing unclear or confusing" },
          ],
        },
        {
          type: "statement",
          text: "These insights directly informed design priorities — add-ons clarity became as important as booking speed.",
        },
      ],
    },
    {
      id: "solution",
      kicker: "05 — Solution",
      invert: true,
      blocks: [
        {
          type: "paragraph",
          text: "Booking experience redesign — simplified multi-step flows, reduced cognitive load and unnecessary steps, improved clarity in flight selection and progression, for a smoother, more intuitive journey.",
        },
        { type: "image", src: "https://framerusercontent.com/images/J4tPpKP4QNoQ8zYA091kWxTCG3Y.jpg", alt: "Redesigned Saudia Airlines booking flow", wide: true },
        {
          type: "paragraph",
          text: "Add-ons experience optimization — simplified pricing and selection of extras, improved visibility and understanding of add-ons, clearer decision points to reduce confusion, and a flow that feels seamless within booking rather than bolted on.",
        },
        { type: "image", src: "https://framerusercontent.com/images/0jtiG2WCyBxZGUfCYp6NumWPb2s.jpg", alt: "Redesigned Saudia Airlines add-ons selection screens", wide: true },
        {
          type: "paragraph",
          text: "Microsite experience — a dedicated microsite showcasing services and promotions, creating a more engaging, visually rich brand experience and improving discoverability of key offerings outside the booking flow.",
        },
        { type: "image", src: "https://framerusercontent.com/images/yoKtXtxbgZVqlXEIZY09siomqCw.jpg", alt: "Saudia Airlines promotional microsite", wide: true },
      ],
    },
    {
      id: "impact",
      kicker: "06 — The Result",
      blocks: [
        {
          type: "stats",
          items: [
            { value: "25%", label: "faster booking completion" },
            { value: "20%", label: "increase in task success rate" },
            { value: "15%", label: "improvement in customer satisfaction" },
          ],
        },
        {
          type: "paragraph",
          text: "The redesigned experience reduced friction, improved clarity, and created a more cohesive, premium travel journey.",
        },
        {
          type: "quote",
          text: "Breaking the problem into focused experience tracks — booking and add-ons — enabled deeper insights and more targeted impact.",
        },
      ],
    },
  ],
};
