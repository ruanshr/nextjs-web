import React, { useEffect, useState, useLayoutEffect, useRef } from "react";
import styles from "./index.module.scss";
import classNames from "classnames";
// import { IKV } from '@/types'

interface IProps {
  step: number;
  title: string;
  desc: string;
  picture?: string;
  curStep: number;
  onNext?: () => void;
}
export default function VerticalCard(props: IProps) {
  const { title, desc, picture, step = 1, onNext, curStep = 1 } = props;
  // const [side, updateSide] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const handleNext = async () => {
    console.log(Date.now())
    await cardRef.current?.animate({ transform: 'translateY(100%)'}, { duration: 1000 }).finished
    onNext?.()
    console.log(Date.now())
  }

  // const activeStep =  step
  return (
    <div
      className={classNames(styles.verticalCard,  { [styles.over]: curStep - step > 0 })}
      ref={cardRef}
      style={{ "--n": step - curStep + 1 }}
      onClick={handleNext}
    >
      <div>{title}</div>
      <div>{desc}</div>
      {curStep === step && picture && <img src={picture} alt=" Load" />}
    </div>
  );
}
