const fs = require('fs');
const path = require('path');

const timelineData = {
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
      },
      {
        year: "1902",
        eventName: "Coronation of Alfonso XIII",
        figures: ["Alfonso XIII", "María Cristina of Austria"],
        details: "Alfonso XIII assumes the throne at age 16, ending the regency of his mother María Cristina. This marked the beginning of his personal rule in the Spanish Restoration period.",
        period: "Restoration",
        country: "Spain",
        regions: ["Iberian Peninsula"],
        topics: ["Monarchy", "Politics", "Royal Succession"],
        eventType: "political",
        resources: [{
          title: "Alfonso XIII and the Crisis of the Restoration",
          author: "Javier Moreno Luzón",
          year: "2003",
          type: "Historical Analysis",
          description: "Detailed study of Alfonso XIII's reign and its impact on Spanish politics",
          topics: ["Spanish Monarchy", "Political History"],
          resourceType: "book"
        }]
      },
      {
        year: "1909",
        eventName: "Tragic Week in Barcelona",
        figures: ["Antonio Maura", "Francesc Ferrer i Guàrdia"],
        details: "Week-long series of violent confrontations between the Spanish army and working-class protesters in Barcelona, triggered by the call-up of reserve troops for the Second Rif War in Morocco.",
        period: "Restoration",
        country: "Spain",
        regions: ["Catalonia", "Barcelona"],
        topics: ["Social Unrest", "Military Conflict", "Labor Movement"],
        eventType: "social",
        resources: [{
          title: "The Tragic Week: A Study of Anticlericalism in Spain",
          author: "Joan Connelly Ullman",
          year: "1968",
          type: "Historical Study",
          description: "Comprehensive analysis of the events and their social impact",
          topics: ["Social History", "Urban Conflict"],
          resourceType: "book"
        }]
      },
      {
        year: "1917",
        eventName: "Spanish Crisis of 1917",
        figures: ["Eduardo Dato", "Francisco Cambó"],
        details: "Multiple simultaneous challenges to the government including military juntas, a parliamentary assembly movement, and a general strike, marking a crucial moment in the decline of the Restoration system.",
        period: "Restoration",
        country: "Spain",
        regions: ["Iberian Peninsula"],
        topics: ["Political Crisis", "Labor Movement", "Military Reform"],
        eventType: "political",
        resources: [{
          title: "Spain's Crisis of 1917",
          author: "Francisco J. Romero Salvadó",
          year: "1999",
          type: "Academic Study",
          description: "Analysis of the multiple crises affecting Spain in 1917",
          topics: ["Political History", "Social Movements"],
          resourceType: "book"
        }]
      },
      {
        year: "1923",
        eventName: "Primo de Rivera Dictatorship",
        figures: ["Miguel Primo de Rivera", "Alfonso XIII"],
        details: "Military coup led by General Miguel Primo de Rivera, establishing a dictatorship with the support of King Alfonso XIII, aiming to solve Spain's ongoing political crisis.",
        period: "Dictatorship",
        country: "Spain",
        regions: ["Iberian Peninsula"],
        topics: ["Military Rule", "Authoritarianism", "Political Reform"],
        eventType: "political",
        resources: [{
          title: "Autoritarismo y poder personal",
          author: "Shlomo Ben-Ami",
          year: "1983",
          type: "Biography",
          description: "Study of Primo de Rivera's dictatorship and its impact",
          topics: ["Spanish Dictatorship", "Military Government"],
          resourceType: "book"
        }]
      },
      {
        year: "1931",
        eventName: "Proclamation of Second Republic",
        figures: ["Niceto Alcalá-Zamora", "Manuel Azaña"],
        details: "Following municipal elections and the departure of Alfonso XIII, the Second Spanish Republic is proclaimed, marking a significant shift towards democratic governance.",
        period: "Second Republic",
        country: "Spain",
        regions: ["Iberian Peninsula"],
        topics: ["Democracy", "Constitutional Reform", "Political Change"],
        eventType: "political",
        resources: [{
          title: "The Coming of the Spanish Civil War",
          author: "Paul Preston",
          year: "1994",
          type: "Historical Analysis",
          description: "Analysis of the Second Republic and the events leading to civil war",
          topics: ["Spanish Republic", "Political History"],
          resourceType: "book"
        }]
      },
      {
        year: "1936",
        eventName: "Outbreak of Spanish Civil War",
        figures: ["Francisco Franco", "Manuel Azaña", "Emilio Mola"],
        details: "Military uprising against the Republican government leads to the Spanish Civil War, beginning a three-year conflict that would reshape Spanish society.",
        period: "Civil War",
        country: "Spain",
        regions: ["Iberian Peninsula"],
        topics: ["Civil War", "Military Conflict", "Social Revolution"],
        eventType: "military",
        resources: [{
          title: "The Battle for Spain",
          author: "Antony Beevor",
          year: "2006",
          type: "Military History",
          description: "Comprehensive account of the Spanish Civil War",
          topics: ["Military History", "Political Conflict"],
          resourceType: "book"
        }]
      },
      {
        year: "1939",
        eventName: "End of Civil War and Franco's Victory",
        figures: ["Francisco Franco", "José Sanjurjo", "Gonzalo Queipo de Llano"],
        details: "Nationalist forces under Franco achieve victory, ending the Civil War and establishing Franco's dictatorship that would rule Spain for nearly four decades.",
        period: "Franco Regime",
        country: "Spain",
        regions: ["Iberian Peninsula"],
        topics: ["Civil War", "Dictatorship", "Political Repression"],
        eventType: "military",
        resources: [{
          title: "Franco's Spain",
          author: "Stanley G. Payne",
          year: "1987",
          type: "Historical Study",
          description: "Analysis of the establishment and early years of Franco's regime",
          topics: ["Spanish History", "Dictatorship"],
          resourceType: "book"
        }]
      },
      {
        year: "1953",
        eventName: "Pact of Madrid",
        figures: ["Francisco Franco", "Dwight D. Eisenhower"],
        details: "Spain signs agreements with the United States establishing American military bases in exchange for economic and military aid, marking Spain's integration into Western alliance system.",
        period: "Franco Regime",
        country: "Spain",
        regions: ["Iberian Peninsula", "United States"],
        topics: ["International Relations", "Military Cooperation", "Economic Aid"],
        eventType: "diplomatic",
        resources: [{
          title: "Spain and the United States",
          author: "Boris N. Liedtke",
          year: "1998",
          type: "Diplomatic History",
          description: "Study of Spanish-American relations during the Franco period",
          topics: ["International Relations", "Cold War"],
          resourceType: "book"
        }]
      },
      {
        year: "1959",
        eventName: "Stabilization Plan",
        figures: ["Francisco Franco", "Alberto Ullastres", "Mariano Navarro Rubio"],
        details: "Implementation of economic reforms ending autarchy and promoting liberalization, leading to the Spanish Miracle of the 1960s.",
        period: "Franco Regime",
        country: "Spain",
        regions: ["Iberian Peninsula"],
        topics: ["Economic Reform", "Modernization", "International Trade"],
        eventType: "economic",
        resources: [{
          title: "The Transformation of Spain",
          author: "David Gilmour",
          year: "1985",
          type: "Economic History",
          description: "Analysis of Spain's economic modernization under Franco",
          topics: ["Economic Development", "Social Change"],
          resourceType: "book"
        }]
      },
    // Add all your events here...
  ]
};

