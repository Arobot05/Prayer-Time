// Collection of daily hadiths - rotating collection
export interface Hadith {
  id: number;
  source: string;
  chapter: string;
  narrator: string;
  text: string;
  grade: string;
  reference?: string;
}

// Curated collection of authentic hadiths
export const HADITH_COLLECTION: Hadith[] = [
  {
    id: 1,
    source: "Sahih al-Bukhari",
    chapter: "Book of Beginning of Creation",
    narrator: "Abu Huraira",
    text: "The Prophet (ﷺ) said, 'Allah says: I am as My servant thinks I am. I am with him when he makes mention of Me. If he makes mention of Me to himself, I make mention of him to Myself.'",
    grade: "Sahih"
  },
  {
    id: 2,
    source: "Sahih Muslim",
    chapter: "Book of Remembrance",
    narrator: "Abu Huraira",
    text: "The Messenger of Allah (ﷺ) said: 'The five daily prayers and from one Friday prayer to (the next) Friday prayer is an expiation (of the sins committed in between their intervals) if major sins are not committed.'",
    grade: "Sahih"
  },
  {
    id: 3,
    source: "Sunan Ibn Majah",
    chapter: "The Chapters of Establishing the Prayer",
    narrator: "Abu Masud",
    text: "The Messenger of Allah (ﷺ) said: 'Whoever recites the last two Verses of Surat Al-Baqarah at night, that will be sufficient for him.'",
    grade: "Sahih"
  },
  {
    id: 4,
    source: "Sahih al-Bukhari",
    chapter: "Book of Supplications",
    narrator: "Abu Huraira",
    text: "The Prophet (ﷺ) said: 'Our Lord, the Blessed, the Superior, comes every night down on the nearest Heaven to us when the last third of the night remains, saying: Is there anyone to invoke Me, so that I may respond to invocation? Is there anyone to ask Me, so that I may grant him his request?'",
    grade: "Sahih"
  },
  {
    id: 5,
    source: "Sahih Muslim",
    chapter: "Book of Faith",
    narrator: "Umar ibn Al-Khattab",
    text: "Islam is based on (the following) five (pillars): To testify that none has the right to be worshipped but Allah and Muhammad is Allah's Messenger (ﷺ), to offer the prayers, to pay the Zakat, to fast (the month of Ramadan), and to perform Hajj (pilgrimage to Mecca).",
    grade: "Sahih"
  },
  {
    id: 6,
    source: "Jami at-Tirmidhi",
    chapter: "Book of Supplications",
    narrator: "Anas ibn Malik",
    text: "The Messenger of Allah (ﷺ) said: 'When you pass by the gardens of Paradise, then feast.' They said: 'And what are the gardens of Paradise?' He said: 'The gatherings of remembrance.'",
    grade: "Hasan"
  },
  {
    id: 7,
    source: "Sahih al-Bukhari",
    chapter: "Book of Prayer Times",
    narrator: "Abu Huraira",
    text: "The Prophet (ﷺ) said: 'The angels keep on asking Allah's forgiveness for anyone of you, as long as he is at his Musalla (praying place) and he does not pass wind. They say, 'O Allah! Forgive him, O Allah! be Merciful to him.'",
    grade: "Sahih"
  },
  {
    id: 8,
    source: "Sahih Muslim",
    chapter: "Book of Mosques",
    narrator: "Abu Huraira",
    text: "The Messenger of Allah (ﷺ) said: 'He who purified himself in his house, and then walked to one of the houses of Allah for the sake of performing an obligatory prayer, his every step would wipe out his sins and the other step would elevate his rank.'",
    grade: "Sahih"
  },
  {
    id: 9,
    source: "Sunan an-Nasa'i",
    chapter: "Book of the Adhan",
    narrator: "Abdullah ibn Umar",
    text: "The Messenger of Allah (ﷺ) said: 'When you hear the Mu'adhdhin, repeat what he says, then invoke blessings upon me, for whoever invokes blessings upon me, Allah will bestow ten blessings upon him.'",
    grade: "Sahih"
  },
  {
    id: 10,
    source: "Sahih al-Bukhari",
    chapter: "Book of Friday Prayer",
    narrator: "Abu Huraira",
    text: "The Prophet (ﷺ) said: 'Whoever takes a bath on Friday, purifies himself as much as he can, then uses his (hair) oil or perfumes himself with the scent of his house, then proceeds (for the Jumua prayer) and does not separate two persons sitting together (in the mosque), then prays as much as (Allah has) written for him and then remains silent while the Imam is delivering the Khutba, his sins in-between the present and the last Friday would be forgiven.'",
    grade: "Sahih"
  },
  {
    id: 11,
    source: "Riyad as-Salihin",
    chapter: "The Excellence of Reciting the Quran",
    narrator: "Uthman ibn Affan",
    text: "The Messenger of Allah (ﷺ) said: 'The best among you (Muslims) are those who learn the Quran and teach it.'",
    grade: "Sahih"
  },
  {
    id: 12,
    source: "Sahih Muslim",
    chapter: "Book of Virtue",
    narrator: "Aisha",
    text: "The Messenger of Allah (ﷺ) said: 'The most beloved deeds to Allah are those which are done continuously, even if they are small.'",
    grade: "Sahih"
  },
  {
    id: 13,
    source: "Sunan Ibn Majah",
    chapter: "Book of Etiquette",
    narrator: "Abu Darda",
    text: "The Messenger of Allah (ﷺ) said: 'Nothing is weightier on the Scale of Deeds than one's good manners.'",
    grade: "Hasan"
  },
  {
    id: 14,
    source: "Sahih al-Bukhari",
    chapter: "Book of Manners",
    narrator: "Abdullah ibn Amr",
    text: "The Prophet (ﷺ) was neither excessively abusive nor did he use to curse. When he would be angry, no one would know it from his face, but his face would redden.'",
    grade: "Sahih"
  },
  {
    id: 15,
    source: "Sahih Muslim",
    chapter: "Book of Good Manners",
    narrator: "Jabir ibn Abdullah",
    text: "The Messenger of Allah (ﷺ) said: 'The believers in their mutual kindness, compassion and sympathy are just like one body. When one of the limbs suffers, the whole body responds to it with wakefulness and fever.'",
    grade: "Sahih"
  },
  {
    id: 16,
    source: "Jami at-Tirmidhi",
    chapter: "Book of Righteousness",
    narrator: "Nu'man ibn Bashir",
    text: "The Messenger of Allah (ﷺ) said: 'The example of the believers in their affection, mercy, and compassion for each other is that of a body. When any limb aches, the whole body reacts with sleeplessness and fever.'",
    grade: "Sahih"
  },
  {
    id: 17,
    source: "Sahih al-Bukhari",
    chapter: "Book of Supplications",
    narrator: "Abu Huraira",
    text: "The Prophet (ﷺ) said: 'There is a (special) time on Friday when if a Muslim asks Allah for something good, He will give it to him.'",
    grade: "Sahih"
  },
  {
    id: 18,
    source: "Sahih Muslim",
    chapter: "Book of Dhikr",
    narrator: "Abu Huraira",
    text: "The Messenger of Allah (ﷺ) said: 'Whoever says SubhanAllahi wa bihamdihi one hundred times a day, his sins will be forgiven even if they are like the foam of the sea.'",
    grade: "Sahih"
  },
  {
    id: 19,
    source: "Sunan at-Tirmidhi",
    chapter: "Book of Supplications",
    narrator: "Anas ibn Malik",
    text: "The Messenger of Allah (ﷺ) said: 'Dua is the essence of worship.'",
    grade: "Hasan"
  },
  {
    id: 20,
    source: "Sahih al-Bukhari",
    chapter: "Book of Knowledge",
    narrator: "Abu Huraira",
    text: "The Prophet (ﷺ) said: 'Whoever follows a path in pursuit of knowledge, Allah will make easy for him a path to Paradise.'",
    grade: "Sahih"
  },
  {
    id: 21,
    source: "Sahih Muslim",
    chapter: "Book of Charity",
    narrator: "Abu Huraira",
    text: "The Messenger of Allah (ﷺ) said: 'Charity does not decrease wealth. No one forgives another except that Allah increases his honor. And no one humbles himself for the sake of Allah except that Allah raises his status.'",
    grade: "Sahih"
  },
  {
    id: 22,
    source: "Sunan Ibn Majah",
    chapter: "Book of Sunnah",
    narrator: "Abdullah ibn Masud",
    text: "The Messenger of Allah (ﷺ) said: 'Allah has divided mercy into one hundred parts, and He retained with Him ninety-nine parts, and sent down to earth one part.'",
    grade: "Sahih"
  },
  {
    id: 23,
    source: "Sahih al-Bukhari",
    chapter: "Book of Tawhid",
    narrator: "Abu Huraira",
    text: "The Prophet (ﷺ) said: 'Allah says: O son of Adam, free yourself for My worship, and I will fill your heart with richness and not poverty.'",
    grade: "Sahih"
  },
  {
    id: 24,
    source: "Sahih Muslim",
    chapter: "Book of Repentance",
    narrator: "Abu Huraira",
    text: "The Messenger of Allah (ﷺ) said: 'By the One in whose hand is my soul, if you did not sin, Allah would replace you with people who would sin, and they would seek forgiveness from Allah and He would forgive them.'",
    grade: "Sahih"
  },
  {
    id: 25,
    source: "Forty Hadith of Nawawi",
    chapter: "Hadith 1",
    narrator: "Umar ibn Al-Khattab",
    text: "Verily the reward of deeds depend upon the intentions, and every person will get the reward according to what he has intended.'",
    grade: "Sahih"
  },
  {
    id: 26,
    source: "Sahih al-Bukhari",
    chapter: "Book of Prayer",
    narrator: "Abu Huraira",
    text: "The Prophet (ﷺ) said: 'The first matter that the slave will be brought to account for on the Day of Judgment is the prayer. If it is sound, then the rest of his deeds will be sound. And if it is bad, then the rest of his deeds will be bad.'",
    grade: "Sahih"
  },
  {
    id: 27,
    source: "Sahih Muslim",
    chapter: "Book of Purification",
    narrator: "Abu Malik Al-Ashari",
    text: "The Messenger of Allah (ﷺ) said: 'Purity is half of iman (faith). Alhamdulillah (praise be to Allah) fills the scales, and SubhanAllah (glory be to Allah) and Alhamdulillah fill that which is between heaven and earth.'",
    grade: "Sahih"
  },
  {
    id: 28,
    source: "Sunan Abu Dawud",
    chapter: "Book of Manners",
    narrator: "Abdullah ibn Abbas",
    text: "The Messenger of Allah (ﷺ) said: 'He who has nothing to give as charity, let him speak kind words. And if he cannot do even that, let him do no harm to anyone.'",
    grade: "Hasan"
  },
  {
    id: 29,
    source: "Sahih al-Bukhari",
    chapter: "Book of Riqaq",
    narrator: "Ibn Umar",
    text: "The Prophet (ﷺ) said: 'Be in this world as if you were a stranger or a traveler.'",
    grade: "Sahih"
  },
  {
    id: 30,
    source: "Sahih Muslim",
    chapter: "Book of Paradise",
    narrator: "Sahl ibn Sa'd",
    text: "The Messenger of Allah (ﷺ) said: 'Paradise is surrounded by hardships and the Hell-Fire is surrounded by temptations.'",
    grade: "Sahih"
  }
];

// Get daily hadith based on date
export function getDailyHadith(date: Date = new Date()): Hadith {
  // Use the day of the year to select a hadith
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = date.getTime() - start.getTime();
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);
  
  // Cycle through the collection
  const index = dayOfYear % HADITH_COLLECTION.length;
  return HADITH_COLLECTION[index];
}

// Get random hadith
export function getRandomHadith(): Hadith {
  const index = Math.floor(Math.random() * HADITH_COLLECTION.length);
  return HADITH_COLLECTION[index];
}
