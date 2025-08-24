import clsx from 'clsx';
import { useId } from 'react';

import { useInfoOutput } from '@/store/infoOutputStore';

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
              <p>Name: {info.name}</p>
              <p>Age: {info.age}</p>
              <p>E-mail: {info.email}</p>
              <p>Password: {info.password}</p>
              <p>Password Conformation: {info.confirmPassword} ✓</p>
              <p>Gender: {info.gender}</p>
              <p>Country: {info.country}</p>
              <p>Terms and Conditions: {info.tc && 'Accepted'}</p>
            </div>
          </div>
        );
      })}
    </section>
  );
}
