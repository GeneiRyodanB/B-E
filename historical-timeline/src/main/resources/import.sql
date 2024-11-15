-- src/main/resources/import.sql
INSERT INTO book_contents (id, title, author, content) VALUES
    (nextval('hibernate_sequence'), 'Morocco That Was', 'Walter Harris',
     'Morocco That Was by Walter Harris

     Chapter 1: Introduction

     In the latter years of the nineteenth century Morocco remained a land apart, keeping its distance from the developing ambitions of European colonial powers. It was a country of infinite charm and variety, a paradise for painters, a happy hunting ground for diplomats, and a source of anxiety to governments...[rest of content]');

INSERT INTO book_contents (id, title, author, content) VALUES
    (nextval('hibernate_sequence'), 'Early Dynastic Egypt', 'Toby A. H. Wilkinson',
     'Early Dynastic Egypt by Toby A. H. Wilkinson

     Chapter 1: The Path to Unification

     The unification of Upper and Lower Egypt marks one of humanity''s first recorded attempts at nation-building...[rest of content]');