import clsx from 'clsx';
import { useId } from 'react';

import { useInfoOutput } from '@/store/infoOutputStore';

import placeholder from '../assets/image/placeholder.webp';
import styles from './HomePage.module.scss';

export function HomePage() {
  const id = useId();
  const infoOutput = useInfoOutput();

  return (
    <section>
      {infoOutput.map((info, index) => {
        return (
          <div key={id} className={clsx(styles.wrapper, !index && styles.new)}>
            <h3 className={styles.heading}>{info.form}</h3>
            <div>
              <p>
                <span>Name:</span> {info.name}
              </p>
              <p>
                <span>Age:</span> {info.age}
              </p>
              <p>
                <span>E-mail:</span> {info.email}
              </p>
              <p>
                <span>Password:</span> {info.password}
              </p>
              <p>
                <span>Password Conformation:</span> {info.confirmPassword} ✓
              </p>
              <p>
                <span>Gender:</span> {info.gender}
              </p>
              <p>
                <span>Country:</span> {info.country}
              </p>
              <p>
                <span>Terms and Conditions:</span> {info.tc && 'Accepted'}
              </p>
            </div>
            <img src={info.image || placeholder} alt={`${id}-preview`} className={styles.image} />
          </div>
        );
      })}
    </section>
  );
}
