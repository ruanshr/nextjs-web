import { useMemo, useState } from "react"

import VerticalCard from "@/components/VerticalCard"
import styles from './index.module.scss'
export default function (props) {
  const guides = useMemo(() => {
    return [{
      title: '666666666666',
      desc: '6666666666666'
    },
    {
      title: '2355555555523',
      desc: '333233333333333333333'
    },
    {
      title: '88888888888888',
      desc: '999999999999999999999'
    },
    {
      title: '343434345336356345',
      desc: '999999999999999999999',
      picture: 'assets/images/dingding/kfpt-480-480.jpg'
    }]
  }, [])
  const [step, updateStep] = useState(1)

  const handleNext = () => {
    updateStep(step + 1)
  }
  return (
    <div className={styles.guide}>
      <div className={styles.guideWrapper}>
       {guides.map((item, index) => <VerticalCard curStep={step} {...item} key={item.title} step={index + 1}  onNext={handleNext} />)}
       </div>
       </div>
  )
}