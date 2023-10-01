import { PageProps, graphql } from 'gatsby';
import { Sidebar } from '@/components/Sidebar';
import { AllPostsProp, PostEdge } from '@/types/document';
import { ThemeProvider } from '@emotion/react';
import { theme } from '@/utils/const';
import { MainContent } from '@/components/MainContent';
import { useState } from 'react';
import Header from '@/components/Header';
import { getFolders } from '@/utils/helpers';
import useResponsiveWeb from '@/hooks/useResponsiveWeb';

const Main = ({
  data: {
    allPosts: { edges },
  },
}: PageProps<AllPostsProp>) => {
  const [isSidebarShown, setIsSidebarShown] = useState(false);

  useResponsiveWeb([
    {
      bp: 960,
      onIntersection: isUnderBp => {
        if (isUnderBp) {
          setIsSidebarShown(false);
        } else {
          setIsSidebarShown(true);
        }
      },
    },
  ]);

  const documents = getDocuments(edges);
  const folderInformations = getFolders(edges);

  return (
    <ThemeProvider theme={theme}>
      <Header
        isSidebarShown={isSidebarShown}
        setIsSidebarShown={setIsSidebarShown}
      />
      <Sidebar
        isSidebarShown={isSidebarShown}
        folderInformations={folderInformations}
      />
      <MainContent documents={documents} />
    </ThemeProvider>
  );
};

export default Main;

export const getPosts = graphql`
  query {
    allPosts: allMarkdownRemark(
      sort: { fields: frontmatter___date, order: DESC }
    ) {
      ...MarkdownRemarkFields
    }
  }
`;

const getDocuments = (edges: PostEdge[]) =>
  edges.map(({ node }: PostEdge) => ({
    ...node,
    ...node.frontmatter,
  }));
