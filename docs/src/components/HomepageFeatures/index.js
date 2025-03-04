import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Real-Time Tracking',
    description: (
      <>
        Track cryptocurrency prices in real-time with automatic updates
        and interactive price charts.
      </>
    ),
  },
  {
    title: 'Smart Search',
    description: (
      <>
        Find any cryptocurrency quickly with our intelligent search feature,
        complete with rate limiting and caching.
      </>
    ),
  },
  {
    title: 'Modern UI',
    description: (
      <>
        Built with Next.js and Tailwind CSS for a responsive,
        fast, and beautiful user experience.
      </>
    ),
  },
];

function Feature({ title, description }) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center padding-horiz--md">
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
