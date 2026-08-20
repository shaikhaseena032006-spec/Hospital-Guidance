import type { UploadedDoc } from '@/types';

export const DUMMY_DOCUMENTS: UploadedDoc[] = [
  {
    id: 'doc-admission',
    name: 'Admission_Guidelines.pdf',
    size: 1_842_000,
    uploadedAt: Date.now() - 1000 * 60 * 60 * 24 * 3,
    status: 'ready',
  },
  {
    id: 'doc-emergency',
    name: 'Emergency_Procedures.pdf',
    size: 2_910_400,
    uploadedAt: Date.now() - 1000 * 60 * 60 * 24 * 2,
    status: 'ready',
  },
  {
    id: 'doc-infection',
    name: 'Infection_Control_SOP.pdf',
    size: 1_204_800,
    uploadedAt: Date.now() - 1000 * 60 * 60 * 26,
    status: 'ready',
  },
  {
    id: 'doc-medication',
    name: 'Medication_Guidelines.pdf',
    size: 3_382_000,
    uploadedAt: Date.now() - 1000 * 60 * 60 * 5,
    status: 'ready',
  },
];

interface DummyAnswer {
  answer: string;
  source: string;
  page: number;
}

const DUMMY_ANSWERS: DummyAnswer[] = [
  {
    answer:
      'To admit a patient, follow the standard admission protocol: verify the patient\u2019s identity with two identifiers, complete the admission assessment form, obtain vital signs, record allergies and current medications, and notify the on-call physician. For elective admissions, ensure prior authorization and insurance verification are completed at least 24 hours in advance. Refer to the admission checklist on page 8 of the guidelines for the full step-by-step workflow.',
    source: 'Admission_Guidelines.pdf',
    page: 8,
  },
  {
    answer:
      'In the event of a cardiac arrest, initiate the BLS algorithm immediately: confirm unresponsiveness, call for help and a defibrillator, begin chest compressions at 100\u2013120 per minute with a depth of 5\u20136 cm, and deliver rescue breaths at a 30:2 ratio. Apply the AED as soon as it arrives and follow its prompts. Continue resuscitation until the patient regains ROSC or a senior clinician pronounces. Detailed team roles and the post-arrest care pathway are described in the emergency procedures document.',
    source: 'Emergency_Procedures.pdf',
    page: 14,
  },
  {
    answer:
      'For standard infection control, perform hand hygiene using alcohol-based rub before and after every patient contact, don appropriate PPE based on the transmission risk, and follow the isolation precautions for known or suspected communicable diseases. Single-use equipment must be disposed of in the designated clinical waste stream. The full SOP, including outbreak response and environmental cleaning schedules, is outlined in the infection control document.',
    source: 'Infection_Control_SOP.pdf',
    page: 5,
  },
  {
    answer:
      'High-alert medications such as insulin, heparin, and opioids require an independent double-check by a second qualified clinician before administration. Confirm the seven rights: right patient, right drug, right dose, right route, right time, right documentation, and right reason. For intravenous medications, verify compatibility and infusion rate. Refer to the medication guidelines for the complete high-alert medication list and reconciliation procedure.',
    source: 'Medication_Guidelines.pdf',
    page: 11,
  },
  {
    answer:
      'Patient discharge planning should begin at admission. Confirm the discharge criteria are met (stable vitals, pain controlled, follow-up arranged), complete the discharge summary, review medications with the patient, and provide written instructions. For complex discharges, coordinate with social work and the primary care provider at least 48 hours in advance. The full discharge protocol is in the admission guidelines document.',
    source: 'Admission_Guidelines.pdf',
    page: 22,
  },
];

function pickAnswer(question: string): DummyAnswer {
  const q = question.toLowerCase();
  if (q.includes('admit') || q.includes('discharge') || q.includes('admission')) return DUMMY_ANSWERS[0];
  if (q.includes('arrest') || q.includes('emergency') || q.includes('code') || q.includes('cardiac'))
    return DUMMY_ANSWERS[1];
  if (q.includes('infection') || q.includes('hygiene') || q.includes('ppe') || q.includes('isolation'))
    return DUMMY_ANSWERS[2];
  if (q.includes('medication') || q.includes('drug') || q.includes('insulin') || q.includes('opioid'))
    return DUMMY_ANSWERS[3];
  if (q.includes('discharge')) return DUMMY_ANSWERS[4];
  // default fallback
  return {
    answer:
      'Based on the institutional guidelines, please consult the relevant procedure document for the full protocol. I can search across the uploaded documents for specific topics such as admission, emergency response, infection control, or medication administration. Try asking a more specific question, for example: "How do I admit a patient?" or "What is the infection control SOP?"',
    source: 'Admission_Guidelines.pdf',
    page: 3,
  };
}

export function getDummyAnswer(question: string): DummyAnswer {
  return pickAnswer(question);
}
