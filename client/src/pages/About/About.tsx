import React from "react";
import "./About.css";
import NavBar from "../../components/NavBar/NavBar";
import { Plus } from "lucide-react";
import Footer from "../../components/Footer/Footer";

const About = () => {
  return (
    <div className="about-wrapper">
      <NavBar />
      <div className="about-story">
        <p className="caption_txt">
          &ldquo;Unlock Your Adventure:
          <br /> Where Comfort Meets Affordability
          <br /> Book Your Home Away from Home with Ease.&rdquo;
        </p>
        <div className="story-container">
          <div className="about-story-letter">
            <div className="mystory-title--container">
              <p className="mystory-title">my story</p>
              <hr className="mystory-title-underline" />
            </div>
            <div className="mystory-body--container">
              <strong style={{ fontSize: "4rem" }}>&ldquo;</strong>We
              weren&apos;t always a hostel booking website. I was bitten by the
              travel bug. My first backpacking trip was a chaotic mess of
              questionable hostels, and language barriers that had us resorting
              to charades. But amidst the mishaps, I discovered something
              magical: the camaraderie and connection found in travel
              experiences. That&apos;s when the idea sparked. I knew there had
              to be a better way for college students to find affordable, safe,
              and social hostels. We wanted to create a platform that captured
              the spirit of adventure and connection, without the unnecessary
              stress. So, I embarked on a new adventure - building{" "}
              <strong>
                <code>Duplex</code>
              </strong>
              . I poured my travel experiences, late nights coding, and
              countless cups of coffee into creating a website that catered
              specifically to college students. I wanted to make it easy to find
              hostels that weren&apos;t just a place to sleep, but a launchpad
              for exploring new cities, meeting fellow travellers, and forging
              friendships that last a lifetime. Today,
              <strong>
                <code> Duplex</code>
              </strong>{" "}
              connects thousands of college students with amazing hostels in
              destinations around the world. We&apos;re proud to be a part of
              their journeys, from planning epic trips to sharing unforgettable
              memories. This isn&apos;t just a website, it&apos;s a community of
              wanderlusters, budget adventurers, and story collectors. We
              believe that travel broadens horizons, challenges perspectives,
              and creates lasting friendships. Join us! Explore new
              destinations, connect with fellow explorers, and create your own
              travel stories.
              <strong style={{ fontSize: "3rem" }}>&rdquo;</strong>
              <br />
              <br />
              <code>
                P.S. I still haven&apos;t mastered charades, but at least
                finding hostels is easier now.
              </code>
              🥰
            </div>
            <div className="ceo-signature"></div>
            <p className="ceo-name">Gideon Dakore</p>
            {/* <div className="ceo-rank"> */}
            <p className="ceo-rank">Co-founder | Ceo</p>
            {/* <hr /> */}
            {/* </div> */}
          </div>
          <div className="mystory-ceo-pic"></div>
        </div>
      </div>
      <div className="about-conflict--container">
        <div className="about-conflict--title">
          <p>the cost of hostels are growing</p>
          <div className="about-conflict--title_body">
            <p>
              That cost &mdash; in money, in time, and in attention &mdash;
              makes it hard for students and individuals to
            </p>
            <p>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; focus on the things
              that really matter. This is why we build Duplex
            </p>
          </div>
        </div>
        <div className="about-conflict--statistic">
          <div className="about-conflict-statistic-info">
            <p>&cent;20K</p>
            <p>Median Average Spend on Hostel Cost</p>
          </div>
          <div className="about-conflict-statistic-info">
            <p>17.6</p>
            <p>Weeks on average to resolve a faulty appliances</p>
          </div>
        </div>
      </div>
      <div className="about-challenge">
        <p>the challenge</p>
        <p className="about-challenge--title">
          Our origin begin in the aftermath of a dispute
        </p>
        <div className="about-challenge--body">
          <hr />
          <div>
            <strong style={{ fontSize: "4rem" }}>&ldquo;</strong>The first taste
            of freedom at college quickly turned into a bitter pill for me. My
            excitement about living off-campus in a hostel soon fizzled out,
            replaced by frustration and a constant sense of unease. The place
            was a mess – overflowing bins, questionable hygiene practices, and a
            lingering stench that clung to everything.
            <br />
            <br /> Then came the bills. The advertised rent was a sweet lie.
            Apparently, there was a &apos;middleman&apos; involved, someone who
            magically inflated the price by a good chunk. It felt like a
            betrayal, a blatant exploitation of wide-eyed freshmen like me.
            <br />
            <br /> But the real nightmare was the electricity. We had these
            pre-paid meters, and some of my &apos;dorm mates&apos;, bless their
            hearts, had a talent for burning through units like nobody&apos;s
            business. We&apos;d be plunged into darkness for hours, fumbling
            around with candles and flashlights to study – not exactly the ideal
            college experience.
            <br />
            <br /> The commute wasn&apos;t any better. The road leading to the
            hostel was a dusty, potholed nightmare. Every ride felt like an
            off-road adventure, testing the limits of both our patience and the
            rickety rickshaw we usually shared.
            <br />
            <br /> And then there was the security, or rather, the complete lack
            of it. The flimsy locks on the doors were more symbolic than
            functional, and the &apos;night watchman&apos; seemed to spend most
            nights napping under a tree. We lived in constant worry about our
            belongings. <br />
            <br />
            These weren&apos;t just inconveniences; they were major roadblocks
            to a smooth college life. It was then, amidst the frustration and
            grime, that the idea for Duplex sparked. I knew there had to be a
            better way. Safe, clean, affordable hostels – a dream for many
            college students, myself included.
            <br />
            <br /> Duplex wasn&apos;t just born from my own experience; it was
            born from the collective woes of countless students like me. We
            deserved better, and we were determined to create it. Transparent
            pricing, responsible power consumption, proper sanitation, and most
            importantly, security – these were the pillars upon which we built
            Duplex. We wanted to create hostels that were more than just a place
            to crash; we wanted to build a community, a launchpad for amazing
            college adventures, free from the hassles that had plagued my first
            year.
            <br />
            <br /> So, here we are. Duplex – a hostel experience built not just
            for college students, but by them. We understand the struggles, the
            needs, and the yearning for a place that feels like home, even when
            you&apos;re miles away from it. Join us, and let&apos;s rewrite the
            story of college hostel living, one clean, secure, and affordable
            stay at a time. Because every student deserves a great start to
            their college journey, and a hostel shouldn&apos;t be a hurdle, but
            a stepping stone.
            <strong style={{ fontSize: "3rem" }}>&rdquo;</strong>
          </div>
        </div>
      </div>
      <div className="about-resolution--statistic--container">
        <p>simplifying hostel finding processing for students</p>
        <div className="about-resolution--statistic">
          <div className="about-resolution-statistic-info">
            <p>
              2
              <Plus color="gold" size={"40"} />
            </p>
            <p>Years of Experience</p>
          </div>
          <div className="about-resolution-statistic-info">
            <p>
              10,000
              <Plus color="gold" size={"40"} />
            </p>
            <p>Clients</p>
          </div>
          <div className="about-resolution-statistic-info">
            <p>5</p>
            <p>of the Top 7 Universities</p>
          </div>
        </div>
      </div>
      <div className="about-resolution">
        <p>what we do</p>
        <p className="about-resolution--title">
          honestly no one does what we do
        </p>
        <div className="about-resolution--body">
          <div>
            <strong>
              <code>Your Personal Navigation Guru:</code>
            </strong>{" "}
            Our map isn&apos;t just a static image. It&apos;s your real-time
            travel buddy! Explore all possible routes to your hostel, with clear
            distances and estimated durations for each option. Need to get to
            class? No problem. Duplex shows routes from your hostel to your
            department, ensuring you arrive on time (and maybe even catch a
            coffee on the way). Plus, our maps are live, guiding you every step
            of the journey with real-time directions. No more getting lost in
            the maze of unfamiliar streets!
            <br />
            <br />{" "}
            <strong>
              <code>Search Smarter, Not Harder:</code>
            </strong>{" "}
            Forget sifting through endless listings. Duplex&apos;s powerful
            search engine puts the power in your hands. Use our complex
            filtering and sorting algorithms to find the perfect hostel on the
            map or homepage in a flash. We offer autocomplete features to save
            you time, and filter by everything from price and duration to
            distance, number of roommates, and even amenities. Finding a comfy,
            affordable place with the right vibe has never been easier.
            <br />
            <br />
            <strong>
              <code>Payment Made Simple:</code>
            </strong>{" "}
            Say goodbye to payment hassles. Duplex offers a robust, secure
            platform that accepts all your preferred methods – cards, QR codes,
            mobile money, bank transfers, and more. We understand that plans can
            change, so we also offer hassle-free refunds if you need to cancel
            your booking.
            <br />
            <br />
            <strong>
              <code>Talk to the Real Deal:</code>
            </strong>{" "}
            Need to ask the hostel manager a burning question? No sweat! Duplex
            provides real-time chat and contact options, allowing you to connect
            directly with the hostel staff. Get insider tips, clarify any
            doubts, and feel confident about your stay before you even arrive.
            <br />
            <br />
            <strong>
              <code>Your Privacy is Our Priority:</code>
            </strong>{" "}
            We take student data security seriously. Unlike other platforms,
            Duplex is built with rock-solid privacy measures. We don&apos;t leak
            or share your information with anyone, not even ourselves. Your data
            stays safe and secure with us.
            <br />
            <br />
            <strong>
              <code>Reviews You Can Trust:</code>
            </strong>
            Want to know the real deal about a hostel before you book? Duplex
            has you covered. Our platform features student-written reviews,
            ratings, and comments for every hostel. Get the inside scoop on
            everything from the vibe and facilities to the staff and location.
            Make an informed decision based on real experiences, not just glossy
            marketing photos.
            <br />
            <br />
            <strong style={{ fontSize: "1.6rem" }}>
              <code>
                Duplex isn&apos;t just about finding a place to sleep; it&apos;s
                about finding a haven for your college adventures. We&apos;re
                more than a booking app; we&apos;re a community of students,
                travelers, and explorers, dedicated to making your college
                experience smoother, safer, and way more fun. So, ditch the
                stress of hostel hunting and explore the world with confidence.
                With Duplex, your perfect college crashpad is just a few clicks
                away!
              </code>
            </strong>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;
