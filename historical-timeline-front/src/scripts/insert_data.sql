BEGIN;

-- Conference of Madrid
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1900', 'Conference of Madrid',
            'International conference discussing Morocco''s economic and political status. European powers gathered to discuss trade rights and diplomatic representation in Morocco, setting the stage for later colonial interventions.',
            'Pre-Colonial', 'Morocco', 'diplomatic')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Sultan Hassan I', 'European Representatives']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['North Africa', 'Maghreb region']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Diplomacy', 'International Trade', 'European Influence']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'The Madrid Conference of 1900', 'John Smith'
                        '1950', 'Academic Study', 'Detailed analysis of the conference and its implications for Morocco''s sovereignty',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['International Relations', 'Pre-colonial Politics']) AS topic_name;


-- Algeciras Conference
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1906', 'Algeciras Conference',
            'International conference held to resolve the First Moroccan Crisis, resulting in the Act of Algeciras which formalized French and Spanish influence in Morocco while theoretically maintaining its independence.',
            'Pre-Colonial', 'Morocco', 'diplomatic')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Sultan Abdelaziz', 'Count von Tattenbach', 'Sir Arthur Nicolson']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['North Africa', 'Maghreb region', 'Spain']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['International Diplomacy', 'Colonial Politics', 'European Rivalry']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'The Algeciras Conference', 'Robert Williams'
                        '1958', 'Historical Analysis', 'Comprehensive study of the diplomatic negotiations and their impact on Morocco',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Diplomatic History', 'Colonial Policy']) AS topic_name;


-- Establishment of French Protectorate
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1912', 'Establishment of French Protectorate',
            'Treaty of Fez established the French protectorate in Morocco, marking the beginning of formal colonial rule. Marshal Lyautey was appointed as the first Resident-General.',
            'Colonial Era', 'Morocco', 'political')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Sultan Moulay Hafid', 'Hubert Lyautey', 'Eugène Regnault']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['North Africa', 'Maghreb region']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Colonialism', 'French Administration', 'Political Transformation']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'The French Protectorate in Morocco', 'Daniel Rivet'
                        '1988', 'Historical Study', 'Analysis of the establishment and early years of the protectorate',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Colonial History', 'Administrative Systems']) AS topic_name;


-- Rif War Begins
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1921', 'Rif War Begins',
            'Start of the Rif War with Abd el-Krim leading Berber resistance against Spanish and French colonial forces in northern Morocco.',
            'Colonial Era', 'Morocco', 'military')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Abd el-Krim', 'General Silvestre', 'Marshal Lyautey']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['Rif Mountains', 'Northern Morocco']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Military Conflict', 'Anti-colonial Resistance', 'Berber History']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'The Rif War 1921-1926', 'David Hart'
                        '1976', 'Military History', 'Detailed account of the Rif War and its significance',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Military History', 'Resistance Movements']) AS topic_name;


-- Establishment of Bank Al-Maghrib
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1927', 'Establishment of Bank Al-Maghrib',
            'Creation of Morocco''s central bank, marking a significant development in the country''s financial infrastructure under the protectorate.',
            'Colonial Era', 'Morocco', 'economic')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Marshal Lyautey', 'French Financial Advisors']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['North Africa', 'Maghreb region']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Economic Development', 'Banking', 'Financial Institutions']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'Banking in Colonial Morocco', 'Paul Bernard'
                        '1960', 'Economic History', 'Study of financial institutions during the protectorate period',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Economic History', 'Colonial Finance']) AS topic_name;


-- Berber Dahir
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1930', 'Berber Dahir',
            'Controversial decree attempting to separate Berber legal systems from Islamic law, leading to significant nationalist opposition.',
            'Colonial Era', 'Morocco', 'political')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Sultan Mohammed V', 'French Administration']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['Atlas Mountains', 'Berber Regions']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Legal Systems', 'Cultural Policy', 'Nationalism']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'The Berber Dahir of 1930', 'William Hoisington'
                        '1984', 'Legal History', 'Analysis of the dahir and its impact on Moroccan nationalism',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Colonial Law', 'Berber Studies']) AS topic_name;


-- Manifesto of Independence
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1944', 'Manifesto of Independence',
            'Publication of the Independence Manifesto by nationalist leaders, marking a crucial step toward Moroccan independence.',
            'Colonial Era', 'Morocco', 'political')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Allal al-Fassi', 'Ahmed Balafrej', 'Mohammed V']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['North Africa', 'Maghreb region']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Nationalism', 'Independence Movement', 'Political Reform']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'The Moroccan Independence Movement', 'Charles-André Julien'
                        '1952', 'Political History', 'Study of the nationalist movement and independence struggle',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Nationalism', 'Political Movements']) AS topic_name;


