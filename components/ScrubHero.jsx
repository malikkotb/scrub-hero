"use client";
import React, { useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
gsap.registerPlugin(useGSAP);

export default function ScrubHero() {
  const primarySectionRef = useRef(null);
  const refs = useRef([]);
  const h1ref = useRef(null);
  const processRef = useRef(null);
  const lineRef = useRef(null);
  const mainPRef = useRef(null);
  const spanRef = useRef(null);

  useGSAP(() => {
    gsap.registerPlugin(ScrollTrigger);

    // timeline for text to come in (not based on scroll position, but on time)
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: primarySectionRef.current,
        start: "top 20%",
        end: "bottom center",
        toggleActions: "play reverse restart reverse",
        pin: false,
      },
      defaults: {
        ease: "power3.out",
        duration: 1,
      },
    });

    tl.from(h1ref.current, {
      yPercent: 100,
    })
      .from(
        processRef.current,
        {
          // could've also staggerred animations for h1Ref and processRef and put them in an array of refs
          yPercent: 140,
        },
        "-=0.8"
      )
      .from(
        mainPRef.current,
        {
          yPercent: 210, // this is higher because there are two lines of text
          opacity: 0,
        },
        "-=1"
      );

    // timeline based on scroll position (for watermark) -> use scrub
    const scrubTL = gsap.timeline({
      scrollTrigger: {
        trigger: primarySectionRef.current,
        start: "top 30%",
        end: "40% top",
        toggleActions: "play reverse restart reverse",
        scrub: 2,
      },
      defaults: {
        ease: "power3.out",
        duration: 1,
      },
    });

    scrubTL
      .from(lineRef.current, {
        scaleY: 0,
      })
      .from(
        spanRef.current,
        {
          x: 0,
          yPercent: 0,
        },
        "<"
      );
  });

  return (
    <>
      <section></section>
      <section ref={primarySectionRef} className="primary">
        <aside>
          <div className="mask">
            <h1 ref={h1ref}>diabolical</h1>
          </div>
          <div className="mask">
            <p ref={processRef}>process</p>
          </div>
        </aside>
        <main>
          <div className="mask">
            <p ref={mainPRef}>
              The processes utilized in our next-gen system are diabolical in nature. What does this mean? You’ll have
              to find out.
            </p>
          </div>
        </main>

        <div ref={lineRef} className="line"></div>
        <span ref={spanRef}>diabolical</span>
      </section>
      <section></section>
    </>
  );
}
