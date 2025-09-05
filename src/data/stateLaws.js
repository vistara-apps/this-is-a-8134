// State-specific legal information database
export const stateLaws = {
  'AL': {
    state: 'Alabama',
    rightsSummary: 'You have the right to remain silent and request an attorney during any police interaction.',
    doSay: [
      'I am exercising my right to remain silent.',
      'I want to speak to a lawyer.',
      'I do not consent to any searches.',
      'Am I free to leave?'
    ],
    dontSay: [
      'I didn\'t do anything wrong.',
      'Why are you stopping me?',
      'This is harassment.',
      'I know my rights!'
    ],
    scriptEnglish: 'Officer, I am exercising my right to remain silent. I want to speak to a lawyer. I do not consent to any searches. Am I free to leave?',
    scriptSpanish: 'Oficial, estoy ejerciendo mi derecho a permanecer en silencio. Quiero hablar con un abogado. No consiento ningún registro. ¿Soy libre de irme?'
  },
  'CA': {
    state: 'California',
    rightsSummary: 'California has strong privacy protections. You can record police interactions and have the right to refuse consent searches.',
    doSay: [
      'I am exercising my right to remain silent.',
      'I want to speak to a lawyer.',
      'I do not consent to any searches.',
      'I am recording this interaction for my safety.'
    ],
    dontSay: [
      'You can\'t do this!',
      'I pay your salary!',
      'This is illegal!',
      'I\'m going to sue you!'
    ],
    scriptEnglish: 'Officer, I am exercising my right to remain silent. I want to speak to a lawyer. I do not consent to any searches. I am recording this interaction for my safety.',
    scriptSpanish: 'Oficial, estoy ejerciendo mi derecho a permanecer en silencio. Quiero hablar con un abogado. No consiento ningún registro. Estoy grabando esta interacción por mi seguridad.'
  },
  'NY': {
    state: 'New York',
    rightsSummary: 'New York recognizes your right to record police in public spaces and limits stop-and-frisk procedures.',
    doSay: [
      'I am exercising my right to remain silent.',
      'I want to speak to a lawyer.',
      'I do not consent to any searches.',
      'What is the reason for this stop?'
    ],
    dontSay: [
      'You have no right to stop me!',
      'I\'m not answering questions!',
      'This is unconstitutional!',
      'I\'m calling my lawyer right now!'
    ],
    scriptEnglish: 'Officer, I am exercising my right to remain silent. I want to speak to a lawyer. I do not consent to any searches. What is the reason for this stop?',
    scriptSpanish: 'Oficial, estoy ejerciendo mi derecho a permanecer en silencio. Quiero hablar con un abogado. No consiento ningún registro. ¿Cuál es la razón de esta parada?'
  },
  'TX': {
    state: 'Texas',
    rightsSummary: 'Texas law requires you to identify yourself if lawfully detained, but you can still exercise your right to remain silent beyond identification.',
    doSay: [
      'I am exercising my right to remain silent.',
      'I want to speak to a lawyer.',
      'I do not consent to any searches.',
      'Here is my identification.'
    ],
    dontSay: [
      'I don\'t have to show you anything!',
      'This is America!',
      'You\'re violating my rights!',
      'I\'m not doing anything wrong!'
    ],
    scriptEnglish: 'Officer, here is my identification. I am exercising my right to remain silent beyond providing my ID. I want to speak to a lawyer. I do not consent to any searches.',
    scriptSpanish: 'Oficial, aquí está mi identificación. Estoy ejerciendo mi derecho a permanecer en silencio más allá de proporcionar mi identificación. Quiero hablar con un abogado. No consiento ningún registro.'
  },
  'FL': {
    state: 'Florida',
    rightsSummary: 'Florida is a stop-and-identify state. You must provide identification when lawfully detained but can remain silent otherwise.',
    doSay: [
      'I am exercising my right to remain silent.',
      'I want to speak to a lawyer.',
      'I do not consent to any searches.',
      'Here is my identification as required.'
    ],
    dontSay: [
      'I don\'t have to talk to you!',
      'This is harassment!',
      'You can\'t make me!',
      'I\'m going to report you!'
    ],
    scriptEnglish: 'Officer, here is my identification as required. I am exercising my right to remain silent. I want to speak to a lawyer. I do not consent to any searches.',
    scriptSpanish: 'Oficial, aquí está mi identificación según se requiere. Estoy ejerciendo mi derecho a permanecer en silencio. Quiero hablar con un abogado. No consiento ningún registro.'
  }
};

export const US_STATES = [
  { code: 'AL', name: 'Alabama' },
  { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' },
  { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' },
  { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' },
  { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' },
  { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' },
  { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' },
  { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' },
  { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' },
  { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' },
  { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' },
  { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' },
  { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' },
  { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' },
  { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' },
  { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' },
  { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' },
  { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' },
  { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' },
  { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' },
  { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' },
  { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' },
  { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' },
  { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' },
  { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' },
  { code: 'WY', name: 'Wyoming' }
];