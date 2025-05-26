import { useInView } from "react-intersection-observer";
import { motion } from "framer-motion";
import React, { useState } from "react";
import "../styles/main.css";

const RSVPForm = () => {
  const [form, setForm] = useState({
    side: "",
    attend: "",
    meal: "",
    name: "",
    companion: "",
    message: "",
    agree: false,
  });
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.agree) {
      alert("개인정보 수집 및 활용에 동의해주세요.");
      return;
    }
    alert("참석 여부가 전달되었습니다. 감사합니다!");
  };

  return (
    <motion.section
      className="rsvp"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2>참석 여부 전달</h2>
      <form onSubmit={handleSubmit}>
        <label>
          어느 측 하객이신가요?
          <select name="side" value={form.side} onChange={handleChange} required>
            <option value="">선택</option>
            <option value="groom">신랑</option>
            <option value="bride">신부</option>
          </select>
        </label>
        <label>
          참석여부
          <select name="attend" value={form.attend} onChange={handleChange} required>
            <option value="">선택</option>
            <option value="yes">참석</option>
            <option value="no">불참석</option>
          </select>
        </label>
        <label>
          식사여부
          <select name="meal" value={form.meal} onChange={handleChange} required>
            <option value="">미정</option>
            <option value="yes">예</option>
            <option value="no">아니오</option>
          </select>
        </label>
        <label>
          성함
          <input name="name" value={form.name} onChange={handleChange} required />
        </label>
        <label>
          동행인 성함
          <input name="companion" value={form.companion} onChange={handleChange} />
        </label>
        <label>
          전달사항
          <textarea name="message" value={form.message} onChange={handleChange} />
        </label>
        <label>
          <input
            type="checkbox"
            name="agree"
            checked={form.agree}
            onChange={handleChange}
            required
          />
          (필수) 개인정보 수집 및 활용 동의
        </label>
        <button type="submit">전달</button>
      </form>
    </motion.section>
  );
};

export default RSVPForm; 