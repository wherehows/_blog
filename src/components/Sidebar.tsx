import React from 'react'
import styled from '@emotion/styled'
import CategoryItem from './CategoryItem'

interface SidebarProps {
  documentTree: GrandParentData[keyof GrandParentData][]
}

const Sidebar = ({ documentTree }: SidebarProps) => {
  return (
    <Wrapper>
      <CategoryList>
        {documentTree.map((folder, index) => (
          <CategoryItem key={index} folder={folder} />
        ))}
      </CategoryList>
    </Wrapper>
  )
}

export default Sidebar

const Wrapper = styled('div')(() => ({
  width: 'calc((100% - 70rem) / 2 + 18rem)',
  height: '100vh',
  backgroundColor: '#fff5e6',
  display: 'flex',
  flexWrap: 'nowrap',
  justifyContent: 'flex-end',
  alignItems: 'flex-start',
  position: 'fixed',
  left: 0,
  top: 0,
  // zIndex: 1,
  color: '#ba7f4a',
}))

const CategoryList = styled('ul')(() => ({
  width: '18rem',
  height: '100vh',
  backgroundColor: 'transparent',
  position: 'relative',
  padding: 0,
}))
