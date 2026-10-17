# KannadaConnect — 3–5 minute voice-over demo script

Target duration: about 4 minutes. Record your screen and voice; no face is required.

## 0:00–0:40 — Problem and requirements
Hello. My project is KannadaConnect, built for the Kannada Technology Challenge problem statement “Kannada for Everyone.” People who do not speak Kannada can face barriers when travelling, shopping, studying, or asking for everyday help. The goal is to make practical Kannada easier to learn through short phrases, real-life situations, and guided practice.

## 0:40–1:10 — Existing approach and gap
Learners may rely on phrase lists, dictionaries, or general language-learning resources. A list alone does not always offer a quick way to practise, check understanding, or track which phrases have been reviewed. KannadaConnect brings these beginner activities together in one responsive interface.

## 1:10–2:40 — Live demonstration
On the home page, show the situation cards: greetings, travel, shopping, healthcare, and work or study. Open the phrase library. Demonstrate the category filter and search. Point out that each phrase includes Kannada script, a transliteration approximation, and an English meaning. Click Listen to demonstrate browser speech playback if a Kannada voice is available. Mark a phrase as practised. Next, open Flashcards, reveal the meaning, and move to another card. Then open the Quiz, answer a question correctly and one incorrectly to show immediate feedback. Finish the quiz and show the score.

## 2:40–3:25 — Progress and approach
Open My progress. Explain that completed categories, practised phrases, and the best quiz score are stored locally in the browser. This keeps the demo simple and avoids collecting learner data on a server. The interface works on mobile and desktop. Speech playback depends on the user's browser and installed voices; this version does not claim to recognize or grade the user's spoken pronunciation.

## 3:25–4:05 — Technology and architecture
The frontend uses HTML, CSS, and vanilla JavaScript. The phrase data is stored in the application. Browser Speech Synthesis can speak a phrase, and localStorage saves progress. Because this is a static app, it does not need a backend server or paid API key. It can be deployed using GitHub Pages or another static host.

## 4:05–4:25 — Conclusion and future scope
KannadaConnect provides a simple starting point for learning useful Kannada in everyday contexts. Future improvements could include validation by native speakers, recorded audio, more regional phrase variations, accessible offline support, and optional speech recognition. Thank you.

## Recording checklist
- Use a readable screen resolution and zoom level.
- Test the deployed link in a private/incognito window.
- Do not show private browser tabs, email, passwords, or personal data.
- Keep the finished video between 3 and 5 minutes and check audio before submission.
