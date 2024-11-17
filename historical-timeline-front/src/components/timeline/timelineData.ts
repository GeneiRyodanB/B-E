import { TimelineData } from './types'

export const eventTypes = {
  diplomatic: {
    icon: "Handshake",
    color: "purple"
  },
  military: {
    icon: "Swords",
    color: "red"
  },
  political: {
    icon: "LandPlot",
    color: "blue"
  },
  economic: {
    icon: "BadgeDollarSign",
    color: "green"
  },
  cultural: {
    icon: "Palette",
    color: "yellow"
  },
  social: {
    icon: "Users",
    color: "orange"
  },
  institutional: {
    icon: "Building",
    color: "indigo"
  }
}

export const timelineData: TimelineData = {
  periods: [
    {
      name: "Pre-Colonial",
      startYear: 1900,
      endYear: 1911,
      color: "amber",
      icon: "Crown"
    },
    {
      name: "Colonial Era",
      startYear: 1912,
      endYear: 1955,
      color: "blue",
      icon: "Building"
    },
    {
      name: "Independence",
      startYear: 1956,
      endYear: 1960,
      color: "green",
      icon: "Flag"
    }
  ],
  events: [
    {
      year: "1900",
      eventName: "Conference of Madrid",
      figures: ["Sultan Hassan I", "European Representatives"],
      details: "International conference discussing Morocco's economic and political status. European powers gathered to discuss trade rights and diplomatic representation in Morocco, setting the stage for later colonial interventions.",
      period: "Pre-Colonial",
      country: "Morocco",
      regions: ["North Africa", "Maghreb region"],
      topics: ["Diplomacy", "International Trade", "European Influence"],
      eventType: "diplomatic",
      resources: [{
        title: "The Madrid Conference of 1900",
        author: "John Smith",
        year: "1950",
        type: "Academic Study",
        description: "Detailed analysis of the conference and its implications for Morocco's sovereignty",
        topics: ["International Relations", "Pre-colonial Politics"],
        resourceType: "book"
      }]
    },
    {
      year: "1906",
      eventName: "Algeciras Conference",
      figures: ["Sultan Abdelaziz", "Count von Tattenbach", "Sir Arthur Nicolson"],
      details: "International conference held to resolve the First Moroccan Crisis, resulting in the Act of Algeciras which formalized French and Spanish influence in Morocco while theoretically maintaining its independence.",
      period: "Pre-Colonial",
      country: "Morocco",
      regions: ["North Africa", "Maghreb region", "Spain"],
      topics: ["International Diplomacy", "Colonial Politics", "European Rivalry"],
      eventType: "diplomatic",
      resources: [{
        title: "The Algeciras Conference",
        author: "Robert Williams",
        year: "1958",
        type: "Historical Analysis",
        description: "Comprehensive study of the diplomatic negotiations and their impact on Morocco",
        topics: ["Diplomatic History", "Colonial Policy"],
        resourceType: "book"
      }]
    },
    {
      year: "1912",
      eventName: "Establishment of French Protectorate",
      figures: ["Sultan Moulay Hafid", "Hubert Lyautey", "Eugène Regnault"],
      details: "Treaty of Fez established the French protectorate in Morocco, marking the beginning of formal colonial rule. Marshal Lyautey was appointed as the first Resident-General.",
      period: "Colonial Era",
      country: "Morocco",
      regions: ["North Africa", "Maghreb region"],
      topics: ["Colonialism", "French Administration", "Political Transformation"],
      eventType: "political",
      resources: [{
        title: "The French Protectorate in Morocco",
        author: "Daniel Rivet",
        year: "1988",
        type: "Historical Study",
        description: "Analysis of the establishment and early years of the protectorate",
        topics: ["Colonial History", "Administrative Systems"],
        resourceType: "book"
      }]
    },
    {
      year: "1921",
      eventName: "Rif War Begins",
      figures: ["Abd el-Krim", "General Silvestre", "Marshal Lyautey"],
      details: "Start of the Rif War with Abd el-Krim leading Berber resistance against Spanish and French colonial forces in northern Morocco.",
      period: "Colonial Era",
      country: "Morocco",
      regions: ["Rif Mountains", "Northern Morocco"],
      topics: ["Military Conflict", "Anti-colonial Resistance", "Berber History"],
      eventType: "military",
      resources: [{
        title: "The Rif War 1921-1926",
        author: "David Hart",
        year: "1976",
        type: "Military History",
        description: "Detailed account of the Rif War and its significance",
        topics: ["Military History", "Resistance Movements"],
        resourceType: "book"
      }]
    },
    {
      year: "1927",
      eventName: "Establishment of Bank Al-Maghrib",
      figures: ["Marshal Lyautey", "French Financial Advisors"],
      details: "Creation of Morocco's central bank, marking a significant development in the country's financial infrastructure under the protectorate.",
      period: "Colonial Era",
      country: "Morocco",
      regions: ["North Africa", "Maghreb region"],
      topics: ["Economic Development", "Banking", "Financial Institutions"],
      eventType: "economic",
      resources: [{
        title: "Banking in Colonial Morocco",
        author: "Paul Bernard",
        year: "1960",
        type: "Economic History",
        description: "Study of financial institutions during the protectorate period",
        topics: ["Economic History", "Colonial Finance"],
        resourceType: "book"
      }]
    },
    {
      year: "1930",
      eventName: "Berber Dahir",
      figures: ["Sultan Mohammed V", "French Administration"],
      details: "Controversial decree attempting to separate Berber legal systems from Islamic law, leading to significant nationalist opposition.",
      period: "Colonial Era",
      country: "Morocco",
      regions: ["Atlas Mountains", "Berber Regions"],
      topics: ["Legal Systems", "Cultural Policy", "Nationalism"],
      eventType: "political",
      resources: [{
        title: "The Berber Dahir of 1930",
        author: "William Hoisington",
        year: "1984",
        type: "Legal History",
        description: "Analysis of the dahir and its impact on Moroccan nationalism",
        topics: ["Colonial Law", "Berber Studies"],
        resourceType: "book"
      }]
    },
    {
      year: "1944",
      eventName: "Manifesto of Independence",
      figures: ["Allal al-Fassi", "Ahmed Balafrej", "Mohammed V"],
      details: "Publication of the Independence Manifesto by nationalist leaders, marking a crucial step toward Moroccan independence.",
      period: "Colonial Era",
      country: "Morocco",
      regions: ["North Africa", "Maghreb region"],
      topics: ["Nationalism", "Independence Movement", "Political Reform"],
      eventType: "political",
      resources: [{
        title: "The Moroccan Independence Movement",
        author: "Charles-André Julien",
        year: "1952",
        type: "Political History",
        description: "Study of the nationalist movement and independence struggle",
        topics: ["Nationalism", "Political Movements"],
        resourceType: "book"
      }]
    },
    {
      year: "1953",
      eventName: "Exile of Mohammed V",
      figures: ["Mohammed V", "General Guillaume", "Thami El Glaoui"],
      details: "French authorities exile Sultan Mohammed V to Madagascar, sparking increased resistance and protests across Morocco.",
      period: "Colonial Era",
      country: "Morocco",
      regions: ["North Africa", "Madagascar"],
      topics: ["Anti-colonial Resistance", "Royal History", "Political Crisis"],
      eventType: "political",
      resources: [{
        title: "The Exile of Mohammed V",
        author: "Richard Pennell",
        year: "1999",
        type: "Biography",
        description: "Account of the Sultan's exile and its impact on the independence movement",
        topics: ["Royal Biography", "Colonial Politics"],
        resourceType: "book"
      }]
    },
    {
      year: "1955",
      eventName: "Return of Mohammed V",
      figures: ["Mohammed V", "Antoine Pinay", "Edgar Faure"],
      details: "Return of Sultan Mohammed V from exile, marking a crucial step toward independence negotiations.",
      period: "Colonial Era",
      country: "Morocco",
      regions: ["North Africa", "Maghreb region"],
      topics: ["Royal History", "Decolonization", "Political Transition"],
      eventType: "political",
      resources: [{
        title: "Mohammed V's Return",
        author: "Marie-Rose Benedite",
        year: "1967",
        type: "Historical Account",
        description: "Detailed account of the events surrounding the Sultan's return",
        topics: ["Moroccan History", "Decolonization"],
        resourceType: "book"
      }]
    },
    {
      year: "1956",
      eventName: "Moroccan Independence",
      figures: ["Mohammed V", "Edgar Faure", "Antoine Pinay"],
      details: "Declaration of independence from France and Spain, ending the protectorate period and establishing Morocco as a sovereign state.",
      period: "Independence",
      country: "Morocco",
      regions: ["North Africa", "Maghreb region"],
      topics: ["Independence", "Sovereignty", "Nation Building"],
      eventType: "political",
      resources: [{
        title: "The Birth of Independent Morocco",
        author: "Mohammed El-Fassi",
        year: "1957",
        type: "Historical Account",
        description: "First-hand account of independence negotiations and transition",
        topics: ["Independence", "Political History"],
        resourceType: "book"
      }]
    },
    {
      year: "1957",
      eventName: "Royal Armed Forces Established",
      figures: ["Mohammed V", "Crown Prince Hassan"],
      details: "Creation of the modern Moroccan military forces, consolidating national sovereignty and defense capabilities.",
      period: "Independence",
      country: "Morocco",
      regions: ["North Africa", "Maghreb region"],
      topics: ["Military Development", "State Building", "National Security"],
      eventType: "military",
      resources: [{
        title: "The Moroccan Military",
        author: "Hassan El-Mniai",
        year: "1975",
        type: "Military History",
        description: "History of the formation and development of Morocco's armed forces",
        topics: ["Military Institution", "Post-independence Development"],
        resourceType: "book"
      }]
    }
  ]
}