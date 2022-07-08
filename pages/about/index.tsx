import { NextPage } from 'next';
import Head from 'next/head';
import MainLayout from '../../common/layouts/MainLayout';
import styles from '../../styles/about.module.scss';
import Image from 'next/image';
import profile from '/common/images/pp.png';
import GitHubIcon from '../../common/icons/GitHubIcon';
import LinkedInIcon from '../../common/icons/LinkedInIcon';

const About: NextPage = () => {
  return (
    <MainLayout>
      <section className={styles.section}>
        <Head>
          <title>Lucas - About</title>
          <meta name='description' content='About me' />
          <link rel='icon' href='/favicon.ico' />
        </Head>

        <div className={styles.header}>
          <Image
            placeholder='blur'
            draggable={'false'}
            src={profile}
            width={205}
            height={205}
            alt={'profile'}
          />

          <div>
            <div>
              <h3>Lucas Patrón</h3>
              <h4 className={styles.title}>Software Engineer</h4>
            </div>

            <div className={styles.iconContainer}>
              <a className={styles.icon} href='' target='_blank'>
                <LinkedInIcon />
              </a>
              <a className={styles.icon} href='' target='_blank'>
                <GitHubIcon />
              </a>
            </div>
          </div>
        </div>

        <div className={styles.body}>
          <h3>About Me</h3>
          <p>
            I began my journey into the world of programming and developing applications when I was
            little. I got introduced to a book titled &quot;Programming in Basic&quot; and made an
            effort to follow through. Needless to say, my motivation plummeted... Heh, that was
            expected. I decided I wanted to start with a higher-level language. A period of almost 2
            years was spent with Java, where during that time, I made the switch from C++ to C# and
            back to Java, as my interest in using new paradigms was always lurking. Even though I
            continued to solely solve algorithms and create basic programs in the terminal, I hoped
            there was some way for me to be able to see an application behind my code. Not being a
            fan of JavaScript due to its lack of a type system, I decided to investigate any
            alternative. In the following weeks, I developed a deep affection for TypeScript. The
            simplicity of the language, with both a great, broad ecosystem and a lovely syntax, made
            the prospect of developing large, complex, server-side applications with little ceremony
            something I was eager to try. Also, being able to seamlessly switch between different
            backend and frontend technologies in a workflow was one of the main selling points for
            me. Ever since, my devotion for web development has only grown.
          </p>

          <h3>Technical Skills</h3>
          <div className={styles.skillsContainer}>
            <div>
              <h6>Frontend Technologies</h6>
              <p>React.js (w/ Redux Toolkit), Next.js, Styled Components, SASS, and Tailwind CSS</p>
            </div>

            <div>
              <h6>Backend Technologies</h6>
              <p>
                Spring / Spring Boot, Node.js, Express.js, Nest.js, Relational Databases (NoSQL),
                Non-Relational Databases (MongoDB), Prisma, and Mongoose.
              </p>
            </div>

            <div>
              <h6>Programming & Scripting Languages</h6>
              <p>Java, JavaScript / TypeScript, HTML5, CSS3</p>
            </div>
          </div>

          <h3>Spoken Languages</h3>
          <div className={styles.languagesContainer}>
            <div>
              <h5>Spanish</h5>
              <p>Full Technical Proficiency</p>
            </div>

            <div>
              <h5>English</h5>
              <p>Full Technical Proficiency</p>
            </div>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default About;
