import React from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    // 다음 렌더링에서 폴백 UI가 보이도록 상태를 업데이트 합니다.
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // 에러 리포팅 서비스에 에러를 기록할 수도 있습니다
    console.error('갤러리 에러:', error, errorInfo);
    
    // 페이지 리프레시 방지를 위해 에러를 포착
    if (error.name === 'ChunkLoadError' || 
        error.message.includes('Loading chunk') ||
        error.message.includes('Loading CSS chunk')) {
      console.error('청크 로딩 에러 감지됨, 페이지 리프레시 방지');
      // 여기서 사용자에게 알림을 보여줄 수 있습니다
    }
  }

  render() {
    if (this.state.hasError) {
      // 에러가 발생한 경우 폴백 UI를 렌더링합니다
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center', 
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          margin: '1rem 0'
        }}>
          <h3>갤러리를 불러오는 중 문제가 발생했습니다</h3>
          <p>잠시 후 다시 시도해 주세요.</p>
          <button 
            onClick={() => {
              this.setState({ hasError: false, error: null });
              // window.location.reload(); // 자동 리로드 제거
            }}
            style={{
              padding: '0.5rem 1rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            다시 시도
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary; 