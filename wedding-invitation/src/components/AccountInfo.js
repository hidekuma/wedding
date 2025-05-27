import { useInView } from "react-intersection-observer";
import { motion, AnimatePresence } from "framer-motion";
import React, { useState } from "react";
import "../styles/main.css";

const AccountInfo = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  const [groomExpanded, setGroomExpanded] = useState(false);
  const [brideExpanded, setBrideExpanded] = useState(false);

  const groomAccounts = [
    { name: "신랑", account: "177-910488-38707", bank: "하나은행", holder: "정회웅" },
    { name: "신랑 아버지", account: "1111-1111-1111-1111", bank: "카카오뱅크", holder: "정태희" },
    { name: "신랑 어머니", account: "1111-1111-1111-1111", bank: "카카오뱅크", holder: "박미숙" }
  ];

  const brideAccounts = [
    { name: "신부", account: "1111-1111-1111-1111", bank: "카카오뱅크", holder: "김지우" },
    { name: "신부 아버지", account: "1111-1111-1111-1111", bank: "카카오뱅크", holder: "김성진" },
    { name: "신부 어머니", account: "1111-1111-1111-1111", bank: "카카오뱅크", holder: "문애순" }
  ];

  const copyToClipboard = async (text, name) => {
    try {
      await navigator.clipboard.writeText(text);
      alert(`${name}의 계좌번호가 복사되었습니다.`);
    } catch (err) {
      console.error('복사 실패:', err);
      alert('복사에 실패했습니다.');
    }
  };

  const AccountSection = ({ title, accounts, expanded, setExpanded }) => (
    <div className="account-section">
      <button 
        className="account-header"
        onClick={() => setExpanded(!expanded)}
      >
        <span className="account-title">{title}</span>
        <span className={`account-arrow ${expanded ? 'expanded' : ''}`}>
          ▲
        </span>
      </button>
      
      <AnimatePresence>
        {expanded && (
          <motion.div
            className="account-content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {accounts.map((account, index) => (
              <div key={index} className="account-item">
                <div className="account-info-left">
                  <div className="account-name">{account.name}</div>
                  <div className="account-number">{account.account}</div>
                  <div className="account-bank">{account.bank} {account.holder}</div>
                </div>
                <div className="account-actions">
                  <button 
                    className="copy-btn"
                    onClick={() => copyToClipboard(account.account, account.name)}
                  >
                    복사
                  </button>
                </div>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  return (
    <motion.section
      className="account-info"
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <h2>마음 전하실 곳</h2>
      
      <div className="account-container">
        <AccountSection 
          title="신랑측"
          accounts={groomAccounts}
          expanded={groomExpanded}
          setExpanded={setGroomExpanded}
        />
        
        <AccountSection 
          title="신부측"
          accounts={brideAccounts}
          expanded={brideExpanded}
          setExpanded={setBrideExpanded}
        />
      </div>
      
      <p className="thanks">소중한 축하를 보내주셔서 감사드리며,</p>
      <p className="thanks">따뜻한 마음에 깊이 감사드립니다.</p>
    </motion.section>
  );
};

export default AccountInfo; 