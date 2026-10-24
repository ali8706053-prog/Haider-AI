export interface AudioSample {
  id: string;
  industry: string;
  title: string;
  personaName: string;
  duration: string;
  speedMs: number;
  description: string;
  transcript: {
    speaker: "Caller" | "Ringwell AI";
    text: string;
    timestamp: string;
  }[];
}

export const AUDIO_SAMPLES: AudioSample[] = [
  {
    id: "dental-clinic",
    industry: "Dental Practice",
    title: "Emergency Tooth Pain & Same-Day Booking",
    personaName: "Sarah (Apex Dental AI)",
    duration: "0:48",
    speedMs: 680,
    description: "Inbound caller experiencing severe tooth pain on a Saturday morning. The AI calms the patient, triages symptoms, and books a priority slot.",
    transcript: [
      {
        speaker: "Ringwell AI",
        text: "Thank you for calling Apex Dental! This is Sarah. How can I help you smile today?",
        timestamp: "0:02",
      },
      {
        speaker: "Caller",
        text: "Hi, yeah... I broke my molar chewing ice last night and it's throbbing really badly. Are you guys open today?",
        timestamp: "0:08",
      },
      {
        speaker: "Ringwell AI",
        text: "I'm so sorry you're dealing with that pain! Yes, we have our emergency doctor on call today. Are you experiencing any swelling or bleeding around the tooth?",
        timestamp: "0:16",
      },
      {
        speaker: "Caller",
        text: "No bleeding, but it hurts to drink cold water.",
        timestamp: "0:21",
      },
      {
        speaker: "Ringwell AI",
        text: "Understood. I can reserve an emergency exam slot with Dr. Mitchell today at 1:30 PM or 3:45 PM. Which works best for you?",
        timestamp: "0:30",
      },
      {
        speaker: "Caller",
        text: "1:30 PM is perfect, thank you so much.",
        timestamp: "0:35",
      },
      {
        speaker: "Ringwell AI",
        text: "You're all booked for 1:30 PM! I just sent a confirmation text to this number with our parking directions and a quick digital check-in form. We'll see you shortly!",
        timestamp: "0:45",
      },
    ],
  },
  {
    id: "hvac-emergency",
    industry: "HVAC & Plumbing",
    title: "Urgent AC Failure & Dispatch Triage",
    personaName: "Alex (Summit Climate AI)",
    duration: "0:42",
    speedMs: 720,
    description: "Caller with an AC unit blowing hot air in 95-degree heat. The AI checks address, collects equipment model, and dispatches an emergency technician.",
    transcript: [
      {
        speaker: "Ringwell AI",
        text: "Summit Climate Services, this is Alex. Are you calling for emergency service or regular maintenance?",
        timestamp: "0:02",
      },
      {
        speaker: "Caller",
        text: "Emergency! It's 95 degrees outside and our central air suddenly started blowing hot air. My elderly mother is at home.",
        timestamp: "0:09",
      },
      {
        speaker: "Ringwell AI",
        text: "Got it, let's get a technician out to you right away. May I confirm the service address is 742 Evergreen Terrace?",
        timestamp: "0:17",
      },
      {
        speaker: "Caller",
        text: "Yes, that's correct.",
        timestamp: "0:20",
      },
      {
        speaker: "Ringwell AI",
        text: "Our on-call technician Dave is in your neighborhood and can arrive between 12:00 PM and 1:00 PM. Our emergency diagnostic dispatch is $89, which rolls into repair costs. Shall I dispatch Dave?",
        timestamp: "0:31",
      },
      {
        speaker: "Caller",
        text: "Yes please, send him over!",
        timestamp: "0:34",
      },
      {
        speaker: "Ringwell AI",
        text: "Dave is dispatched! You'll receive a live tracking link via SMS in two minutes. Please keep your pets secured. We're on our way!",
        timestamp: "0:41",
      },
    ],
  },
  {
    id: "legal-intake",
    industry: "Legal / Law Firm",
    title: "Accident Intake & Attorney Screening",
    personaName: "Marcus (Vanguard Legal AI)",
    duration: "0:52",
    speedMs: 650,
    description: "Prospective personal injury client calling after an auto accident. The AI screens case statute, liability, and schedules an attorney review call.",
    transcript: [
      {
        speaker: "Ringwell AI",
        text: "Vanguard Law Group. Marcus speaking. How can our legal team assist you today?",
        timestamp: "0:03",
      },
      {
        speaker: "Caller",
        text: "Hi, I was rear-ended on Interstate 95 yesterday by a commercial delivery truck, and I'm not sure what to do about the medical bills.",
        timestamp: "0:12",
      },
      {
        speaker: "Ringwell AI",
        text: "I am so sorry to hear that. First and foremost, did you receive medical evaluation at an urgent care or ER?",
        timestamp: "0:19",
      },
      {
        speaker: "Caller",
        text: "Yes, the paramedics took me to Memorial Hospital. I have severe whiplash and shoulder contusions.",
        timestamp: "0:26",
      },
      {
        speaker: "Ringwell AI",
        text: "Understood. Did police file an official accident report on the scene, and was the commercial driver cited?",
        timestamp: "0:34",
      },
      {
        speaker: "Caller",
        text: "Yes, the state trooper gave the other driver a citation for following too closely.",
        timestamp: "0:40",
      },
      {
        speaker: "Ringwell AI",
        text: "Thank you for those details. Based on what you shared, our managing partner Attorney Sterling would like to conduct a complimentary case review with you today at 4:00 PM. Does that work for you?",
        timestamp: "0:50",
      },
    ],
  },
];