-- Exile of Mohammed V
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1953', 'Exile of Mohammed V',
            'French authorities exile Sultan Mohammed V to Madagascar, sparking increased resistance and protests across Morocco.',
            'Colonial Era', 'Morocco', 'political')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Mohammed V', 'General Guillaume', 'Thami El Glaoui']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['North Africa', 'Madagascar']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Anti-colonial Resistance', 'Royal History', 'Political Crisis']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'The Exile of Mohammed V', 'Richard Pennell'
                        '1999', 'Biography', 'Account of the Sultan''s exile and its impact on the independence movement',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Royal Biography', 'Colonial Politics']) AS topic_name;


-- Return of Mohammed V
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1955', 'Return of Mohammed V',
            'Return of Sultan Mohammed V from exile, marking a crucial step toward independence negotiations.',
            'Colonial Era', 'Morocco', 'political')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Mohammed V', 'Antoine Pinay', 'Edgar Faure']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['North Africa', 'Maghreb region']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Royal History', 'Decolonization', 'Political Transition']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'Mohammed V''s Return', 'Marie-Rose Benedite'
                        '1967', 'Historical Account', 'Detailed account of the events surrounding the Sultan''s return',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Moroccan History', 'Decolonization']) AS topic_name;


-- Moroccan Independence
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1956', 'Moroccan Independence',
            'Declaration of independence from France and Spain, ending the protectorate period and establishing Morocco as a sovereign state.',
            'Independence', 'Morocco', 'political')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Mohammed V', 'Edgar Faure', 'Antoine Pinay']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['North Africa', 'Maghreb region']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Independence', 'Sovereignty', 'Nation Building']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'The Birth of Independent Morocco', 'Mohammed El-Fassi'
                        '1957', 'Historical Account', 'First-hand account of independence negotiations and transition',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Independence', 'Political History']) AS topic_name;


-- Royal Armed Forces Established
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1957', 'Royal Armed Forces Established',
            'Creation of the modern Moroccan military forces, consolidating national sovereignty and defense capabilities.',
            'Independence', 'Morocco', 'military')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Mohammed V', 'Crown Prince Hassan']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['North Africa', 'Maghreb region']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Military Development', 'State Building', 'National Security']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'The Moroccan Military', 'Hassan El-Mniai'
                        '1975', 'Military History', 'History of the formation and development of Morocco''s armed forces',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Military Institution', 'Post-independence Development']) AS topic_name;


-- Coronation of Alfonso XIII
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1902', 'Coronation of Alfonso XIII',
            'Alfonso XIII assumes the throne at age 16, ending the regency of his mother María Cristina. This marked the beginning of his personal rule in the Spanish Restoration period.',
            'Restoration', 'Spain', 'political')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Alfonso XIII', 'María Cristina of Austria']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['Iberian Peninsula']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Monarchy', 'Politics', 'Royal Succession']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'Alfonso XIII and the Crisis of the Restoration', 'Javier Moreno Luzón'
                        '2003', 'Historical Analysis', 'Detailed study of Alfonso XIII''s reign and its impact on Spanish politics',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Spanish Monarchy', 'Political History']) AS topic_name;


-- Tragic Week in Barcelona
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1909', 'Tragic Week in Barcelona',
            'Week-long series of violent confrontations between the Spanish army and working-class protesters in Barcelona, triggered by the call-up of reserve troops for the Second Rif War in Morocco.',
            'Restoration', 'Spain', 'social')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Antonio Maura', 'Francesc Ferrer i Guàrdia']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['Catalonia', 'Barcelona']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Social Unrest', 'Military Conflict', 'Labor Movement']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'The Tragic Week: A Study of Anticlericalism in Spain', 'Joan Connelly Ullman'
                        '1968', 'Historical Study', 'Comprehensive analysis of the events and their social impact',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Social History', 'Urban Conflict']) AS topic_name;


-- Spanish Crisis of 1917
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1917', 'Spanish Crisis of 1917',
            'Multiple simultaneous challenges to the government including military juntas, a parliamentary assembly movement, and a general strike, marking a crucial moment in the decline of the Restoration system.',
            'Restoration', 'Spain', 'political')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Eduardo Dato', 'Francisco Cambó']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['Iberian Peninsula']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Political Crisis', 'Labor Movement', 'Military Reform']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'Spain''s Crisis of 1917', 'Francisco J. Romero Salvadó'
                        '1999', 'Academic Study', 'Analysis of the multiple crises affecting Spain in 1917',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Political History', 'Social Movements']) AS topic_name;


