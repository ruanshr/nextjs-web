import { useEffect, useRef } from "react";
import Image from "next/image";

import "@/styles/dingding.scss"
 
const list = [
  {
    name: "即时沟通",
    url: "/assets/images/dingding/jsgt-480-480.jpg",
  },
  {
    name: "组织",
    url: "/assets/images/dingding/zz-480-480.jpg",
  },
  {
    name: "智能人事",
    url: "/assets/images/dingding/znrs-480-480.jpg",
  },
  {
    name: "组织大脑",
    url: "/assets/images/dingding/zzdn-480-480.jpg",
  },
  {
    name: "OA审批",
    url: "/assets/images/dingding/oasp-480-480.jpg",
  },
  {
    name: "邮箱",
    url: "/assets/images/dingding/yx-480-480.jpg",
  },
  {
    name: "Teambition",
    url: "/assets/images/dingding/teambition-480-480.jpg",
  },
  {
    name: "文档",
    url: "/assets/images/dingding/wd-480-480.jpg",
  },
  {
    name: "音视频会议",
    url: "/assets/images/dingding/ysphy-480-480.jpg",
  },
  {
    name: "开放平台",
    url: "/assets/images/dingding/kfpt-480-480.jpg",
  },
  {
    name: "宜搭",
    url: "/assets/images/dingding/yd-480-480.jpg",
  },
  {
    name: "钉闪会",
    url: "/assets/images/dingding/dsh-480-480.jpg",
  },
  {
    name: "连接器",
    url: "/assets/images/dingding/ljq-480-480.jpg",
  },
  {
    name: "酷应用",
    url: "/assets/images/dingding/kyy-480-480.jpg",
  },
];

// 动画曲线 - 根据传入的横坐标计算对应的纵坐标（value）
const createAnimation = (
  scrollstart: number,
  scrollEnd: number,
  valueStart: number,
  valueEnd: number
) => {
  return function (scroll: number) {
    if (scroll <= scrollstart) {
      return valueStart;
    }
    if (scroll >= scrollEnd) {
      return valueEnd;
    }
    return (
      valueStart +
      ((valueEnd - valueStart) * (scroll - scrollstart)) /
      (scrollEnd - scrollstart)
    );
  };
}

export default function Home() {
  const containerRef = useRef<HTMLElement>(null)
  
 
// 映射 - dom => {}
const animationMap = new Map();
 
const getDomAnimation = (scrollStart: number, scrollEnd: number, dom: HTMLElement, animationDom: HTMLElement) => {
  scrollStart = scrollStart + Number(dom.dataset.order) * 600;
  const opacityAimation = createAnimation(scrollStart, scrollEnd, 0, 1);
  const opacity = function (scroll: number) {
    return opacityAimation(scroll);
  };
 
  const xAnimation = createAnimation(
    scrollStart,
    scrollEnd,
    animationDom.clientWidth / 2 - dom.offsetLeft - dom.clientWidth / 2,
    0
  );
  const yAnimation = createAnimation(
    scrollStart,
    scrollEnd,
    animationDom.clientHeight / 2 - dom.offsetTop - dom.clientHeight / 2,
    0
  );
  const scaleAnimation = createAnimation(scrollStart, scrollEnd, 0.5, 1);
 
  const transform = function (scroll: number) {
    return `translate(${xAnimation(scroll)}px, ${yAnimation(
      scroll
    )}px) scale(${scaleAnimation(scroll)})`;
  };
 
  return {
    opacity,
    transform,
  };
}
 
// 更新map
const updateMap = (containerDom: HTMLElement) => {
  // 每次调用时先将之前的清除掉，窗口大小等发生改变时重新处理
  animationMap.clear();
  const playGroundRect = document.body.getBoundingClientRect();
  const scrollStart = playGroundRect.top + window.scrollY;
  const scrollEnd = playGroundRect.bottom + window.scrollY - window.innerHeight;
  for (const item of containerDom.querySelectorAll(".list")) {
    animationMap.set(item, getDomAnimation(scrollStart, scrollEnd, item, containerDom.querySelector(".list")));
  }
}
 
// 更新dom的样式，遍历map给每个dom元素设置样式（透明度、偏移量、放缩....）
const updatestyles = () => {
  const scroll = window.scrollY;
  for (let [dom, value] of animationMap) {
    for (const cssProp in value) {
      dom.style[cssProp] = value[cssProp](scroll);
    }
  }
}
 
// 初始时调用一次
updatestyles();
 
useEffect(() => {

  window.addEventListener("scroll", updatestyles);
}, [])
// 监听滚动条事件

  return (
    <main>
      <div className="main-conteiner">
        <div className="logo-title">
          <div className="logo">
            <Image
              src={"/assets/images/dingding/logo.svg"}
              alt=""
              width={100}
              height={100}
            />
          </div>
          <div className="title">
            <Image
              src={"/assets/images/dingding/title.png"}
              alt=""
              width={100}
              height={100}
            />
          </div>
        </div>
        <div className="playground">
          <div className="animation-container" ref={containerRef}>
            <div className="list" >
              {list.map(item => {
                return  (<div className="list-item" key={item.url}>
                    <Image
                    src={item.url}
                    alt={item.name}
                    width={100}
                    height={100}
                  />
                  </div>)
              })}
             
            </div>
          </div>
        </div>
        <div className="last-area">
          <Image
            src={"/assets/images/dingding/title-1.png"}
            alt=""
            width={"100"}
            height={"100"}
          />
          <span>企业数字化一个钉钉就解决</span>
        </div>
      </div>
    </main>
  );
}
