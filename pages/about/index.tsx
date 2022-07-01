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
          <Image draggable={'false'} src={profile} width={205} height={205} alt={'profile'} />

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
            I began my journey into software development as a Web Developer and Designer by
            tinkering around with banners, wallpapers and forum signatures. Furthermore, I have
            personal and e-commerce websites for friends and small business owners utilizing popular
            web technologies. When Web Development became stale (...before JavaScript was a thing
            and made Web Development exciting again) I took my career in another direction by
            obtaining a formal education in Computer Science where I learned object-oriented
            programming languages. With these newly acquired skills I was able to create dynamic,
            interactive web and mobile applications. My recent professional experience was spent at
            IBM Security as a Staff Software Engineer developing their Identity and Access
            Management software. These days I am currently working on developing my iOS app,
            DokoDemo, which helps users find all Japanese-related events, food and news in their
            local area. I also recently took on a full-time job in Silicon Valley as a Software
            Engineer and have been actively learning Python and Django.
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