function generateSql() {
    let sql = 'BEGIN;\n\n';
    
    timelineData.events.forEach((event, index) => {
        // Insert main event
        sql += `-- ${event.eventName}\n`;
        sql += `WITH event_insert AS (\n`;
        sql += `    INSERT INTO events (year, event_name, details, period, country, event_type)\n`;
        sql += `    VALUES ('${event.year}', '${event.eventName.replace(/'/g, "''")}',\n`;
        sql += `            '${event.details.replace(/'/g, "''")}',\n`;
        sql += `            '${event.period}', '${event.country}', '${event.eventType}')\n`;
        sql += `    RETURNING id\n`;
        sql += `)\n`;

        // Insert figures
        if (event.figures && event.figures.length > 0) {
            sql += `INSERT INTO event_figures (event_id, figure_name)\n`;
            sql += `SELECT id, figure_name FROM event_insert, unnest(ARRAY[${
                event.figures.map(f => `'${f.replace(/'/g, "''")}'`).join(', ')
            }]) AS figure_name;\n\n`;
        }

        // Insert regions
        if (event.regions && event.regions.length > 0) {
            sql += `INSERT INTO event_regions (event_id, region_name)\n`;
            sql += `SELECT id, region_name FROM event_insert, unnest(ARRAY[${
                event.regions.map(r => `'${r.replace(/'/g, "''")}'`).join(', ')
            }]) AS region_name;\n\n`;
        }

        // Insert topics
        if (event.topics && event.topics.length > 0) {
            sql += `INSERT INTO event_topics (event_id, topic_name)\n`;
            sql += `SELECT id, topic_name FROM event_insert, unnest(ARRAY[${
                event.topics.map(t => `'${t.replace(/'/g, "''")}'`).join(', ')
            }]) AS topic_name;\n\n`;
        }

        // Insert resources
        if (event.resources && event.resources.length > 0) {
            event.resources.forEach(resource => {
                sql += `WITH resource_insert AS (\n`;
                sql += `    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)\n`;
                sql += `    SELECT id, '${resource.title.replace(/'/g, "''")}', '${resource.author.replace(/'/g, "''")}'
                        '${resource.year}', '${resource.type}', '${resource.description.replace(/'/g, "''")}',
                        '${resource.resourceType}'\n`;
                sql += `    FROM event_insert\n`;
                sql += `    RETURNING id\n`;
                sql += `)\n`;

                if (resource.topics && resource.topics.length > 0) {
                    sql += `INSERT INTO resource_topics (resource_id, topic_name)\n`;
                    sql += `SELECT id, topic_name FROM resource_insert, unnest(ARRAY[${
                        resource.topics.map(t => `'${t.replace(/'/g, "''")}'`).join(', ')
                    }]) AS topic_name;\n\n`;
                }
            });
        }

        sql += '\n';
    });

    sql += 'COMMIT;\n';
    return sql;
}

// Generate and save the SQL file
const sql = generateSql();
const outputPath = path.join(__dirname, 'insert_data.sql');
fs.writeFileSync(outputPath, sql);

console.log('SQL file generated successfully at:', outputPath);