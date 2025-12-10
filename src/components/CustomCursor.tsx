"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorMainRef = useRef<HTMLDivElement>(null);
  const cursorFollowerRef = useRef<HTMLDivElement>(null);
  const cursorGlowRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isClicking, setIsClicking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Проверяем, что это десктоп с точным указателем
    const isDesktop = window.matchMedia("(hover: hover) and (pointer: fine)").matches;

    if (!isDesktop) return;

    // Активируем кастомный курсор
    document.body.classList.add("custom-cursor-enabled");

    const cursorMain = cursorMainRef.current;
    const cursorFollower = cursorFollowerRef.current;
    const cursorGlow = cursorGlowRef.current;

    if (!cursorMain || !cursorFollower || !cursorGlow) return;

    let mouseX = 0;
    let mouseY = 0;
    let followerX = 0;
    let followerY = 0;
    let glowX = 0;
    let glowY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      if (!isVisible) setIsVisible(true);

      // Основной курсор следует мгновенно
      cursorMain.style.transform = `translate(${mouseX - 6}px, ${mouseY - 6}px)`;
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseDown = () => {
      setIsClicking(true);
    };

    const handleMouseUp = () => {
      setIsClicking(false);
    };

    // Следователь с плавной задержкой
    const animateFollower = () => {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      cursorFollower.style.transform = `translate(${followerX - 20}px, ${followerY - 20}px)`;

      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      cursorGlow.style.transform = `translate(${glowX - 50}px, ${glowY - 50}px)`;

      requestAnimationFrame(animateFollower);
    };

    // Отслеживаем hover на интерактивных элементах
    const handleElementHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const isInteractive = target.closest("a, button, input, textarea, [role='button'], .interactive");
      setIsHovering(!!isInteractive);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousemove", handleElementHover);
    document.addEventListener("mouseenter", handleMouseEnter);
    document.addEventListener("mouseleave", handleMouseLeave);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    const animationId = requestAnimationFrame(animateFollower);

    return () => {
      document.body.classList.remove("custom-cursor-enabled");
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousemove", handleElementHover);
      document.removeEventListener("mouseenter", handleMouseEnter);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);
      cancelAnimationFrame(animationId);
    };
  }, [isVisible]);

  return (
    <>
      <div
        ref={cursorMainRef}
        className={`cursor-main ${isHovering ? "hover" : ""}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <div
        ref={cursorFollowerRef}
        className={`cursor-follower ${isHovering ? "hover" : ""} ${isClicking ? "clicking" : ""}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      />
      <div
        ref={cursorGlowRef}
        className={`cursor-glow ${isHovering ? "hover" : ""}`}
        style={{ opacity: isVisible ? 0.6 : 0 }}
      />
    </>
  );
}
