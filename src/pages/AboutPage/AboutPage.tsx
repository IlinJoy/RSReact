import styles from './AboutPage.module.scss';

export function AboutPage() {
  return (
    <section>
      <div className={styles.wrapper}>
        <h1>About</h1>
        <span>What I can tell about myself:</span>
        <p>
          {`I'm trying to learn, but let's be honest — I'm more of a “try” than a “succeed” kind of
          guy. Proud student at RS School, mostly making sad noises and occasionally creating
          something useful... or at least entertaining.`}
        </p>
        <a className={styles.link} href="https://rs.school/courses/reactjs" target="blank">
          <img className={styles.rsLogo} src="./rss-logo.png" alt="rss-logo" />
        </a>
      </div>
    </section>
  );
}
