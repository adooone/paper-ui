import { useState } from 'react';
import type { FC } from 'react';
import type { PropDef } from './components/prop-table';
import { DetailSidebar } from './showcase/components/detail-sidebar';
import { Footer } from './showcase/components/footer';
import { type Page, ShowcaseNav } from './showcase/components/nav';
import { FontProvider } from './showcase/font-context';
import { ComponentsPage } from './showcase/pages/components';
import { DocsPage } from './showcase/pages/docs';
import { LayoutPage } from './showcase/pages/layout';
import { TokensPage } from './showcase/pages/tokens';
import { WelcomePage } from './showcase/pages/welcome';
import './globals.scss';

interface DetailData {
  title: string;
  codeExample: string;
  id: string;
  props?: PropDef[];
}

const SIDEBAR_WIDTH = 560;

const Showcase: FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>('welcome');
  const [detailData, setDetailData] = useState<DetailData | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const updateDetail = (data: DetailData | null) => {
    if (data) {
      setDetailData(data);
    }
  };

  const openDetail = (data: DetailData | null) => {
    if (data) {
      setDetailData(data);
      setSidebarOpen(true);
    }
  };

  const closeDetail = () => {
    setSidebarOpen(false);
    setTimeout(() => setDetailData(null), 300);
  };

  const handlePageChange = (page: Page) => {
    closeDetail();
    setCurrentPage(page);
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'welcome':
        return <WelcomePage onNavigate={setCurrentPage} />;
      case 'gallery':
        return (
          <ComponentsPage
            onOpenDetail={openDetail}
            onUpdateDetail={updateDetail}
            sidebarOpen={sidebarOpen}
          />
        );
      case 'layout':
        return <LayoutPage />;
      case 'tokens':
        return <TokensPage />;
      case 'docs':
        return <DocsPage />;
      default:
        return <WelcomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <FontProvider>
      <div className="flex min-h-screen" style={{ backgroundColor: '#FDFCF8' }}>
        <div
          className="flex-1 min-w-0"
          style={{
            marginRight: sidebarOpen ? `${SIDEBAR_WIDTH}px` : '0',
            transition: 'margin-right 300ms cubic-bezier(0.4, 0, 0.2, 1)',
          }}
        >
          <ShowcaseNav currentPage={currentPage} onPageChange={handlePageChange} />
          <main className="min-h-[calc(100vh-80px)]">{renderPage()}</main>
          <Footer />
        </div>

        <DetailSidebar
          open={sidebarOpen}
          title={detailData?.title ?? ''}
          id={detailData?.id}
          props={detailData?.props}
          onClose={closeDetail}
        />
      </div>
    </FontProvider>
  );
};

export default Showcase;

import ReactDOM from 'react-dom/client';

const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(<Showcase />);
}
