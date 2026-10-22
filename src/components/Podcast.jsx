import React, { useEffect, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./podcast.css";

import keyboardStart from "../assets/podcast-keyboard/keyboard-start.png";
import keyboardMiddle from "../assets/podcast-keyboard/keyboard-middle-empty.png";
import keyboardEnd from "../assets/podcast-keyboard/keyboard-end.png";

import { CgMouse } from "react-icons/cg";
import {
  FaSpotify,
  FaPodcast,
  FaBroadcastTower,
  FaRss,
  FaSoundcloud,
  FaHeadphones,
} from "react-icons/fa";

import video1 from "../assets/podcast-episodes/video-1.webm";
import video2 from "../assets/podcast-episodes/video-2.webm";
import video3 from "../assets/podcast-episodes/video-3.webm";
import video4 from "../assets/podcast-episodes/video-4.webm";
import video5 from "../assets/podcast-episodes/video-5.webm";
import video6 from "../assets/podcast-episodes/video-6.webm";
import video7 from "../assets/podcast-episodes/video-7.webm";
import video8 from "../assets/podcast-episodes/video-8.webm";
import video9 from "../assets/podcast-episodes/video-9.webm";
import video10 from "../assets/podcast-episodes/video-10.webm";

import logoWhite from "../assets/podcast-white-logo.png";

gsap.registerPlugin(ScrollTrigger);

// Destroy global Lenis on this page — it sets overflow:hidden on <html> and stop() doesn't clear it
function useStopGlobalLenis() {
  useEffect(() => {
    const gl = window.lenis;
    if (gl) {
      gl.destroy();
      window.lenis = null;
    }
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    return () => {
      // global Lenis is gone for this session — it restarts on next full navigation
    };
  }, []);
}

const episodes = [
  {
    id: 1,
    video: video1,
    season: "Season 1",
    epNumText: "Episode 10",
    title: "The Therapy Shift",
    description: `This is the last episode of the season, and today I am going to tell you about several  shifts in psychiatry and psychotherapy over decades. This is a story about how treatment of mental illness went from torture and exile to an online-chat with a therapist.`,
  },
  {
    id: 2,
    video: video2,
    season: "Season 1",
    epNumText: "Episode 9",
    title: "The Employment Shift",
    description: `Hello there! I’m Anatoly Gromov and you’re listening to CTRL SHIFT!, a podcast by Libo/Libo studio and Humbleteam. From the very start of this season I’m telling stories of various shifts: our heroes are game-changers in science, medicine, society,and other industries. But that got me thinking: what about the most common, mundane shift? Basically when people switch from being employed by an enterprise to being self-employed. Well, maybe not every single story like that changes the world, but … It’s something that a lot of us can relate to.\n\nYou might be a start-upper who has just finished this challenging journey, or you might run your own coffee shop or maybe you’re an employee who keeps wondering what it’s like being your own boss? I’m sure, everybody has thought about it. You know, it’s like all teenagers have that “I’ll-have my-own-band!” phase - I certainly went through it. That’s not a figure of speech, I had a band but that’s a story for another time. And today I want to talk about these shifts - I’ll tell you 3 different stories of people who left their corporate jobs to start their own business. Since I’m a designer myself and work for a consultancy…. you guessed it, for this episode I talked to designers, good friends of mine, who once took that risk. We will talk to Anton&Irene of Anton&Irene, creative directors turned design power-duo, Sergey & Anton, our friends from Humbleteam, a product design agency I mentioned once or twice in this podacst, and a designer and serial startup founder Tobias van Schneider.`,
  },
  {
    id: 3,
    video: video9,
    season: "Season 1",
    epNumText: "Episode 8",
    title: "The Startup Shift",
    description: `Alex Stephany is an entrepreneur from London with a startup breaking barriers in the sharing economy. One day a homeless man at a tube station drew his attention, and after striking up a conversation with him, suddenly, everything fell into place. Alex realized that everything he had worked on up to that point was a key to helping this man. So how did Alex shift from building an app to helping hundreds of people get off the streets?\n\nThis podcast is made by libo/libo podcast's studio and Humbleteam. Humbleteam designs successful digital products for startups and enterprises in all business sectors on land, at sea, and in space.\n\nJames is a white man in a nice suit. He is working his concierge hours at a lovely condo in London. He likes safety, and he likes to provide safety, so he's really happy to have this job. What's so surprising about it? — It was not so long ago that James was homeless, sleeping on a bench, and not being able to pay his bills or find a decent job. But now things are looking up for him, and he's finally getting some stability in his life.\n\nAndrea is a middle-aged brunette working in IT. She used to work as a masseur because she likes to help people, especially to help them heal. But when the pandemic started, she lost her job. The loss of the only source of income and an ongoing conflict with her roommate almost made her go live in the streets. But it's all good now: Andrea is working for a foundation helping people get proper healthcare - in a sense, she once again helps people heal.\n\nAlex Stephanie is a young startup founder. He used to work on an app which got impressive market capitalization. Once, at a subway station, he met a homeless man and decided to buy him a coffee. Then he caught himself thinking if there were other ways to help. Now James, Andrea, and more than 300 formerly homeless people can thank Alex for literally taking them out of the streets and helping to start over their lives.\n\nListen to this gripping story in episode 2.`,
  },
  {
    id: 4,
    video: video10,
    season: "Season 1",
    epNumText: "Episode 7",
    title: "The Research Shift",
    description: `An american biologist Gregory Goodwin Pincus was the first scientist to experiment with in vitro fertilization and even achieve some level of success. But his legacy turned out to be the exact opposite. In collaboration with feminists Margaret Sanger and Katharine McCormick and a gynecologist, John Rock, he invented and brought to market the first oral contraceptive pill. How did such a U-turn happen?\n\nThis podcast is made by libo/libo podcast's studio and Humbleteam. Humbleteam designs successful digital products for startups and enterprises in all business sectors on land, at sea, and in space.\n\nApril 7, 1967. The 'Time' magazine comes out with a very unusual cover. It used to feature a portrait, but this week it was a bright collage — dozens of colorful pills shaped like the Venus symbol. The headline read: 'The Pill'. The issue's main topic was birth control pills, which, 10 years prior, in 1957, had successfully entered the market.\n\nThe main article focused not so much on the medical aspect of the topic but the social change brought by the 'Wonder pill'. It was the first medication prescribed for people with no health issues. It wasn't meant to cure but to improve the quality of life. And then, it was The Pill that liberated women in the 1960s and became one of the main drivers of the sexual revolution.\n\nThe author of the article was also hoping that people will start using the pill and save the planet from a menacing overpopulation crisis, global poverty, and world hunger. The cost of this revolutionary pill was only 11 cent per pill. $2 a month — the price of four Mac hamburgers.\n\nWhen the issue came out, 13 million women in the world were already using the pill. All of them — as well as the pharmaceutical companies that were welcoming a new lucrative market, owed it to Gregory Pincus, a biologist. He is the one who is credited with the invention of oral contraceptives.\n\nIronically, at the start of his career, Pincus was going in the opposite direction. He was working on the IVF (In vitro fertilization) technology. His effort was focused on helping those women who, on the contrary, couldn't get pregnant.\n\nSo how did such a U-turn happen?\n\nListen to episode 1 to find it out.`,
  },
  {
    id: 5,
    video: video4,
    season: "Season 1",
    epNumText: "Episode 6",
    title: "The Rosé Shift",
    description: `Imagine a sunny beach in Miami. Glittering beau monde with tanned bodies, laughing, surfing, flirting, smiling. Sounds of the ocean. A very relaxing vibe. Time seems to have stopped here so that everyone can only rest and enjoy themselves.\n\nBut wait — fuss and panic starts? at the beachside bar. Manager’s face is convulsing. He’s running around, screaming, glued to the phone, and he’s obviously on the edge.\n\nThe bar has run out of premium rosé. The elegant crowd must not suffer such a blow. They must get what they want. That’s why a helicopter is urgently called. It will be here in a short time, and the bar staff will unload cases with long-awaited pale-pink bottles. Then this ambrosia will fill up the luxurious glasses again. The harmony will be restored.\n\nNo doubt, rose is really booming today. The world has literally gone crazy over it. But as a matter of fact, 15 years ago everything was completely different. It was hard to imagine then that rose would become the most fast-growing category of wine both in production and consumption.\n\nSince about that time the average price of a bottle has grown three fold – from 5 to 15 euros. Moreover, really, really expensive rose wine appears. There are wines that are almost 200 euros per bottle. It is, how shall I put it, nonsense! Rose wine is light and “young”, it’s not a part of some great collection wines from old cellars so  people do not pay for aging. Nevertheless, not so long ago the drink won its place in the highest wine ranks. How come?\n\nThat’s because about 15 years ago one person placed a bet on it. He wanted to create an absolutely beautiful, expensive and elegant rose that would totally reshape the attitude towards it. And he did so – as well as changed the wine industry itself. This person’s name is Sasha Lichine, he’s French, also a bit American and a bit Russian, and by and large he’s a very risky guy with great intuition.\n\nHi and welcome to “Control Shift”, a podcast by Libo/Libo studio and Humble Team. My name is Anatoliy Gromov and I am your host.  In this podcast we discuss stories of professionals, their shifts and most importantly, the difference they make in the world.\n\nToday I’ll tell you a story of a shift in the change-averse industry that is based on centuries-old traditions. It all happened because one person could not be satisfied with his legacy and success and was striving for something more.`,
  },
  {
    id: 6,
    video: video7,
    season: "Season 1",
    epNumText: "Episode 5",
    title: "The Career Shift",
    description: `Do you know what it takes to become a scientist? You spend at least 9 years in a closed community that lives by a particularly rigid set of rules and ethical principles — it's almost the way of the warrior. Then, if you make the cut, you become a domain expert in a very narrow field. Nevertheless, it's not uncommon to leave the scientific field after only a few years. So what happens before the leap?\n\nThis podcast is made by libo/libo podcast's studio and Humbleteam. Humbleteam designs successful digital products for startups and enterprises in all business sectors on land, at sea, and in space.\n\nWe all know Isaac Newton as the father of modern physics: he formulated the law of universal gravity, built the first reflecting telescope, and split the white light into a spectrum with a lens. Amid all these achievements, one short article written by Newton in 1695 gets a bit lost. Its title is “On the Amendment of English Coins”.\n\nIn the late 17th century, England was suffering from devastating depreciation of its primary coin – the silver shilling. Back then, money was molded from pure metal, and some dishonest citizens would cut the edges of the coins off. Moreover, counterfeiters would put coins with impurities into use. Low-quality coins comprised about 95% of money in circulation!\n\nThe English coin needed to have its value back so that inflation could be stopped. First Lord of the Treasury Charles Montague was the one to solve that problem. Just like Newton, he graduated from Trinity College in Cambridge. He happened to notice that article, and he was so impressed that he offered Newton the position of Warden of the Royal Mint. And you know what? Newton, age 57, said yes! He created a network of branches of Mint across the whole country, withdrew all the “bad coins” from circulation, and minted new ones – all of the same weight and fineness. Nothing could threaten the country's money standard anymore.\n\nWhy would I even tell you that? Whilst looking for stories for this podcast, we were constantly bumping into scientists who left science for something else. Namely, to sell lab-grown meat, to create biodegradable shoes, to consult think tanks, or to work for the government. And if you think about it, these cases are much more impressive than Newton's shift.\n\nTune in to episode 4 to learn about them.`,
  },
  {
    id: 7,
    video: video6,
    season: "Season 1",
    epNumText: "Episode 4",
    title: "The Poker Shift",
    description: `Today poker is not about cowboy hats, smoke-filled casinos, and lost family wealth. Over the last century, the game changed economics, political science, and several other spheres. Poker also made possible AI that bluffs like a real human! And besides all these world-shaking developments in this episode, we'll also tell a curious story about a writer who started playing to understand the role of luck in life. What did she find out?\n\nThis podcast is made by libo/libo podcast's studio and Humbleteam. Humbleteam designs successful digital products for startups and enterprises in all business sectors on land, at sea and in space.\n\nThe year is twenty nineteen (2019), the 49th World Economic Forum in Davos is taking place. There is still a year before the pandemic, so de-globalization, total scepticism, the US-China trade war, cyber attacks, fake news, and the inevitable climate change catastrophe are on the table. Politicians and economists feel quite uneasy. The journalists, who had attended the forum, claimed it to be one of the darkest and most pessimistic events in the entire history of Davos meetings.\n\nA young American writer is probably the only speaker who is smiling and even trying to make jokes. The topic of her report is "The Psychology of the Con: How Not to Get Fooled". It feels like she came to Switzerland to ease the tension and to remind everyone that, in the long run, cooperation is more beneficial than conflicts.\n\nThe author's name is Maria Konnikova. She was introduced as a Harvard graduate, Doctor of Psychology, and an author of two books, both of which have hit the bestseller list of the New York Times. And at some point in her speech in front of all those presidents, ministers, brokers of the world's biggest stock exchanges, and other big shots, Maria suddenly starts to talk about… poker.\n\nThe thing is, Maria Konnikova was invited to Davos while she was working on her third book, which was exactly about poker. Prior to that, the writer had been studying the decision-making and the relationship between will, effort and luck in our life. This search for answers brought Maria to the game, and she was invited to share her experience with the establishment. As we'll find out later, Maria is not the only person who came to realize that poker strategies can be successfully applied outside the game. For instance, in politics.\n\nSounds interesting? Tune in to episode 5.`,
  },
  {
    id: 8,
    video: video5,
    season: "Season 1",
    epNumText: "Episode 3",
    title: "The Addiction Shift",
    description: `100 years ago addicts were considered second-class citizens in the US. Their morality was questioned, they did not get any help whatsoever, and according to law, they were criminals. Now addicts are treated as patients, and their conditions are seen as a part of human nature. How did a psychiatrist, a scientist, and an anesthesiologist make this shift in understanding addiction happen?\n\nThis podcast is made by libo/libo podcast's studio and Humbleteam. Humbleteam designs successful digital products for startups and enterprises in all business sectors on land, at sea, and in space.\n\nIs there a thing duller than a long wait in a doctor's office lobby? Imagine it's 5 A.M., and you are stuck in one. The interior is mundane and ordinary. Rows of faux leather chairs, squeaky to touch. Muted Seinfeld reruns on a TV in the corner. Tired-looking patients are staring down at their screens. But unlike regular clinic visitors, every one of them has opioid dependence. They are here to prevent withdrawals before their workday starts.\n\nIf you live in the United States, chances are you drove or walked by a place like that, not even realizing it. There is rarely a sign above the front windows. You could only learn a facility's name by stepping in or searching for one online. The New Light Recovery Center, Sunshine Institute, Second Chance Clinic. More than three hundred thousand Americans are enrolled in the programs these places provide. The number may seem significant, but with 10 million people who are addicted to opioids in the country, it may not be big enough.\n\nWhen it is time, the nurse will call a patient's name, and they will walk into a simple first aid room. The patient will sit on the exam table, and the doctor will give them a disposable medicine cap with tablets of methadone and some water. After the addict takes their medicine, they will see the same lobby, the same nurse, and the same doctor 24 hours later. This unexciting ritual makes it possible for them to hold jobs, raise children, go on vacations, and vote - to have a normal life.\n\nBut commuting to a clinic every day seems like a lot of trouble for a pill. That's because methadone, like street heroin, is an opioid. Every dose of it is carefully decided, and every pill must be accounted for. For most people, methadone is a dangerous drug. For opioid users, methadone is a lifesaver in the very literal sense.\n\nBut before the benefits of methadone became evident, drug addicts had little chance to not only overcome their addiction but even be considered medical patients in need. That changed when a psychiatrist who treated addicted jazz musicians, a scientist who researched metabolic disorders, and an anesthesiologist from the inner city challenged the status quo.\n\nFind out more in episode 6.`,
  },
  {
    id: 9,
    video: video3,
    season: "Season 1",
    epNumText: "Episode 2",
    title: "The Сannabis Shift",
    description: `The cannabis shift: from criminalization to post-war reconstruction.\n\nWhen you hear „cannabis“ you most certainly think of a drug. But few know that cannabis is an incredibly multifaceted plant. Todd Scattini, a retired Army Lieutenant Colonel even thinks that it can become the key element in the post-war reconstruction of Ukraine. How so?\n\nLieutenant colonel Todd Scattini became an integral part of the US highest military and diplomatic circles. During these years he worked in Belgium,  Bosnia and Herzegovina, France and Afghanistan and learned  6 languages, including Russian, Czech, and German. He also gathered a collection of military paraphernalia and souvenirs from his vast travels. He keeps them in his office — one of them is a toy-size shining bulawa, a traditional Ukrainian weapon that looks a lot like a mace. After 27 years of service Todd retired. He is a businessman, who lives a normal civilian life in Kansas City, Missouri. But when the war in Ukraine started, he remembered his military experience and a long-forgotten idea reappeared. Now Todd has a plan: when the war is ended and reconstruction begins, one thing mustn’t be overlooked for it has tremendous potential. The thing that can revive Ukraine’s economy is cannabis.`,
  },
  {
    id: 10,
    video: video8,
    season: "Season 1",
    epNumText: "Episode 1",
    title: "The Algorithm Shift",
    description: `In the 60s two mathematicians came up with an algorithm. The scientists jokingly suggested it should be used for matchmaking but never actually proposed a practical application. Half a century later, another scientist came up with an unconventional use case for the algorithm and proceeded with its implementation. So how did an abstract game theory model lead to a revolution in transplantology and thousands of lives saved?\n\nThis podcast is made by libo/libo podcast's studio and Humbleteam. Humbleteam designs successful digital products for startups and enterprises in all business sectors on land, at sea and in space.\n\nImagine a situation — which, I'm sure, is familiar to you: you're working on your laptop and there's a notification popping on the screen — a letter from an HR. You had an interview with them a week ago, and now they are sending you an offer. You're happy, for sure, — well. you've just been offered a job. But you also have a problem to solve.\n\nThe thing is: there are other companies that you're expecting a reply from, and you'd rather take an offer from one of those. But you don't know yet if this offer will ever come. So you have to win yourself some time by not replying immediately, in case an HR from one of those companies writes back to you. Meanwhile, the HR who DID write to you with an actual offer will not wait forever… They have 2 options: either to start contacting other candidates or to hire you. They give you a week to decide. So you have a hard decision to make without the luxury of being fully informed.\n\nYeah, been there done that. But it's not only our headache!. This is actually a legit subject of scientific research - game theory and economics.\n\nAnd one day, when a bunch of economists were working to solve a similar puzzle, they began to … save lives! Yes, they made an actual revolution in transplantology.\n\nHi and welcome to “Control Shift”, a podcast by Libo/Libo studio and Humble Team. My name is Anatoliy Gromov and I am your host.\n\nIn this podcast we discuss stories of professionals from different spheres, their shifts and most importantly, the difference they make in the world. And this time I am going to tell you how a shift in perspective can help you solve a seemingly unsolvable problem.  We'll talk medicine, we'll talk marriages, we'll do a bit of math and we'll even talk to a Nobel Prize winner. Let's get to it.\n\nSo, what do our everyday problems, like landing a dream job, have to do with science? Well, game theory studies complicated situations where  players' decisions and outcomes are interdependable. That's called 'strategic interactions'. And the job situation we've described definitely calls for a strategy.\n\nOkay, sure but is that really a matter of economics? Yes! Basically, from a typical economics perspective this situation is a market (economists are like that, they generally look at everything as a market)\n\nBut, these kind of situations are not, well, an ordinary market .They are ruled not by money but by preferences of both sides involved. Let's talk about those kinds of markets a little more, because that's something we will be focusing on today.\n\nTune in to episode 3.`,
  },
];

const ListenOnWidget = ({ isOpen, onToggle, className = "" }) => {
  return (
    <div
      className={`listen-on-widget ${className}`}
      onClick={(e) => e.stopPropagation()}
    >
      {isOpen && (
        <div className="listen-popup-card">
          <div className="listen-popup-icons">
            <a
              href="https://podcasts.google.com"
              target="_blank"
              rel="noreferrer"
              className="popup-platform-btn"
              aria-label="Google Podcasts"
            >
              <FaBroadcastTower />
            </a>
            <a
              href="https://soundcloud.com"
              target="_blank"
              rel="noreferrer"
              className="popup-platform-btn"
              aria-label="SoundCloud"
            >
              <FaSoundcloud />
            </a>
            <a
              href="https://pocketcasts.com"
              target="_blank"
              rel="noreferrer"
              className="popup-platform-btn"
              aria-label="Pocket Casts"
            >
              <FaRss />
            </a>
            <a
              href="https://overcast.fm"
              target="_blank"
              rel="noreferrer"
              className="popup-platform-btn"
              aria-label="Overcast"
            >
              <FaHeadphones />
            </a>
            <a
              href="https://castbox.fm"
              target="_blank"
              rel="noreferrer"
              className="popup-platform-btn"
              aria-label="Castbox"
            >
              <FaPodcast />
            </a>
            <a
              href="https://spotify.com"
              target="_blank"
              rel="noreferrer"
              className="popup-platform-btn"
              aria-label="Spotify"
            >
              <FaSpotify />
            </a>
          </div>
          <div className="popup-arrow" />
        </div>
      )}

      <div className="listen-on-bar">
        <span className="listen-on-text">Listen on</span>
        <a
          href="https://spotify.com"
          target="_blank"
          rel="noreferrer"
          className="platform-icon-btn white-btn"
          aria-label="Spotify"
        >
          <FaSpotify />
        </a>
        <a
          href="https://podcasts.apple.com"
          target="_blank"
          rel="noreferrer"
          className="platform-icon-btn white-btn"
          aria-label="Apple Podcasts"
        >
          <FaPodcast />
        </a>
        <button
          type="button"
          className={`platform-icon-btn ${isOpen ? "orange-btn" : "white-btn"}`}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          aria-label="More platforms"
        >
          {isOpen ? (
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <circle cx="5" cy="12" r="2.2" />
              <circle cx="12" cy="12" r="2.2" />
              <circle cx="19" cy="12" r="2.2" />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
};

export default function PodcastPage({ isIntroOpen = false, onReopenIntro }) {
  useStopGlobalLenis();
  const [isListenPopupOpen, setIsListenPopupOpen] = useState(false);
  const keyboardTrackRef = useRef(null);
  const lenisRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showControls, setShowControls] = useState(false);
  const [isAtEnd, setIsAtEnd] = useState(false);
  const [videoTrackers, setVideoTrackers] = useState(() =>
    new Array(episodes.length).fill(false),
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

  const isAnimatingRef = useRef(false);
  const isModalOpenRef = useRef(isModalOpen);
  const currentStepRef = useRef(0);
  const isIntroOpenRef = useRef(isIntroOpen);
  const activeIndexRef = useRef(0);
  const isAtEndRef = useRef(false);
  const showControlsRef = useRef(false);

  const [isPodcastActive, setIsPodcastActive] = useState(!isIntroOpen);
  const isPodcastActiveRef = useRef(isPodcastActive);

  const dismissalTimeRef = useRef(0);

  useEffect(() => {
    isIntroOpenRef.current = isIntroOpen;
    if (isIntroOpen) {
      setIsPodcastActive(false);
    } else {
      dismissalTimeRef.current = Date.now();
      setIsPodcastActive(true);
    }
  }, [isIntroOpen]);

  useEffect(() => {
    isPodcastActiveRef.current = isPodcastActive;
  }, [isPodcastActive]);

  useEffect(() => {
    const origBg = document.body.style.backgroundColor;
    const origPaddingTop = document.body.style.paddingTop;
    const origPaddingBottom = document.body.style.paddingBottom;
    document.body.style.setProperty("background-color", "#111111", "important");
    document.body.style.setProperty("padding-top", "0px", "important");
    document.body.style.setProperty("padding-bottom", "0px", "important");

    return () => {
      document.body.style.backgroundColor = origBg;
      document.body.style.paddingTop = origPaddingTop;
      document.body.style.paddingBottom = origPaddingBottom;
    };
  }, []);

  const getTargetScrollForStep = (step) => {
    const track = keyboardTrackRef.current;
    if (!track) return 0;
    const maxScroll =
      document.documentElement.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) return 0;

    if (step === 0) return 0;
    if (step === 11) return maxScroll;

    const isMobile = window.innerWidth <= 768;
    const totalTranslate = isMobile
      ? track.scrollWidth - window.innerWidth * 1.35
      : track.scrollWidth - window.innerWidth * 0.5;
    if (totalTranslate <= 0) return 0;

    const sections = track.querySelectorAll(".middle-section");
    const targetSection = sections[step - 1];
    if (!targetSection) return 0;

    const trackOriginInScreen = isMobile ? 0 : window.innerWidth * 0.4;

    const secCenterInTrack =
      targetSection.offsetLeft + targetSection.offsetWidth / 2;
    const screenCenter = window.innerWidth * (isMobile ? 0.5 : 0.52);

    const targetScroll =
      (trackOriginInScreen + secCenterInTrack - screenCenter) *
      (maxScroll / totalTranslate);
    return Math.max(0, Math.min(maxScroll, targetScroll));
  };

  const goToStep = (step) => {
    if (step < 0 || step > 11) return;
    if (isAnimatingRef.current && step !== currentStepRef.current) return;
    if (isModalOpenRef.current) return;

    const targetScroll = getTargetScrollForStep(step);

    isAnimatingRef.current = true;
    currentStepRef.current = step;

    if (lenisRef.current) {
      lenisRef.current.scrollTo(targetScroll, {
        duration: 0.8,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        onComplete: () => {
          isAnimatingRef.current = false;
        },
      });
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 850);
    } else {
      window.scrollTo({
        top: targetScroll,
        behavior: "smooth",
      });
      setTimeout(() => {
        isAnimatingRef.current = false;
      }, 850);
    }
  };

  useEffect(() => {
    isModalOpenRef.current = isModalOpen;
    isIntroOpenRef.current = isIntroOpen;
    if (isModalOpen || !isPodcastActive) {
      document.body.style.overflow = "hidden";
      if (lenisRef.current) lenisRef.current.stop();
    } else {
      document.body.style.overflow = "";
      if (lenisRef.current) lenisRef.current.start();
    }
    const handleKeyDown = (e) => {
      if (e.key === "Escape") setIsModalOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isModalOpen, isIntroOpen, isPodcastActive]);

  useEffect(() => {
    if (!isPodcastActive) return;

    const track = keyboardTrackRef.current;
    if (!track) return;

    const oldLenis = window.lenis;
    if (oldLenis) {
      oldLenis.stop();
    }

    const lenis = new Lenis({
      duration: 2.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.3,
      touchMultiplier: 0.5,
      syncTouch: true,
    });
    lenisRef.current = lenis;
    window.lenis = lenis;

    let rafId;
    const rafLoop = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(rafLoop);
    };
    rafId = requestAnimationFrame(rafLoop);

    // Flush residual scroll velocity: hard-reset to top so accumulated
    // momentum from the overlay lift doesn't cause a snap jump on reveal
    lenis.stop();
    window.scrollTo(0, 0);
    ScrollTrigger.update();

    // Delay of 400ms before allowing lenis to scroll and snap
    // This gives GSAP time to register the correct scroll position after reset
    let isSettled = false;
    const settleTimer = setTimeout(() => {
      if (!isModalOpenRef.current && isPodcastActiveRef.current) {
        lenis.start();
      }
      isSettled = true;
    }, 400);

    if (isModalOpenRef.current || !isPodcastActiveRef.current) {
      lenis.stop();
      document.body.style.overflow = "hidden";
    }

    let snapTimeout = null;
    lenis.on("scroll", (e) => {
      ScrollTrigger.update();

      if (isAnimatingRef.current) return;
      // Don't snap during the initial settle window after overlay reveal
      if (!isSettled) return;

      if (snapTimeout) clearTimeout(snapTimeout);

      snapTimeout = setTimeout(() => {
        if (!isSettled) return;
        const maxScroll =
          document.documentElement.scrollHeight - window.innerHeight;
        if (maxScroll <= 0) return;

        // Find closest step mathematically based on scroll position
        let closestIdx = 0;
        let minDistance = Infinity;
        for (let i = 0; i < episodes.length; i++) {
          const stepScroll = getTargetScrollForStep(i + 1);
          const dist = Math.abs(window.scrollY - stepScroll);
          if (dist < minDistance) {
            minDistance = dist;
            closestIdx = i;
          }
        }

        let targetStep = closestIdx + 1;
        if (window.scrollY < maxScroll * 0.05) {
          targetStep = 0;
        } else if (window.scrollY > maxScroll * 0.93) {
          targetStep = 11;
        }

        if (targetStep !== currentStepRef.current) {
          goToStep(targetStep);
        }
      }, 600); // snap after 600ms of inactivity
    });

    const ctx = gsap.context(() => {
      gsap.to(track, {
        x: () => {
          const isMobile = window.innerWidth <= 768;
          return isMobile
            ? -(track.scrollWidth - window.innerWidth * 1.35)
            : -(track.scrollWidth - window.innerWidth * 0.5);
        },
        ease: "none",
        scrollTrigger: {
          trigger: ".podcast-page",
          start: "top top",
          end: "bottom bottom",
          scrub: 2.2,
          invalidateOnRefresh: true,
          onUpdate: (self) => {
            const atEnd = self.progress >= 0.93;
            if (atEnd !== isAtEndRef.current) {
              isAtEndRef.current = atEnd;
              setIsAtEnd(atEnd);
            }

            const showControlsVal = self.progress >= 0.08 && !atEnd;
            if (showControlsVal !== showControlsRef.current) {
              showControlsRef.current = showControlsVal;
              setShowControls(showControlsVal);
            }

            // Find closest step mathematically based on scroll position
            let closestIdx = 0;
            let minDistance = Infinity;
            for (let i = 0; i < episodes.length; i++) {
              const stepScroll = getTargetScrollForStep(i + 1);
              const dist = Math.abs(window.scrollY - stepScroll);
              if (dist < minDistance) {
                minDistance = dist;
                closestIdx = i;
              }
            }

            if (closestIdx !== activeIndexRef.current) {
              activeIndexRef.current = closestIdx;
              const newTrackers = new Array(episodes.length).fill(false);
              newTrackers[closestIdx] = true;
              setVideoTrackers(newTrackers);
              setCurrentIndex(closestIdx);
            }

            if (!isAnimatingRef.current) {
              if (atEnd) {
                currentStepRef.current = 11;
              } else if (self.progress < 0.05) {
                currentStepRef.current = 0;
              } else {
                currentStepRef.current = closestIdx + 1;
              }
            }
          },
        },
      });

      gsap.to(".podcast-left", {
        opacity: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".podcast-page",
          start: "top top",
          end: "4% top",
          scrub: true,
        },
      });
    });

    const handleWheel = (e) => {
      if (isModalOpenRef.current || !isPodcastActiveRef.current || !isSettled)
        return;

      // Reopen intro overlay if scrolling up at the very top of the page
      if (window.scrollY <= 5 && e.deltaY < -15) {
        if (onReopenIntro) onReopenIntro();
      }
    };

    let touchStartY = null;
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e) => {
      if (
        isModalOpenRef.current ||
        !isPodcastActiveRef.current ||
        !isSettled ||
        touchStartY === null
      )
        return;
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      if (window.scrollY <= 5 && deltaY < -40) {
        if (onReopenIntro) onReopenIntro();
      }
      touchStartY = null;
    };

    const handleKeyDownNav = (e) => {
      if (isModalOpenRef.current || !isPodcastActiveRef.current || !isSettled)
        return;
      if (e.key === "ArrowUp" || e.key === "PageUp") {
        if (window.scrollY <= 5) {
          if (onReopenIntro) onReopenIntro();
        }
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: true });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDownNav);

    return () => {
      clearTimeout(settleTimer);
      if (snapTimeout) clearTimeout(snapTimeout);
      cancelAnimationFrame(rafId);
      lenis.destroy();
      if (window.lenis === lenis) {
        window.lenis = oldLenis;
        if (oldLenis) {
          oldLenis.start();
        }
      }
      ctx.revert();
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDownNav);
    };
  }, [isPodcastActive, episodes.length]);

  const scrollToEpisode = (index) => {
    goToStep(index + 1);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      goToStep(currentIndex);
    }
  };

  const handleNext = () => {
    if (currentIndex < episodes.length - 1) {
      goToStep(currentIndex + 2);
    }
  };

  return (
    <>
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
    <div
      className="podcast-page"
      onClick={() => isListenPopupOpen && setIsListenPopupOpen(false)}
    >
      <a href="/" className="logos">
        <img src={logoWhite} alt="Podcast Logo" className="podcast-logo" />
      </a>

      <div className="podcast-left">
        <div>
          <h1 className="podcast-title">
            <span>A podcast</span>
            <span>about pivoting.</span>
          </h1>
          <div className="podcast-para">
            <p>
              With entrepreneurial stories from wildly different industries,
              each episode shares one thing in common, they all include a
              radical pivot, a complete change in approach, that turned a good
              idea into success.
            </p>
          </div>
        </div>
        <div className="scroll-discover">
          <div className="scroll-icon">
            <CgMouse />
          </div>
          <span>Scroll to discover</span>
        </div>
      </div>

      <div className="podcast-right">
        <div className="keyboard-track" ref={keyboardTrackRef}>
          <div className="keyboard-section">
            <img
              src={keyboardStart}
              alt="Keyboard start"
              className="keyboard-img"
            />
          </div>

          {episodes.map((ep, index) => (
            <div
              key={ep.id}
              className="keyboard-section middle-section"
              data-tracked={videoTrackers[index]}
            >
              <img
                src={keyboardMiddle}
                alt="Keyboard middle"
                className="keyboard-img"
              />
              <div className="video-container">
                <video
                  src={ep.video}
                  className="episode-video"
                  autoPlay
                  loop
                  muted
                  playsInline
                />
              </div>
            </div>
          ))}

          <div className="keyboard-section">
            <img
              src={keyboardEnd}
              alt="Keyboard end"
              className="keyboard-img"
            />
          </div>
        </div>
      </div>

      {/* Episode Content Overlay in Bottom Gap */}
      <div
        className="episode-content-overlay"
        style={{
          opacity: showControls ? 1 : 0,
          pointerEvents: showControls ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      >
        {episodes[currentIndex] && (
          <>
            <div className="ep-meta">
              <span className="ep-season">{episodes[currentIndex].season}</span>
              <span className="ep-dot">•</span>
              <span className="ep-number">
                {episodes[currentIndex].epNumText}
              </span>
            </div>
            <h2 className="ep-title-heading">{episodes[currentIndex].title}</h2>
            <p className="ep-desc-preview">
              {episodes[currentIndex].description.split("\n\n")[0]}
            </p>
            <div className="ep-cta-row">
              <button
                className="read-more-button"
                onClick={() => setIsModalOpen(true)}
              >
                <span>Read more</span>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </button>
              <ListenOnWidget
                isOpen={isListenPopupOpen}
                onToggle={() => setIsListenPopupOpen(!isListenPopupOpen)}
                className="desktop-listen-on"
              />
            </div>
          </>
        )}
      </div>

      {/* End of Page 'Stay Tuned for More' Overlay */}
      <div
        className="stay-tuned-overlay"
        style={{
          opacity: isAtEnd ? 1 : 0,
          pointerEvents: isAtEnd ? "auto" : "none",
          transform: isAtEnd ? "translateY(0)" : "translateY(24px)",
          transition:
            "opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1), transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div className="stay-tuned-badge">Season 2 • Coming Soon</div>
        <h2 className="stay-tuned-heading">Stay tuned for more.</h2>
        {/* <p className="stay-tuned-sub">
                    More stories of radical pivots, unconventional thinking, and unexpected breakthroughs are on the way.
                </p> */}
      </div>

      {/* Bottom Controls Bar - Hidden at start, fades in at first video */}
      <div
        className="podcast-controls-bar"
        style={{
          opacity: showControls ? 1 : 0,
          pointerEvents: showControls ? "auto" : "none",
          transition: "opacity 0.4s ease",
        }}
      >
        <ListenOnWidget
          isOpen={isListenPopupOpen}
          onToggle={() => setIsListenPopupOpen(!isListenPopupOpen)}
          className="mobile-listen-on"
        />
        <div className="podcast-controls">
          <button
            className="nav-btn prev-btn"
            onClick={handlePrev}
            disabled={currentIndex === 0}
            aria-label="Previous Episode"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="19 20 9 12 19 4 19 20"></polygon>
              <line x1="5" y1="19" x2="5" y2="5"></line>
            </svg>
          </button>

          <div className="current-ep-indicator">
            {/* <span className="ep-num">
                            {currentIndex + 1 < 10 ? `0${currentIndex + 1}` : currentIndex + 1} / {episodes.length}
                        </span> */}
            <span className="ep-title">{episodes[currentIndex]?.title}</span>
          </div>

          <button
            className="nav-btn next-btn"
            onClick={handleNext}
            disabled={currentIndex === episodes.length - 1}
            aria-label="Next Episode"
          >
            <svg
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polygon points="5 4 15 12 5 20 5 4"></polygon>
              <line x1="19" y1="5" x2="19" y2="19"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* Glassy / Transparent Modal Popup for Complete Episode Content */}
      {isModalOpen && episodes[currentIndex] && (
        <div
          className="ep-modal-backdrop"
          onClick={() => setIsModalOpen(false)}
          data-lenis-prevent="true"
        >
          <div className="ep-modal-card" onClick={(e) => e.stopPropagation()}>
            <div className="ep-modal-header">
              <div>
                <div className="ep-meta" style={{ marginBottom: "4px" }}>
                  <span className="ep-season">
                    {episodes[currentIndex].season}
                  </span>
                  <span className="ep-dot">•</span>
                  <span className="ep-number">
                    {episodes[currentIndex].epNumText}
                  </span>
                </div>
                <h3 className="ep-modal-title">
                  {episodes[currentIndex].title}
                </h3>
              </div>
              <button
                className="ep-modal-close"
                onClick={() => setIsModalOpen(false)}
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>

            <div className="ep-modal-body" data-lenis-prevent="true">
              {episodes[currentIndex].description
                .split("\n\n")
                .map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}