-- Primo de Rivera Dictatorship
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1923', 'Primo de Rivera Dictatorship',
            'Military coup led by General Miguel Primo de Rivera, establishing a dictatorship with the support of King Alfonso XIII, aiming to solve Spain''s ongoing political crisis.',
            'Dictatorship', 'Spain', 'political')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Miguel Primo de Rivera', 'Alfonso XIII']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['Iberian Peninsula']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Military Rule', 'Authoritarianism', 'Political Reform']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'Autoritarismo y poder personal', 'Shlomo Ben-Ami'
                        '1983', 'Biography', 'Study of Primo de Rivera''s dictatorship and its impact',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Spanish Dictatorship', 'Military Government']) AS topic_name;


-- Proclamation of Second Republic
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1931', 'Proclamation of Second Republic',
            'Following municipal elections and the departure of Alfonso XIII, the Second Spanish Republic is proclaimed, marking a significant shift towards democratic governance.',
            'Second Republic', 'Spain', 'political')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Niceto Alcalá-Zamora', 'Manuel Azaña']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['Iberian Peninsula']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Democracy', 'Constitutional Reform', 'Political Change']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'The Coming of the Spanish Civil War', 'Paul Preston'
                        '1994', 'Historical Analysis', 'Analysis of the Second Republic and the events leading to civil war',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Spanish Republic', 'Political History']) AS topic_name;


-- Outbreak of Spanish Civil War
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1936', 'Outbreak of Spanish Civil War',
            'Military uprising against the Republican government leads to the Spanish Civil War, beginning a three-year conflict that would reshape Spanish society.',
            'Civil War', 'Spain', 'military')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Francisco Franco', 'Manuel Azaña', 'Emilio Mola']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['Iberian Peninsula']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Civil War', 'Military Conflict', 'Social Revolution']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'The Battle for Spain', 'Antony Beevor'
                        '2006', 'Military History', 'Comprehensive account of the Spanish Civil War',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Military History', 'Political Conflict']) AS topic_name;


-- End of Civil War and Franco's Victory
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1939', 'End of Civil War and Franco''s Victory',
            'Nationalist forces under Franco achieve victory, ending the Civil War and establishing Franco''s dictatorship that would rule Spain for nearly four decades.',
            'Franco Regime', 'Spain', 'military')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Francisco Franco', 'José Sanjurjo', 'Gonzalo Queipo de Llano']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['Iberian Peninsula']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Civil War', 'Dictatorship', 'Political Repression']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'Franco''s Spain', 'Stanley G. Payne'
                        '1987', 'Historical Study', 'Analysis of the establishment and early years of Franco''s regime',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Spanish History', 'Dictatorship']) AS topic_name;


-- Pact of Madrid
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1953', 'Pact of Madrid',
            'Spain signs agreements with the United States establishing American military bases in exchange for economic and military aid, marking Spain''s integration into Western alliance system.',
            'Franco Regime', 'Spain', 'diplomatic')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Francisco Franco', 'Dwight D. Eisenhower']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['Iberian Peninsula', 'United States']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['International Relations', 'Military Cooperation', 'Economic Aid']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'Spain and the United States', 'Boris N. Liedtke'
                        '1998', 'Diplomatic History', 'Study of Spanish-American relations during the Franco period',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['International Relations', 'Cold War']) AS topic_name;


-- Stabilization Plan
WITH event_insert AS (
    INSERT INTO events (year, event_name, details, period, country, event_type)
    VALUES ('1959', 'Stabilization Plan',
            'Implementation of economic reforms ending autarchy and promoting liberalization, leading to the Spanish Miracle of the 1960s.',
            'Franco Regime', 'Spain', 'economic')
    RETURNING id
)
INSERT INTO event_figures (event_id, figure_name)
SELECT id, figure_name FROM event_insert, unnest(ARRAY['Francisco Franco', 'Alberto Ullastres', 'Mariano Navarro Rubio']) AS figure_name;

INSERT INTO event_regions (event_id, region_name)
SELECT id, region_name FROM event_insert, unnest(ARRAY['Iberian Peninsula']) AS region_name;

INSERT INTO event_topics (event_id, topic_name)
SELECT id, topic_name FROM event_insert, unnest(ARRAY['Economic Reform', 'Modernization', 'International Trade']) AS topic_name;

WITH resource_insert AS (
    INSERT INTO resources (event_id, title, author, year, type, description, resource_type)
    SELECT id, 'The Transformation of Spain', 'David Gilmour'
                        '1985', 'Economic History', 'Analysis of Spain''s economic modernization under Franco',
                        'book'
    FROM event_insert
    RETURNING id
)
INSERT INTO resource_topics (resource_id, topic_name)
SELECT id, topic_name FROM resource_insert, unnest(ARRAY['Economic Development', 'Social Change']) AS topic_name;


COMMIT;
