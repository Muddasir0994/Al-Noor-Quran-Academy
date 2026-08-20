import React from 'react';
import { useNavigate } from 'react-router-dom';
import { BlogListPage as BlogListComp } from '../components/BlogListPage';

interface BlogListPageProps {
  onOpenTrial: () => void;
}

export const BlogListPage: React.FC<BlogListPageProps> = ({ onOpenTrial }) => {
  const navigate = useNavigate();

  return (
    <BlogListComp
      onNavigate={(slug) => navigate(`/blog/${slug}`)}
      onOpenTrial={onOpenTrial}
    />
  );
};
